import { Module } from '@nestjs/common';
import { PupetModule } from './pupetMaster/pupet.module'; // or import your pupet module if that's where PupetService is registered
import { LogsGateway } from './gateway/logs.gateway';

@Module({
  imports: [PupetModule],
  providers: [LogsGateway],
})
export class AppModule {}
