import { graphParams } from './user-pages.js';
import { graphEquation } from './graph-equation.js';

export const ui = () => {
    const clickMenu = (event) => {
        const menuItem = event.target.closest('.menu-functions');
        console.log(menuItem);
        const openMenu = (openDivs, openParams, event) => {
            console.log(menuItem.id);
            if (openDivs.length > 0) {
                openDivs.forEach(e => e.className = 'menu-functions');
                openParams.forEach(e => e.className = 'paramater-panel');
            }
            menuItem.className = 'menu-functions-open';
            document.querySelector(`#parameter-panel-${menuItem.id}`).className = 'parameter-panel-open';
            document.querySelector('#visualise-panel').className = 'visualise-panel-params';
            graphEquation(graphParams, true);
        };

        if (menuItem) openMenu(document.querySelectorAll('.menu-functions-open'), document.querySelectorAll('.parameter-panel-open'), event);

    };

    const menuPanel = () => {
        const menuDiv = document.querySelector("#menu-panel")
        menuDiv.addEventListener('click', clickMenu);
    };
    menuPanel();
};


