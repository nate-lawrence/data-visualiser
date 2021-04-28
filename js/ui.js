export const ui = () => {
    const clickMenu = (event) => {
        const menuItem = event.target.closest('.menu-functions');

        const openMenu = (openDivs) => {
            console.log(openDivs);
            if (openDivs.length > 0) openDivs.forEach(e => e.className = 'menu-functions');
            menuItem.className = 'menu-functions-open';
        };

        if (menuItem) openMenu(document.querySelectorAll('.menu-functions-open'));

    };

    const menuPanel = () => {
        const menuDiv = document.querySelector("#menu-panel")
        menuDiv.addEventListener('click', clickMenu);
    };
    menuPanel();
};


