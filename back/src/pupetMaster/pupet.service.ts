// pupet.service.ts
import { Injectable, Logger } from '@nestjs/common';
import pupetConfig from './pupet.config';
import { LogsGateway } from '../gateway/logs.gateway';

@Injectable()
export class PupetService {
  private readonly logger = new Logger(PupetService.name);
  private readonly config = pupetConfig;

  constructor(private readonly socketGateway: LogsGateway) {
    this.logger.log('Configuration pupet chargée avec succès.');
    // Notifier immédiatement que la configuration est chargée
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
      this.socketGateway.sendLog(errorMsg);
      return errorMsg;
    }

    // Pour chaque étape de la configuration, construire et envoyer un message détaillé
    for (let i = 0; i < this.config.steps.length; i++) {
      const step = this.config.steps[i];
      let verboseMessage = `Étape ${i + 1}: Exécution de l’action de type "${step.type}"`;

      // Ajout de détails supplémentaires selon le type d'action
      switch (step.type) {
        case 'setViewport':
          verboseMessage += ` avec largeur=${step.width}, hauteur=${step.height}, deviceScaleFactor=${step.deviceScaleFactor}, isMobile=${step.isMobile}`;
          break;
        case 'navigate':
          verboseMessage += ` vers l'URL "${step.url}"`;
          if (step.assertedEvents && step.assertedEvents.length > 0) {
            verboseMessage += ` | Événements attendus: ${JSON.stringify(step.assertedEvents)}`;
          }
          break;
        case 'click':
          verboseMessage += ` sur la cible "${step.target}" avec sélecteurs=${JSON.stringify(step.selectors)}`;
          if (step.offsetX !== undefined && step.offsetY !== undefined) {
            verboseMessage += ` et offsets (X=${step.offsetX}, Y=${step.offsetY})`;
          }
          if (step.assertedEvents && step.assertedEvents.length > 0) {
            verboseMessage += ` | Événements attendus: ${JSON.stringify(step.assertedEvents)}`;
          }
          break;
        case 'change':
          verboseMessage += ` sur la cible "${step.target}" avec sélecteurs=${JSON.stringify(step.selectors)} et valeur="${step.value}"`;
          break;
        case 'doubleClick':
          verboseMessage += ` sur la cible "${step.target}" avec sélecteurs=${JSON.stringify(step.selectors)} et offsets (X=${step.offsetX}, Y=${step.offsetY})`;
          break;
        case 'keyUp':
          verboseMessage += ` avec la touche "${step.key}" sur la cible "${step.target}"`;
          break;
        default:
          verboseMessage += ` | Détails: ${JSON.stringify(step)}`;
          break;
      }

      // Envoyer le message en mode verbose via Socket.IO
      this.logger.log(verboseMessage);
      this.socketGateway.sendLog(verboseMessage);

      // Simuler un délai pour visualiser chaque étape (par exemple 1 seconde)
      await delay(1000);
    }

    const result = 'Test d’automatisation exécuté avec succès !';
    this.logger.log(result);
    this.socketGateway.sendLog(result);
    return result;
  }
}
