export class ProfileEntity {
  id: number;
  userId: number;
  bio: string;
  avatar: string;

  constructor(profile: {
    id?: number;
    userId?: number;
    bio?: string;
    avatar?: string;
  }) {
    this.id = profile.id || 0;
    this.userId = profile.userId || 0;
    this.bio = profile.bio || '';
    this.avatar = profile.avatar || '';
  }
}
