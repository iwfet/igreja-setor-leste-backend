import { SetMetadata } from '@nestjs/common';

export const CheckAdmin = () => SetMetadata('admin', true);
