// On indique à Node d'aller chercher la dependance express dans le dossier node.module.
const express = require('express')
//On crée une instance d'un application express grâce à la méthode express.
const app = express()
//On définit une simple constante avec la valeur 3000. C'est le port sur lequel nous allons démarrer notre api rest.
const port = 3000
/*On définit notre premier point de terminaison ou handpoint. C'est le coeur d'express. 
Pour définir un point de terminaison:
méthode de la requête: "get" qui prend 2 éléments en paramètre: le chemin de la requête (ici c'est simplement un slash, c'est à dire la route par défaut de notre api). Le 2è argument est une fonction dont le rôle est de fournir une réponse au client lorsque notre point de terminaison est appelé. Cette fct a elle-même deux argument en entrée: req et res.
req: permet de récupérer un objet request qui correspond à la requête reçue en entrée de notre point de terminaison. Et res: la response, c à dire l'objet que l'on doit renvoyer depuis express à notre client. Ici, on utilise la méthode send de l'objet response pour retourner le message "Hello express" au client */
app.get('/', (req,res)=> res.send('Hello, Express ! 👋'))
//On démarre l'api rest sur le port 3000 et on affiche un message de confirmation dans le port de commande grâce à la méthode listen fournie par express.
app.listen(port, () => console.log(`Notre application node est démarrée sur : http://localhost:${port}`))

//il ne reste plus qu'à démarrer l'api rest avec la commande "npm run start".
//On vient d'envoyer une requête Get à notre api rest grâce au navigateur, et notre api rest écrite en node a retourné une réponse.
// Si on change le message dans le code, il ne se passe rien sur la page. Pour rafraichir la page, il faudrait couper la commande npm start en faisant ctrl c, puis relancer npm start.