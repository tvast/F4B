import { Module } from '@nestjs/common';
import { HealthCheckModule } from './Funnel/health-check.module'; // Adjust path if necessary
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CypressModule } from './cypress/cypress.module';
@Module({
  imports: [HealthCheckModule,CypressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
