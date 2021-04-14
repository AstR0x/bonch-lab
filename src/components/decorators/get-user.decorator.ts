import { createParamDecorator } from '@nestjs/common';

import { IUser } from 'src/users/interfaces/user.interface';

export const GetUser = createParamDecorator((req): IUser => req.user);
