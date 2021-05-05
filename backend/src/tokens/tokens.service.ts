import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IUserToken } from './interfaces';
import { CreateUserTokenDto } from './dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel('Tokens') private readonly TokensModel: Model<IUserToken>,
  ) {}

  async create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
    const userToken = new this.TokensModel(createUserTokenDto);
    return userToken.save();
  }

  async delete(token: string): Promise<{ ok?: number; n?: number }> {
    return this.TokensModel.deleteOne({ token });
  }

  async deleteAll(uId: string): Promise<{ ok?: number; n?: number }> {
    return this.TokensModel.deleteMany({ uId });
  }

  async exists(uId: string, token: string): Promise<boolean> {
    return this.TokensModel.exists({ uId, token });
  }
}
