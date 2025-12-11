import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
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
  @ApiOperation({ summary: 'Get user information by slug' })
  @ApiParam({ name: 'slug', description: 'User slug' })
  @ApiResponse({
    status: 200,
    description: 'Return user information.',
    schema: {
      type: 'object',
      properties: {
        slug: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        emailAddress: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findBySlug(@Param('slug') slug: string): Promise<Partial<User>> {
    return this.usersService.findBySlug(slug);
  }
}
