import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

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
}
