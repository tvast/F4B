import { Controller, Get } from '@nestjs/common';
import { CypressService } from './cypress.service';

@Controller('cypress')
export class CypressController {
  constructor(private readonly cypressService: CypressService) {}

  @Get('run')
  async runCypressTests() {
    const results = await this.cypressService.runTests();
    return results;
  }
}
