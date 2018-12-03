window.onload = init;

function init() {
    new Vue({
        el: "#app",
        data: {
            restaurants: [
                {
                    name: 'café de Paris',
                    cuisine: 'Française'
                },
                {
                    name: 'Sun City Café',
                    cuisine: 'Américaine'
                }
            ],
            id: '',
            name: '',
            cuisine: '',
            modify: false,
            count: this.getRestaurantsFromServeur,
            page: 0,
            nbPerPage: 5,
            //modification
            nametomodify: '',
            cuisinetomodify: '',
            indexToModify: 0
        },
        mounted() {
            console.log("hello");
            this.getRestaurantsFromServeur();
        },
        methods: {
            getRestaurantsFromServeur() {
                let url = "http://localhost:8080/api/restaurants?page=" + this.page + "&pagesize=" + this.nbPerPage + "&name=" + this.name;
                console.log("getRestaurantsFromServeur : " + url)

                fetch(url).then((repJSON) => {
                    return repJSON.json();
                })
                    .then((repJS) => {
                        this.restaurants = repJS.data;
                        this.restaurants.count = repJS.count;

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            pageNext() {
                this.page++;
                this.getRestaurantsFromServeur();
            },
            pagePrev() {
                this.page--;
                if (this.page < 0) this.page = 0;
                this.getRestaurantsFromServeur();
            },

            supprimerRestaurant(index) {
                // Pour éviter que la page ne se ré-affiche
                event.preventDefault();

                let id = this.restaurants[this.indexToModify]._id;
                let cuisine = this.restaurants[this.indexToModify].cuisine;
                let name = this.restaurants[this.indexToModify].name;
                console.log("supprimerRestaurant [ \n_id " + id + " \nname " + name + " \n cuisine " + cuisine);

                let url = "http://127.0.0.1:8080/api/restaurants/" + id;

                fetch(url, {
                    method: "DELETE",
                    /*body: {
                        _id: id,
                        name: name,
                        cuisine: cuisine
                    }*/
                })
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((res) => {
                                // Maintenant res est un vrai objet JavaScript
                                //afficheReponsePOST(res);
                                console.log("supprimerRestaurant PUT response : " + res);
                                this.getRestaurantsFromServeur();
                                this.restaurants.splice(index, 1);//success

                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });



            },
            ajouterRestaurant(event) {
                // Pour éviter que la page ne se ré-affiche
                event.preventDefault();

                let form = document.getElementsByName("formulaireAjout");

                // Récupération des valeurs des champs du formulaire
                // en prévision d'un envoi multipart en ajax/fetch
                let donneesFormulaire = new FormData(form);
                console.log(donneesFormulaire);



                let url = "http://127.0.0.1:8080/api/restaurants";

                fetch(url, {
                    method: "POST",
                    body: donneesFormulaire
                })
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((res) => {
                                // Maintenant res est un vrai objet JavaScript
                                //afficheReponsePOST(res);
                                console.log(res);
                                this.getRestaurantsFromServeur();
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            getName(restaurants) {
                return restaurants.name;
            },
            getId(restaurants) {
                console.log("getId(" + restaurants._id + ")");
                return restaurants.restaurant_id;
            },
            afficherModifierRestaurant(index) {
                console.log("afficherModifierRestaurant " + index);
                this.indexToModify = index;
                this.fillDataToModify();
                document.getElementById("tohide").setAttribute('style', 'display:block;');
            },
            fillDataToModify() {
                console.log("fillDataToModify " + this.indexToModify);
                console.log(this.restaurants[this.indexToModify]);
                var id = this.getId(this.restaurants[this.indexToModify]);
                console.log("fillDataToModify" + id);
                document.getElementsByName("idToModify")[0].innerHTML = id;

                var name = this.restaurants[this.indexToModify].name;
                var cuisine = this.restaurants[this.indexToModify].cuisine;

                this.nametomodify = name;
                this.cuisinetomodify = cuisine;
            },
            modifyRestaurant() {
                // Pour éviter que la page ne se ré-affiche
                event.preventDefault();
                console.log("modifyRestaurant" + this.indexToModify);
                let id = this.getId(this.restaurants[this.indexToModify]);
                let name = this.nametomodify;
                let cuisine = this.cuisinetomodify;                // Pour éviter que la page ne se ré-affiche
                document.getElementsByName("idToModify")[0].innerHTML = id;

                /*
                let form = document.getElementsByName("formulaireAjout");
                let donneesFormulaire = new FormData(form);
                */

                console.log("modifyRestaurant [ \n_id " + id + " \nname " + name + " \n cuisine " + cuisine);

                let url = "http://127.0.0.1:8080/api/restaurants/" + id;
                let formData = new FormData(document.getElementsByName("formulaireModif")[0]);//why not
                fetch(url, {
                    method: "PUT",
                    body: {
                       formData
                    }
                })
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((res) => {
                                // Maintenant res est un vrai objet JavaScript
                                //afficheReponsePOST(res);
                                console.log("modifyRestaurant PUT response : " + res);
                                this.getRestaurantsFromServeur();
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }


        }
    })
}