import { Controller, Get, Query, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AutomationService } from '../Funnel/health-check.service';
import { Response } from 'express';

@Controller()
export class HealthCheckController {
  constructor(private readonly automationService: AutomationService) {}

  // Frontend check endpoint:
  // GET http://localhost:7410/health-check/frontend
  @Get('health-check/frontend')
  async checkFrontend() {
    return await this.automationService.checkFrontend();
  }

  // Conversion tunnel test endpoint:
  // GET http://localhost:7410/automation
  @Get('automation')
  async testConversionTunnel() {
    return await this.automationService.testConversionTunnelWithDomCheck();
  }

  // Screenshot endpoint:
  // GET http://localhost:7410/health-check/screenshot?url=...
  // If no URL is provided, a default URL is used.
  @Get('health-check/screenshot')
  async takeScreenshot(@Query('url') url: string, @Res() res: Response) {
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
