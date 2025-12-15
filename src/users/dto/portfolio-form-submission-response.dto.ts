import { ApiProperty } from '@nestjs/swagger';

export class PortfolioFormSubmissionResponseDto {
  @ApiProperty({
    example: '1',
    description: 'ID of the created submission',
  })
  id: string;

  @ApiProperty({
    example: 'Portfolio form submission created successfully',
    description: 'Success message',
  })
  message: string;
}

