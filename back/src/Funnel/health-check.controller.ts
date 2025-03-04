import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { HealthCheckService } from './health-check.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  /**
   * Test du tunnel de conversion
   */
  @Post('test-conversion-tunnel')
  @ApiOperation({ summary: 'Exécute le test du tunnel de conversion avec Puppeteer.' })
  @ApiResponse({ status: 200, description: 'Test exécuté avec succès.' })
  async testConversionTunnel(): Promise<{ message: string }> {
    await this.healthCheckService.testConversionTunnel();
    return { message: 'Test du tunnel de conversion exécuté' };
  }

  /**
   * Capture d'écran d'une URL donnée
   */
  @Get('screenshot')
  @ApiOperation({ summary: 'Capture d’écran d’une URL donnée.' })
  @ApiResponse({ status: 200, description: 'Image PNG capturée.' })
  async takeScreenshot(@Res() res: Response) {
    const screenshot = await this.healthCheckService.takeScreenshot('https://www.mint-energie.com/Pages/Souscription/coordonnees.aspx');
    res.set('Content-Type', 'image/png');
    res.send(screenshot);
  }

  /**
   * Vérification de l'affichage du frontend de la page de souscription.
   */
  @Get('frontend')
  @ApiOperation({ summary: 'Vérifie l\'affichage du frontend de la page Souscription.' })
  @ApiResponse({ status: 200, description: 'Résultat de la vérification du frontend.' })
  async checkFrontend(): Promise<{ success: boolean; message: string }> {
    return await this.healthCheckService.checkFrontend();
  }
}
