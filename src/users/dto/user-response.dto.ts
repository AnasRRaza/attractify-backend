import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'john-doe', description: 'User slug' })
  slug: string;

  @ApiProperty({ example: 'John', description: 'User first name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  emailAddress: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'User phone number',
    nullable: true,
  })
  phoneNumber: string | null;

  @ApiProperty({
    example: 'https://img.clerk.com/...',
    description: 'User profile picture URL',
    nullable: true,
  })
  profilePicture: string | null;
}
