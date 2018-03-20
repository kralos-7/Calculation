var Ahorro_mensual;
var Porcentaje_Ahorro;
var Porcentaje_Banco;

var monto_por_mes = [];
var ganancia_por_mes = [];
var monto_por_year = [];
var ganancia_por_year = [];

window.onload = function () {
	$('#cargando').hide();	
	inicia_interfaz();
	inicializa_data(500,0.05);
	inicia_grafica();
}

function inicializa_data(monto,porcent){	
	
	//alert("Monto: "+monto+", Porcentaje: "+porcent);
		
	if(ganancia_por_year.length > 0)
	{
		for(i=0;i<20;i++){
			monto_por_mes.pop();
			ganancia_por_mes.pop();
			monto_por_year.pop();
			ganancia_por_year.pop();			
		}
	}
	
	var porcentaje_banco = porcent; // interes del banco
	var porcentaje_banco_mes = (porcentaje_banco/12).toFixed(4);

	// Primer Año - con Ahorro anual
	monto_por_year.push(""+(monto + (monto * porcentaje_banco)));
	ganancia_por_year.push(""+(monto * porcentaje_banco));	
	
	// Primer Año -  con Ahorro mensual
	var temp_mes_monto = (monto + (monto * porcentaje_banco_mes));
	var temp_mes_ganancia = (monto * porcentaje_banco_mes);
  	for(i=0;i<11;i++){
		var auxiliar = temp_mes_monto;
		temp_mes_monto = monto + (auxiliar + (auxiliar * porcentaje_banco_mes));
		temp_mes_ganancia = temp_mes_ganancia + (auxiliar * porcentaje_banco_mes);
	}	
	monto_por_mes.push(""+temp_mes_monto);
	ganancia_por_mes.push(""+temp_mes_ganancia);	
		
  	for(i=1;i<20;i++){
		// Anual
		var temporal = parseFloat(monto_por_year[i-1]);
		var temporal1 = monto + (temporal + (temporal * porcentaje_banco));
		monto_por_year.push(""+temporal1);		
		var temporal2 = parseFloat(ganancia_por_year[i-1]);
		var temporal3 = temporal2 + (temporal * porcentaje_banco);
		ganancia_por_year.push(""+temporal3);
		
		// Mensual
		var temporal4 = parseFloat(monto_por_mes[i-1]);
		var temporal5 = parseFloat(ganancia_por_mes[i-1]);
		var temp_mes_monto = monto + (temporal4 + (temporal4 * porcentaje_banco_mes));
		var temp_mes_ganancia = temporal5 + (temporal4 * porcentaje_banco_mes);
		for(j=0;j<11;j++){
			var auxiliar = temp_mes_monto;
			temp_mes_monto = monto + (auxiliar + (auxiliar * porcentaje_banco_mes));
			temp_mes_ganancia = temp_mes_ganancia + (auxiliar * porcentaje_banco_mes);
		}	
		monto_por_mes.push(""+temp_mes_monto);
		ganancia_por_mes.push(""+temp_mes_ganancia);					
	}		
}

function recalcularT(){
	var new_monto =  Ahorro_mensual.slider('getValue');
	var dinero = (new_monto * Porcentaje_Ahorro.slider('getValue')) / 100;
	document.getElementById('Monto_Ahorro').innerHTML = accounting.formatMoney(dinero);
	inicializa_data(dinero , (Porcentaje_Banco.slider('getValue')/100));
    inicia_grafica();
}

function recalcular(){
	var dinero = (Ahorro_mensual.slider('getValue') * Porcentaje_Ahorro.slider('getValue')) / 100;
	document.getElementById('Monto_Ahorro').innerHTML = accounting.formatMoney(dinero);
	inicializa_data(dinero , (Porcentaje_Banco.slider('getValue')/100));
    inicia_grafica();
}

function inicia_interfaz(){			
	// Ahorro Mensual
	document.getElementById('_Ahorro_Mensual').value = accounting.formatMoney(10000); 
	$("#slider_ahorromensual").slider({
		min: 5000,
		max: 250000,
		step: .1
    });
	$('#slider_ahorromensual').slider('setValue', accounting.unformat(document.getElementById('_Ahorro_Mensual').value));
    Ahorro_mensual = $('#slider_ahorromensual').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Ahorro_Mensual').value = accounting.formatMoney(Ahorro_mensual.slider('getValue'));				
    });
	// Ahorro Mensual

	// Ahorro Porcentaje
	document.getElementById('_Porcentaje_Ahorro').innerHTML = "5%";
	$("#slider_porcentajeahorro").slider({
		min: 0,
		max: 100,
		step: 1
    });
	//$('#slider_porcentajeahorro').slider('setValue', (document.getElementById('_Porcentaje_Ahorro').innerHTML).replace("%",""));
	$('#slider_porcentajeahorro').slider('setValue', 5);
    Porcentaje_Ahorro = $('#slider_porcentajeahorro').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Porcentaje_Ahorro').innerHTML = Porcentaje_Ahorro.slider('getValue')+"%";		
		document.getElementById('Monto_Ahorro').innerHTML = accounting.formatMoney((Porcentaje_Ahorro.slider('getValue') * Ahorro_mensual.slider('getValue'))/100);
    });
	// Ahorro Porcentaje


	// Porcentaje Banco
	document.getElementById('_Porcentaje_Banco').innerHTML = "5%";
	$("#slider_porcentajebanco").slider({
		min: 0,
		max: 10,
		step: .1
    });
	$('#slider_porcentajebanco').slider('setValue', 5);
    Porcentaje_Banco = $('#slider_porcentajebanco').on('slideStop', function () {
		slideStart = false;
		document.getElementById('_Porcentaje_Banco').innerHTML = Porcentaje_Banco.slider('getValue')+"%";		
    });
	// Porcentaje Banco

}

function inicia_grafica() {
	
	var years = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
		
	var mensual = {		
		x: years,
		y: ganancia_por_mes, 
		name: 'Mensual',		
		mode: 'markers',
		marker: {
			size: monto_por_mes,
			sizemode: 'area',
			sizeref: 300        			
		}		
	};
	var anual = {
		x: years,
		y: ganancia_por_year,
		name: 'Anual',
		mode: 'markers',
		marker: {
			size: monto_por_year,						
			sizemode: 'area',
			sizeref: 300        			
		}		
	};

	var data = [mensual, anual];

	var layout = {
		title: 'Ahorro',
		showlegend: true,
		xaxis: {
			title: 'Años de inversión',
			range: [0, 21],
			autorange:true,
		},
		yaxis: {
			title: 'Dinero generado por ahorro',
			type: 'log',
			autorange:true,
		}
	};	
	
	Plotly.newPlot('myDiv', data, layout, {staticPlot: false});	
}
