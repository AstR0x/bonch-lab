import { join } from 'path';
import { Response } from 'express';
import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('*')
  get(@Res() res: Response) {
    res.sendFile(join(process.cwd(), '../client/dist/index.html'));
  }
}
