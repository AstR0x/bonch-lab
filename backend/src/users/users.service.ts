import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<IUser>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const createdUser = new this.usersModel(
      _.assignIn(createUserDto, { password: hash }),
    );
    return createdUser.save();
  }

  async find(id: string): Promise<IUser> {
    return this.usersModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.usersModel
      .findOne({ email })
      .populate('group', '-codeword -students')
      .exec();
  }

  async update(id: string, payload: Partial<IUser>) {
    return this.usersModel.updateOne({ _id: id }, payload);
  }
}
