export interface ClerkUserEmailAddress {
  emailAddress: string;
}

export interface ClerkUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: ClerkUserEmailAddress[];
  imageUrl: string;
  profileImageUrl?: string;
}
