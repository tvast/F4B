import { Module } from '@nestjs/common';
import { CypressController } from './cypress.controller';
import { CypressService } from './cypress.service';

@Module({
  controllers: [CypressController],
  providers: [CypressService],
})
export class CypressModule {}
