# Mes révisions : mettre l'appli sur l'iPhone et le Mac (gratuit)

Ce guide a 3 parties. Compte environ 30 minutes la première fois.

- **Partie A** : mettre l'appli en ligne (GitHub Pages).
- **Partie B** : l'installer sur l'écran d'accueil de l'iPhone et dans le Dock du Mac.
- **Partie C** : activer la synchronisation entre tes appareils (Firebase).

Tu peux faire A et B d'abord : l'appli fonctionne déjà, avec les données séparées sur chaque appareil. La partie C ajoute le compte et la synchronisation en direct.

Aucun mot de passe ne doit être donné à Claude. Ce que tu pourras lui envoyer plus tard, c'est la « configuration Firebase » (partie C, étape 2) : elle ne contient aucun secret.

---

## Partie A : mettre l'appli en ligne (GitHub Pages)

1. Va sur **github.com** et crée un compte gratuit (« Sign up »). Choisis un nom d'utilisateur simple, par exemple `francois-revisions`.
2. Une fois connecté, clique sur **+** en haut à droite, puis **New repository**.
   - Repository name : `revisions`
   - Choisis **Public**
   - Coche **Add a README file**
   - Clique sur **Create repository**
3. Sur la page du dépôt : **Add file** puis **Upload files**.
   - Ouvre le dossier `Mes-revisions-app` (sur ton Bureau) et sélectionne **tous les fichiers** qu'il contient.
   - Glisse-les dans la page GitHub, attends la fin du chargement (le fichier `index.html` fait 1,6 Mo).
   - Clique sur **Commit changes**.
4. Va dans **Settings** (onglet en haut du dépôt), puis **Pages** dans la colonne de gauche.
   - Sous « Build and deployment », **Source** : `Deploy from a branch`
   - **Branch** : `main`, dossier `/ (root)`, puis **Save**
5. Attends 1 à 2 minutes et recharge la page : l'adresse de ton appli apparaît en haut, du type
   `https://TON-NOM.github.io/revisions/`
   Ouvre-la pour vérifier que l'appli s'affiche.

Remarque : le dépôt est public, donc le **code** de l'appli est visible de tous. Tes cours et tes réponses ne sont jamais dans ce dépôt : ils restent sur tes appareils et dans ton compte.

---

## Partie B : installer l'appli

**Sur l'iPhone** (avec Safari, pas un autre navigateur) :
1. Ouvre l'adresse de l'appli.
2. Touche le bouton **Partager** (le carré avec une flèche vers le haut).
3. Fais défiler, touche **Sur l'écran d'accueil**, puis **Ajouter**.
4. L'icône « Révisions » apparaît sur ton écran d'accueil. L'appli s'ouvre en plein écran.

**Sur le Mac** (avec Safari) :
1. Ouvre l'adresse de l'appli.
2. Menu **Fichier**, puis **Ajouter au Dock**.

---

## Partie C : synchroniser tes appareils (Firebase)

Firebase est le service gratuit de Google qui stocke tes données et les envoie en direct à tous tes appareils. L'offre gratuite (« Spark ») est très largement suffisante, et aucune carte bancaire n'est demandée.

### 1. Créer le projet
1. Va sur **console.firebase.google.com** et connecte-toi avec un compte Google.
2. **Créer un projet** (ou « Ajouter un projet »). Nom : `mes-revisions`.
3. Désactive Google Analytics (inutile), puis **Créer le projet**.

### 2. Récupérer la configuration
1. Sur la page d'accueil du projet, clique sur l'icône **Web** (`</>`).
2. Surnom de l'application : `revisions`. Ne coche pas « Firebase Hosting ». Clique sur **Enregistrer l'application**.
3. Un bloc de code s'affiche, qui commence par `const firebaseConfig = {`. **Copie ce bloc** (de `const` jusqu'à `};`). Garde-le sous la main.

### 3. Activer la connexion par e-mail
1. Menu de gauche : **Build** puis **Authentication** puis **Commencer**.
2. Onglet **Méthode de connexion** : choisis **Adresse e-mail/Mot de passe**, active la première option, **Enregistrer**.
3. Onglet **Paramètres**, puis **Domaines autorisés** : **Ajouter un domaine** et écris `TON-NOM.github.io` (sans `https://` ni le `/revisions`).

