import { Request } from 'express';
import { UserEntity } from '../../users/users.entity';
export interface RequestModel extends Request {
  user: UserEntity;
}
