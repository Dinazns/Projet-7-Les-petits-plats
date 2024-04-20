// import { recipes } from "./recipes.js";
// import { cardTemplate, listIngredient } from "./card.js";

function isObject(variable) {
    return typeof variable === 'object' && variable !== null;
}
    
export const ul_ingMenu1 = document.getElementById("ingredients-list");
export const ul_ingMenu2 = document.getElementById("appareils-list");
export const ul_ingMenu3 = document.getElementById("ustensils-list");

export function loadDropdownElements(elements, type) {
    const removeDuplicates = Array.from(new Set(elements).values());
    const finalResults= new Set();

    removeDuplicates.forEach((e) => {
        const name = isObject(e) ? e[type].toLowerCase() : e; // si c'est un objet, je récup le type de l'objet sinn je prends l'élement tel quel
        finalResults.add(name); // ajoute le nom ou l'élément lui mm si c'est pas un objet à finalResults
    });
    
    switch(type) {
        case "ingredient":
            finalResults.forEach((e) => ul_ingMenu1.appendChild(createElement(e)));
            break;

        case "ustensils":
            finalResults.forEach((e) => ul_ingMenu3.appendChild(createElement(e)));
            break;
        
        case "appliance":
            finalResults.forEach((e) => ul_ingMenu2.appendChild(createElement(e)));
            break;

        default: break;
    }
}

function createElement (item) { 
    const li = document.createElement('li');
    li.textContent = item;
    li.className = 'li_menu';
    return li;
};

// export function resetElementLi (){
//     Array.from(ul_ingMenu1).forEach((li) => li.remove());
//     Array.from(ul_ingMenu2).forEach((li) => li.remove());
//     Array.from(ul_ingMenu3).forEach((li) => li.remove());
// };



