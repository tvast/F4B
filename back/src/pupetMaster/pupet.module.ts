import { Module } from '@nestjs/common';
import { PupetService } from './pupet.service';
import { AutomationController } from './pupet.controller';
import { LogsGateway } from '../gateway/logs.gateway';

@Module({
  controllers: [AutomationController],
  providers: [PupetService, LogsGateway],
  exports: [PupetService],
})
export class PupetModule {}
