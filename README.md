# TRAVAIL A FAIRE POUR LA SEMAINE PROCHAINE

Je ferai passer quelques personnes au tableau pour répondre à quelques questions...

Terminer l'installation de nodeJS, MongoDB, faire tourner les WebServices (étape 6), regarder le code source même si vous ne comprenez pas tout.
     
Idem, même si vous ne comprenez pas tout, allez voir les sites Web des librairies graphiques pour VueJS sur le site https://risingstars.js.org Plus tard vous aurez à jouer avec alors c'est le moment ! :-)
     
* Lisez ou du moins parcourez ces lectures:

La page Wikipedia qui définit les Web Services REST: https://fr.wikipedia.org/wiki/Repres...state_transfer
 
Les bonnes pratiques pour créer une API de WebService REST: https://blog.octo.com/designer-une-api-rest/

# Mongo 

```
sudo service mongod start
```

lancer studio3t -> nouvelle connexion -> test local -> ajout

```
mongoimport --db test --collection restaurants --drop --file primer-dataset.json
```

# Consignes : 

```
npm install
node serverCrudWithMongo.js
```

* Ouvrez http://localhost:8080 dans votre navigateur. Une page Web devrait apparaitre. Cliquez sur un des premiers liens, des données (des restaurants) devraient s'afficher au format JSON.

* Regardez le code de serverCrudWithMongo.js en particulier la définition des "URIs" des WebServices (lignes app.get, app.post, app.delete, app.put)

* Créez ailleurs (pas dans le même répertoire), un dossier "client", dans lequel vous aurez une copie du premier exercice du TP1 (afficher les restaurants dans une table). Lancez ce projet avec l'extension "Web Server for Chrome" (c'est un serveur http séparé)

* Ajoutez dans le code JavaScript de ce client une méthode mounted() qui sera appelée juste avant le rendu de la Vue. A l'intérieur, ajoutez un console.log("AVANT RENDU HTML"), et vérifiez dans la console de debug que le message apaprait bien. Ici la page de doc sur le cycle de vie : https://vuejs.org/v2/guide/instance....ifecycle-Hooks
 
* Creez une méthode getRestaurantsFromServer() qui utilise la fetch API pour récupérer des restaurants sur http:8080/api/restaurants et qui les affiche. Profitez-en pour regarder à nouveau les paramètres possibles quand on fait un GET sur /api/restaurants.
 
* Regardez à l'aide de la console de debug (onglet "réseau/network"), l'envoi de votre requête et sa réponse. Vous devez savoir debugger des requêtes AJAX.
 
* On veut afficher dans le H1 le nombre de restaurants correspondant au count de la réponse.
 
* Ajoutez deux boutons "Précédent" et "Suivant" sous la table, qui vont permettre de faire la pagination.
 
* Ajoutez un slider HTML qui va entre les valeurs 5 et 100 par pas de 5 et qui va permettre de choisir le nombre de restaurants par page. Quand on bouge ce slider, on veut que la vue se rafraichisse en temps réel.
 
* Ajoutez un champ de recherche dans votre interface. Quand on saisit une valeur à l'intérieur, ça fait une recherche par nom sur les restaurants. On veut que la vue se mettre à jour en temps réel.
 
* Utilisation de requête DELETE. Ajoutez une colonne à votre tableau avec un bouton "DELETE", quand on clique dessus cela supprime le restaurant dans la base et rafraichit la vue.
 
* Utilisation de requête POST pour insérer un nouveau restaurant. Regardez dans la page html qu'on reçoit du serveur (http://localhost:8080), à la fois dans le code HTML et dans le code JavaScript, 1) comment on fait un formulaire pour saisir un nouveau restaurant et 2) comment on envoie la requête de création en AJAX. Modifiez votre code en conséquence pour faire un ajout de restaurant par POST.
 
* Idem, mais cette fois-ci en PUT pour modifier. On rajoutera une colonne au tableau avec un bouton "Modifier'. Quand on clique dessus, cela affiche et pré-remplit un formulaire de modification. Quand on soumet le formulaire, cela envoie une requête PUT au serveur, modifie les données et rafraichit l'affichage.

