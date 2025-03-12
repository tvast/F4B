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
    private readonly logsGateway: LogsGateway,
  ) {}

  private logAndEmit(message: string): void {
    this.logger.log(message);
    this.logsGateway.sendLog(message);
  }

  // Dummy frontend check implementation
  async checkFrontend(): Promise<{ success: boolean; message: string }> {
    this.logAndEmit('Performing frontend check...');
    try {
      // Your actual logic could be an HTTP request or similar.
      return { success: true, message: 'Frontend is operational.' };
    } catch (error) {
      return { success: false, message: 'Frontend check failed.' };
    }
  }

  // Conversion tunnel test implementation
  async testconvertiontunnel(): Promise<string> {
    this.logAndEmit('Starting test conversion tunnel automation...');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900 });

    try {
      await page.goto('https://www.mint-energie.com/Pages/Accueil/accueil.aspx', { waitUntil: 'networkidle2' });
      this.logAndEmit('Navigated to Mint Énergie homepage.');
      // ... your additional automation steps ...
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

  async testDomForm(): Promise<string> {
    this.logAndEmit('Starting test conversion tunnel with DOM check...');
    const url = 'https://www.mint-energie.com/Pages/Accueil/accueil.aspx';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900 });
  
    // Helper function to generate a random string
    const randomString = () => Math.random().toString(36).substring(2, 10);
  
    try {
      // Navigate to homepage and check metadata
      await page.goto(url, { waitUntil: 'networkidle2' });
      const title = await page.title();
      if (!title.includes('Mint Énergie')) {
        throw new Error("Le titre de la page ne contient pas 'Mint Énergie'");
      }
      const metaViewport = await page.$("meta[name='viewport']");
      if (!metaViewport) {
        throw new Error("La balise meta viewport est absente");
      }
      this.logAndEmit('Étape 1 validée : En-tête et métadonnées corrects.');
  
      // Click on the subscription button to access the form
      const souscrireButton = await page.$('#header1_LB_Souscription');
      if (!souscrireButton) {
        throw new Error("Le bouton 'Souscrire' avec l'id 'header1_LB_Souscription' est manquant.");
      }
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        souscrireButton.click()
      ]);
      this.logAndEmit("Bouton 'Souscrire' cliqué et le formulaire est chargé.");
  
      // DOM Check - Step 2: Validate key form fields existence
      const firstnameField = await page.$('#TB_Firstname');
      if (!firstnameField) {
        throw new Error("Le champ 'Prénom' est manquant.");
      }
      const lastnameField = await page.$('#TB_Lastname');
      if (!lastnameField) {
        throw new Error("Le champ 'Nom' est manquant.");
      }
      const addCustomerBtn = await page.$('#LB_AddOtherCustomer');
      if (!addCustomerBtn) {
        throw new Error("Le bouton d'ajout de second titulaire est introuvable.");
      }
      this.logAndEmit('Étape 2 validée : Champs du formulaire de coordonnées trouvés.');
  
      // DOM Check - Step 3: Validate radio options for contract type and situation
      const radioElec = await page.$('#RB_ELEC');
      const radioGaz = await page.$('#RB_GAZ');
      if (!radioElec || !radioGaz) {
        throw new Error("Les boutons radio pour le type de contrat (Électricité/Gaz) sont manquants.");
      }
      const radioCDF = await page.$('#RB_CDF');
      const radioMES = await page.$('#RB_MES');
      if (!radioCDF || !radioMES) {
        throw new Error("Les boutons radio pour la situation (changement de fournisseur / emménagement) sont manquants.");
      }
      this.logAndEmit('Étape 3 validée : Options de contrat et situation présentes.');
  
      // DOM Check - Step 4: Validate complementary elements (e.g., "Avis clients" section)
      const avisTextFound = await page.evaluate(() => {
        const h2Elements = Array.from(document.querySelectorAll('h2'));
        return h2Elements.some(el => el.textContent && el.textContent.includes('Avis clients'));
      });
      if (!avisTextFound) {
        throw new Error("La section 'Avis clients' n'est pas trouvée.");
      }
      this.logAndEmit('Étape 4 validée : Éléments complémentaires correctement affichés.');
  
      // DOM Check - Step 5: Validate subscription button again
      const souscrireButtonAgain = await page.$('#header1_LB_Souscription');
      if (!souscrireButtonAgain) {
        throw new Error("Le bouton 'Souscrire' avec l'id 'header1_LB_Souscription' est manquant.");
      }
      this.logAndEmit("Étape 5 validée : Bouton 'Souscrire' présent.");
  
      // --- Now simulate real user input on the form fields ---
  
      // Fill in First Name
      await page.focus('#TB_Firstname');
      const firstNameInput = randomString();
      await page.keyboard.type(firstNameInput);
      const firstNameValue = await page.$eval('#TB_Firstname', el => (el as HTMLInputElement).value);
      console.log('First name field value:', firstNameValue);
  
      // Fill in Last Name
      await page.focus('#TB_Lastname');
      const lastNameInput = randomString();
      await page.keyboard.type(lastNameInput);
      const lastNameValue = await page.$eval('#TB_Lastname', el => (el as HTMLInputElement).value);
      console.log('Last name field value:', lastNameValue);
  
      // Fill in Email if present
      const emailField = await page.$('#TB_Email');
      if (emailField) {
        await page.focus('#TB_Email');
        const emailInput = randomString() + '@test.com';
        await page.keyboard.type(emailInput);
        const emailValue = await page.$eval('#TB_Email', el => (el as HTMLInputElement).value);
        console.log('Email field value:', emailValue);
      }
  
      // Fill in Mobile Phone if present
      const phoneField = await page.$('#TB_CliMob');
      if (phoneField) {
        await page.focus('#TB_CliMob');
        const phoneInput = '0612345678';
        await page.keyboard.type(phoneInput);
        const phoneValue = await page.$eval('#TB_CliMob', el => (el as HTMLInputElement).value);
        console.log('Mobile phone field value:', phoneValue);
      }
  
      // Select a random option in the civility dropdown
      const civilityOptions = await page.$$eval('#DDL_Civility option', options =>
        options.map(o => o.value).filter(v => v)
      );
      if (civilityOptions.length > 0) {
        const randomCivility = civilityOptions[Math.floor(Math.random() * civilityOptions.length)];
        await page.select('#DDL_Civility', randomCivility);
        const civilityValue = await page.$eval('#DDL_Civility', el => (el as HTMLSelectElement).value);
        console.log('Civility selected value:', civilityValue);
      }
  
      // Fill in Promotional Code if present
      const promoField = await page.$('#TB_PromoCode');
      if (promoField) {
        await page.focus('#TB_PromoCode');
        const promoInput = randomString();
        await page.keyboard.type(promoInput);
        const promoValue = await page.$eval('#TB_PromoCode', el => (el as HTMLInputElement).value);
        console.log('Promo code field value:', promoValue);
      }
  
      this.logAndEmit('Form fields populated with random values via user-like interactions.');
  
      // Submit the form
      await page.waitForSelector('#BT_SUBMIT', { timeout: 5000 });
      await page.click('#BT_SUBMIT');
      this.logAndEmit('Clicked on submit.');
  
      // Fill in the address field
      await page.waitForSelector('#TB_Address1', { timeout: 5000 });
      await page.focus('#TB_Address1');
      const addressInput = '17 rue des ragondins';
      await page.keyboard.type(addressInput);
      const addressValue = await page.$eval('#TB_Address1', el => (el as HTMLInputElement).value);
      console.log('Address field value:', addressValue);
      this.logAndEmit('Address field populated.');
  
      this.logAndEmit('Conversion tunnel with DOM check completed successfully!');
      await this.sendMonitoringPing(true, 'Conversion tunnel with DOM check test succeeded.');
      return 'Test conversion tunnel with DOM check completed successfully.';
    } catch (error) {
      console.error('Error in conversion tunnel with DOM check:', error);
      await this.sendMonitoringPing(false, error.message || 'Error during conversion tunnel test with DOM check');
      throw error;
    } finally {
      await browser.close();
      this.logAndEmit('Browser fermé après test du DOM.');
    }
  }
  
  

  // Screenshot implementation using Puppeteer
  async takeScreenshot(url: string): Promise<Buffer> {
    this.logAndEmit(`Taking screenshot of ${url}...`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const screenshotBuffer = (await page.screenshot({ type: 'png' })) as Buffer;
    await browser.close();
    this.logAndEmit('Screenshot taken.');
    return screenshotBuffer;
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
