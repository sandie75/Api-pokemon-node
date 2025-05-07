exports.success = (message, data) => {
    return {message, data}
}

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id)
    const maxId = pokemonsIds.reduce((a,b) => Math.max(a,b))
    const uniqueID = maxId + 1

    return uniqueId
}
/*
-2e ligne: On transforme la tableau des pokemons en un tableau d'identifiants des pokemons contenu dans la constante pokemonsId. C'est possible grâce à la méthode javascript map() qui fonctionne comme une boucle for mais en retournant un nouveau tableau. 
-3e: Ensuite, on calcule l'id existant le plus grand parmi la liste des identifiants de pokemons existants. C'est possible grace à la méthode js reduce() qui permet de comparer les éléments 2 à 2 dans un tableau. Cette méthode nous retourne la constante maxId. 
-4e: Il ne reste plus qu'à retourner cet identifiant en l'incrémentant la valeur de maxId de 1.
*/ 