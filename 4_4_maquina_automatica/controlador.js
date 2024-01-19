let $numEntero = "";
let $numDecimal = "";
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

//Funció per a que el caixer introdueixi els el import
let $teclas = $(".teclaCalc").on("click", function(){
    let $num = $(this).text();
    let $pantalla =  $(".pantallaCalc").text();
    
    $num = $num.trim();
    
   
    if($pantalla.includes(",")){
        if ($num == "←"){
            //$pantalla = $pantalla.slice(0, -1);        
            $pantalla = $pantalla.substring(0, $pantalla.length - 2);
            if ($numDecimal == ""){
                $numEntero = $numEntero.substring(0, $numEntero.length - 1);
            }else{
                $numDecimal = $numDecimal.substring(0, $numDecimal.length - 1);
            }
            $(".pantallaCalc").html("<h2>"+$pantalla+"€</h2>");
    
            return;
        }else if($num == ","){
            return;
        }       
        else{
            $numDecimal += $num;
            $pantalla = $pantalla + $numDecimal;
        }
    }else{
        if ($num == "←"){
            //$pantalla = $pantalla.slice(0, -1);        
            $pantalla = $pantalla.substring(0, $pantalla.length - 2);
            $numEntero = $numEntero.substring(0, $numEntero.length - 1);
            $(".pantallaCalc").html("<h2>"+$pantalla+"€</h2>");
    
            return;
        }else{
            $numEntero += $num;
            
        }

    }
    
    $(".pantallaCalc").html("<h2>"+$numEntero+$numDecimal+"€</h2>");

    

});


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
    console.log($cajero);
    infoHtml = "<b>Diners Caixer: </b>" + $cajero + "€";
    infoHtml += "<br><b>Diners Client: </b>" + cliente + "€";

    if($cajero <= cliente){
        let retorn = (cliente - $cajero).toFixed(2);
        infoHtml += "<br><b>Diners a retornar: </b>" + retorn + "€";

        for (const key in billetesCliente) {
           $("#caj" + key).attr("value", (parseFloat(billetesCajero[key]) + billetesCliente[key]) );
           billetesCajero[key] = (parseFloat(billetesCajero[key]) + parseFloat(billetesCliente[key]));
        }

        // billetesCajero = {
        //     50:parseFloat($("#caj50").attr("value")),
        //     20:parseFloat($("#caj20").attr("value")),
        //     10:parseFloat($("#caj10").attr("value")),
        //     5:parseFloat($("#caj5").attr("value")),
        //     2:parseFloat($("#caj2").attr("value")),
        //     1:parseFloat($("#caj1").attr("value")),
        //     0.50:parseFloat($("#caj05").attr("value")),
        //     0.20:parseFloat($("#caj02").attr("value")),
        //     0.10:parseFloat($("#caj01").attr("value")),
        //     0.05:parseFloat($("#caj005").attr("value")),
        //     0.02:parseFloat($("#caj002").attr("value")),
        //     0.01:parseFloat($("#caj001").attr("value"))
        // };
        
        // for( let bill in billetesCajero){
        //     console.log(bill + ": " + billetesCajero[bill]);
           
        // }
        
        for (const key in billetesCliente) {
            billetesCliente[key] = 0;
        }

        returnMoney(retorn);

    }else if(cliente < $cajero){
        infoHtml += "<br><b>Encara falten: </b>" + ($cajero - cliente).toFixed(2) + "€";  
    }
    

    $("#retorn").html(infoHtml);
}

function returnMoney(retorn) { 

    retorn = parseFloat(retorn);

    if(retorn == 0){
        for (const key in billetesCliente) {
            $("#caj" + key).attr("value", billetesCajero[key]);            
        }
        return;
    } else {
        if (retorn >= 50 && billetesCajero[50] > 0) {
            billetesCajero[50] -= 1;                    
            returnMoney(retorn - 50);
        } else if (retorn >= 20 && billetesCajero[20] > 0) {
            billetesCajero[20] -= 1;                    
            returnMoney(retorn - 20);
        } else if (retorn >= 10 && billetesCajero[10] > 0) {
            billetesCajero[10] -= 1;                    
            returnMoney(retorn - 10);
        } else if (retorn >= 5 && billetesCajero[5] > 0) {
            billetesCajero[5] -= 1;                
            returnMoney(retorn - 5);
        } else if (retorn >= 2 && billetesCajero[2] > 0) {
            billetesCajero[2] -= 1;
            returnMoney(retorn - 2);
        } else if ( retorn >= 1 && billetesCajero[1] > 0) {
            billetesCajero[1] -= 1;
            returnMoney(retorn - 1);
        } else if( retorn >= 0.50 && billetesCajero["05"] > 0){
            billetesCajero["05"] -= 1;
            returnMoney(retorn - 0.50); 
        } else if (retorn >= 0.20 && billetesCajero["02"] > 0){
            billetesCajero["02"] -= 1;
            returnMoney(retorn - 0.20);
        }
        else if (retorn >= 0.10 && billetesCajero["01"] > 0){
            billetesCajero["01"] -= 1;
            returnMoney(retorn - 0.10);
        }
        else if (retorn >= 0.05 && billetesCajero["005"] > 0){
            billetesCajero["005"] -= 1;
            returnMoney(retorn - 0.05);
        }
        else if (retorn >= 0.02 && billetesCajero["002"] > 0){
            billetesCajero["002"] -= 1;
            returnMoney(retorn - 0.02);
        }
        else if (retorn >= 0.01 && billetesCajero["001"] > 0){
            billetesCajero["001"] -= 1;
            returnMoney(retorn - 0.01);
        }
        else{
            alert("No hi ha prou monedes per a tornar el canvi");
            return;
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