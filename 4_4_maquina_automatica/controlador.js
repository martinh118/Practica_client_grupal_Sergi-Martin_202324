let $numEntero = "";
let $numDecimal = "";
let eoc = "e"
let sumaPago = 0;

//Cuantitat de billets que ha introduit el client
let billetesCliente = {
    50:0,
    20:0,
    10:0,
    5:0,
    2:0,
    1:0,
    "05":0,
    "02":0,
    "01":0,
    "005":0,
    "002":0,
    "001":0
};

//Num de billets que hi ha a la caixa
let billetesCajero = {
    50:$("#caj50").attr("value"),
    20:$("#caj20").attr("value"),
    10:$("#caj10").attr("value"),
    5:$("#caj5").attr("value"),
    2:$("#caj2").attr("value"),
    1:$("#caj1").attr("value"),
    "05":$("#caj05").attr("value"),
    "02":$("#caj02").attr("value"),
    "01":$("#caj01").attr("value"),
    "005":$("#caj005").attr("value"),
    "002":$("#caj002").attr("value"),
    "001":$("#caj001").attr("value")
};

if ($numEntero == ""){
    $(".pantallaCalc").html("<h2>0,00€</h2>");
}

//Funció per a detectar les tecles que introdueixes per teclat
window.addEventListener("keydown", function(e) {;
    //eliminar
    if(e.key == "Backspace"){
        if(eoc == "c"){
            if ($numDecimal == ""){
                $numEntero = $numEntero.substring(0, $numEntero.length - 1);
                //canvar de deimal a enter
                eoc = "e";
            }else{
                $numDecimal = $numDecimal.substring(0, $numDecimal.length - 1);
            }
            
            mostrarPantalla($numEntero, $numDecimal)
    
            return;
        }else{
            $numEntero = $numEntero.substring(0, $numEntero.length - 1);
            mostrarPantalla($numEntero, $numDecimal);
        }
    }else if(e.key == "," || e.key == "."){
        //Canviar de enter a decimal
        eoc = "c";
    }
    else if(e.key == "Enter"){
        //Pagar
        realizarPago();
    }
    else if(e.key == "0" || e.key == "1" || e.key == "2" || e.key == "3" || e.key == "4" || e.key == "5" || e.key == "6" || e.key == "7" || e.key == "8" || e.key == "9"){
        if(eoc == "c"){
            $numDecimal += e.key;
            mostrarPantalla($numEntero, $numDecimal);
        }else{
            $numEntero += e.key;
            mostrarPantalla($numEntero, $numDecimal);
        }
    }
});


//Funció per a que el caixer introdueixi els el import
let $teclas = $(".teclaCalc").on("click", function(){
    let $num = $(this).text();
    //let $pantalla =  $(".pantallaCalc").text();  

    $num = $num.trim();

    if(eoc == "c"){
        if ($num == "←"){                  
            //$pantalla = $pantalla.substring(0, $pantalla.length - 2);

            if ($numDecimal == ""){
                $numEntero = $numEntero.substring(0, $numEntero.length - 1);
                //canvar de deimal a enter
                eoc = "e";
            }else{
                $numDecimal = $numDecimal.substring(0, $numDecimal.length - 1);
            }
            
            mostrarPantalla($numEntero, $numDecimal)
    
            return;
        }      
        else{
            $numDecimal += $num;            
            mostrarPantalla($numEntero, $numDecimal);

        }
    }else if($num == ","){
        //Canviar de enter a decimal
        eoc = "c";
    }else{
        if ($num == "←"){
                   
            //$pantalla = $pantalla.substring(0, $pantalla.length - 2);
            $numEntero = $numEntero.substring(0, $numEntero.length - 1);
            mostrarPantalla($numEntero, $numDecimal);   
            return;
        }else{

            $numEntero += $num;            
            mostrarPantalla($numEntero, $numDecimal);
            
        }

    }    

});

