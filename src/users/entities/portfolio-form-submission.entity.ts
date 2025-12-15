import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portfolio_form_submissions')
export class PortfolioFormSubmission {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'user_id', type: 'bigint', nullable: false })
  userId: string;

  @Column({ name: 'answer1', type: 'text', nullable: false })
  answer1: string;

  @Column({ name: 'answer2', type: 'text', nullable: false })
  answer2: string;

  @Column({ name: 'presentation', nullable: false })
  presentation: string;

  @Column({ name: 'interest_level', type: 'integer', nullable: false })
  interestLevel: number;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;
}
