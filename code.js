// Variables COMPRAR
var Precio_Casa,
	Tiempo_estancia,
	Tasa_interes_anual,
	Enganche,
	Monto_credito,
	Plazo,
	Comision_apertura,
	Costo_escrituracion,
	Incremento_precio_casa,
	Incremento_renta,
	Tasa_pago_banco,
	Inflacion_estimada,
	Impuesto_propiedad_venta,
	Deducira_intereses,
	Tasa_impuesto,
	Costo_verder_casa,	
	Mantenimiento_primero,
	Mantenimiento_anual;
	
// Variables RENTAR
var Meses_deposito,
	Renta_mensual,
	Mantenimiento_mensual;

//
var matriz_Comprar = new Array(30);
var matriz_Rentar = new Array(30);

window.onload = function () {	
	inializa_matrices();
	inializa_interfaz();
	calcular();
}

function inializa_matrices(){
	for (var i = 0; i < 30; i++) {
		matriz_Comprar[i] = new Array(11);
		matriz_Rentar[i] = new Array(7);
	}
}

function porcentaje(a,b){
	a = parseFloat(a);
	b = parseFloat(b);
	x = a * (b / 100.0);
	return x;
}
	
function calcular(){
	// ---------------------
	// COMPRAR	
	// ---------------------
	
	// Pago inicial
	matriz_Comprar[0][0] = - Enganche.slider('getValue') - porcentaje(Monto_credito.slider('getValue') , Comision_apertura.slider('getValue'))
						   - porcentaje(Precio_Casa.slider('getValue') , Costo_escrituracion.slider('getValue'));
   	for (var i = 1; i < 30; i++) {
		matriz_Comprar[i][0] = 0;
	}
	// Interés
	matriz_Comprar[0][1] = 0;
	for (var i = 1; i < 30; i++) {
		matriz_Comprar[i][1] = PAGOINT( (parseFloat(Tasa_interes_anual.slider('getValue')) / 100), i, parseFloat(Plazo.slider('getValue')), parseFloat(Monto_credito.slider('getValue')) );
	}
	// Ppal
	matriz_Comprar[0][2] = 0;
	for (var i = 1; i < 30; i++) {
		matriz_Comprar[i][2] = PAGOPRIN( (parseFloat(Tasa_interes_anual.slider('getValue')) / 100), i, parseFloat(Plazo.slider('getValue')), parseFloat(Monto_credito.slider('getValue')) );
	}
	// Indice de inflación
	matriz_Comprar[0][7] = 1.0;
	for (var i = 1; i < 30; i++) {
		matriz_Comprar[i][7] = matriz_Comprar[i-1][7] * (1.0 + (parseFloat(Inflacion_estimada.slider('getValue')) / 100));
	}	
	// Factor de descuento
	matriz_Comprar[0][8] = 1.0;
	for (var i = 1; i < 30; i++) {
		matriz_Comprar[i][8] = parseFloat(matriz_Comprar[i-1][8]) / (1.0 + (parseFloat(Tasa_pago_banco.slider('getValue')) / 100));
	}
	// Mantenimiento Anual de la Casa (MAC)
	var MAC1,MAC2;
	if(0.0==0.0){
		MAC1 = parseFloat(Mantenimiento_primero.slider('getValue'));			
	}else{
		MAC1 = 0.0;
	}
	if(0.0<=parseFloat(Plazo.slider('getValue'))){
		MAC2 = parseFloat(Mantenimiento_anual.slider('getValue')) * (-1.0);
	}else{
		MAC2 = 0.0;
	}
	matriz_Comprar[0][3] = MAC1 + MAC2 * matriz_Comprar[0][7];
	for (var i = 1; i < 30; i++) {
		if(i==0){
			MAC1 = parseFloat(Mantenimiento_primero.slider('getValue'));			
		}else{
			MAC1 = 0.0;
		}
		if(i<=parseFloat(Plazo.slider('getValue'))){
			MAC2 = parseFloat(Mantenimiento_anual.slider('getValue')) * (-1.0);
		}else{
			MAC2 = 0.0;
		}
		matriz_Comprar[i][3] = MAC1 + MAC2 * matriz_Comprar[i][7];
	}
	// Recuperación por venta
	if(0.0==(parseFloat(Plazo.slider('getValue'))+1.0)){
		matriz_Comprar[0][4] = parseFloat(Precio_Casa.slider('getValue')) * matriz_Comprar[0][7] * (1.0 - (parseFloat(Costo_verder_casa.slider('getValue')) / 100));
	}else{
		matriz_Comprar[0][4] = 0.0;
	}
	for (var i = 1; i < 30; i++) {
		if(i==(parseFloat(Plazo.slider('getValue'))+1.0)){
			matriz_Comprar[i][4] = parseFloat(Precio_Casa.slider('getValue')) * matriz_Comprar[i][7] * (1.0 - (parseFloat(Costo_verder_casa.slider('getValue')) / 100));
		}else{
			matriz_Comprar[i][4] = 0.0;
		}
	}
	// Ahorro/Pago fiscal
	matriz_Comprar[0][5] = 0;
	for (var i = 1; i < 30; i++) {
		if(Deducira_intereses=="Si"){
			matriz_Comprar[i][5] = PAGOINT( 
								   ( 
								   (1.0 + (parseFloat(Tasa_interes_anual.slider('getValue')) / 100)) / (1.0 + (parseFloat(Inflacion_estimada.slider('getValue')) / 100)) - 1
								    ), 
								   i, 
								   parseFloat(Plazo.slider('getValue')), 
								   parseFloat(Monto_credito.slider('getValue')) 
								   ) * (parseFloat(Tasa_impuesto.slider('getValue')) / 100);
		}else{
			matriz_Comprar[i][5] = 0.0;
		}
 
	}	
	// Flujo Total nominal
	for (var i = 0; i < 30; i++) {
		matriz_Comprar[i][6] = 	matriz_Comprar[i][0] + matriz_Comprar[i][1] + matriz_Comprar[i][2] + matriz_Comprar[i][3] + matriz_Comprar[i][4] + matriz_Comprar[i][5] ;
	}	
	// Valor presente
	var SP=0;
	for (var i = 1; i < 30; i++) {
		SP += (matriz_Comprar[i][6] * matriz_Comprar[i][8])
	}
	matriz_Comprar[0][9] = + matriz_Comprar[0][6] + SP;
	// Saldo de Cretido
	matriz_Comprar[0][10] = parseFloat(Precio_Casa.slider('getValue')) - parseFloat(Enganche.slider('getValue'));
	for (var i = 1; i < 30; i++) {
		matriz_Comprar[i][10] = matriz_Comprar[i-1][10] + matriz_Comprar[i][2];
	}	

	// ---------------------
	// RENTA	
	// ---------------------

	// Deposito inicial D
	var D1,D2;
	if(0==0){
		D1 = -(Meses_deposito.slider('getValue') * Renta_mensual.slider('getValue'));
	}else{
		D1 = 0.0;
	}	
	if(0==(parseFloat(Plazo.slider('getValue')))){
		D2 = Meses_deposito.slider('getValue') * Renta_mensual.slider('getValue');
	}else{
		D2 = 0.0;
	}		
	matriz_Rentar[0][0] = D1 + D2;	
	for (var i = 1; i < 30; i++) {
		if(i==0){
			D1 = -(Meses_deposito.slider('getValue') * Renta_mensual.slider('getValue'));
		}else{
			D1 = 0.0;
		}	
		if(i==(parseFloat(Plazo.slider('getValue')))){
			D2 = Meses_deposito.slider('getValue') * Renta_mensual.slider('getValue');
		}else{
			D2 = 0.0;
		}		
		matriz_Rentar[i][0] = D1 + D2;	
	}		
	// Indice de inflación
	matriz_Rentar[0][4] = 1.0;
	for (var i = 1; i < 30; i++) {
		matriz_Rentar[i][4] = matriz_Rentar[i-1][4] * (1.0 + (parseFloat(Inflacion_estimada.slider('getValue')) / 100));
	}	
	// Factor de descuento
	matriz_Rentar[0][5] = 1.0;
	for (var i = 1; i < 30; i++) {
		matriz_Rentar[i][5] = parseFloat(matriz_Rentar[i-1][5]) / (1.0 + (parseFloat(Tasa_pago_banco.slider('getValue')) / 100));
	}	
	// Renta Renta
	var Renta;
	for (var i = 0; i < 30; i++) {
		if(i<=(parseFloat(Plazo.slider('getValue'))))
		{	
			Renta = (-parseFloat(Renta_mensual.slider('getValue')))*12.0;
		}
		else{
			Renta = 0.0;
		}
		matriz_Rentar[i][1] = (+Renta * matriz_Rentar[i][4]);
	}	
	// Mantenimiento Comunal MC
	var MC;
	for (var i = 0; i < 30; i++) {
		if(i<=(parseFloat(Plazo.slider('getValue'))))
		{	
			MC = (-parseFloat(Mantenimiento_mensual.slider('getValue')))*12.0;
		}
		else{
			MC = 0.0;
		}
		matriz_Rentar[i][2] = (+MC * matriz_Rentar[i][4]);
	}	
	// Flujo Total nominal
	for (var i = 0; i < 30; i++) {
		matriz_Rentar[i][3] = matriz_Rentar[i][0] + matriz_Rentar[i][1] + matriz_Rentar[i][2];
	}	
	//Valor Presente
	var SP1=0;
	for (var i = 1; i < 30; i++) {
		SP1 += (matriz_Rentar[i][3] * matriz_Rentar[i][5])
	}
	matriz_Rentar[0][6] = + matriz_Rentar[0][3] + SP1;
		
	// ---------------------
	// COMPARACIÓN
	// ---------------------
		
	if(matriz_Comprar[0][9] > matriz_Rentar[0][6] ){
		document.getElementById('_Resultado').innerHTML = "SE DEBE COMPRAR";
	}
	else{
		document.getElementById('_Resultado').innerHTML = "SE DEBE RENTAR";
	}

    // GRÁFICA
	var canvas = document.getElementById('cvs');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0,0,300,300);

	limiteX = Tiempo_estancia.slider('getValue'); // cuantos años

	var dataC = new Array(limiteX);
	for (var i = 0; i < limiteX; i++) {
		dataC[i] = -matriz_Comprar[i][6];
	}	
	
	var dataR = new Array(limiteX);
	for (var i = 0; i < limiteX; i++) {
		dataR[i] = matriz_Rentar[i][3];
	}	

	var bar1 = new RGraph.Bar('cvs', dataC)
		.set('shadow', false)
		.set('strokestyle', 'rgba(0,0,0,0)')
		.set('noaxes', false)
		.set('ylabels', false)
		.set('colors', ['blue'])
		.set('hmargin', 1)
		.set('background.grid.autofit.numvlines', 3)
		.set('colors', ['Gradient(black:#aaa:black)'])
		.set('xaxispos', 'center')
		.set('ymax', 9500000)
		.draw();

	var bar2 = new RGraph.Bar('cvs', dataR)
		.set('shadow', false)
		.set('colors', ['Gradient(red:#faa:red)'])
		.set('hmargin', 1)		
		.set('xaxispos', 'center')
		.set('background.grid', false)
		.set('ymax', 9500000)
		.set('textSize',5)
		.set('unitsPre','$')
		.set('backgroundImageX',-100)
		.draw();
    
}


