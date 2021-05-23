import { ApiProperty } from '@nestjs/swagger';

import { LabStatusEnum } from '../enums';

export class UpdateLabDto {
  @ApiProperty({ description: 'Идентификатор задачи' })
  task: string;

  @ApiProperty({ description: 'Идентификатор исполнителя' })
  executor: string;

  @ApiProperty({ description: 'Статус лабораторной работы' })
  status: LabStatusEnum;

  @ApiProperty({ description: 'Флаг загрузки отчёта' })
  isReportLoaded: boolean;
}
