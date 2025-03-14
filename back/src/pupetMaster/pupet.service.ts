// // pupet.service.ts
// import { Injectable, Logger } from '@nestjs/common';
// import pupetConfig from './pupet.config';
// import { LogsGateway } from '../gateway/logs.gateway';

// @Injectable()
// export class PupetService {
//   private readonly logger = new Logger(PupetService.name);
//   private readonly config = pupetConfig;

//   constructor(private readonly socketGateway: LogsGateway) {
//     this.logger.log('Configuration pupet chargée avec succès.');
//     // Notifier immédiatement que la configuration est chargée
//     setTimeout(() => {
//       if (this.socketGateway.server) {
//         this.socketGateway.server.emit('pupetConfigLoaded', this.config);
//         this.logger.log('Événement "pupetConfigLoaded" émis via Socket.IO.');
//       } else {
//         this.logger.error('Le serveur Socket.IO n’est pas encore initialisé.');
//       }
//     }, 0);
//   }

//   getConfig(): any {
//     return this.config;
//   }

//   async runInterfaceTest(): Promise<string> {
//     this.logger.log('Début de l’exécution du test d’interface.');
//     const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//     if (!this.config.steps || !Array.isArray(this.config.steps)) {
//       const errorMsg = 'Aucune étape trouvée dans la configuration pupet.';
//       this.logger.error(errorMsg);
//       this.socketGateway.sendLog(errorMsg);
//       return errorMsg;
//     }

//     // Pour chaque étape de la configuration, construire et envoyer un message détaillé
//     for (let i = 0; i < this.config.steps.length; i++) {
//       const step = this.config.steps[i];
//       let verboseMessage = `Étape ${i + 1}: Exécution de l’action de type "${step.type}"`;

//       // Ajout de détails supplémentaires selon le type d'action
//       switch (step.type) {
//         case 'setViewport':
//           verboseMessage += ` avec largeur=${step.width}, hauteur=${step.height}, deviceScaleFactor=${step.deviceScaleFactor}, isMobile=${step.isMobile}`;
//           break;
//         case 'navigate':
//           verboseMessage += ` vers l'URL "${step.url}"`;
//           if (step.assertedEvents && step.assertedEvents.length > 0) {
//             verboseMessage += ` | Événements attendus: ${JSON.stringify(step.assertedEvents)}`;
//           }
//           break;
//         case 'click':
//           verboseMessage += ` sur la cible "${step.target}" avec sélecteurs=${JSON.stringify(step.selectors)}`;
//           if (step.offsetX !== undefined && step.offsetY !== undefined) {
//             verboseMessage += ` et offsets (X=${step.offsetX}, Y=${step.offsetY})`;
//           }
//           if (step.assertedEvents && step.assertedEvents.length > 0) {
//             verboseMessage += ` | Événements attendus: ${JSON.stringify(step.assertedEvents)}`;
//           }
//           break;
//         case 'change':
//           verboseMessage += ` sur la cible "${step.target}" avec sélecteurs=${JSON.stringify(step.selectors)} et valeur="${step.value}"`;
//           break;
//         case 'doubleClick':
//           verboseMessage += ` sur la cible "${step.target}" avec sélecteurs=${JSON.stringify(step.selectors)} et offsets (X=${step.offsetX}, Y=${step.offsetY})`;
//           break;
//         case 'keyUp':
//           verboseMessage += ` avec la touche "${step.key}" sur la cible "${step.target}"`;
//           break;
//         default:
//           verboseMessage += ` | Détails: ${JSON.stringify(step)}`;
//           break;
//       }

//       // Envoyer le message en mode verbose via Socket.IO
//       this.logger.log(verboseMessage);
//       this.socketGateway.sendLog(verboseMessage);

//       // Simuler un délai pour visualiser chaque étape (par exemple 1 seconde)
//       await delay(1000);
//     }

//     const result = 'Test d’automatisation exécuté avec succès !';
//     this.logger.log(result);
//     this.socketGateway.sendLog(result);
//     return result;
//   }
// }
import { Injectable, Logger } from '@nestjs/common';
import pupetConfig from './pupet.config';
import { LogsGateway } from '../gateway/logs.gateway';

@Injectable()
export class PupetService {
  private readonly logger = new Logger(PupetService.name);
  private readonly config = pupetConfig;

