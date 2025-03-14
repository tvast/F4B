// pupet.config.ts
const pupetConfig = 
{
  "title": "Funnel",
  "steps": [
      {
          "type": "setViewport",
          "width": 1905,
          "height": 471,
          "deviceScaleFactor": 1,
          "isMobile": false,
          "hasTouch": false,
          "isLandscape": false
      },
      {
          "type": "navigate",
          "url": "https://www.mint-energie.com/Pages/Accueil/accueil.aspx",
          "assertedEvents": [
              {
                  "type": "navigation",
                  "url": "https://www.mint-energie.com/Pages/Accueil/accueil.aspx",
                  "title": "Fournisseur d'énergie verte, fournisseur d'électricité verte, fournisseur de gaz pour particulier - Mint"
              }
          ]
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/ Souscrire",
                  "aria/[role=\"generic\"]"
              ],
              [
                  "div:nth-of-type(1) div:nth-of-type(5) span"
              ]
          ],
          "offsetY": 11.234375,
          "offsetX": 11.609375,
          "assertedEvents": [
              {
                  "type": "navigation",
                  "url": "https://www.mint-energie.com/Pages/Souscription/coordonnees.aspx",
                  "title": ""
              }
          ]
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "#DDL_Civility"
              ]
          ],
          "offsetY": 13.8125,
          "offsetX": 139.5
      },
      {
          "type": "change",
          "value": "M",
          "selectors": [
              [
                  "#DDL_Civility"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Ex : Thomas"
              ],
              [
                  "#TB_Firstname"
              ]
          ],
          "offsetY": 17.828125,
          "offsetX": 133.5
      },
      {
          "type": "change",
          "value": "test",
          "selectors": [
              [
                  "aria/Ex : Thomas"
              ],
              [
                  "#TB_Firstname"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "#PNL_SUB"
              ]
          ],
          "offsetY": 343.609375,
          "offsetX": 719
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Ex : LAURENT"
              ],
              [
                  "#TB_Lastname"
              ]
          ],
          "offsetY": 15.625,
          "offsetX": 98.5
      },
      {
          "type": "keyDown",
          "target": "main",
          "key": "t"
      },
      {
          "type": "keyDown",
          "target": "main",
          "key": "e"
      },
      {
          "type": "keyUp",
          "key": "t",
          "target": "main"
      },
      {
          "type": "keyUp",
          "key": "e",
          "target": "main"
      },
      {
          "type": "keyDown",
          "target": "main",
          "key": "s"
      },
      {
          "type": "keyUp",
          "key": "s",
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Ex : LAURENT"
              ],
              [
                  "#TB_Lastname"
              ]
          ],
          "offsetY": 8.625,
          "offsetX": 96.5
      },
      {
          "type": "keyDown",
          "target": "main",
          "key": "t"
      },
      {
          "type": "keyDown",
          "target": "main",
          "key": "e"
      },
      {
          "type": "keyUp",
          "key": "e",
          "target": "main"
      },
      {
          "type": "keyUp",
          "key": "t",
          "target": "main"
      },
      {
          "type": "keyDown",
          "target": "main",
          "key": "t"
      },
      {
          "type": "keyDown",
          "target": "main",
          "key": "e"
      },
      {
          "type": "keyUp",
          "key": "e",
          "target": "main"
      },
      {
          "type": "keyUp",
          "key": "t",
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "label:nth-of-type(3)"
              ],
              [
                  "text/Nom *"
              ]
          ],
          "offsetY": 20.828125,
          "offsetX": 128.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Ex : LAURENT"
              ],
              [
                  "#TB_Lastname"
              ]
          ],
          "offsetY": 11.625,
          "offsetX": 128.5
      },
      {
          "type": "change",
          "value": "test",
          "selectors": [
              [
                  "aria/Ex : LAURENT"
              ],
              [
                  "#TB_Lastname"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Ex : 06 12 34 56 78"
              ],
              [
                  "#TB_CliMob"
              ]
          ],
          "offsetY": 18.21875,
          "offsetX": 141.5
      },
      {
          "type": "change",
          "value": "0647507211",
          "selectors": [
              [
                  "aria/Ex : 06 12 34 56 78"
              ],
              [
                  "#TB_CliMob"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Ex : adresse@mail.com"
              ],
              [
                  "#TB_Email"
              ]
          ],
          "offsetY": 4.8125,
          "offsetX": 124.5
      },
      {
          "type": "change",
          "value": "test@",
          "selectors": [
              [
                  "aria/Ex : adresse@mail.com"
              ],
              [
                  "#TB_Email"
              ]
          ],
          "target": "main"
      },
      {
          "type": "keyUp",
          "key": "à",
          "target": "main"
      },
      {
          "type": "change",
          "value": "test@test.",
          "selectors": [
              [
                  "aria/Ex : adresse@mail.com"
              ],
              [
                  "#TB_Email"
              ]
          ],
          "target": "main"
      },
      {
          "type": "keyUp",
          "key": ";",
          "target": "main"
      },
      {
          "type": "change",
          "value": "test@test.com",
          "selectors": [
              [
                  "aria/Ex : adresse@mail.com"
              ],
              [
                  "#TB_Email"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "span.rb_elec > label"
              ],
              [
                  "text/Électricité"
              ]
          ],
          "offsetY": 18.015625,
          "offsetX": 163.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "span.rb_mes_part > label"
              ],
              [
                  "text/J'emménage dans"
              ]
          ],
          "offsetY": 38.421875,
          "offsetX": 84.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Je valide mes coordonnées"
              ],
              [
                  "#BT_SUBMIT"
              ],
              [
                  "text/Je valide mes"
              ]
          ],
          "offsetY": 17,
          "offsetX": 69.390625
      },
      {
          "type": "doubleClick",
          "target": "main",
          "selectors": [
              [
                  "aria/Ex : adresse@mail.com"
              ],
              [
                  "#TB_Email"
              ],
              [
                  "text/test@test.com"
              ]
          ],
          "offsetY": 20.8125,
          "offsetX": 76.5
      },
      {
          "type": "change",
          "value": "test@mint.com",
          "selectors": [
              [
                  "aria/Ex : adresse@mail.com"
              ],
              [
                  "#TB_Email"
              ],
              [
                  "text/test@test.com"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Je valide mes coordonnées"
              ],
              [
                  "#BT_SUBMIT"
              ],
              [
                  "text/Je valide mes"
              ]
          ],
          "offsetY": 21,
          "offsetX": 18.390625,
          "assertedEvents": [
              {
                  "type": "navigation",
                  "url": "https://www.mint-energie.com/Pages/Souscription/logement.aspx?guid=4e3d8206-f5d9-4d3e-b25f-68371ddd50e1",
                  "title": "Mint Énergie"
              }
          ]
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Ex : 52 rue d'Odin"
              ],
              [
                  "#TB_Address1"
              ]
          ],
          "offsetY": 30.8125,
          "offsetX": 261.5
      },
      {
          "type": "change",
          "value": "47 rue des ragondins",
          "selectors": [
              [
                  "aria/Ex : 52 rue d'Odin"
              ],
              [
                  "#TB_Address1"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "div.MAIN > div > div.FORM_WRAPPER"
              ]
          ],
          "offsetY": 300.21875,
          "offsetX": 167.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Ex : 34000"
              ],
              [
                  "#TB_ZipCode"
              ]
          ],
          "offsetY": 25.203125,
          "offsetX": 134.5
      },
      {
          "type": "change",
          "value": "34000",
          "selectors": [
              [
                  "aria/Ex : 34000"
              ],
              [
                  "#TB_ZipCode"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Ex : Montpellier"
              ],
              [
                  "#TB_City"
              ]
          ],
          "offsetY": 15,
          "offsetX": 132.5
      },
      {
          "type": "change",
          "value": "Montpelier",
          "selectors": [
              [
                  "aria/Ex : Montpellier"
              ],
              [
                  "#TB_City"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "span.rb_building > label"
              ],
              [
                  "text/Appartement"
              ]
          ],
          "offsetY": 81.609375,
          "offsetX": 84.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "#DDL_MainHouse"
              ]
          ],
          "offsetY": 25.8125,
          "offsetX": 324.5
      },
      {
          "type": "change",
          "value": "1",
          "selectors": [
              [
                  "#DDL_MainHouse"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Je valide mes informations"
              ],
              [
                  "#BT_SUBMIT"
              ],
              [
                  "text/Je valide mes"
              ]
          ],
          "offsetY": 19,
          "offsetX": 55.1875,
          "assertedEvents": [
              {
                  "type": "navigation",
                  "url": "https://www.mint-energie.com/Pages/Souscription/consommation-elec.aspx?guid=4e3d8206-f5d9-4d3e-b25f-68371ddd50e1",
                  "title": ""
              }
          ]
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "label.Pb_05"
              ],
              [
                  "text/Où trouver mon"
              ]
          ],
          "offsetY": 17.8125,
          "offsetX": 53.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "#PNL_POPIN_PDL2"
              ]
          ],
          "offsetY": 37.79219055175781,
          "offsetX": 145.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "div.popin_close"
              ]
          ],
          "offsetY": 8.981246948242188,
          "offsetX": 19.75
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Numéro à 14 chiffres"
              ],
              [
                  "#TB_PDL"
              ]
          ],
          "offsetY": 19.609375,
          "offsetX": 336.5
      },
      {
          "type": "change",
          "value": "24379305167298",
          "selectors": [
              [
                  "aria/Numéro à 14 chiffres"
              ],
              [
                  "#TB_PDL"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/J'estime ma consommation"
              ],
              [
                  "#BT_SUBMIT"
              ],
              [
                  "text/J'estime ma consommation"
              ]
          ],
          "offsetY": 18,
          "offsetX": 58.5625
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "span.switch > label"
              ]
          ],
          "offsetY": 19.609375,
          "offsetX": 17.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/J'estime ma consommation"
              ],
              [
                  "#BT_SUBMIT"
              ],
              [
                  "text/J'estime ma consommation"
              ]
          ],
          "offsetY": 10,
          "offsetX": 30.5625,
          "assertedEvents": [
              {
                  "type": "navigation",
                  "url": "https://www.mint-energie.com/Pages/Souscription/offres-elec.aspx?guid=4e3d8206-f5d9-4d3e-b25f-68371ddd50e1",
                  "title": "Mint Énergie"
              }
          ]
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "span.rb_reel > label"
              ],
              [
                  "text/Au réel"
              ]
          ],
          "offsetY": 67.21875,
          "offsetX": 162.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "#PNL_OFFER_ONLINE div:nth-of-type(8) > span:nth-of-type(2)"
              ]
          ],
          "offsetY": 19.390625,
          "offsetX": 170.890625
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "#LB_OFFER_ONLINE"
              ]
          ],
          "offsetY": 13.578125,
          "offsetX": 167.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Je poursuis vers le paiement"
              ],
              [
                  "#BT_SUBMIT"
              ],
              [
                  "text/Je poursuis vers"
              ]
          ],
          "offsetY": 22,
          "offsetX": 56.5625,
          "assertedEvents": [
              {
                  "type": "navigation",
                  "url": "https://www.mint-energie.com/Pages/Souscription/paiement.aspx?guid=4e3d8206-f5d9-4d3e-b25f-68371ddd50e1",
                  "title": ""
              }
          ]
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "#TB_RibOwner"
              ]
          ],
          "offsetY": 21.015625,
          "offsetX": 177.5
      },
      {
          "type": "change",
          "value": "test",
          "selectors": [
              [
                  "#TB_RibOwner"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "#TB_RibIban"
              ]
          ],
          "offsetY": 27.8125,
          "offsetX": 142.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "#TB_RibIban"
              ]
          ],
          "offsetY": 14.8125,
          "offsetX": 50.5
      },
      {
          "type": "change",
          "value": "FR0220041000016219433J02076",
          "selectors": [
              [
                  "#TB_RibIban"
              ]
          ],
          "target": "main"
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "div.MAIN > div > div:nth-of-type(1) > span > label"
              ]
          ],
          "offsetY": 1.8125,
          "offsetX": 23.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "span.rb_electronic > label"
              ],
              [
                  "text/E-mail exclusivementgratuit"
              ]
          ],
          "offsetY": 105.828125,
          "offsetX": 167.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "span.rb_electronic > label"
              ],
              [
                  "text/E-mail exclusivementgratuit"
              ]
          ],
          "offsetY": 73.828125,
          "offsetX": 187.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/",
                  "aria/[role=\"generic\"]"
              ],
              [
                  "#OpenDP > span"
              ]
          ],
          "offsetY": 10.125,
          "offsetX": 5.703125
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/19"
              ],
              [
                  "tr:nth-of-type(4) > td:nth-of-type(3)"
              ]
          ],
          "offsetY": 4,
          "offsetX": 23.0625
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Je signe mon mandat et finalise ma souscription"
              ],
              [
                  "#BT_SUBMIT"
              ],
              [
                  "text/Je signe mon"
              ]
          ],
          "offsetY": 32,
          "offsetX": 129.03125
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "div.My_2 label"
              ]
          ],
          "offsetY": 8.8125,
          "offsetX": 25.5
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Je signe mon mandat et finalise ma souscription"
              ],
              [
                  "#BT_SUBMIT"
              ],
              [
                  "text/Je signe mon"
              ]
          ],
          "offsetY": 26,
          "offsetX": 75.03125,
          "assertedEvents": [
              {
                  "type": "navigation",
                  "url": "https://www.mint-energie.com/Pages/Souscription/souscription-confirmee.aspx?guid=4e3d8206-f5d9-4d3e-b25f-68371ddd50e1&co=998972",
                  "title": ""
              }
          ]
      },
      {
          "type": "click",
          "target": "main",
          "selectors": [
              [
                  "aria/Suivre les étapes de ma souscription"
              ],
              [
                  "#BT_SUB_STATE"
              ],
              [
                  "text/Suivre les étapes"
              ]
          ],
          "offsetY": 21.015625,
          "offsetX": 241.03125,
          "assertedEvents": [
              {
                  "type": "navigation",
                  "url": "https://www.mint-energie.com/Pages/Souscription/souscription-etat.aspx?guid=4e3d8206-f5d9-4d3e-b25f-68371ddd50e1",
                  "title": ""
              }
          ]
      }
  ]
}

  export default pupetConfig;