function inializa_interfaz(){	
	
	//
	// C O M P R A R
	//   

	
	// Precio Casa
	document.getElementById('_Precio_Casa').value = accounting.formatMoney(4000000); // inializa el precio
	$("#slider_preciocasa").slider({
		min: 500000,
		max: 4000000,
		step: .1
    });
	$('#slider_preciocasa').slider('setValue', accounting.unformat(document.getElementById('_Precio_Casa').value));
    Precio_Casa = $('#slider_preciocasa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Precio_Casa').value = accounting.formatMoney(Precio_Casa.slider('getValue'));		
    });
	// Precio Casa
	
	// Tiempo estancia
	document.getElementById('_Tiempo_estancia').value = 30; // inializa el tiempo
	$("#slider_tiempoestancia").slider({
		min: 1,
		max: 30
	});
	$('#slider_tiempoestancia').slider('setValue', accounting.unformat(document.getElementById('_Tiempo_estancia').value));
    Tiempo_estancia = $('#slider_tiempoestancia').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Tiempo_estancia').value = Tiempo_estancia.slider('getValue');
    });
	// Tiempo estancia
	
	// Tasa interes
	document.getElementById('_Tasa_interes').value = 12.5;
	$("#slider_tasainteres").slider({
		min: 1,
		max: 100,
		step: .1
	});
	$('#slider_tasainteres').slider('setValue', document.getElementById('_Tasa_interes').value);
    Tasa_interes_anual = $('#slider_tasainteres').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Tasa_interes').value = Tasa_interes_anual.slider('getValue');
    });	
	// Tasa interes	

	// Enganche
	document.getElementById('_Enganche').value = accounting.formatMoney(800000);
	$("#slider_enganche").slider({		
		min: 1,
		max: 4000000,
		step: .1		
    });
	$('#slider_enganche').slider('setValue', accounting.unformat(document.getElementById('_Enganche').value));
    Enganche = $('#slider_enganche').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Enganche').value = accounting.formatMoney(Enganche.slider('getValue'));		
    });
	// Enganche
	
	// Monto credito
	document.getElementById('_Monto_credito').value = accounting.formatMoney(3200000);
	$("#slider_montocredito").slider({		
		min: 1,
		max: 4000000,
		step: .1
    });
	$('#slider_montocredito').slider('setValue', accounting.unformat(document.getElementById('_Monto_credito').value));
    Monto_credito = $('#slider_montocredito').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Monto_credito').value = accounting.formatMoney(Monto_credito.slider('getValue'));		
    });
	// Monto credito

	// Plazo
	document.getElementById('_Plazo').value = 29; // inializa el tiempo
	$("#slider_plazo").slider({
		min: 1,
		max: 30
	});
	$('#slider_plazo').slider('setValue', accounting.unformat(document.getElementById('_Plazo').value));
    Plazo = $('#slider_plazo').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Plazo').value = Plazo.slider('getValue');
    });
	// Plazo

	// Comision apertura
	document.getElementById('_Comision_apertura').value = 3.0;
	$("#slider_comisionapertura").slider({
		min: 1,
		max: 100,
		step: .1
	});
	$('#slider_comisionapertura').slider('setValue', document.getElementById('_Comision_apertura').value);
    Comision_apertura = $('#slider_comisionapertura').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Comision_apertura').value = Comision_apertura.slider('getValue');
    });	
	// Comision apertura	

	// Costo escrituracion
	document.getElementById('_Costo_escrituracion').value = 10.0;
	$("#slider_costoescrituracion").slider({
		min: 1,
		max: 100,
		step: .1
	});
	$('#slider_costoescrituracion').slider('setValue', document.getElementById('_Costo_escrituracion').value);
    Costo_escrituracion = $('#slider_costoescrituracion').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Costo_escrituracion').value = Costo_escrituracion.slider('getValue');
    });	
	// Costo escrituracion	

	// Incremento casa
	document.getElementById('_Incremento_casa').value = 15.0;
	$("#slider_incrementopreciocasa").slider({
		min: 1,
		max: 100,
		step: .1
	});
	$('#slider_incrementopreciocasa').slider('setValue', document.getElementById('_Incremento_casa').value);
    Incremento_precio_casa = $('#slider_incrementopreciocasa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Incremento_casa').value = Incremento_precio_casa.slider('getValue');
    });	
	// Incremento casa	

	// Incremento renta
	document.getElementById('_Incremento_renta').value = 15.0;
	$("#slider_incrementorenta").slider({
		min: 1,
		max: 100,
		step: .1
	});
	$('#slider_incrementorenta').slider('setValue', document.getElementById('_Incremento_renta').value);
    Incremento_renta = $('#slider_incrementorenta').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Incremento_renta').value = Incremento_renta.slider('getValue');
    });	
	// Incremento casa	

	// Tasa pago banco
	document.getElementById('_Tasa_banco').value = 5.9;
	$("#slider_tasapagobanco").slider({
		min: 1,
		max: 100,
		step: .1
	});
	$('#slider_tasapagobanco').slider('setValue', document.getElementById('_Tasa_banco').value);
    Tasa_pago_banco = $('#slider_tasapagobanco').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Tasa_banco').value = Tasa_pago_banco.slider('getValue');
    });	
	// Tasa pago banco	

	// Inflacion estimada
	document.getElementById('_Inflacion_estimada').value = 15.0;
	$("#slider_inflacionestimada").slider({
		min: 1,
		max: 100,
		step: .1
	});
	$('#slider_inflacionestimada').slider('setValue', document.getElementById('_Inflacion_estimada').value);
    Inflacion_estimada = $('#slider_inflacionestimada').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Inflacion_estimada').value = Inflacion_estimada.slider('getValue');
    });	
	// Inflacion estimada	

	// Impuestos venta casa
	document.getElementById('_Impuestos_venta_casa').value = 30.0;
	$("#slider_impuestosventacasa").slider({
		min: 1,
		max: 100,
		step: .1
	});
	$('#slider_impuestosventacasa').slider('setValue', document.getElementById('_Impuestos_venta_casa').value);
    Impuesto_propiedad_venta = $('#slider_impuestosventacasa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Impuestos_venta_casa').value = Impuesto_propiedad_venta.slider('getValue');
    });	
	// Impuestos venta casa	
	
	
	// Deducira intereses
	Deducira_intereses = document.getElementById('_Deducira_intereses').value;
	// Deducira intereses

	// Tasa Impuestos
	document.getElementById('_Tasa_Impuestos').value = 20.0;
	$("#slider_tasaimpuestos").slider({
		min: 1,
		max: 100,
		step: .1
	});
	$('#slider_tasaimpuestos').slider('setValue', document.getElementById('_Tasa_Impuestos').value);
    Tasa_impuesto = $('#slider_tasaimpuestos').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Tasa_Impuestos').value = Tasa_impuesto.slider('getValue');
    });	
	// Tasa Impuestos
	
	// Costo vender casa
	document.getElementById('_Costo_vender_casa').value = 7.0;
	$("#slider_costovendercasa").slider({
		min: 1,
		max: 100,
		step: .1
	});
	$('#slider_costovendercasa').slider('setValue', document.getElementById('_Costo_vender_casa').value);
    Costo_verder_casa = $('#slider_costovendercasa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Costo_vender_casa').value = Costo_verder_casa.slider('getValue');
    });	
	// Costo vender casa

	// Mantenimiento_1_casa
	document.getElementById('_Mantenimiento_1_casa').value = accounting.formatMoney(0);
	$("#slider_mantenimiento1casa").slider({		
		min: 0,
		max: 4000000,
		step: .1		
    });
	$('#slider_mantenimiento1casa').slider('setValue', accounting.unformat(document.getElementById('_Mantenimiento_1_casa').value));
    Mantenimiento_primero = $('#slider_mantenimiento1casa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Mantenimiento_1_casa').value = accounting.formatMoney(Mantenimiento_primero.slider('getValue'));		
    });
	// Mantenimiento_1_casa

	// Mantenimiento_Anual_casa
	document.getElementById('_Mantenimiento_Anual_casa').value = accounting.formatMoney(0);
	$("#slider_mantenimientoanualcasa").slider({		
		min: 0,
		max: 4000000,
		step: .1		
    });
	$('#slider_mantenimientoanualcasa').slider('setValue', accounting.unformat(document.getElementById('_Mantenimiento_Anual_casa').value));
    Mantenimiento_anual = $('#slider_mantenimientoanualcasa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Mantenimiento_Anual_casa').value = accounting.formatMoney(Mantenimiento_anual.slider('getValue'));		
    });
	// Mantenimiento_Anual_casaa

	//
	// R E N T A R
	//   

	// Meses_deposito
	document.getElementById('_Meses_deposito').value = 2;
	$("#slider_mesesdeposito").slider({
		min: 1,
		max: 12
	});
	$('#slider_mesesdeposito').slider('setValue', document.getElementById('_Meses_deposito').value);
    Meses_deposito = $('#slider_mesesdeposito').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Meses_deposito').value = Meses_deposito.slider('getValue');
    });	
	// Meses_deposito

	// Renta_mensual
	document.getElementById('_Renta_mensual').value = accounting.formatMoney(12000);
	$("#slider_rentamensual").slider({		
		min: 1,
		max: 100000,
		step: .1		
    });
	$('#slider_rentamensual').slider('setValue', accounting.unformat(document.getElementById('_Renta_mensual').value));
    Renta_mensual = $('#slider_rentamensual').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Renta_mensual').value = accounting.formatMoney(Renta_mensual.slider('getValue'));		
    });
	// Renta_mensual

	// Mantenimiento_mensual
	document.getElementById('_Mantenimiento_mensual').value = accounting.formatMoney(1000);
	$("#slider_mantenimientomensual").slider({		
		min: 1,
		max: 4000000,
		step: .1		
    });
	$('#slider_mantenimientomensual').slider('setValue', accounting.unformat(document.getElementById('_Mantenimiento_mensual').value));
    Mantenimiento_mensual = $('#slider_mantenimientomensual').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Mantenimiento_mensual').value = accounting.formatMoney(Mantenimiento_mensual.slider('getValue'));		
    });
	// Mantenimiento_mensual

}


