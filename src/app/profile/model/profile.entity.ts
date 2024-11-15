export class ProfileEntity {
  id: number;
  userId: number;
  bio: string;
  avatar: string;
  name?: string;
  email?: string;
  phone?: string;

  constructor(profile: {
    id?: number;
    userId?: number;
    bio?: string;
    avatar?: string;
    name?: string;
    email?: string;
    phone?: string;
  }) {
    this.id = profile.id ?? 0;
    this.userId = profile.userId ?? 0;
    this.bio = profile.bio || '';
    this.avatar = profile.avatar || '';
    this.name = profile.name || '';
    this.email = profile.email || '';
    this.phone = profile.phone || '';
  }
}
