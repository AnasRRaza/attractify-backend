import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PortfolioFormSubmission } from './entities/portfolio-form-submission.entity';
import { ClerkService } from '../clerk/clerk.service';
import { UserResponseDto } from './dto/user-response.dto';
import { CreatePortfolioFormSubmissionDto } from './dto/create-portfolio-form-submission.dto';
import { PortfolioFormSubmissionResponseDto } from './dto/portfolio-form-submission-response.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(PortfolioFormSubmission)
    private portfolioFormSubmissionRepository: Repository<PortfolioFormSubmission>,
    private clerkService: ClerkService,
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

  async findBySlugWithProfile(slug: string): Promise<UserResponseDto> {
    try {
      this.logger.log(`Finding user by slug with profile: ${slug}`);

      // Query user from database including clerkId
      const user = await this.usersRepository.findOne({
        where: { slug },
        select: [
          'slug',
          'firstName',
          'lastName',
          'emailAddress',
          'clerkId',
          'phoneNumber',
        ],
      });

      if (!user) {
        throw new NotFoundException(`User with slug '${slug}' not found`);
      }

      // Initialize response with database data
      const response: UserResponseDto = {
        slug: user.slug,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        profilePicture: null,
      };

      // Fetch profile picture from Clerk if clerkId exists
      if (user.clerkId) {
        this.logger.log(
          `User has clerkId: ${user.clerkId}, fetching from Clerk`,
        );

        const clerkUser = await this.clerkService.getUserById(user.clerkId);

        if (clerkUser) {
          // Prefer profileImageUrl over imageUrl if available
          response.profilePicture =
            clerkUser.profileImageUrl || clerkUser.imageUrl;
          this.logger.log(
            `Profile picture fetched: ${response.profilePicture}`,
          );
        } else {
          this.logger.warn(
            `Could not fetch Clerk data for user ${user.clerkId}. Using database data only.`,
          );
        }
      } else {
        this.logger.log(
          `User ${slug} has no clerkId. Profile picture will be null.`,
        );
      }

      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error fetching user by slug with profile: ${message}`);
      throw error;
    }
  }

  async createPortfolioFormSubmission(
    dto: CreatePortfolioFormSubmissionDto,
  ): Promise<PortfolioFormSubmissionResponseDto> {
    try {
      this.logger.log(
        `Creating portfolio form submission for user slug: ${dto.userSlug}`,
      );

      // Find user by slug to get user ID
      const user = await this.usersRepository.findOne({
        where: { slug: dto.userSlug },
        select: ['id'],
      });

      if (!user) {
        throw new NotFoundException(
          `User with slug '${dto.userSlug}' not found`,
        );
      }

      // Create portfolio form submission entity
      const submission = this.portfolioFormSubmissionRepository.create({
        userId: user.id,
        answer1: dto.answer1,
        answer2: dto.answer2,
        presentation: dto.presentation,
        interestLevel: dto.interestLevel,
        email: dto.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Save submission
      const savedSubmission =
        await this.portfolioFormSubmissionRepository.save(submission);

      this.logger.log(
        `Portfolio form submission created successfully with ID: ${savedSubmission.id}`,
      );

      return {
        id: savedSubmission.id,
        message: 'Portfolio form submission created successfully',
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error creating portfolio form submission: ${message}`);
      throw error;
    }
  }
}
