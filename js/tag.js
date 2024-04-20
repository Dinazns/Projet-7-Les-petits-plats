const allBlocsTags = document.querySelector('.allBlocsTags');
// allBlocsTags.className = 'allBlocsTags';


function tag(event) {
    const valueLiMenu = event.target.textContent;
    
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
    });
}


const li_menu = document.querySelectorAll('.li_menu');

li_menu.forEach(li => {
    li.addEventListener('click', tag);
});