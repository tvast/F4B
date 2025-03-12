import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckController } from './health-check.controller';
import { AutomationService } from '../Funnel/health-check.service';
import { LogsGateway } from '../gateway/logs.gateway';

@Module({
  imports: [HttpModule],
  controllers: [HealthCheckController],
  providers: [AutomationService, LogsGateway],
})
export class HealthCheckModule {}
