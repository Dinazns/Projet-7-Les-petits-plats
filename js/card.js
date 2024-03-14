import { recipes } from "./recipes.js";

const searchHandler = function(e) {
    console.log(e.target.value);
    const word = e.target.value ?? "";
    if (word.length >=3) {
        const searchResultsName = recipes.filter((r) => r.name.toLowerCase().includes(word.toLowerCase()));
        console.log(searchResultsName)

        const searchResultsDesc = recipes.filter((r) => r.description.toLowerCase().includes(word.toLowerCase()));
        console.log(searchResultsDesc)   
        
        const searchResultsIng = recipes.filter(r => {
            return r.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word.toLowerCase()));
        });

        console.log(searchResultsIng)  
    }
    // e.forEach((e_ingredient) => {
    //     const searchResultsIng = recipes.filter((r) => r.e_ingredient.ingredient.toLowerCase().includes(word.toLowerCase()));
    //     console.log(searchResultsIng)
    // })
  }


const searchBar = document.getElementById('search_bar');
searchBar.addEventListener('input', searchHandler);

function loadData () {
    recipes.forEach((recipe) => {
        console.log(cardTemplate(recipe));
    })
}


function listIngredient(ingredients) {
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
        
        // Vérifie si l'unité est définie
        if (ingredient.unit) {
            quantity_unit.textContent = ingredient.quantity + ' ' + ingredient.unit;
        } else {
            // Si l'unité n'est pas définie, affiche simplement la quantité
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
    p_description.className = "p_description";

    const h3_ing = document.createElement("h3");
    h3_ing.innerHTML = 'INGREDIENTS'

    const maListe = listIngredient(ingredients);

    // const all_ingredients = document.createElement("div");
    // all_ingredients.className = "all_ingredients";
    // const ing = document.createElement("div");
    // ing.className = "ingredients";
    // // all_ingredients.innerHTML = ingredients;
    // const p_ing = document.createElement("p");
    // const p_unit = document.createElement("p");

    // p_ing.appendChild(maListe);
    // p_unit.innerHTML = quantity + unit;
    



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
    
    // card_intern.appendChild(all_ingredients);
    // card_content.appendChild(all_ingredients);
    // all_ingredients.appendChild(ing);
    // ing.appendChild(p_ing);
    // ing.appendChild(p_unit);

    card_intern.appendChild(card_content);
    card_intern.appendChild(maListe); 
    card.appendChild(card_intern);  
    article.appendChild(card);
    
    return article;
}

loadData();
