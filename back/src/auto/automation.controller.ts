import { Controller, Get, Query, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AutomationService } from './automation.service';
import { Response } from 'express';

@Controller()
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  // Route to trigger the frontend check
  // Matches: GET http://localhost:7410/health-check/frontend
  @Get('health-check/frontend')
  async checkFrontend() {
    return await this.automationService.checkFrontend();
  }

  // Route to trigger the conversion tunnel test
  // Matches: GET http://localhost:7410/automation
  @Get('automation')
  async testContestDomFormversionTunnel() {
    return await this.automationService.testDomForm();
  }

  // Route to trigger the screenshot functionality
  // Matches: GET http://localhost:7410/health-check/screenshot?url=...
  // If no "url" query parameter is provided, a default URL is used.
  @Get('health-check/screenshot')
  async takeScreenshot(@Query('url') url: string, @Res() res: Response) {
    // Provide a default URL if none is specified
    if (!url) {
      url = 'https://www.mint-energie.com/Pages/Accueil/accueil.aspx';
    }
    try {
      const screenshotBuffer = await this.automationService.takeScreenshot(url);
      res.set({
        'Content-Type': 'image/png',
        'Content-Length': screenshotBuffer.length,
      });
      res.end(screenshotBuffer);
    } catch (error) {
      throw new HttpException('Failed to take screenshot', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
