let id_comarca;
let div = "";
let contador = 0;
const svgNS = "http://www.w3.org/2000/svg";
//dragenter
//dragdiv
//dragover
//drop
//dragstart

$("#comarques").on("dragstart", function (event) {
    id_comarca = event.target.id;
    div = document.getElementById(id_comarca);

    if (div.id != "comarques") {
        console.log(event.target.id);
    }

});

document.getElementById("comarques").addEventListener("dragend", function (event) {


});



$("#Catalunya").on("drop", function (event) {
    event.preventDefault();
    let zona = event.target.id;
    let divZona = document.getElementById(zona);

    if (divZona.id != "Catalunya") {
        console.log("Drop in: " + divZona.id);
        let comarc = div.id.replace("_", "");
        //console.log("comarc: "+comarc);
        if (divZona.id == comarc) {

            var bbox = divZona.getBBox();
            var x = (bbox.x + bbox.width / 2) - 25;
            var y = (bbox.y + bbox.height / 2) + 15;

/** 
            let x = event.offsetX;
            let y = event.offsetY;
    */        
            mostrarNombre(comarc, x, y);

            divZona.setAttribute("fill", "green");
            divZona.setAttribute("class", "correct");
            contador++;
            document.getElementById("contador").innerHTML = contador;
            div.remove();
            mostrarCongrats();
        } else if (divZona.getAttribute("class") != "correct" && divZona.id != comarc) {
            divZona.removeAttribute("fill");
            mostrarIncorrecte();
        }
    }
});

function mostrarNombre(comarca, x , y) {
    let $prov = document.getElementById("Catalunya");
    let t = document.createElementNS(svgNS, "text");
    t.appendChild(document.createTextNode(comarca));
    //console.log("x: " + x + " - y: " + y + " - comarca: "+comarca);
    t.setAttribute("style", "position: absolute;font-size:20px");
    t.setAttribute("x", x);
    t.setAttribute("y", y);
    $prov.appendChild(t);
}

$("#Catalunya").on("dragover", function (event) {
    event.preventDefault();
    let zona = event.target.id;
    let divZona = document.getElementById(zona);

    if (divZona.id != "Catalunya") {
        if (divZona.getAttribute("class") != "correct") {
            divZona.setAttribute("fill", "red");
        }
    }
});

$("#Catalunya").on("dragleave", function (event) {
    event.preventDefault();
    let zona = event.target.id;
    let divZona = document.getElementById(zona);

    if (divZona.id != "Catalunya") {
        if (divZona.getAttribute("class") != "correct") {
            divZona.removeAttribute("fill");
        }

    }
});


function mostrarCongrats() {
    let elemento = document.createElement("h1");
    elemento.textContent = "CORRECTE!!";
    elemento.setAttribute("style", "text-align: center; color: green");
    elemento.setAttribute("id", "correcto");

    if(document.getElementById("correcto")){
        setTimeout(function () {
            elemento.remove();
        }, 5000);
    }else{
        
        $("#titulo").append(elemento);
        /** 
        let divMapa = document.getElementById("mapa");
        divMapa.insertBefore(elemento, divMapa.firstChild);
        */
        setTimeout(function () {
            elemento.remove();
        }, 5000);
    }
    
}

function mostrarIncorrecte() {
    let elemento = document.createElement("h1");
    elemento.textContent = "INCORRECTE!!";
    elemento.setAttribute("style", "text-align: center; color: red");
    elemento.setAttribute("id", "incorrecte");

    if(document.getElementById("incorrecte")){
        setTimeout(function () {
            elemento.remove();
        }, 3000);
    }else{
        
        $("#titulo").append(elemento);
        /** 
        let divMapa = document.getElementById("mapa");
        divMapa.insertBefore(elemento, divMapa.firstChild);
        */
        setTimeout(function () {
            elemento.remove();
        }, 3000);
    }
    
}