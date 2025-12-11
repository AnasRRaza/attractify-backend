import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      // Log the query
      const query = this.usersRepository.createQueryBuilder('user');
      this.logger.log(`Executing query: ${query.getQuery()}`);

      // Get count first
      const count = await this.usersRepository.count();
      this.logger.log(`Total users in database: ${count}`);

      // Get all users
      const users = await this.usersRepository.find();
      this.logger.log(`Found ${users.length} users`);

      return users;
    } catch (error) {
      this.logger.error(`Error fetching users: ${error.message}`);
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<Partial<User>> {
    try {
      this.logger.log(`Finding user by slug: ${slug}`);

      const user = await this.usersRepository.findOne({
        where: { slug },
        select: ['slug', 'firstName', 'lastName', 'emailAddress'],
      });

      if (!user) {
        throw new NotFoundException(`User with slug '${slug}' not found`);
      }

      return {
        slug: user.slug,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error fetching user by slug: ${message}`);
      throw error;
    }
  }
}
