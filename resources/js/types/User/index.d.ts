export type UserType = 'user' | 'employer' | 'admin';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    type: UserType;
    created_at: Date;
    updated_at: Date;
}