### 4. Créer la base de données
1. Menu de gauche : **Build** puis **Firestore Database** puis **Créer une base de données**.
2. Emplacement : choisis un serveur en Europe (par exemple `eur3` ou `europe-west`). Il ne pourra plus être changé.
3. Mode : **Démarrer en mode production**, puis **Créer**.
4. Onglet **Règles** : remplace tout le texte par celui du fichier `firestore.rules` (fourni dans le dossier), puis clique sur **Publier**. Ces règles garantissent que chaque personne ne voit que ses propres données.

### 5. Connecter l'appli
Deux façons, au choix :

- **Dans l'appli, sur chaque appareil** : touche l'icône de nuage en haut, colle le bloc `firebaseConfig`, **Enregistrer**. L'appli se recharge et affiche l'écran de connexion.
- **Une fois pour tous** : envoie-moi le bloc `firebaseConfig` (il ne contient pas de secret). Je le mets dans le fichier `firebase-config.js`, tu le remplaces sur GitHub, et tous tes appareils sont connectés sans rien coller.

### 6. Créer ton compte
Sur l'écran de connexion : écris ton adresse e-mail, choisis un mot de passe (6 caractères minimum), puis **Créer un compte**. Sur tes autres appareils, utilise **Se connecter** avec les mêmes identifiants.

### 7. Reprendre tes données actuelles
Sur le Mac, dans l'**ancienne** appli : bouton **Exporter** (un fichier `.json` est enregistré). Dans la **nouvelle** appli : bouton **Importer**, et choisis ce fichier. Tes quiz, cartes, synthèses et schémas (images comprises) passent dans ton compte et apparaissent sur l'iPhone.

---

## Les mises à jour

Quand Claude te donne de nouveaux fichiers :
1. Sur GitHub, ouvre le dépôt, **Add file** puis **Upload files**, et glisse les fichiers (ils remplacent les anciens). **Commit changes**.
2. Aucune autre action : à la prochaine ouverture de l'appli (ou quand tu y reviens), elle se met à jour toute seule et se recharge à son retour à la bibliothèque.

Les mises à jour de l'appli ne touchent pas à tes données.

## En cas de problème

| Message ou symptôme | Que faire |
|---|---|
| « Ce site n'est pas autorisé dans Firebase » | Partie C, étape 3 : ajoute `TON-NOM.github.io` aux domaines autorisés. |
| « La connexion par e-mail n'est pas activée » | Partie C, étape 3 : active « Adresse e-mail/Mot de passe ». |
| « Synchronisation refusée : vérifie les règles » | Partie C, étape 4 : republie les règles du fichier `firestore.rules`. |
| « Image trop lourde pour la synchronisation » | L'image dépasse environ 1 Mo : elle reste sur l'appareil. Réimporte-la plus petite. |
| L'appli ne change pas après une mise à jour | Ferme-la complètement puis rouvre-la, en étant connecté à internet. |
| Mot de passe oublié | Écran de connexion : « Mot de passe oublié » (un e-mail t'est envoyé). |

## À savoir
- L'appli fonctionne **hors ligne** une fois ouverte au moins une fois en ligne. Les changements faits hors ligne partent vers ton compte au retour du réseau.
- L'offre gratuite de Firebase : 1 Go de stockage et 50 000 lectures par jour. Un usage d'étudiant reste très loin de ces limites.
- Si tu supprimes l'appli de l'iPhone, tes données restent dans ton compte et reviennent à la prochaine connexion.

---

## Sur iPad

L'appli est la même que sur l'iPhone et le Mac : tes données se synchronisent.

1. Ouvre l'adresse de l'appli dans **Safari** sur l'iPad.
2. Touche **Partager** (le carré avec une flèche vers le haut), puis **Sur l'écran d'accueil**, puis **Ajouter**.
3. Ouvre l'icône « Révisions » : l'appli s'affiche en plein écran, en portrait comme en paysage.
4. Connecte-toi avec le même e-mail et le même mot de passe que sur tes autres appareils.

Astuces :
- Les schémas se déplacent au doigt ou à l'Apple Pencil (bouton « Déplacer les flèches »).
- Tu peux utiliser l'appli en **Split View** à côté de Notes+ : fais glisser l'icône depuis le Dock sur le côté de l'écran.
