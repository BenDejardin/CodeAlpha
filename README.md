## Équipe : Les Pad'IDs

- [@axelelise](https://www.github.com/axelelise)
- [@BenDejardin](https://www.github.com/bendejardin)

## Informations sur le projet

- Date du projet : **_Mars 2022_**
- Niveau : **2ème année BTS SIO SLAM**
- Cahier des charges : [Situation Professionnelle - NodeJS](https://slam-vinci-melun.github.io/sio22/phase4/Mission3_CodeAlphaV2.pdf)

### 🛠 Version

- **NodeJS** : 16.13.0
- **Mongoose** : 6.2.5
- **MongoDB** : 4.4.9
- **MongoDB Compass** : 1.30.1
- **Bootstrap** : 5.1

## Récupération du projet

Cloner le projet

```bash
  git clone https://github.com/BenDejardin/CodeAlpha.git
```

Allez dans le répertoire du projet

```bash
  cd CodeAlpha
```

Installer les dépendances

```bash
  npm install
```

Démarrer le serveur

```bash
  nodemon
```

<br>

# ☢️ CodeAlpha

CodeAlpha est une mission sous forme de situation professionnelle
qui repose sur le développement d'une application NodeJS interne.

L’entreprise CodeAlpha s’est spécialisée dans la production
de produits à destination des centrales nucléaires,
des laboratoires de physique, des universités, etc...

Ce projet qui consiste a remplacer, pour une
meilleure gestion des accès, les lecteurs de cartes magnétiques
par des lecteurs de QR Code à l’entrée des salles avec un
traitement NodeJS en interne.

<br>

## **Phase 1 : Analyse de la demande**

<br>

## 💀 Evil User

| Attaques                                                                                 | Solutions                                                                                                                                           |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| La personne malveillante récupère le QR Code de l’intervenant.                           | Lors du mail envoyé à l’intervenant, il reçoit un lien de redirection ou l’intervenant doit saisir son code avant de pouvoir récupérer son qr code. |
| La personne malveillante réussi à modifier la date / heure du temps passé dans la pièce. | Activations d’une double authentification pour les droits de l'opérateur.                                                                           |
| La personne malveillante se génère un QR Code et réussit à accéder à la salle.           | Activations d’une double authentification pour les droits de l'opérateur.                                                                           |

<br>

## <img src="https://cdn-icons-png.flaticon.com/512/5509/5509831.png" style="height:1em;"/> Diagramme des cas d’utilisation

![UserCase](https://github.com/BenDejardin/CodeAlpha/blob/main/images/cas_utilisation.png?raw=true)

<br>

## <img src="https://cdn-icons-png.flaticon.com/512/82/82611.png" style="height:1em;"/> Diagramme UML des entités

![diagClass](https://github.com/BenDejardin/CodeAlpha/blob/main/images/diagramme_de_classe.png?raw=true)

<br>
 
 ## <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" style="height:1em;" />  Modèle pour des collection

```javascript
// Modèle Collection Intervenants
const intervenants = new mongoose.Schema({
  _id: Number,
  nom: String,
  prenom: String,
  code: String,
  adresse_mail: String,
  poste: String,
  qr_code: String,
});
```

```javascript
// Modèle Collection Interventions
const interventions = new mongoose.Schema({
  _id: Number,
  qr_code: String,
  salle: String,
  date_prev: Date,
  heure_prev: String,
  date_deb: Date,
  heure_deb: String,
  date_fin: Date,
  heure_fin: String,
});
```
