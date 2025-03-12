import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as os from 'os';
import { HttpService } from '@nestjs/axios';
import { LogsGateway } from '../gateway/logs.gateway';

@Injectable()
export class AutomationService {
  private readonly logger = new Logger(AutomationService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly logsGateway: LogsGateway, // Inject the gateway
  ) {}

  // Helper to log to the console and emit to the front end
  private logAndEmit(message: string): void {
    this.logger.log(message);
    this.logsGateway.sendLog(message);
  }

  async testconvertiontunnel(): Promise<string> {
    this.logAndEmit('Starting test conversion tunnel automation...');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900 });

    try {
      // Navigate to the homepage
      await page.goto('https://www.mint-energie.com/Pages/Accueil/accueil.aspx', { waitUntil: 'networkidle2' });
      this.logAndEmit('Navigated to Mint Énergie homepage.');

      // Accept cookies if present
      try {
        await page.waitForSelector('#axeptio_btn_acceptAll', { visible: true, timeout: 5000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.evaluate(() => {
          const btn = document.querySelector('#axeptio_btn_acceptAll');
          if (btn) btn.scrollIntoView();
        });
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle0' }),
          page.click('#axeptio_btn_acceptAll'),
        ]);
        this.logAndEmit('Cookie accepted and page reloaded.');
      } catch (err) {
        this.logAndEmit('Cookie accept button not found or not clickable. Moving to next step...');
      }

      // Wait for and click on subscription link
      await page.waitForSelector('#header1_LB_Souscription', { visible: true, timeout: 60000 });
      const content = await page.content();
      console.log(content);
      await page.screenshot({ path: 'debug.png' });
      await page.evaluate(() => {
        const link = document.querySelector('#header1_LB_Souscription');
        if (link) link.scrollIntoView();
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      try {
        await page.evaluate(() => {
          const link = document.querySelector('#header1_LB_Souscription');
          if (link instanceof HTMLElement) {
            link.click();
          }
        });
        this.logAndEmit('Clicked on subscription link.');
      } catch (err) {
        this.logger.error('Error clicking subscription link:', err);
        this.logsGateway.sendLog(`Error clicking subscription link: ${err}`);
      }

      // Wait for form inputs to load
      await page.waitForSelector('input', { visible: true });
      this.logAndEmit('Form inputs loaded.');

      // Populate form fields with random values
      await page.evaluate(() => {
        const randomString = () => Math.random().toString(36).substring(2, 10);
        document.querySelectorAll('input[type="text"]').forEach((input: HTMLInputElement) => {
          input.value = randomString();
          input.dispatchEvent(new Event('input', { bubbles: true }));
        });
        document.querySelectorAll('select').forEach((select: HTMLSelectElement) => {
          const options = Array.from(select.options);
          if (options.length > 0) {
            const randomIndex = Math.floor(Math.random() * options.length);
            select.value = options[randomIndex].value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      });
      this.logAndEmit('Form fields populated with random values.');

      // Click submit
      await page.waitForSelector('#BT_SUBMIT', { timeout: 5000 });
      await page.click('#BT_SUBMIT');
      this.logAndEmit('Clicked on submit.');

      // Fill in address field
      await page.waitForSelector('#TB_Address1', { timeout: 5000 });
      await page.type('#TB_Address1', '17 rue des ragondins');
      this.logAndEmit('Address populated.');

      this.logAndEmit('Conversion Step Completed Successfully!');
      return 'Test conversion tunnel completed successfully.';
    } catch (error) {
      console.error('Error in conversion tunnel test:', error);
      await this.sendMonitoringPing(false, error.message || 'Erreur lors du test de conversion');
      throw error;
    } finally {
      await browser.close();
      this.logAndEmit('Browser closed. Test conversion tunnel automation completed.');
    }
  }

  async sendMonitoringPing(success: boolean, details: string): Promise<void> {
    const now = new Date().toISOString();
    const payload = {
      criticality: success ? 'Information' : 'Critique',
      data: { message: details },
      dependencies: 'Puppeteer',
      description: 'Vérification du frontend de la page de souscription',
      endDate: now,
      environment: 'production',
      error: success ? null : { message: details },
      hasNetworkAccess: true,
      location: __dirname,
      name: 'FrontendCheck',
      nextExecutionStartDate: now,
      processId: process.pid.toString(),
      schedule: 'on-demand',
      serverName: os.hostname(),
      serverStartDate: now,
      startDate: now,
      technology: 'Node.js & Puppeteer',
    };

    try {
      await this.httpService
        .post('http://supervision.mint.eco/supervision/events', payload)
        .toPromise();
      console.log('Ping successfully sent to monitoring.');
    } catch (pingError) {
      console.error('Error sending ping:', pingError);
    }
  }
}
