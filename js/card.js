import { recipes } from "./recipes.js";

function loadData () {
    recipes.forEach((recipe) => {
        console.log(cardTemplate(recipe));
    })
}

function listIngredient (ingredients) {

    ingredients.forEach((ingredient) => {

    })

};


function cardTemplate (recipe)  {
    const { image, name, description, ingredients, time, quantity, unit} = recipe;
    console.log(ingredients);
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

    const h2_ing = document.createElement("h2");
    h2_ing.innerHTML = 'INGREDIENTS'

    const all_ingredients = document.createElement("div");
    all_ingredients.className = "all_ingredients";
    const ing = document.createElement("div");
    ing.className = "ingredients";
    // all_ingredients.innerHTML = ingredients;
    const p_ing = document.createElement("p");
    const p_unit = document.createElement("p");

    p_ing.innerHTML = ingredients;
    p_unit.innerHTML = quantity + unit;


    card_intern.appendChild(img);
    card_intern.appendChild(time_recipe);
    card_intern.appendChild(card_content);
    card_content.appendChild(h2);

    card_intern.appendChild(div_recette);
    card_content.appendChild(div_recette);
    div_recette.appendChild(h3);
    div_recette.appendChild(p_description);
    card_intern.appendChild(h2_ing);
    card_content.appendChild(h2_ing);
    
    card_intern.appendChild(all_ingredients);
    card_content.appendChild(all_ingredients);
    all_ingredients.appendChild(ing);
    ing.appendChild(p_ing);
    ing.appendChild(p_unit);

    card_intern.appendChild(card_content);
    card.appendChild(card_intern);  
    article.appendChild(card);
    
    return article;
}

loadData();
