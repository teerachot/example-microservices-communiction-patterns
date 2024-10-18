import { Observable } from 'rxjs';
import grpc from '@grpc/grpc-js';
import { UserById } from '../models/user-by-id.model';
import { User } from '../models/user.model';

export interface UsersService {
  findOne(data: UserById, metadata?: grpc.Metadata): Observable<User>;
}
