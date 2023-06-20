import * as mongoose from 'mongoose';
import { Role } from './enums/role.enum';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  password: string;
  role: Role;
}
