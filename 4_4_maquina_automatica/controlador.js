let $numEntero = "";
let $numDecimal = "";

let $teclas = $(".teclaCalc").on("click", function(){
    let $num = $(this).text();
    let $pantalla =  $(".pantallaCalc").text();
    
    $num = $num.trim();
    
    
    if ($num == "←"){
        $pantalla = $pantalla.slice(0, -1);        
        $(".pantallaCalc").html("<h2>"+$pantalla+"€</h2>");
        return;
    }else if ($pantalla.includes(",")){
        $numDecimal += $num;
        $pantalla = $pantalla + $numDecimal;
        
    }else{
        $numEntero += $num;

    }
    
    $(".pantallaCalc").html("<h2>"+$numEntero+$numDecimal+"€</h2>");

    

});

let sumaPago = 0;
let $billetes = $(".billete").on("click", function(){
    let $num = $(this).attr("value");
    //console.log($num);
    sumaPago = parseFloat((sumaPago + parseFloat($num)).toFixed(2));
    console.log(sumaPago);
    $("#pagamentTotal").html(sumaPago + "€");
});

let $monedas = $(".moneda").on("click", function(){
    let $num = $(this).attr("value");
    //console.log($num);
    sumaPago = parseFloat((sumaPago + parseFloat($num)).toFixed(2));
    console.log(sumaPago);
    $("#pagamentTotal").html(sumaPago+ "€");
    console.log($(".pantallaCalc").html());
});