//Funció per a mostrar el import a la pantalla
function mostrarPantalla($numEntero, $numDecimal){

    if ($numDecimal.length == 1){
        $numDecimal = $numDecimal + "0";
    }else if($numDecimal.length == 0){
        $numDecimal = "00";
    }else if($numDecimal.length > 2){
        alert("No pots introduir més de dos decimals");
        $numDecimal = $numDecimal.substring(0, $numDecimal.length - 1);
    }

    if ($numEntero.length == 0){
        $numEntero = "0";
    }else if($numEntero.length > 4){
        alert("No pots introduir més de 5 numeros");
        $numEntero = $numEntero.substring(0, $numEntero.length - 1);
    }

    $(".pantallaCalc").html("<h2>"+$numEntero+","+$numDecimal+"€</h2>");
}


//Funció per a que el empleat introdueixi els billets
let $billetes = $(".billete").on("click", function(){
    let $num = $(this).attr("value");

    billetesCliente[$num] += 1;

    //console.log($num);
    sumaPago = parseFloat((sumaPago + parseFloat($num)).toFixed(2));
    console.log(sumaPago);
    $("#pagamentTotal").html(sumaPago + "€");
});

//Funció per a que el client introdueixi les monedes
let $monedas = $(".moneda").on("click", function(){
    let $num = $(this).attr("value");

    if( $num.includes(".")){
        let cent = $num.replace(".", "");
        billetesCliente[cent] += 1;
    }else billetesCliente[$num] += 1;
    
    //console.log($num);
    sumaPago = parseFloat((sumaPago + parseFloat($num)).toFixed(2));
    console.log(sumaPago);
    $("#pagamentTotal").html(sumaPago+ "€");
    console.log($(".pantallaCalc").html());
});

$(".pagar").click(realizarPago)


function realizarPago(){
    //console.log("pagar");
    let infoHtml = "";
    let cliente = sumaPago;
    let $cajero = $(".pantallaCalc").text();
    $cajero = $cajero.trim();

    if($cajero == "€"){
        $cajero = 0;   
        infoHtml = "<b>Diners Caixer: </b>" + $cajero + "€";
        infoHtml += "<br><b>Diners Client: </b>" + cliente + "€";
        infoHtml += "<br><b>Diners a retornar: </b>" + cliente + "€";
        $("#retorn").html(infoHtml);
        return;    
    }
    
    $cajero = parseFloat($cajero.replace("€", "").replace(",", "."));
    infoHtml = "<b>Diners Caixer: </b>" + $cajero + "€";
    infoHtml += "<br><b>Diners Client: </b>" + cliente + "€";

    if($cajero <= cliente){
        let retorn = (cliente - $cajero).toFixed(2);
        infoHtml += "<br><b>Diners a retornar: </b>" + retorn + "€";

        for (const key in billetesCliente) {
           $("#caj" + key).attr("value", (parseFloat(billetesCajero[key]) + billetesCliente[key]) );
           billetesCajero[key] = (parseFloat(billetesCajero[key]) + parseFloat(billetesCliente[key]));
        }

         
        for (const key in billetesCliente) {
            billetesCliente[key] = 0;
        }     
        

        $("#pagamentTotal").html(" ");
        
        sumaPago = 0;
        
        returnMoney(retorn, billetesCajero);  

    }else if(cliente < $cajero){
        infoHtml += "<br><b>Encara falten: </b>" + ($cajero - cliente).toFixed(2) + "€";  
    }
    

    $("#retorn").html(infoHtml);
}



function returnMoney(retorn, billetesCajero) { 
    retorn = parseFloat(retorn);
    const billValues = Object.keys(billetesCajero).sort((a, b) => b - a);

    for (let i = 0; i < billValues.length; i++) {
        const bill = billValues[i];
        while (retorn >= bill && billetesCajero[bill] > 0) {
            billetesCajero[bill]--;
            retorn -= bill;
        }
    }
}

$(".clear").click(function(){

    for (const key in billetesCliente) {
        billetesCliente[key] = 0;
    }
    $("#pagamentTotal").html("");
    sumaPago = 0;
});