import { recipes } from "./recipes.js";
import { loadDropdownElements } from "./menu.js";
import { ul_ingMenu1, ul_ingMenu2, ul_ingMenu3 } from "./menu.js";

export const appArrayResult = [];

let finalRecipes = [...recipes]; 

let searchResultsName = [];
let searchResultsDesc = [];
let searchResultsIng = [];
let listIng = [];
let listApp = [];
let listUst = [];

function CountRecipe() {
    const recipeCards = document.querySelectorAll('.all_cards .card');
    countElements(recipeCards)
}

function countElements(elts){
    const recipeCountElement = document.querySelector('.totalNumberRecipe');
    recipeCountElement.textContent = `${elts.length} recettes`;
}

function renderRecipes(recipeList) {
    recipeList.forEach(recipe => cardTemplate(recipe));
    countElements(recipeList);
}

function resetCards() {
    console.log("Reset cards and tags");
    const all_cards = document.querySelectorAll(".all_cards .card");
    all_cards.forEach(card => card.remove());
}

function resetDropdown() {
    ul_ingMenu1.innerHTML = '';
    ul_ingMenu2.innerHTML = '';
    ul_ingMenu3.innerHTML = '';
}

// BARRE DE RECHERCHE PRINCIPALE__________________________________

const searchHandler = function(searchQuery) {
    const word = searchQuery.toLowerCase() ?? "";

    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.textContent = '';

    if (word.length >= 3) {
        searchResultsName = recipes.filter(r => r.name.toLowerCase().includes(word));
        searchResultsDesc = recipes.filter(r => r.description.toLowerCase().includes(word));
        searchResultsIng = recipes.filter(r => 
            r.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word))
        );

        finalRecipes = [...searchResultsName, ...searchResultsDesc, ...searchResultsIng];
        console.log("finalRecipes searchHandler :", finalRecipes);

        const removeDoubles = Array.from(new Set(finalRecipes));

        if (removeDoubles.length === 0) {
            noResultsMessage.textContent = `Aucune recette ne contient ‘${word}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
        }

        const ingredientsFlat = removeDoubles.flatMap(r => r.ingredients);
        const ustensilsFlat = removeDoubles.flatMap(r => r.ustensils);
        const appliances = removeDoubles.map(r => r.appliance);

        resetDropdown();

        loadDropdownElements(ingredientsFlat, "ingredient");
        loadDropdownElements(ustensilsFlat, "ustensils");
        loadDropdownElements(appliances, "appliance");
        clickOnElement();
        resetCards();
        renderRecipes(removeDoubles);
        CountRecipe();
        
    } else {
        resetCards();
        CountRecipe();
        loadData();
    }
}

// RECHERCHE AVANCEES DANS LES LISTES MENUS__________________________________

function searchInMenu(el) {
    console.log(el.target.value);
    console.log(el.target.id);
    const inputMenuWord = el.target.value.toLowerCase() ?? "";

    const noResultsMessage = document.getElementById('no-results-message');
    noResultsMessage.textContent = '';

    if (inputMenuWord.length >= 3) {
        let menuResults = new Set();

        if (el.target.id === 'search-in-menu1') {
            menuResults = new Set(recipes.filter(r => 
                r.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputMenuWord))
            ));
            updateMenuList('ingredients-list', Array.from(menuResults), inputMenuWord, 'ingredient');
        } else if (el.target.id === 'search-in-menu2') {
            menuResults = new Set(recipes.filter(r => 
                r.appliance.toLowerCase().includes(inputMenuWord)
            ));
            updateMenuList('appareils-list', Array.from(menuResults), inputMenuWord, 'appliance');
        } else if (el.target.id === 'search-in-menu3') {
            menuResults = new Set(recipes.filter(r => 
                r.ustensils.some(ustensil => ustensil.toLowerCase().includes(inputMenuWord))
            ));
            updateMenuList('ustensils-list', Array.from(menuResults), inputMenuWord, 'ustensil');
        }

        if (menuResults.size === 0) {
            noResultsMessage.textContent = `Aucune recette ne contient ‘${inputMenuWord}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
        }

        resetCards();
        renderRecipes(Array.from(menuResults));

    } else {
        resetCards();
        loadData();
    }

    clickOnElement();
}

function updateMenuList(menuId, items, searchQuery, type) {
    const menuList = document.getElementById(menuId);
    menuList.innerHTML = '';

    const uniqueItems = new Set();

    items.forEach(item => {
        if (type === 'ingredient') {
            item.ingredients.forEach(ingredient => {
                if (ingredient.ingredient.toLowerCase().includes(searchQuery)) {
                    uniqueItems.add(ingredient.ingredient.toLowerCase());
                    console.log(ingredient.ingredient);
                }
            });
        } else if (type === 'appliance') {
            if (item.appliance.toLowerCase().includes(searchQuery)) {
                uniqueItems.add(item.appliance.toLowerCase());
            }
        } else if (type === 'ustensil') {
            item.ustensils.forEach(ustensil => {
                if (ustensil.toLowerCase().includes(searchQuery)) {
                    uniqueItems.add(ustensil.toLowerCase());
                }
            });
        }
    });

    uniqueItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'li_menu';
        listItem.textContent = item;
        menuList.appendChild(listItem);
    });
    clickOnElement();
}

