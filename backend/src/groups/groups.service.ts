import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateGroupDto, UpdateGroupDto } from './dto';
import { IGroup } from './interfaces';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel('Groups') private readonly GroupsModel: Model<IGroup>,
  ) {}

  async getGroupList(): Promise<IGroup[]> {
    return this.GroupsModel.find().sort('name');
  }

  async getGroupById(id: string): Promise<IGroup> {
    return this.GroupsModel.findById(id).populate('students', '-password');
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<IGroup> {
    const createdGroup = new this.GroupsModel(createGroupDto);
    return createdGroup.save();
  }

  async deleteGroup(id: string): Promise<IGroup> {
    return this.GroupsModel.findByIdAndRemove(id);
  }

  async updateGroup(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<IGroup> {
    return this.GroupsModel.findByIdAndUpdate(id, updateGroupDto, {
      new: true,
    });
  }
}
