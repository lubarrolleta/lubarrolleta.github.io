import { methodoInicio } from "./index.js";
import Input from "./Input.js";
// FUNCION IIFE DE INICIO
(function() {
    "use strict";
    // const name = 'luis';
    // 👉 CREACION DE VARIABLES
    const variables = {
        nav: document.querySelector("nav.navbar"),
        data: null,
        limit: 48,
        ofset: 0,
        dataStore: {
            name: "data",
            data: [],
        },
    };
    const setData = (data) => {
        console.log(data, "VIENE DE INPUT");
    };
    // 👉 CREACION DE METODOS
    const metodos = {
        inicio: () => {
            // Input(variables.nav, variables.data)
            metodos.addInput();
            Input(metodos.createCart, null);
            const dataUser = metodos.createSection.getStorage();
            // console.log(dataUser, "data🔴");
            // dataUser.split(',').map(data => console.log(data))
            if (dataUser) {
                variables.dataStore.data.push(dataUser.split(",").map((data) => data));
            }
        },
        addContentInput: (data) => {
            data.target.parentNode.parentNode.parentNode.firstChild.value =
                data.target.textContent;
            Input(metodos.createCart, data.target.textContent, 48, 0);
            window.scroll(0, 0);
        },

        addDeplegable: (parent, show) => {
            const dataUser = metodos.createSection.getStorage();
            // console.log(show);

            const containerP = document.createElement("article");
            containerP.className = "article";

            parent.className = "show";
            parent.replaceChildren(containerP);

            // show = false

            // console.log(parent.parentNode.firstChild);
            // parent.parentNode.firstChild.removeEventListener('click', (e) => { metodos.addDeplegable }, false)
            dataUser && dataUser.length !== 0 &&
                dataUser.split(",")
                .reverse()
                .map((data) => {
                    if (data.length !== 0) {
                        const p = document.createElement("p");
                        p.className = "p";
                        // p.className
                        const contenP = document.createTextNode(data);
                        p.appendChild(contenP);
                        p.addEventListener(
                            "click",
                            (e) => {
                                metodos.addContentInput(e);
                            },
                            false
                        );
                        containerP.appendChild(p);
                    }
                });
        },
        addInput: () => {
            const form = document.createElement("form");
            const divDesplegable = document.createElement("section");
            divDesplegable.className = "divDesplegable";
            // const p =
            form.addEventListener('submit', (e) => {
                e.preventDefault()
            }, false)
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.className = "input";
            input.setAttribute("placeholder", "search");
            input.addEventListener(
                "change",
                (e) => {
                    // console.log(e.target.value)
                    let dataUser = variables.dataStore.data;
                    if (e.target.value.length !== 0) dataUser.push(e.target.value);
                    Input(metodos.createCart, e.target.value || null, 48, 0);
                    variables.data = e.target.value;
                    window.scrollTo(0, 0);
                    // const datosSearch = [metodos.createSection.setStorage()];
                    // metodos.createSection.setStorage(e.target.value.toString());
                    // console.log(metodos.createSection.getStorage(), "search✅✅");

                    if (metodos.createSection.getStorage()) {
                        metodos.createSection.setStorage();
                    } else {
                        metodos.createSection.setStorage();
                    }

                    // metodos.createSection.getStorage().split(',').map((iten) => console.log(iten))
                },
                false
            );
            input.addEventListener("keyup", (e) => {
                Input(metodos.createCart, e.target.value || null, 48, 0);
                variables.data = e.target.value;
                window.scrollTo(0, 0);
            });
            // EVENTO FOCUS
            input.addEventListener(
                "click",
                (e) => metodos.addDeplegable(divDesplegable),
                false
            );
            input.addEventListener(
                "focusout",
                () => {
                    setTimeout(() => {
                        divDesplegable.className = "divDesplegable";
                    }, 200);
                },
                false
            );
            form.appendChild(input);
            form.appendChild(divDesplegable);

            variables.nav.appendChild(form);
        },
        scroll: () => {
            let contenedor = document.querySelector("section.containerCard");
            // console.log(contenedor);
            contenedor = onscroll = (e) => {
                // console.log(e.target.body.querySelector('section.containerCard').offsetHeight);
                // console.log(document.body, 'BODY🚀');
                // console.log(document.documentElement.clientHeight, 'clientHeight')
                // console.log(document.documentElement.scrollHeight, 'scrollHeight')
                // console.log(document.documentElement.scrollTop, 'scrollTop')
                // console.log(document.documentElement.scrollTop + document.documentElement.clientHeight, 'SUMA');
                if (
                    document.documentElement.scrollTop +
                    document.documentElement.clientHeight >=
                    document.documentElement.scrollHeight
                ) {
                    // console.log(true)
                    // console.log(variables.data, 'VARIABLES')
                    Input(
                        metodos.createCart,
                        variables.data,
                        variables.limit,
                        (variables.ofset += 25)
                    );
                    // console.log(variables.ofset, 'VARIABLES OFFSET');
                } else {
                    // console.log(false);
                }
                // console.log(document.querySelector("section.containerCard"))
            };
        },
        createSection: {
            setStorage: () => {
                localStorage.setItem(
                    variables.dataStore.name,
                    variables.dataStore.data
                );
            },
            getStorage: () => {
                return localStorage.getItem(variables.dataStore.name);
            },
            removeStorage: () => {},
        },
        createContentNoData: (data) => {
            console.log(data.parentNode);
            data.className = "containerCard trending";
            const noData = document.createElement("h2");
            const content = `<h2>No Data <br/> See More Trending</h2>`;
            noData.innerHTML = content;
            data.replaceChildren(noData);
        },
        createCart: (data, scroll) => {
            console.log(data);
            console.log("🔴🔴SCROLL🔴🔴", scroll);
            const contenedor = document.querySelector("#app");
            // const contenedorCard = document.querySelector("section.containerCard");
            const contenedorCard =
                data && data.length !== 0 && document.createElement("section");
            contenedorCard.className =
                data && data.data.length !== 0 && "containerCard trending";
            scroll
                ?
                contenedor.querySelector("main").replaceChildren(contenedorCard) :
                contenedor.querySelector("main").appendChild(contenedorCard);

            data && data.data.length !== 0 ?
                data.data.map((poke, i) => {
                    const div = document.createElement("div");
                    const P = document.createElement("p");
                    div.className = "pokemonCard";
                    div.id = poke.title.replace(/ |&|,|@|'|[.]|[0-9]/g, "") || "title";
                    P.style.cursor = "pointer";
                    const contenidoDiv = document.createTextNode(poke.title);
                    const Img = document.createElement("img");
                    Img.src = poke.images.original.url;
                    Img.className = "img";
                    div.appendChild(P);
                    P.appendChild(contenidoDiv);

                    div.appendChild(Img);
                    contenedorCard.appendChild(div);
                    // contenedorCard.parentNode.replaceChildren(contenedorCard)
                    // const divs = contenedor.querySelectorAll('div.pokemonCard');
                    // divs.forEach((card) => {
                    //         })
                    //     })
                    // divs.map((card) => console.log(card))
                    P.addEventListener(
                        "click",
                        (e) => {
                            e.target.parentNode.parentNode.removeChild(
                                e.target.parentNode.parentNode.querySelector(
                                    `#${e.target.parentNode.id}`
                                )
                            );
                        },
                        false
                    );
                }) :
                metodos.createContentNoData(contenedorCard);
            metodos.scroll();
        },
    };
    metodos.inicio();
})();