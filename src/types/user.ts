import { Family } from './family';

export interface User {
  id: number;
  userName: string;
  password: string;
  email: string;
  phone: string;
  role: string;
  familyHost: Family | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
}
