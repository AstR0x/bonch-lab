import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IUserToken } from './interfaces/user-token.interface';
import { CreateUserTokenDto } from './dto/create-user-token.dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel('Tokens') private readonly tokensModel: Model<IUserToken>,
  ) {}

  async create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
    const userToken = new this.tokensModel(createUserTokenDto);
    return await userToken.save();
  }

  async delete(token: string): Promise<{ ok?: number, n?: number }> {
    return await this.tokensModel.deleteOne({ token });
  }

  async deleteAll(uId: string): Promise<{ ok?: number, n?: number }> {
    return await this.tokensModel.deleteMany({ uId });
  }

  async exists(uId: string, token: string): Promise<boolean> {
    return await this.tokensModel.exists({ uId, token });
  }
}
