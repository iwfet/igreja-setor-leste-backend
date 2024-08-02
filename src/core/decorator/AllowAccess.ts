import { SetMetadata } from '@nestjs/common';

export const AllowAccess = () => SetMetadata('allowAccess', true);
