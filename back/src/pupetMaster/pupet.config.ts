// pupet.config.ts
const pupetConfig = 
  {
    "title": "pupet",
    "steps": [
      {
        "type": "setViewport",
        "width": 1264,
        "height": 150,
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
            "aria/ Souscrire"
          ],
          [
            "#header1_LB_Souscription"
          ]
        ],
        "offsetY": 8.614582061767578,
        "offsetX": 84.98956298828125,
        "assertedEvents": [
          {
            "type": "navigation",
            "url": "https://www.mint-energie.com/Pages/Souscription/coordonnees.aspx",
            "title": "Mint Énergie"
          }
        ]
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "div.FORM_WRAPPER_SUBMIT"
          ]
        ],
        "offsetY": 83.66666412353516,
        "offsetX": 1024
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "#DDL_Civility"
          ]
        ],
        "offsetY": 13.15625,
        "offsetX": 227
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
        "offsetY": 10.83331298828125,
        "offsetX": 190
      },
      {
        "type": "change",
        "value": "theiophile",
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
        "type": "doubleClick",
        "target": "main",
        "selectors": [
          [
            "aria/Ex : LAURENT"
          ],
          [
            "#TB_Lastname"
          ]
        ],
        "offsetY": 25.96875,
        "offsetX": 173
      },
      {
        "type": "change",
        "value": "vast",
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
        "offsetY": 9.90625,
        "offsetX": 179
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
        "offsetY": 15.510406494140625,
        "offsetX": 159
      },
      {
        "type": "change",
        "value": "theo@gmail.Com",
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
        "offsetY": 46.05207824707031,
        "offsetX": 152
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
        "offsetY": 64.125,
        "offsetX": 40.6666259765625
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
        "offsetY": 31.666656494140625,
        "offsetX": 102.8853759765625
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
          ],
          [
            "text/theo@gmail.com"
          ]
        ],
        "offsetY": 16.854164123535156,
        "offsetX": 46
      },
      {
        "type": "change",
        "value": "theo.@gmail.com",
        "selectors": [
          [
            "aria/Ex : adresse@mail.com"
          ],
          [
            "#TB_Email"
          ],
          [
            "text/theo@gmail.com"
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
        "value": "theo.vast@gmail.com",
        "selectors": [
          [
            "aria/Ex : adresse@mail.com"
          ],
          [
            "#TB_Email"
          ],
          [
            "text/theo@gmail.com"
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
        "offsetY": 7.666656494140625,
        "offsetX": 59.8853759765625,
        "assertedEvents": [
          {
            "type": "navigation",
            "url": "https://www.mint-energie.com/Pages/Souscription/logement.aspx?guid=b3540d8f-b5db-4141-a507-074c45307776",
            "title": ""
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
        "offsetY": 24.15625,
        "offsetX": 381
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
            "aria/Ex : 34000"
          ],
          [
            "#TB_ZipCode"
          ]
        ],
        "offsetY": 8.229156494140625,
        "offsetX": 199
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
        "offsetY": 22.36456298828125,
        "offsetX": 196
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
        "offsetY": 64.96875,
        "offsetX": 205.6666259765625
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "#DDL_MainHouse"
          ]
        ],
        "offsetY": 18.84375,
        "offsetX": 455
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
        "offsetY": 13.666656494140625,
        "offsetX": 48.6875,
        "assertedEvents": [
          {
            "type": "navigation",
            "url": "https://www.mint-energie.com/Pages/Souscription/consommation-elec.aspx?guid=b3540d8f-b5db-4141-a507-074c45307776",
            "title": ""
          }
        ]
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "aria/Je n'ai pas mon PDL"
          ],
          [
            "#BT_SearchPoint"
          ],
          [
            "text/Je n'ai pas mon"
          ]
        ],
        "offsetY": 21.385406494140625,
        "offsetX": 131.66665649414062
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "span.switch > label"
          ]
        ],
        "offsetY": 7.9895782470703125,
        "offsetX": 15.666656494140625
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "aria/Je n'ai pas mon PDL"
          ],
          [
            "#BT_SearchPoint"
          ],
          [
            "text/Je n'ai pas mon"
          ]
        ],
        "offsetY": 11.59375,
        "offsetX": 74.66665649414062,
        "assertedEvents": [
          {
            "type": "navigation",
            "url": "https://www.mint-energie.com/Pages/Souscription/recherche-pdl.aspx?guid=b3540d8f-b5db-4141-a507-074c45307776",
            "title": "Mint Énergie"
          }
        ]
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "aria/Rechercher"
          ],
          [
            "#BT_SUBMIT"
          ],
          [
            "text/Rechercher"
          ]
        ],
        "offsetY": 13.666656494140625,
        "offsetX": 24.20831298828125
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "aria/Contacter un téléconseiller"
          ],
          [
            "#BT_HELP"
          ],
          [
            "text/Contacter un"
          ]
        ],
        "offsetY": 25.23956298828125,
        "offsetX": 107.65625,
        "assertedEvents": [
          {
            "type": "navigation",
            "url": "https://www.mint-energie.com/Pages/Souscription/aide.aspx?guid=b3540d8f-b5db-4141-a507-074c45307776&err=E001",
            "title": ""
          }
        ]
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "aria/Confirmer le rappel"
          ],
          [
            "#BT_CallBack"
          ],
          [
            "text/Confirmer le"
          ]
        ],
        "offsetY": 25.739578247070312,
        "offsetX": 361
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "#DDL_DayCallBack"
          ]
        ],
        "offsetY": 28.989582061767578,
        "offsetX": 293
      },
      {
        "type": "change",
        "value": "ASAP",
        "selectors": [
          [
            "#DDL_DayCallBack"
          ]
        ],
        "target": "main"
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "#DDL_HourCallBack"
          ]
        ],
        "offsetY": 25.864578247070312,
        "offsetX": 297
      },
      {
        "type": "change",
        "value": "ASAP",
        "selectors": [
          [
            "#DDL_HourCallBack"
          ]
        ],
        "target": "main"
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "aria/Confirmer le rappel"
          ],
          [
            "#BT_CallBack"
          ],
          [
            "text/Confirmer le"
          ]
        ],
        "offsetY": 16.739578247070312,
        "offsetX": 291
      },
      {
        "type": "click",
        "target": "main",
        "selectors": [
          [
            "aria/Finaliser plus tard"
          ],
          [
            "#BT_LATER"
          ],
          [
            "text/Finaliser plus"
          ]
        ],
        "offsetY": 7.666656494140625,
        "offsetX": 88.80206298828125
      }
    ]
  }
  export default pupetConfig;