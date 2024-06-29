import { recipes } from "./recipes.js";
import { loadDropdownElements } from "./menu.js";
import { ul_ingMenu1, ul_ingMenu2, ul_ingMenu3 } from "./menu.js";

export const appArrayResult = [];

let finalRecipes = []; 
console.log("Let finalRecipes :", finalRecipes);

let searchResultsName = [];
let searchResultsDesc = [];
let searchResultsIng = [];
let listIng = [];
let listApp = [];
let listUst = [];

function resetCards (){
    console.log("Reset cards and tags");
    const all_cards = document.querySelectorAll(".all_cards .card");
    Array.from(all_cards).forEach((card) => card.remove());

    // allBlocsTags.innerHTML = '';
    // DoublesTags.clear();
};

function resetDropdown() {
    ul_ingMenu1.innerHTML = '';
    ul_ingMenu2.innerHTML = '';
    ul_ingMenu3.innerHTML = '';
}

// BARRE DE RECHERCHE PRINCIPALE__________________________________

const searchHandler = function(e) {
    console.log(e.target.value);
    const word = e.target.value.toLowerCase() ?? "";

    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.textContent = '';

    if (word.length >= 3) {
         searchResultsName = recipes.filter((r) => r.name.toLowerCase().includes(word));
         searchResultsDesc = recipes.filter((r) => r.description.toLowerCase().includes(word));
         searchResultsIng = recipes.filter(r => r.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word)));
        // console.log(ingredient.ingredient.toLowerCase());

        // finalRecipes = [...searchResultsName, ...searchResultsDesc, ...searchResultsIng];        
        finalRecipes = [...searchResultsName, ...searchResultsDesc, ...searchResultsIng]; 
        console.log("finalRecipes searchHandler :", finalRecipes);
        const removeDoubles = Array.from(new Set(finalRecipes).values());

        if (removeDoubles.length === 0) {
            noResultsMessage.textContent = `Aucune recette ne contient ‘${word}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
        }

        const ingredientsFlat = removeDoubles.map((r) => r.ingredients.map((i) => i)).flat();
        const ustensilsFlat = removeDoubles.map((r) => r.ustensils.map((u) => u)).flat();
        const appliances = removeDoubles.map((r) => r.appliance);

        resetDropdown();
        
        loadDropdownElements(ingredientsFlat, "ingredient");
        loadDropdownElements(ustensilsFlat, "ustensils");
        loadDropdownElements(appliances, "appliance");
        clickOnElement();
        resetCards();

        
        removeDoubles.forEach((recipe) => cardTemplate(recipe));   
    } else {
        resetCards();
        loadData();
    }
}

// RECHERCHE AVANCEES DANS LES LISTES MENUS__________________________________

function searchInMenu (el) {
    console.log(el.target.value);
    const inputMenuWord = el.target.value.toLowerCase() ?? "";

    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.textContent = '';

    if (inputMenuWord.length >=3) {

         listIng = recipes.filter(r => r.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputMenuWord)));        
         listApp = recipes.filter(r => r.appliance.toLowerCase().includes(inputMenuWord));
        // const listUst = recipes.filter(r => r.ustensils.some(ustensil => ustensil.ustensils.toLowerCase().includes(inputMenuWord)));
         listUst = recipes.filter(r => r.ustensils.some(ustensil => ustensil.toLowerCase().includes(inputMenuWord)));


        // const finalSearchMenu = [...listIng, ...listApp,...listUst];
        finalRecipes = [...listIng, ...listApp,...listUst];

        // console.log(finalSearchMenu);
        console.log("finalRecipes searchInMenu :", finalRecipes);

        // const doublesInMenu = Array.from(new Set(finalSearchMenu).values());
        const doublesInMenu = Array.from(new Set(finalRecipes).values());

        if (doublesInMenu.length === 0) {
            noResultsMessage.textContent = `Aucune recette ne contient ‘${inputMenuWord}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
        }

        const ingredientsFlatt = doublesInMenu.map((r) => r.ingredients.map((i) => i)).flat();
        const ustensilsFlatt = doublesInMenu.map((r) => r.ustensils.map((u) => u)).flat();
        const appliancess = doublesInMenu.map((r) => r.appliance);

        // resetElementLi();
        resetDropdown();
        resetCards();

        loadDropdownElements(ingredientsFlatt, "ingredient");
        loadDropdownElements(ustensilsFlatt, "ustensils");
        loadDropdownElements(appliancess, "appliance");

        clickOnElement();
        const listItems = document.querySelectorAll('.li_menu');

        listItems.forEach(item => {
            
            const text = item.textContent.trim().toLowerCase();
            if (text.includes(inputMenuWord)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // finalSearchMenu.forEach((recipe) => cardTemplate(recipe));
        doublesInMenu.forEach((recipe) => cardTemplate(recipe));


    } else {
        resetCards();
        loadData();
    }

};

const searchinMenu = document.getElementById("search-in-menu1");
const searchinMenu2 = document.getElementById("search-in-menu2");
const searchinMenu3 = document.getElementById("search-in-menu3");
searchinMenu.addEventListener('input', searchInMenu);
searchinMenu2.addEventListener('input', searchInMenu);
searchinMenu3.addEventListener('input', searchInMenu);

// _____________________________________


const searchBar = document.getElementById('search_bar');
searchBar.addEventListener('input', searchHandler);

// CHARGEMENT DES DONNEES POUR LES CARDS ET LES LISTES MENUS

function loadData () {
    resetDropdown();
    const ingredientsFlat = recipes.map((r) => r.ingredients.map((i) => i)).flat();
    const ustensilsFlat = recipes.map((r) => r.ustensils.map((u) => u)).flat();
    const appliances = recipes.map((r) => r.appliance);
    loadDropdownElements(ingredientsFlat, "ingredient");
    loadDropdownElements(ustensilsFlat, "ustensils");
    loadDropdownElements(appliances, "appliance");

    recipes.forEach((recipe) => cardTemplate(recipe));
}

// AFFICHAGE DES INGREDIENTS DANS LES CARDS

export function listIngredient(ingredients) {
    const liste = document.createElement("ul");
    liste.className = "all_ingredients";

    ingredients.forEach((ingredient) => {
        const div_elementList = document.createElement("div");
        div_elementList.className = "one_blocIng";
        
        const elementList = document.createElement("li");
        elementList.className = "element_list";

        const quantity_unit = document.createElement("li");
        quantity_unit.className = "quantity_unit";

        elementList.textContent = ingredient.ingredient;
        
        // On vérifie si l'unité est définie
        if (ingredient.unit) {
            quantity_unit.textContent = ingredient.quantity + ' ' + ingredient.unit;
        } else {
            // Si l'unité n'est pas définie, on affiche simplement la quantité
            quantity_unit.textContent = ingredient.quantity;
        }

        div_elementList.appendChild(elementList);
        div_elementList.appendChild(quantity_unit);
        
        /*
        liste.appendChild(elementList);
        liste.appendChild(quantity_unit);
        */
        liste.appendChild(div_elementList);
    });
    return liste;
}

// CREATION DES CARDS

// const displayedRecipeIds = new Set();


// function resetDisplayedRecipeIds() {
//     displayedRecipeIds.clear();
// }


export function cardTemplate (recipe)  {
    const {  image, name, description, ingredients, time, quantity, unit} = recipe;
    // console.log(ingredients);

    // if (displayedRecipeIds.has(id)) {
    //     return; // Si oui, ne pas afficher la recette
    // }
    // displayedRecipeIds.add(id);

    // console.log("Recette sans doublons :", displayedRecipeIds);

    const article = document.querySelector(".all_cards");
    const card = document.createElement("div");
    card.className = "card";

    const card_intern = document.createElement("div");
    card_intern.className = "card_intern";

    const img = document.createElement("img");
    
    img.src = ("media/Photos P7 JS Les petits plats/")+image;

    const time_recipe = document.createElement("div");
    time_recipe.className = "time_recipe";
    time_recipe.innerHTML = time + 'mn';

    const card_content = document.createElement("div");
    card_content.className = "card_content";
    const h2 = document.createElement("h2");
    h2.innerHTML = name;

    const div_recette = document.createElement("div");
    div_recette.className = "recette";
    const h3 = document.createElement("h3");
    h3.innerHTML = 'RECETTE';
    const p_description = document.createElement("p");
    p_description.innerHTML = description;
    p_description.className = "p_description";

    const h3_ing = document.createElement("h3");
    h3_ing.innerHTML = 'INGREDIENTS'

    const maListe = listIngredient(ingredients);

    card_intern.appendChild(img);
    card_intern.appendChild(time_recipe);
    card_intern.appendChild(card_content);
    card_content.appendChild(h2);

    card_intern.appendChild(div_recette);
    card_content.appendChild(div_recette);
    div_recette.appendChild(h3);
    div_recette.appendChild(p_description);
    card_intern.appendChild(h3_ing);
    card_content.appendChild(h3_ing);
    
    card_intern.appendChild(card_content);
    card_intern.appendChild(maListe); 
    card.appendChild(card_intern);  
    article.appendChild(card);
    
    return article;
}

// loadData();

 // CREATION ET GESTION DES TAGS

const allBlocsTags = document.querySelector('.allBlocsTags');

const DoublesTags = new Set();
// const DoublesTags = Array.from(new Set(finalRecipes).values());

function tag(event) {
    console.log("Tag clicked");
    const valueLiMenu = event.target.textContent.toLowerCase();
    // const DoublesTags = Array.from(new Set(finalRecipes).values());

    const uniqueRecipes = new Set(finalRecipes);
    finalRecipes = [...uniqueRecipes].filter((recipe) => { 
        // recipes le changer par finalRecipes
        return (
            recipe.name.toLowerCase().includes(valueLiMenu) ||
            recipe.description.toLowerCase().includes(valueLiMenu) ||
            recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(valueLiMenu)) ||
            recipe.appliance.toLowerCase().includes(valueLiMenu) ||
            recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(valueLiMenu))
        );
    });
    console.log(uniqueRecipes);
    console.log("finalRecipes de Tag :", finalRecipes);
    
    // finalRecipes = [...searchResultsName, ...searchResultsDesc, ...searchResultsIng, ...listIng, ...listApp,...listUst];
    
    resetCards();

    finalRecipes.forEach((recipe) => cardTemplate(recipe));

    if (!DoublesTags.has(valueLiMenu)) {

        DoublesTags.add(valueLiMenu);
    
        const blocTag_menu = document.createElement('div');
        blocTag_menu.className = 'blocTag_menu';

        const liTag_menu = document.createElement('p');
        liTag_menu.className = 'liTag_menu';
        liTag_menu.textContent = valueLiMenu;

        const btnClose = document.createElement('button');
        btnClose.className = 'btnClose';
        btnClose.textContent = 'x';

        blocTag_menu.appendChild(liTag_menu);
        blocTag_menu.appendChild(btnClose);

        allBlocsTags.appendChild(blocTag_menu);

        btnClose.addEventListener('click', () => {
            blocTag_menu.style.display = 'none';
            DoublesTags.delete(valueLiMenu);
            resetCards();
            loadData();            
            
        });

        // finalRecipes.forEach((recipe) => cardTemplate(recipe));

    } 
    // else {
    //     resetCards();
    //     loadData();
    // }
}

// CREATION DES ELEMENTS DANS LES LISTES MENUS

export function clickOnElement(){
    console.log("dggdg");
    const li_menu = document.querySelectorAll('.li_menu');

    li_menu.forEach(li => {
        li.addEventListener('click', tag);
    });
}

loadData();