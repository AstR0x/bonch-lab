import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UsersService } from 'src/users/users.service';

import { IGroup, IPopulatedGroup } from './interfaces';
import { CreateGroupDto, UpdateGroupDto } from './dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel('Groups') private readonly GroupsModel: Model<IGroup>,
    private readonly usersService: UsersService,
  ) {}

  async findGroups(): Promise<IGroup[]> {
    return this.GroupsModel.find().sort('name');
  }

  /**
   * Получение группы по идентификатору
   *
   * @param id - идентификатор группы
   * @param isPopulated - выдать группу с подробными полями ?
   * @returns промис с группой
   */
  async findGroupById(id: string, isPopulated?: boolean): Promise<IGroup> {
    const group = this.GroupsModel.findById(id);

    if (isPopulated) {
      return group.populate({
        path: 'students',
        select: '-password',
        populate: { path: 'labs' },
      });
    }

    return group;
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
  async deleteGroup(id: string) {
    const group = await this.GroupsModel.findById(id);

    await this.usersService.deleteManyUsers(group.students);

    return group.remove();
  }

  /**
   * Обновление группы
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
