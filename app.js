
// On indique à Node d'aller chercher la dependance express dans le dossier node.module.
const express = require('express')

const morgan = require('morgan')

const favicon = require('serve-favicon')

const bodyParser = require('body-parser')

const { Sequelize } = require('sequelize')

const { success, getUniqueId } = require('./helper.js')
let pokemons = require('./mock-pokemon')

//On crée une instance d'un application express grâce à la méthode express.
const app = express()
  
//On définit une simple constante avec la valeur 3000. C'est le port sur lequel nous allons démarrer notre api rest.
const port = 3000

const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
       host: 'localhost',
       dialect: 'mariadb',
       dialectOptions:{
          timezone: 'Etc/GMT-2'
       },
       logging: false
    }
)
sequelize.authenticate()
    .then(_=>console.log('La connectionn à la base de données a bien été établie.'))
    .catch(error =>console.error(`Impossible de se connecter à la base de données ${error}`))

app
    .use(favicon(__dirname + '/favicon.ico')) 
    .use(morgan('dev'))
    .use(bodyParser.json())

/*On définit notre premier point de terminaison ou endpoint. C'est le coeur d'express. 
Pour définir un point de terminaison:
méthode de la requête: "get" qui prend 2 éléments en paramètre: le chemin de la requête (ici c'est simplement un slash, c'est à dire la route par défaut de notre api). Le 2è argument est une fonction dont le rôle est de fournir une réponse au client lorsque notre point de terminaison est appelé. Cette fonction a elle-même deux argument en entrée: req et res.
req: permet de récupérer un objet request qui correspond à la requête reçue en entrée de notre point de terminaison. Et res: la response, c à dire l'objet que l'on doit renvoyer depuis express à notre client. Ici, on utilise la méthode send de l'objet response pour retourner le message "Hello express" au client */

app.get('/', (req,res)=> res.send('Hello again, Express ! 👋'))

//On démarre l'api rest sur le port 3000 et on affiche un message de confirmation dans le port de commande grâce à la méthode listen fournie par express.

//une api rest qui retourne les pokemons:
app.get('/api/pokemons/:id', (req,res) => { 
    //on récupère l'identifiant contenu dans l'url et on l'ajoute dans la route au dessus.

    const id = parseInt(req.params.id)
    //parseInt parce que l'id est une chaine de caractères qu'il faut transformer en nb pour remplir la condition id === id.

    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
})

app.get('/api/pokemons', (req,res)=> {
    const message = 'La liste des pokémons a bien été trouvée.'
    res.json(success(message, pokemons))
})

app.post('/api/pokemons', (req,res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id:id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été créé.`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
  
 const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
 res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
  });

app.listen(port, () => console.log(`Notre application node est démarrée sur : http://localhost:${port}`))

//il ne reste plus qu'à démarrer l'api rest avec la commande "npm run start".
//On vient d'envoyer une requête Get à notre api rest grâce au navigateur, et notre api rest écrite en node a retourné une réponse.
// Si on change le message dans le code, il ne se passe rien sur la page. Pour rafraichir la page, il faudrait couper la commande npm start en faisant ctrl c, puis relancer npm start. Pour éviter de devoir relancer la commande sans arrêt pour rafraichir la page, il faut charger le package nodemon.
//rq: si on n'a qu'une ligne de code, pas besoin d'accolades, mais s'il y en a plusieurs, il faut les ajouter.

//la méthode find, pour récupérer un pokemon en fonction d'une certaine condition. Dans notre cas, on cherche le pokemon qui a le même identifiant que celui issu de l'url, soit: pokemon.id === id