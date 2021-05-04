import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokensService } from './tokens.service';
import { TokenSchema } from './schemas/user-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tokens', schema: TokenSchema }]),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
