var Ingreso_mensual;
var ISR;

var Entretenimiento;
var Telefonia;
var Alimentacion;
var Vivienda;
var Ahorro;
var Transporte;

var blue;

var Concepto;
var matriz_Conceptos = new Array(5);
var matriz_Conceptos_Nombres = new Array(5);
var matriz_Conceptos_Montos = new Array(5);

// Variables PAGO ISR
var Pago_ISR = 0.0;
var Porcentaje_ISR = 0.0;
var matriz_ISR_Mensual = new Array(11);
var matriz_ISR_Anual = new Array(11);

// variables
var monto_luego_de_ISR = 0.0;
var monto_Entretenimiento = 0.0;
var monto_Telefonia = 0.0;
var monto_Alimentacion = 0.0;
var monto_Vivienda = 0.0;
var monto_Ahorro = 0.0;
var monto_Transporte = 0.0;

// variable GASTO
var Gasto_Total = 0.0;

// Agregar más conceptos
var counter = 0;
var limit = 4;

window.onload = function () {	
	inializa_matrices();	
	inializa_interfaz();
	calcular_ISR();
	calcular();
}

function calcular_Todo(){
	monto_Vivienda = Vivienda.slider('getValue');
	monto_Ahorro = Ahorro.slider('getValue');
	monto_Entretenimiento = Entretenimiento.slider('getValue');
	monto_Telefonia = Telefonia.slider('getValue');
	monto_Alimentacion = Alimentacion.slider('getValue');
	monto_Transporte =  Transporte.slider('getValue');

	for (var i = 0; i < counter; i++){
		document.getElementById("_"+matriz_Conceptos_Nombres[i]).value = accounting.formatMoney(matriz_Conceptos[i].slider('getValue'));
		matriz_Conceptos_Montos[i] = matriz_Conceptos[i].slider('getValue');
	}
	
/*	alert(matriz_Conceptos_Montos[0] +" "+ matriz_Conceptos_Montos[1] +
				" "+ matriz_Conceptos_Montos[2] +" "+ matriz_Conceptos_Montos[3]
				+" "+ matriz_Conceptos_Montos[4]);
*/
	
	Gasto_Total = monto_Vivienda + monto_Ahorro + monto_Entretenimiento + monto_Telefonia + monto_Alimentacion + monto_Transporte
				  + matriz_Conceptos_Montos[0] + matriz_Conceptos_Montos[1] 
				  + matriz_Conceptos_Montos[2] + matriz_Conceptos_Montos[3]
				  + matriz_Conceptos_Montos[4];

	var a = Gasto_Total;
	var b = monto_luego_de_ISR;
//	alert("Gasto "+a+" - Monto "+b);

	if( a > b ){
		//alert("el gasto el mayor");
		document.getElementById("_Resultado").setAttribute("class","panel panel-danger");
		document.getElementById("status").innerHTML = "Finanzas con Problemas :(";
		document.getElementById("diferencia").innerHTML = (monto_luego_de_ISR - Gasto_Total).toFixed(2);
	}
	else{
		document.getElementById("_Resultado").setAttribute("class","panel panel-success");
		document.getElementById("status").innerHTML = "Finanzas Sanas :)";
		document.getElementById("diferencia").innerHTML = "+ "+(monto_luego_de_ISR - Gasto_Total).toFixed(2);
	}
}

function calcular(){
		
	if( Number(Gasto_Total).toFixed(2) > Number(monto_luego_de_ISR).toFixed(2) ){
		document.getElementById("_Resultado").setAttribute("class","panel panel-danger");
	}
	else{
		document.getElementById("_Resultado").setAttribute("class","panel panel-success");
	}
	
}

function inializa_matrices(){
	for (var i = 0; i < 11; i++) {
		matriz_ISR_Mensual[i] = new Array(4);
		matriz_ISR_Anual[i] = new Array(4);
	}
	
	llenaMatriz("isr_mensual.txt",matriz_ISR_Mensual);
	llenaMatriz("isr_anual.txt",matriz_ISR_Anual);

	for (var i = 0; i < 5; i++) {
		matriz_Conceptos_Montos[i] = 0.0;
	}
	
}

