import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AutomationController } from './automation.controller';
import { AutomationService } from './automation.service';
import { LogsGateway } from '../gateway/logs.gateway';

@Module({
  imports: [HttpModule],
  controllers: [AutomationController],
  providers: [AutomationService, LogsGateway],
})
export class HealthCheckModule {}
