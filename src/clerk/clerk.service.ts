import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClerkClient } from '@clerk/backend';
import { ClerkUser } from './interfaces/clerk-user.interface';

@Injectable()
export class ClerkService {
  private readonly logger = new Logger(ClerkService.name);
  private clerkClient: ReturnType<typeof createClerkClient>;

  constructor(private configService: ConfigService) {
    const secretKey = this.configService.get<string>('CLERK_SECRET_KEY');

    if (!secretKey) {
      this.logger.warn(
        'CLERK_SECRET_KEY not configured. Clerk features will be unavailable.',
      );
    }

    this.clerkClient = createClerkClient({
      secretKey: secretKey || '',
    });
  }

  async getUserById(clerkId: string): Promise<ClerkUser | null> {
    try {
      this.logger.log(`Fetching user from Clerk with ID: ${clerkId}`);

      const user = await this.clerkClient.users.getUser(clerkId);

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddresses: user.emailAddresses.map((email) => ({
          emailAddress: email.emailAddress,
        })),
        imageUrl: user.imageUrl,
        profileImageUrl: (user as unknown as { profileImageUrl: string })
          .profileImageUrl,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Error fetching user from Clerk: ${message}`, stack);
      return null;
    }
  }

  isConfigured(): boolean {
    return !!this.configService.get<string>('CLERK_SECRET_KEY');
  }
}
