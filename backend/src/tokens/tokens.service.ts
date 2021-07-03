import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IToken } from './interfaces';
import { CreateUserTokenDto } from './dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel('Tokens') private readonly TokensModel: Model<IToken>,
  ) {}

  async createToken(createUserTokenDto: CreateUserTokenDto): Promise<IToken> {
    const userToken = new this.TokensModel(createUserTokenDto);
    return userToken.save();
  }

  async deleteToken(token: string): Promise<{ ok?: number; n?: number }> {
    return this.TokensModel.deleteOne({ token });
  }

  async deleteAllTokens(uId: string): Promise<{ ok?: number; n?: number }> {
    return this.TokensModel.deleteMany({ uId });
  }

  async exists(uId: string, token: string): Promise<boolean> {
    return this.TokensModel.exists({ uId, token });
  }
}