const searchinMenu1 = document.getElementById("search-in-menu1");
const searchinMenu2 = document.getElementById("search-in-menu2");
const searchinMenu3 = document.getElementById("search-in-menu3");

searchinMenu1.addEventListener('input', searchInMenu);
searchinMenu2.addEventListener('input', searchInMenu);
searchinMenu3.addEventListener('input', searchInMenu);

function clearTagsInput() {
    const inputsList = [searchinMenu1, searchinMenu2, searchinMenu3];

    inputsList.forEach(input => {
        input.value = "";
    });
        
    resetDropdown();
    loadDropdown();
    clickOnElement();
}

// CHARGEMENT DES DONNEES POUR LES CARDS ET LES LISTES MENUS

function loadDropdown() {
    const ingredientsFlat = recipes.flatMap(r => r.ingredients);
    const ustensilsFlat = recipes.flatMap(r => r.ustensils);
    const appliances = recipes.map(r => r.appliance);

    loadDropdownElements(ingredientsFlat, "ingredient");
    loadDropdownElements(ustensilsFlat, "ustensils");
    loadDropdownElements(appliances, "appliance");
}

function loadData () {
    resetDropdown();
    loadDropdown();
    renderRecipes(recipes);
}

// AFFICHAGE DES INGREDIENTS DANS LES CARDS

export function listIngredient(ingredients) {
    const liste = document.createElement("ul");
    liste.className = "all_ingredients";

    ingredients.forEach(ingredient => {
        const div_elementList = document.createElement("div");
        div_elementList.className = "one_blocIng";
        
        const elementList = document.createElement("li");
        elementList.className = "element_list";

        const quantity_unit = document.createElement("li");
        quantity_unit.className = "quantity_unit";

        elementList.textContent = ingredient.ingredient;

        if (ingredient.unit) {
            quantity_unit.textContent = ingredient.quantity + ' ' + ingredient.unit;
        } else {
            quantity_unit.textContent = ingredient.quantity;
        }

        div_elementList.appendChild(elementList);
        div_elementList.appendChild(quantity_unit);
        liste.appendChild(div_elementList);
    });

    return liste;
}

// CREATION DES CARDS

export function cardTemplate(recipe)  {
    const { image, name, description, ingredients, time } = recipe;

    const article = document.querySelector(".all_cards");
    const card = document.createElement("div");
    card.className = "card";

    const card_intern = document.createElement("div");
    card_intern.className = "card_intern";

    const img = document.createElement("img");
    img.src = ("media/Photos P7 JS Les petits plats/") + image;

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
    h3_ing.innerHTML = 'INGREDIENTS';

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

// GESTION DES TAGS

const allBlocsTags = document.querySelector('.allBlocsTags');
const DoublesTags = new Set();
let searchWord = ""; // Variable pour stocker le mot de la barre de recherche

// Fonction de filtrage par tags
function filterRecipesByTags() {
    let filteredRecipes = [...recipes];

    if (DoublesTags.size > 0) {
        const tagsArray = Array.from(DoublesTags);
    
        tagsArray.forEach(tag => {
            const loweredTag = tag.toLowerCase();
            filteredRecipes = filteredRecipes.filter(recipe => {
                const ingredientMatch = recipe.ingredients.some(ingredient => 
                    ingredient.ingredient.toLowerCase().includes(loweredTag)
                );

                const ustensilMatch = recipe.ustensils.some(ustensil => 
                    ustensil.toLowerCase().includes(loweredTag)
                );

                return (
                    recipe.name.toLowerCase().includes(loweredTag) ||
                    recipe.description.toLowerCase().includes(loweredTag) ||
                    ingredientMatch ||
                    recipe.appliance.toLowerCase().includes(loweredTag) ||
                    ustensilMatch
                );
            });
        });
    } else if (searchWord.length >= 3) {
        // Si aucun tag présent, filtre en fonction de la barre de recherche
        searchHandler(searchWord);
        return;
    }

    finalRecipes = filteredRecipes;

    resetCards();
    renderRecipes(finalRecipes);
    CountRecipe();
}

// Fonction de gestion des tags
function tag(event) {
    const valueLiMenu = event.target.textContent.toLowerCase();

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
            blocTag_menu.remove(); // Supprime le tag de l'UI
            DoublesTags.delete(valueLiMenu); // Supprime le tag de l'ensemble

            clearTagsInput();
            filterRecipesByTags(); // Filtrer les recettes avec les tags restants
        });
    }

    clearTagsInput();
    filterRecipesByTags(); // Filtrer les recettes avec les tags ajoutés
}

// Gestion de la recherche principale
const searchBar = document.getElementById('search_bar');
searchBar.addEventListener('input', e => {
    searchWord = e.target.value.toLowerCase();
    filterRecipesByTags();
});

// Création des éléments dans les listes menus
export function clickOnElement() {     
    const li_menu = document.querySelectorAll('.li_menu');

    li_menu.forEach(li => li.addEventListener('click', tag));
}

loadData();