// PAGOINT - IPMT
function PAGOINT(rate, period, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice
	
  future = future || 0;
  type = type || 0;

  rate = parseNumber(rate);
  period = parseNumber(period);
  periods = parseNumber(periods);
  present = parseNumber(present);
  future = parseNumber(future);
  type = parseNumber(type);
  
  // Compute payment
  var payment = PMT(rate, periods, present, future, type);

  // Compute interest
  var interest;
  if (period === 1) {
    if (type === 1) {
      interest = 0;
    } else {
      interest = -present;
    }
  } else {
    if (type === 1) {
      interest = FV(rate, period - 2, payment, present, 1) - payment;
    } else {
      interest = FV(rate, period - 1, payment, present, 0);
    }
  }
  // Return interest
  return (interest * rate);
}
function PMT(rate, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  future = future || 0;
  type = type || 0;

  rate = parseNumber(rate);
  periods = parseNumber(periods);
  present = parseNumber(present);
  future = parseNumber(future);
  type = parseNumber(type);

  // Return payment
  var result;
  if (rate === 0) {
    result = (present + future) / periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
    } else {
      result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
    }
  }
  return -result;
}
function FV(rate, periods, payment, value, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  value = value || 0;
  type = type || 0;

  rate = parseNumber(rate);
  periods = parseNumber(periods);
  payment = parseNumber(payment);
  value = parseNumber(value);
  type = parseNumber(type);

  // Return future value
  var result;
  if (rate === 0) {
    result = value + payment * periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result = value * term + payment * (1 + rate) * (term - 1) / rate;
    } else {
      result = value * term + payment * (term - 1) / rate;
    }
  }
  return -result;
}
function parseNumber(string) {
	return parseFloat(string);
}

// PAGOPRIN - PPMT
function PAGOPRIN(rate, period, periods, present, future, type) {
  future = future || 0;
  type = type || 0;

  rate = parseNumber(rate);
  periods = parseNumber(periods);
  present = parseNumber(present);
  future = parseNumber(future);
  type = parseNumber(type);

  return PMT(rate, periods, present, future, type) - PAGOINT(rate, period, periods, present, future, type);
};