  constructor(private readonly socketGateway: LogsGateway) {
    this.logger.log('Configuration pupet chargée avec succès.');
    // Notify immediately that the pupet configuration has been loaded
    setTimeout(() => {
      if (this.socketGateway.server) {
        this.socketGateway.server.emit('pupetConfigLoaded', this.config);
        this.logger.log('Événement "pupetConfigLoaded" émis via Socket.IO.');
      } else {
        this.logger.error('Le serveur Socket.IO n’est pas encore initialisé.');
      }
    }, 0);
  }

  getConfig(): any {
    return this.config;
  }

  async runInterfaceTest(): Promise<string> {
    this.logger.log('Début de l’exécution du test d’interface.');
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (!this.config.steps || !Array.isArray(this.config.steps)) {
      const errorMsg = 'Aucune étape trouvée dans la configuration pupet.';
      this.logger.error(errorMsg);
      this.socketGateway.sendLog({ error: errorMsg });
      return errorMsg;
    }

    // Process each step by building and sending a structured log object
    for (let i = 0; i < this.config.steps.length; i++) {
      const step = this.config.steps[i];

      // Build the base log object
      const stepLog: any = {
        stepNumber: i + 1,
        type: step.type,
        message: `Étape ${i + 1}: Exécution de l’action de type "${step.type}"`,
        details: {},
      };

      // Customize details and message based on the step type
      switch (step.type) {
        case 'setViewport':
          stepLog.details = {
            width: step.width,
            height: step.height,
            deviceScaleFactor: step.deviceScaleFactor,
            isMobile: step.isMobile,
          };
          stepLog.message += ` avec largeur=${step.width}, hauteur=${step.height}, deviceScaleFactor=${step.deviceScaleFactor}, isMobile=${step.isMobile}`;
          break;
        case 'navigate':
          stepLog.details = {
            url: step.url,
            assertedEvents: step.assertedEvents || [],
          };
          stepLog.message += ` vers l'URL "${step.url}"`;
          if (step.assertedEvents && step.assertedEvents.length > 0) {
            stepLog.message += ` | Événements attendus: ${JSON.stringify(step.assertedEvents)}`;
          }
          break;
        case 'click':
          stepLog.details = {
            target: step.target,
            selectors: step.selectors,
            offsetX: step.offsetX,
            offsetY: step.offsetY,
            assertedEvents: step.assertedEvents || [],
          };
          stepLog.message += ` sur la cible "${step.target}" avec sélecteurs=${JSON.stringify(step.selectors)}`;
          if (step.offsetX !== undefined && step.offsetY !== undefined) {
            stepLog.message += ` et offsets (X=${step.offsetX}, Y=${step.offsetY})`;
          }
          if (step.assertedEvents && step.assertedEvents.length > 0) {
            stepLog.message += ` | Événements attendus: ${JSON.stringify(step.assertedEvents)}`;
          }
          break;
        case 'change':
          stepLog.details = {
            target: step.target,
            selectors: step.selectors,
            value: step.value,
          };
          stepLog.message += ` sur la cible "${step.target}" avec sélecteurs=${JSON.stringify(step.selectors)} et valeur="${step.value}"`;
          break;
        case 'doubleClick':
          stepLog.details = {
            target: step.target,
            selectors: step.selectors,
            offsetX: step.offsetX,
            offsetY: step.offsetY,
          };
          stepLog.message += ` sur la cible "${step.target}" avec sélecteurs=${JSON.stringify(step.selectors)} et offsets (X=${step.offsetX}, Y=${step.offsetY})`;
          break;
        case 'keyUp':
          stepLog.details = {
            target: step.target,
            key: step.key,
          };
          stepLog.message += ` avec la touche "${step.key}" sur la cible "${step.target}"`;
          break;
        default:
          stepLog.details = step;
          stepLog.message += ` | Détails: ${JSON.stringify(step)}`;
          break;
      }

      // Log the message in the server and send the structured log via Socket.IO
      this.logger.log(stepLog.message);
      this.socketGateway.sendLog(stepLog);

      // Simulate a delay for visualization (e.g., 1 second)
      await delay(1000);
    }

    const result = 'Test d’automatisation exécuté avec succès !';
    this.logger.log(result);
    this.socketGateway.sendLog({ message: result, final: true });
    return result;
  }
}
