import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenSchema } from './schemas';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tokens', schema: TokenSchema }]),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
