// automation.controller.ts
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PupetService } from './pupet.service';

@Controller('automation')
export class AutomationController {
  constructor(private readonly pupetService: PupetService) {}

  @Get('start')
  async startAutomation() {
    console.log("startAutomation route triggered");
    try {
      const message = await this.pupetService.runInterfaceTest();
      return { sessionId: 'dummy-session', message };
    } catch (error) {
      console.error("Automation error:", error);
      throw new HttpException(
        'Erreur lors de l\'exécution de l\'automation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  
}
