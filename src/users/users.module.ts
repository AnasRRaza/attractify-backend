import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PortfolioFormSubmission } from './entities/portfolio-form-submission.entity';
import { ClerkModule } from '../clerk/clerk.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, PortfolioFormSubmission]), ClerkModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
