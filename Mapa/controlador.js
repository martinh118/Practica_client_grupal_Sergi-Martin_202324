let id_comarca;
let div = "";
let contador = 0;
//dragenter
//dragdiv
//dragover
//drop
//dragstart

document.getElementById("comarques").addEventListener("dragstart", function (event) {
    id_comarca = event.target.id;
    div = document.getElementById(id_comarca);
    
    if(div.id != "comarques"){
        console.log(event.target.id);
    }
        
});

document.getElementById("comarques").addEventListener("dragend", function (event) {
   
        
});

document.getElementById("Catalunya").addEventListener("drop", function(event){
    event.preventDefault();
    let zona = event.target.id;
    let divZona = document.getElementById(zona);

    if(divZona.id != "Catalunya"){
        console.log("Drop in: " + divZona.id);
        let comarc = div.id.replace("_", "");
        //console.log("comarc: "+comarc);
        if (divZona.id == comarc) {
            divZona.setAttribute("fill", "green");
            divZona.setAttribute("class", "correct");
            contador++;
            document.getElementById("contador").innerHTML = contador;
            div.remove();
            mostrarCongrats();
        }else if(divZona.getAttribute("class") != "correct" && divZona.id != comarc){
            divZona.removeAttribute("fill");
        }   
    }
});

document.getElementById("Catalunya").addEventListener("dragover", function(event){
    event.preventDefault();
    let zona = event.target.id;
    let divZona = document.getElementById(zona);

    if(divZona.id != "Catalunya"){
        if(divZona.getAttribute("class") != "correct"){
            divZona.setAttribute("fill", "red");
        }
    }
});

document.getElementById("Catalunya").addEventListener("dragleave", function(event){
    event.preventDefault();
    let zona = event.target.id;
    let divZona = document.getElementById(zona);

    if(divZona.id != "Catalunya"){
        if(divZona.getAttribute("class") != "correct"){
            divZona.removeAttribute("fill");
        }
        
    }
});


function mostrarCongrats(){
    let elemento = document.createElement("h1");
    elemento.textContent = "CORRECTE!!";
    elemento.setAttribute("style", "text-align: center; color: white")
    let divMapa = document.getElementById("mapa");
    divMapa.insertBefore(elemento, divMapa.firstChild);
    setTimeout(function(){
        elemento.remove();
    }, 5000);
}