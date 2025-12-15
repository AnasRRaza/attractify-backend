import { ApiProperty } from '@nestjs/swagger';

export enum PresentationOption {
  YES = 'yes',
  NO = 'no',
}

export class CreatePortfolioFormSubmissionDto {
  @ApiProperty({
    example: 'I am looking for a property in downtown area',
    description: 'First answer from the form',
  })
  answer1: string;

  @ApiProperty({
    example: 'I need a 3-bedroom house with a garage',
    description: 'Second answer from the form',
  })
  answer2: string;

  @ApiProperty({
    example: 'yes',
    description: 'Whether the user wants a presentation',
    enum: PresentationOption,
  })
  presentation: PresentationOption;

  @ApiProperty({
    example: 8,
    description:
      'Interest level from 1 to 10 (1 = not interested, 10 = very interested)',
    minimum: 1,
    maximum: 10,
  })
  interestLevel: number;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the person submitting the form',
  })
  email: string;

  @ApiProperty({
    example: 'john-doe',
    description: 'Slug of the portfolio owner',
  })
  userSlug: string;
}
