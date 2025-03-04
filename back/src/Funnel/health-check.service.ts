import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as puppeteer from 'puppeteer';
import * as os from 'os';

@Injectable()
export class HealthCheckService implements OnModuleInit {
  private browser: puppeteer.Browser;

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    // Lancement de Puppeteer au démarrage du module
    this.browser = await puppeteer.launch();
  }

  /**
   * Capture d'écran d'une URL donnée
   */
  async takeScreenshot(url: string): Promise<Buffer> {
    const page = await this.browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const screenshot = await page.screenshot();
    await page.close();
    return Buffer.from(screenshot);
  }

  /**
   * Test du tunnel de conversion avec Puppeteer.
   * En cas d'erreur, envoie un ping d'erreur vers la supervision.
   */
  async testConversionTunnel(): Promise<void> {
    const page = await this.browser.newPage();
    try {
      await page.goto('https://www.mint-energie.com/Pages/Souscription/coordonnees.aspx', { waitUntil: 'networkidle0' });
      await page.click('#header_LB_Souscription');
      await page.type('#TB_Firstname', 'test');
      await page.type('#TB_Email', 'test@mint.eco');
      // Vous pouvez adapter ce scénario en fonction des actions spécifiques de votre tunnel de conversion
      await page.waitForSelector('#BT_SUBMIT', { timeout: 5000 });
      console.log('Conversion Step Completed Successfully!');
    } catch (error) {
      console.error('Error in conversion tunnel test:', error);
      await this.sendMonitoringPing(false, error.message || 'Erreur lors du test de conversion');
    } finally {
      await page.close();
    }
  }

  /**
   * Vérification automatique du frontend de la page de souscription.
   * Contrôle la présence des éléments essentiels du DOM (Prénom, Nom, Email, Bouton de validation)
   * et envoie un ping indiquant si la page s'affiche correctement ou non.
   
  async checkFrontend(): Promise<{ success: boolean; message: string }> {
    const page = await this.browser.newPage();
    try {
      await page.goto('https://www.mint-energie.com/Pages/Souscription/coordonnees.aspx', { waitUntil: 'networkidle0' });
      // Vérification des éléments essentiels du DOM
      await page.waitForSelector('input#TB_Firstname', { timeout: 5000 });
      await page.waitForSelector('input#TB_Lastname', { timeout: 5000 });
      await page.waitForSelector('input#TB_Email', { timeout: 5000 });
      await page.waitForSelector('input#BT_SUBMIT', { timeout: 5000 });
      const title = await page.title();
      const successMessage = `Frontend correctement affiché. Titre de la page : ${title}`;
      
      // Envoi d'un ping de succès
      await this.sendMonitoringPing(true, successMessage);
      return { success: true, message: successMessage };
    } catch (error) {
      const errorMessage = error.message || 'Erreur inconnue lors de la vérification du frontend';
      // Envoi d'un ping d'erreur
      await this.sendMonitoringPing(false, errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      await page.close();
    }
  }
*/
  /**
 * Vérification automatique du frontend de la page de souscription.
 * Contrôle la présence des trois volets du formulaire :
 * - Coordonnées (section #PNL_CUSTOMER avec les inputs TB_Firstname, TB_Lastname, TB_Email)
 * - Type de contrat (section #PNL_ENERGY avec les radio inputs RB_ELEC et RB_GAZ)
 * - Votre situation (section #PNL_SUB_TYPE avec les radio inputs RB_CDF et RB_MES)
 * Envoie un ping indiquant si la page s'affiche correctement ou non.
 */
async checkFrontend(): Promise<{ success: boolean; message: string }> {
    const page = await this.browser.newPage();
    try {
      await page.goto('https://www.mint-energie.com/Pages/Souscription/coordonnees.aspx', { waitUntil: 'networkidle0' });
  
      // Vérification du volet Coordonnées
      await page.waitForSelector('#PNL_CUSTOMER', { timeout: 5000 });
      await page.waitForSelector('input#TB_Firstname', { timeout: 5000 });
      await page.waitForSelector('input#TB_Lastname', { timeout: 5000 });
      await page.waitForSelector('input#TB_Email', { timeout: 5000 });
  
      // Vérification du volet Type de contrat
      await page.waitForSelector('#PNL_ENERGY', { timeout: 5000 });
      await page.waitForSelector('input#RB_ELEC', { timeout: 5000 });
      await page.waitForSelector('input#RB_GAZ', { timeout: 5000 });
  
      // Vérification du volet Votre situation
      await page.waitForSelector('#PNL_SUB_TYPE', { timeout: 5000 });
      await page.waitForSelector('input#RB_CDF', { timeout: 5000 });
      await page.waitForSelector('input#RB_MES', { timeout: 5000 });
  
      const title = await page.title();
      const successMessage = `Frontend correctement affiché. Titre de la page : ${title}`;
      await this.sendMonitoringPing(true, successMessage);
      return { success: true, message: successMessage };
    } catch (error) {
      const errorMessage = error.message || 'Erreur inconnue lors de la vérification du frontend';
      await this.sendMonitoringPing(false, errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      await page.close();
    }
  }
  

  /**
   * Envoi d'un ping vers la supervision avec une requête POST adaptée.
   * Le payload est adapté en fonction de la réussite (success = true) ou de l'erreur (success = false).
   */
  async sendMonitoringPing(success: boolean, details: string): Promise<void> {
    const now = new Date().toISOString();
    const payload = {
      criticality: success ? "Information" : "Critique",
      data: { message: details },
      dependencies: "Puppeteer",
      description: "Vérification du frontend de la page de souscription",
      endDate: now,
      environment: "production",
      error: success ? null : { message: details },
      hasNetworkAccess: true,
      location: __dirname, // chemin d'accès de l'application
      name: "FrontendCheck",
      nextExecutionStartDate: now,
      processId: process.pid.toString(),
      schedule: "on-demand",
      serverName: os.hostname(),
      serverStartDate: now,
      startDate: now,
      technology: "Node.js & Puppeteer"
    };

    try {
      await this.httpService
        .post('http://supervision.mint.eco/supervision/events', payload)
        .toPromise();
      console.log('Ping envoyé avec succès vers la supervision.');
    } catch (pingError) {
      console.error('Erreur lors de l’envoi du ping:', pingError);
    }
  }
}
