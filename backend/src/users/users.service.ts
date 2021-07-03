import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { TokensService } from 'src/tokens/tokens.service';
import { GroupsService } from 'src/groups/groups.service';
import { LabsService } from 'src/labs/labs.service';

import { CreateUserDto } from './dto';
import { IUser } from './interfaces';
import { RoleEnum } from './enums';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel('Users') private readonly UsersModel: Model<IUser>,
    @Inject(forwardRef(() => GroupsService))
    private readonly groupsService: GroupsService,
    private readonly labsService: LabsService,
    private readonly tokensService: TokensService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const createdUser = new this.UsersModel(
      _.assignIn(createUserDto, { password: hash }),
    );
    return createdUser.save();
  }

  async findUserById(id: string): Promise<IUser> {
    return this.UsersModel.findById(id).exec();
  }

  async findUserByEmail(email: string): Promise<IUser> {
    return this.UsersModel.findOne({ email })
      .populate('group', '-codeword -students')
      .exec();
  }

  async updateUser(id: string, payload: Partial<IUser>) {
    return this.UsersModel.updateOne({ id }, payload);
  }

  async deleteUser(id: string) {
    const user = await this.UsersModel.findById(id);

    if (user.role === RoleEnum.Student) {
      const group = await this.groupsService.findGroupById(user.group);

      group.students = group.students.filter(
        (student) => !user._id.equals(student),
      );

      await group.save();
    }

    await this.tokensService.deleteAllTokens(user._id);

    await this.labsService.deleteManyLabs(user.labs);

    return user.remove();
  }

  async deleteManyUsers(ids: string[]) {
    await Promise.all(ids.map((id) => this.deleteUser(id)));
  }
}
