import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { CreatePortfolioFormSubmissionDto } from './dto/create-portfolio-form-submission.dto';
import { PortfolioFormSubmissionResponseDto } from './dto/portfolio-form-submission-response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Get user information by slug with profile picture',
  })
  @ApiParam({ name: 'slug', description: 'User slug' })
  @ApiResponse({
    status: 200,
    description: 'Return user information with profile picture.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findBySlug(@Param('slug') slug: string): Promise<UserResponseDto> {
    return this.usersService.findBySlugWithProfile(slug);
  }

  @Post(':slug/portfolio-form-submissions')
  @ApiOperation({
    summary: 'Submit portfolio contact form',
    description: 'Create a new portfolio form submission for a user',
  })
  @ApiParam({ name: 'slug', description: 'User slug' })
  @ApiBody({ type: CreatePortfolioFormSubmissionDto })
  @ApiResponse({
    status: 201,
    description: 'Portfolio form submission created successfully.',
    type: PortfolioFormSubmissionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async createPortfolioFormSubmission(
    @Param('slug') slug: string,
    @Body() dto: CreatePortfolioFormSubmissionDto,
  ): Promise<PortfolioFormSubmissionResponseDto> {
    // Set the userSlug from the URL parameter
    dto.userSlug = slug;
    return this.usersService.createPortfolioFormSubmission(dto);
  }
}
