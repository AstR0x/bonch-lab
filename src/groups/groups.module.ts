import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { TokensModule } from 'src/tokens/tokens.module';

import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupSchema } from './schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Groups', schema: GroupSchema }]),
    forwardRef(() => AuthModule),
    TokensModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
