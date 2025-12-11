import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'clerk_id', nullable: true, unique: true })
  clerkId: string;

  @Column({ name: 'email_address', nullable: false })
  emailAddress: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'slug', nullable: true })
  slug: string;

  @Column({ name: 'signature', type: 'text', nullable: true })
  signature: string;

  @Column({ name: 'signature_rich', type: 'text', nullable: true })
  signatureRich: string;

  @Column({
    name: 'goal',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 100000.0,
    nullable: true,
  })
  goal: number;

  @Column({ name: 'stripe_customer_id', nullable: true })
  stripeCustomerId: string;

  @Column({ name: 'stripe_subscription_id', nullable: true })
  stripeSubscriptionId: string;

  @Column({ name: 'stripe_subscription_status', nullable: true })
  stripeSubscriptionStatus: string;

  @Column({
    name: 'stripe_subscription_ends_at',
    type: 'timestamp',
    nullable: true,
  })
  stripeSubscriptionEndsAt: Date;

  @Column({
    name: 'stripe_subscription_cancel_at_period_end',
    default: false,
    nullable: false,
  })
  stripeSubscriptionCancelAtPeriodEnd: boolean;

  @Column({ name: 'stripe_price_id', nullable: true })
  stripePriceId: string;

  @Column({ name: 'twilio_account_sid', nullable: true })
  twilioAccountSid: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'textgrid_phone_number', nullable: true })
  textgridPhoneNumber: string;

  @Column({ name: 'notification_phone_number', nullable: true })
  notificationPhoneNumber: string;

  @Column({ name: 'google_calendar_id', nullable: true })
  googleCalendarId: string;

  @Column({ name: 'google_access_token', nullable: true })
  googleAccessToken: string;

  @Column({ name: 'google_refresh_token', nullable: true })
  googleRefreshToken: string;

  @Column({
    name: 'google_token_expires_at',
    type: 'timestamp',
    nullable: true,
  })
  googleTokenExpiresAt: Date;

  @Column({ name: 'google_revoked_at', type: 'timestamp', nullable: true })
  googleRevokedAt: Date;

  @Column({
    name: 'calendar_preferences',
    type: 'jsonb',
    default: {},
    nullable: false,
  })
  calendarPreferences: Record<string, any>;

  @Column({
    name: 'notification_preferences',
    type: 'jsonb',
    default: {},
    nullable: false,
  })
  notificationPreferences: Record<string, any>;

  @Column({
    name: 'ui_preferences',
    type: 'jsonb',
    default: {},
    nullable: false,
  })
  uiPreferences: Record<string, any>;

  @Column({ name: 'quickstart_state', type: 'jsonb', default: {} })
  quickstartState: Record<string, any>;

  @Column({
    name: 'video_progress',
    type: 'jsonb',
    default: {},
    nullable: false,
  })
  videoProgress: Record<string, any>;

  @Column({ name: 'lang', default: 'en', nullable: false })
  lang: string;

  @Column({
    name: 'affirmations',
    type: 'text',
    array: true,
    default: () => "'{}'",
    nullable: true,
  })
  affirmations: string[];

  @Column({ name: 'drip_campaign', default: true, nullable: false })
  dripCampaign: boolean;

  @Column({ name: 'ghl_webhook_sent_at', type: 'timestamp', nullable: true })
  ghlWebhookSentAt: Date;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt: Date;
}
