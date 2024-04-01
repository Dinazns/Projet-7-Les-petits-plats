import { recipes } from "./recipes.js";

// Parcours chaque recette
recipes.forEach((recipe) => {

    const ingredients = recipe.ingredients;
    const appareils = recipe.appliance;
    const ustensils = recipe.ustensils;

    // Parcours chaque ingrédient/ustensile/appareil de la recette
    ingredients.forEach((ingredient) => {
        // Affiche chaque ingrédient
        const ul_ingMenu = document.getElementById("ingredients-list");
        const li_1 = document.createElement('li');
        // const div_elementList = document.getElementsByClassName('menu_hidden');
        li_1.textContent = ingredient.ingredient;

        // div_elementList.appendChild(ul_ingMenu);
        ul_ingMenu.appendChild(li_1);

        // console.log(ingredient.ingredient);
    });

        const ul_ingMenu2 = document.getElementById("appareils-list");
        const li_2 = document.createElement('li');
        li_2.textContent = appareils;

        ul_ingMenu2.appendChild(li_2);

        const ul_ingMenu3 = document.getElementById("ustensils-list");
        ustensils.forEach((ustensil) => {
            const li_3 = document.createElement('li');
            li_3.textContent = ustensil;
            ul_ingMenu3.appendChild(li_3);
        });

});