// Abre el archivo de datos de ISR
function llenaMatriz(file,matrix){   
	var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
				var lineArr = allText.split('\n');
                for (var i = 0; i < 11; i++) {
					var lineArrD = lineArr[i].split('\t');
					matrix[i][0] = parseFloat(lineArrD[0]);
					matrix[i][1] = parseFloat(lineArrD[1]);
					matrix[i][2] = parseFloat(lineArrD[2]);
					matrix[i][3] = parseFloat(lineArrD[3]);
				}
            }
        }
    }
    rawFile.send(null);
}


//	INICIA
//  Para Calcular ISR
//

function calcular_ISR(){
	var ingreso_mensual,limite_inferior, cuota_fija, excedente_limite_inferior, tasa_aplicable, cuota_variable, tasa_fectiva_entre_ingreso_bruto;
	ingreso_mensual = accounting.unformat(document.getElementById('_Ingreso_Mensual').value);
	//alert("Ingreso mensual "+ingreso_mensual);
	limite_inferior = calcular_limite_inferior(ingreso_mensual);
	cuota_fija = calcular_cuota_fija(ingreso_mensual);
	excedente_limite_inferior = ingreso_mensual - limite_inferior;
	tasa_aplicable = calcular_tasa_aplicable(ingreso_mensual);
	cuota_variable = calcular_cuota_variable(excedente_limite_inferior,tasa_aplicable);
	
	Pago_ISR = cuota_fija + cuota_variable;
	document.getElementById('_ISR').value = accounting.formatMoney(Pago_ISR);
	
	tasa_fectiva_entre_ingreso_bruto = (Pago_ISR / ingreso_mensual) * 100.0;
	Porcentaje_ISR = tasa_fectiva_entre_ingreso_bruto;
	document.getElementById('info_isr').innerHTML = Number(Porcentaje_ISR).toFixed(2)+"%";

	monto_luego_de_ISR = ingreso_mensual - Pago_ISR;
	
	/*
	 *  Muestra los datos procesados
	 * 
	alert("Limite inferior "+limite_inferior+
		  "\nCuota fija "+cuota_fija+
		  "\nExcedente del limite inferior "+excedente_limite_inferior+
		  "\nTasa aplicable "+tasa_aplicable+
		  "\nCuota variable "+cuota_variable+
		  "\nTasa tasa efectiva entre ingreso bruto "+tasa_fectiva_entre_ingreso_bruto);
	*/
	
	//alert("Monto restante luego de ISR "+monto_luego_de_ISR);
	//	Vivienda 20%
	monto_Vivienda = calcular_cuota_variable(monto_luego_de_ISR,20.0);
	document.getElementById('_Vivienda').value = accounting.formatMoney(monto_Vivienda); // inializa el precio
	$('#slider_Vivienda').slider('option',{min: 0, max: monto_luego_de_ISR}); 
	$('#slider_Vivienda').slider('setValue', monto_Vivienda);

	//	Ahorro 10%
	monto_Ahorro = calcular_cuota_variable(monto_luego_de_ISR,10.0);
	document.getElementById('_Ahorro').value = accounting.formatMoney(monto_Ahorro); // inializa el precio	
	$('#slider_Ahorro').slider('option',{min: 0, max: monto_luego_de_ISR}); 
	$('#slider_Ahorro').slider('setValue', monto_Ahorro);
	
	//	Entretenimiento 10%
	monto_Entretenimiento = calcular_cuota_variable(monto_luego_de_ISR,10.0);
	document.getElementById('_Entretenimiento').value = accounting.formatMoney(monto_Entretenimiento); // inializa el precio	
	$('#slider_Entretenimiento').slider('option',{min: 0, max: monto_luego_de_ISR}); 
	$('#slider_Entretenimiento').slider('setValue', monto_Entretenimiento);

	//	Telefonia 10%
	monto_Telefonia = calcular_cuota_variable(monto_luego_de_ISR,10.0);
	document.getElementById('_Telefonia').value = accounting.formatMoney(monto_Telefonia); // inializa el precio	
	$('#slider_Telefonia').slider('option',{min: 0, max: monto_luego_de_ISR}); 
	$('#slider_Telefonia').slider('setValue', monto_Telefonia);

	//	Alimentacion 35%
	monto_Alimentacion = calcular_cuota_variable(monto_luego_de_ISR,35.0);
	document.getElementById('_Alimentacion').value = accounting.formatMoney(monto_Alimentacion); // inializa el precio	
	$('#slider_Alimentacion').slider('option',{min: 0, max: monto_luego_de_ISR}); 
	$('#slider_Alimentacion').slider('setValue', monto_Alimentacion);

	//	Transporte 15%
	monto_Transporte = calcular_cuota_variable(monto_luego_de_ISR,15.0);
	document.getElementById('_Transporte').value = accounting.formatMoney(monto_Transporte); // inializa el precio	
	$('#slider_Transporte').slider('option',{min: 0, max: monto_luego_de_ISR}); 
	$('#slider_Transporte').slider('setValue', monto_Transporte);
	
	// Para más conceptos
	$('#slider_Concepto').slider('option',{min: 0, max: monto_luego_de_ISR}); 
	
	Gasto_Total = monto_Vivienda + monto_Ahorro + monto_Entretenimiento + monto_Telefonia + monto_Alimentacion + monto_Transporte;
}

