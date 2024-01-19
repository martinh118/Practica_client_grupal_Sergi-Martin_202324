let $numEntero = "";
let $numDecimal = "";
let sumaPago = 0;
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



let $billetes = $(".billete").on("click", function(){
    let $num = $(this).attr("value");

    billetesCliente[$num] += 1;

   

    //console.log($num);
    sumaPago = parseFloat((sumaPago + parseFloat($num)).toFixed(2));
    console.log(sumaPago);
    $("#pagamentTotal").html(sumaPago + "€");
});

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
           //billetesCajero[key] = (parseFloat(billetesCajero[key]) + parseFloat(billetesCliente[key]));
        }

        billetesCajero = {
            50:parseFloat($("#caj50").attr("value")),
            20:parseFloat($("#caj20").attr("value")),
            10:parseFloat($("#caj10").attr("value")),
            5:parseFloat($("#caj5").attr("value")),
            2:parseFloat($("#caj2").attr("value")),
            1:parseFloat($("#caj1").attr("value")),
            0.50:parseFloat($("#caj05").attr("value")),
            0.20:parseFloat($("#caj02").attr("value")),
            0.10:parseFloat($("#caj01").attr("value")),
            0.05:parseFloat($("#caj005").attr("value")),
            0.02:parseFloat($("#caj002").attr("value")),
            0.01:parseFloat($("#caj001").attr("value"))
        };
        
        for( let bill in billetesCajero){
            console.log(bill + ": " + billetesCajero[bill]);
           
        }
        
        for (const key in billetesCliente) {
            billetesCliente[key] = 0;
        }

        //returnMoney();

    }else if(cliente < $cajero){
        infoHtml += "<br><b>Encara falten: </b>" + ($cajero - cliente).toFixed(2) + "€";  
    }
    

    $("#retorn").html(infoHtml);
}

function returnMoney( ) { 

    // for (const key in billetesCajero) {
    //     if (billetesCajero[key] > 0) {
    //         billetesCajero[key] -= billetesCliente[key];
    //     }
    // }


}

$(".clear").click(function(){
    $("#pagamentTotal").html("");
    sumaPago = 0;
});