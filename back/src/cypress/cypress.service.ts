import { Injectable, Logger } from '@nestjs/common';
import * as cypress from 'cypress';

@Injectable()
export class CypressService {
  private readonly logger = new Logger(CypressService.name);

  async runTests(): Promise<any> {
    this.logger.log('Starting Cypress tests...');
    try {
      // Adjust the spec path as needed (relative to your project root)
      const results = await cypress.run({
        spec: '../integration/mint_energie_dom_spec.js',
      });
      this.logger.log('Cypress tests completed successfully.');
      return results;
    } catch (error) {
      this.logger.error('Error running Cypress tests', error);
      throw error;
    }
  }
}