function calcular_limite_inferior(ingreso){
	var i = 10;
	while (ingreso < matriz_ISR_Mensual[i][0])
	{
		i--;		
	}
	return matriz_ISR_Mensual[i][0];
}

function calcular_cuota_fija(ingreso){
	var i = 10;
	while (ingreso < matriz_ISR_Mensual[i][0])
	{
		i--;		
	}
	return matriz_ISR_Mensual[i][2];
}

function calcular_tasa_aplicable(ingreso){
	var i = 10;
	while (ingreso < matriz_ISR_Mensual[i][0])
	{
		i--;		
	}
	return matriz_ISR_Mensual[i][3];
}

function calcular_cuota_variable(a,b){
	a = parseFloat(a);
	b = parseFloat(b);
	x = a * (b / 100.0);
	return x;
}
	
//	
//  Para Calcular ISR
//	TERMINA

function inializa_interfaz(){	
	
	// Activa mensajes
	$(function () {
		$('[data-toggle="popover"]').popover()
	})
	
	$('.popover-dismiss').popover({
	trigger: 'focus'
	})	
	// Activa mensajes
	
	
	// Animación
	blue = anime({
		targets: '.moneda',
		translateX: 50,
		translateY: 250,
		rotate: 540,
		delay: 500,
		easing: 'linear',
		loop: 5
	});
	
	// Animación
	
	// Ingreso Mensual
	document.getElementById('_Ingreso_Mensual').value = accounting.formatMoney(87000); // inializa el precio
	$("#slider_ingresomensual").slider({
		min: 5000,
		max: 250000,
		step: .1
    });
	$('#slider_ingresomensual').slider('setValue', accounting.unformat(document.getElementById('_Ingreso_Mensual').value));
    Ingreso_mensual = $('#slider_ingresomensual').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Ingreso_Mensual').value = accounting.formatMoney(Ingreso_mensual.slider('getValue'));				
		calcular_ISR(); // para calcular el ISR		
    });
	// Ingreso Mensual

	// ISR
	document.getElementById('_ISR').value = accounting.formatMoney(Pago_ISR); // inializa el precio
	document.getElementById('info_isr').innerHTML = Porcentaje_ISR+"%";
	// ISR

	// Entretenimiento
	document.getElementById('_Entretenimiento').value = accounting.formatMoney(monto_Entretenimiento); // inializa el precio
	$("#slider_Entretenimiento").slider({
		min: 0,
		max: 100,
		step: .1
    });
	$('#slider_Entretenimiento').slider('setValue', accounting.unformat(document.getElementById('_Entretenimiento').value));
    Entretenimiento = $('#slider_Entretenimiento').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Entretenimiento').value = accounting.formatMoney(Entretenimiento.slider('getValue'));		
    });
	// Entretenimiento

	// Telefonia
	document.getElementById('_Telefonia').value = accounting.formatMoney(monto_Telefonia); // inializa el precio
	$("#slider_Telefonia").slider({
		min: 0,
		max: 100,
		step: .1
    });
	$('#slider_Telefonia').slider('setValue', accounting.unformat(document.getElementById('_Telefonia').value));
    Telefonia = $('#slider_Telefonia').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Telefonia').value = accounting.formatMoney(Telefonia.slider('getValue'));		
    });
	// Telefonia

	// Alimentacion
	document.getElementById('_Alimentacion').value = accounting.formatMoney(monto_Alimentacion); // inializa el precio
	$("#slider_Alimentacion").slider({
		min: 0,
		max: 100,
		step: .1
    });
	$('#slider_Alimentacion').slider('setValue', accounting.unformat(document.getElementById('_Alimentacion').value));
    Alimentacion = $('#slider_Alimentacion').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Alimentacion').value = accounting.formatMoney(Alimentacion.slider('getValue'));		
    });
	// Alimentacion




	// Vivienda
	document.getElementById('_Vivienda').value = accounting.formatMoney(monto_Vivienda); // inializa el precio
	$("#slider_Vivienda").slider({
		min: 0,
		max: 100,
		step: .1
    });
	$('#slider_Vivienda').slider('setValue', accounting.unformat(document.getElementById('_Vivienda').value));
    Vivienda = $('#slider_Vivienda').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Vivienda').value = accounting.formatMoney(Vivienda.slider('getValue'));		
    });
	// Vivienda

	// Ahorro
	document.getElementById('_Ahorro').value = accounting.formatMoney(monto_Ahorro); // inializa el precio
	$("#slider_Ahorro").slider({
		min: 0,
		max: 100,
		step: .1
    });
	$('#slider_Ahorro').slider('setValue', accounting.unformat(document.getElementById('_Ahorro').value));
    Ahorro = $('#slider_Ahorro').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Ahorro').value = accounting.formatMoney(Ahorro.slider('getValue'));		
    });
	// Ahorro

	// Transporte
	document.getElementById('_Transporte').value = accounting.formatMoney(monto_Transporte); // inializa el precio
	$("#slider_Transporte").slider({
		min: 0,
		max: 100,
		step: .1
    });
	$('#slider_Transporte').slider('setValue', accounting.unformat(document.getElementById('_Transporte').value));
    Transporte = $('#slider_Transporte').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Transporte').value = accounting.formatMoney(Transporte.slider('getValue'));		
    });
	// Transporte



	// más gastos
	document.getElementById('_Concepto').value = accounting.formatMoney(0.0); // inializa el precio
	$("#slider_Concepto").slider({
		min: 0,
		max: 100,
		step: .1
    });
	$('#slider_Concepto').slider('setValue', accounting.unformat(document.getElementById('_Concepto').value));
    Concepto = $('#slider_Concepto').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Concepto').value = accounting.formatMoney(Concepto.slider('getValue'));		
    });
	// más gastos

}

