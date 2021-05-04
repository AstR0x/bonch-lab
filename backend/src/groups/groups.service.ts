import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { IGroup } from './interfaces/group.interface';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel('Groups') private readonly groupsModel: Model<IGroup>,
  ) {}

  async getGroupList(): Promise<IGroup[]> {
    return this.groupsModel.find().sort('name');
  }

  async getGroupById(id: string): Promise<IGroup> {
    return this.groupsModel.findById(id).populate('students', '-password');
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<IGroup> {
    const createdGroup = new this.groupsModel(createGroupDto);
    return createdGroup.save();
  }

  async deleteGroup(id: string): Promise<IGroup> {
    return this.groupsModel.findByIdAndRemove(id);
  }

  async updateGroup(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<IGroup> {
    return this.groupsModel.findByIdAndUpdate(id, updateGroupDto, {
      new: true,
    });
  }
}
