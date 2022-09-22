'use strict';
export const methodoInicio = {
    inicio: (content) => {
        const app = document.querySelector("body#app");
        app.innerHTML += content;
        // console.log(app);
    }
};