function Agrega_Concepto(name,monto){	
	if (counter == limit)  {
		alert("No puedes agregar más conceptos");
    }
    else {
		var nombre_C = document.getElementById(name).value;		
		var newdiv = document.createElement('div');
        newdiv.innerHTML = "<div class='panel panel-default'>"+
								"<div class='panel-heading'>"+
									"<h3 class='panel-title'> "+nombre_C.replace(/_/g," ")+" </h3>"+
								"</div>"+
								"<div class='panel-body'>"+
									"<div class='row'>"+
										"<div class='col-xs-6'>"+
											"<div class='input-group'>"+
												"<input id='_"+nombre_C+"' readonly type='text' class='form-control' data-toggle='_nombreC' title='NOMBREC'>"+
											"</div>"+
										"</div>"+
										"<div class='col-xs-6'>"+
											"<div class='well well-sm'>"+
												"<input id='slider_"+nombre_C+"' type='text' onchange='calcular_Todo()'/>"+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>"+
							"</div>";        
        
        document.getElementById('Conceptos').appendChild(newdiv);
        
		matriz_Conceptos_Nombres[counter] = nombre_C;
		matriz_Conceptos_Montos[counter] = accounting.unformat(document.getElementById(monto).value);
								
		document.getElementById("_"+nombre_C).value = accounting.formatMoney(matriz_Conceptos_Montos[counter]); // inializa el precio			
		$("#slider_"+nombre_C).slider({
			min: 0, 
			max: monto_luego_de_ISR, 
			step: .1
		}); 

		$("#slider_"+nombre_C).slider('setValue', matriz_Conceptos_Montos[counter]);		
				
		matriz_Conceptos[counter] = $("#slider_"+nombre_C).on('slideStop', function () {
			slideStart = false;
			document.getElementById("_"+nombre_C).value = accounting.formatMoney(matriz_Conceptos[counter].slider('getValue'));		
		});									
		counter++;
		
		calcular_Todo();
    }
}
