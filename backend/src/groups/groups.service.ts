import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IGroup } from './interfaces';
import { CreateGroupDto, UpdateGroupDto } from './dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel('Groups') private readonly GroupsModel: Model<IGroup>,
  ) {}

  async getGroupList(): Promise<IGroup[]> {
    return this.GroupsModel.find().sort('name');
  }

  /**
   * Получение группы по идентификатору
   *
   * @param id - идентификатор группы
   * @returns промис с группой
   */
  async getGroupById(id: string): Promise<IGroup> {
    return this.GroupsModel.findById(id).populate({
      path: 'students',
      select: '-password',
      populate: { path: 'labs' },
    });
  }

  /**
   * Создание группы
   *
   * @param createGroupDto - данные, создаваемой группы
   * @returns промис с созданной группой
   */
  async createGroup(createGroupDto: CreateGroupDto): Promise<IGroup> {
    const createdGroup = new this.GroupsModel(createGroupDto);
    return createdGroup.save();
  }

  /**
   * Удаление группы
   *
   * @param id - идентификатор группы
   * @returns промис с удалённой группой
   */
  async deleteGroup(id: string): Promise<IGroup> {
    return this.GroupsModel.findByIdAndRemove(id);
  }

  /**
   * Обновление группы
   *
   *
   * @param id - идентификатор группы
   * @param updateGroupDto - данные обновлённой группы
   * @returns промис с обновлённой группой
   */
  async updateGroup(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<IGroup> {
    return this.GroupsModel.findByIdAndUpdate(id, updateGroupDto, {
      new: true,
    });
  }
}
