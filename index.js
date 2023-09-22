//6.Pointer le container où afficher les cartes des pays :
const countriesContainer = document.querySelector(".countries-container");

//16.Créer une seule variable avec tous les boutons regroupés par leur ID pour le tri :
const btnSort = document.querySelectorAll(".btnSort");

//16-bis : Créer une variable qui change pour les boutons (définie de base sur l'ordre croissant, mais qui changera lorsque le user cliquera sur les boutons) :
let sortMethod = "maxToMin";

//2. Créer une variable pour lui passer les données récupérées dans le fetch :
let countriesData = [];



//3.Créer une fonction asynchrone pour que le fetch se joue avant toute autre chose :
async function fetchCountries() {

    //1. Créer un fetch pour récupérer les données de l'API :
    await fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => countriesData = data);
            
        console.log(countriesData[0]);

        //8.Ajouter la fonction d'affichage des pays dans le fetch :
        countriesDisplay();
}

//5. Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP :
function countriesDisplay() {

    //7.injecter de l'HTML aux informations (countriesData) que l'on va récupérer, leur appliquer des méthodes et les passer container voulu (countriesContainer) :
    countriesContainer.innerHTML = countriesData
    
    //9. Filtrer les données avec ce qui est tapé dans l'input :
    //*Appliquer la méthode ".filter" aux données (countries Data) 
    //*Prendre le nom du pays (country.translations.fra.common), lui appliquer la méthode ".includes" qui contiendra ce qui est tapé dans l'input (inputSearch.value) :
    .filter((country) => country.translations.fra.common.toLowerCase().includes(inputSearch.value.toLowerCase()))
    //11. Ajouter la fonction ".toLowerCase()" au nom du pays et à l'input pour comparer sans la casse

    //15. Appliquer la méthode ".sort" pour trier (a = le + petit, b = le + grand) 
    //DONC : b - a = tri croissant
    //a - b = tri décroissant
    .sort((a, b) => {

        //17. Créer la théorie de la méthode en déclarant l'ID de chaque bouton (maxToMin, alpha, etc.) :
        if(sortMethod === "maxToMin") {
            return b.population - a.population;
        } else if (sortMethod === "minToMax") {
            return a.population - b.population;
        } else if (sortMethod === "alpha") {
            return a.translations.fra.common.localeCompare(b.translations.fra.common);
        }
        //17-bis : tri alphabétique = localeCompare
    })

    //12.Gérer le nombre de pays affichés avec la méthode ".slice" :
    //0 = où on commence
    //inputRange.value = où on finit (la valeur de ce que sélectionne le user sur "inputRange")
    .slice(0, inputRange.value)

    //7 bis : formater les donner avec ".map" :
    .map((country) => 
        `
        <div class="card">
            <img src=${country.flags.svg} alt="Drapeau ${country.translations.fra.common}">
            <h2>${country.translations.fra.common}</h2>
            <h4>Capitale : ${country.capital}</h4>
            <p>Population : ${country.population.toLocaleString()} habitants</p>
        </div>
        `
        //".toLocaleString" : pour traiter un nombre de la façon dont il s'écrit localement (dans le pays où l'on est) 
        ).join(" ");
}

//4. Ajouter un évènement pour savoir quand jouer la fonction (ici, au chargement de la page "load") :
window.addEventListener("load", fetchCountries());

//10. Ajouter un évènement quand le user tape quelque chose dans l'input (relancer la fonction d'affichage des pays avec toutes les méthodes qu'elle comprend, dont le filter) :
inputSearch.addEventListener("input", countriesDisplay);

//13. Créer un évènement sur "inputRange" pour faire fonctionner la méthode .slice :
inputRange.addEventListener("input", () => {
    countriesDisplay();
    //14. Connecter le span "rangeValue" (où est écrit le nombre de pays) à "inputRange", le curseur que sélectionne le user :
    rangeValue.textContent = inputRange.value;
})

//18. Créer un évènement sur les trois boutons de tri (utiliser le forEach pour les regrouper puis leur appliquer un event) :
btnSort.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        //19. On passe l'ID de chaque bouton à "sortMethod" (la variable modifiable) quand le bouton est cliqué :
        sortMethod = e.target.id;
        //20. On relance ensuite la fonction :
        countriesDisplay();
    })
})














//     result.innerHTML = countries.filter((country) => (country.name.common.toLowerCase()).includes(inputSearch.value))

//     // .sort((a,b) => {
//     //     if(a.country.population > b.country.population) {
//     //         return (a - b);
//     //      } else if (a.country.population < b.country.population) {
//     //          return (b -a);
//     //      } else {
//     //         return 0;
//     //      }
//     //  })



// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays


//Architecture de la fonction d'affichage :

// countriesContainer.innerHTML = monTableau
//     .filter((country) => country.nomdupays.includes(inputSearch.value))
//     .sort((a,b) => {
//         if(...){
//             return ...
//         } else if (...) {
//             return ...
//         }
//     })
//     .slice(0, inputRange.value)
//     .map((country) => 
//         `
//         <div class="card">
        
//         </div>
//         `
//     )