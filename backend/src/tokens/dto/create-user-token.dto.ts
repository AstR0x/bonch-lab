import * as mongoose from 'mongoose';
import { IsString, IsDateString } from 'class-validator';

export class CreateUserTokenDto {
  @IsString()
  token: string;

  @IsString()
  uId: mongoose.Types.ObjectId;

  @IsDateString()
  expireAt: string;
}
