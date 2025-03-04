import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckService } from './health-check.service';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [HttpModule],
  providers: [HealthCheckService],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
