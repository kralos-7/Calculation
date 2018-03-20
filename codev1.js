var puntosCostoCasa, puntosEstacia, puntostiaf, puntosEnganche, puntosApertura, puntosIncrementoCasa,
	puntosIncrementoRenta, puntosTasa, puntosInflacion, puntosimpuestoventacasa, puntosdeducirintereses,
	puntostasaimpuestos, puntoscostoventacasa, puntoscostomantenimiento, puntosmantenimientoanual,
	puntosmesesdeposito, puntosrentamensual, puntosmantenimientomensual;
var chart, chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8, chart9, chart10,
	chart11, chart12, chart13, chart14, chart15, chart16, chart17, chart18, chart19;
var sliderbarCostoCasa, sliderbarEstancia, sliderbartiaf, sliderbarEnganche, sliderbarPlazo, 
	sliderbarApertura, sliderbarEscrituras, sliderbarincrementocasa, sliderbarincrementorenta,
	sliderbartasa, sliderbarinflacion, sliderbarimpuestoventacasa, sliderbartasaimpuestos,
	sliderbarcostoventacasa, sliderbarcostomantenimiento, sliderbarmantenimientoanual, sliderbarmesesdeposito,
	sliderbarrentamensual, sliderbarmantenimientomensual;


window.onload = function () {	

	/*
	 *   Gráfica Costo de la Casa
	 */

	puntosCostoCasa = [
			   {x: 500000, y: 1}, 
			   {x: 1000000, y: 1}, 
			   {x: 1500000, y: 5}, 
			   {x: 2000000, y: 10}, 
			   {x: 2500000, y: 15}, 
			   {x: 3000000, y: 20},	
			   {x: 3500000, y: 25},	
			   {x: 4000000, y: 30}];	
	
	CanvasJS.addColorSet("grayShades",
                [
                "#DCDCDC",
                "#D3D3D3"
                ]);
	chart = new CanvasJS.Chart("chartCostoCasa", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	axisX: {						
		title: "Pesos"
	},
	axisY: {						
		title: "Años"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosCostoCasa
			}
		  ]
	});	
		
	chart.render();
	
	document.getElementById('costoc').value = accounting.formatMoney(3000000);
	
	$("#costoc").on('keyup', function (e) {
		if (e.which == 13) {
        // Enter key pressed
		document.getElementById('costoc').value = accounting.formatMoney(document.getElementById('costoc').value);
		$('#slider_costocasa').slider('setValue', accounting.unformat(document.getElementById('costoc').value));
		chart.options.data[0].dataPoints[0].y = 1 + Math.random();
		chart.options.data[0].dataPoints[1].y = 5 + Math.random();
		chart.options.data[0].dataPoints[2].y = 10 + Math.random();
		chart.options.data[0].dataPoints[3].y = 15 + Math.random();
		chart.options.data[0].dataPoints[4].y = 20 + Math.random();
		chart.options.data[0].dataPoints[5].y = 25 + Math.random();
		chart.options.data[0].dataPoints[6].y = 30 + Math.random();
		chart.render();
		calcula_resultados();
    	}
	});

		
	$("#slider_costocasa").slider({
		ticks: [500000,1000000, 1500000, 2000000, 2500000, 3000000, 3500000, 4000000],
		ticks_labels: ['$500,000','$1,000,000', '$1,500,000', '$2,000,000', '$2,500,000', '$3,000,000', '$3,500,000', '$4,000,000'],
		ticks_snap_bounds: 30
	});	

	sliderbarCostoCasa = $('#slider_costocasa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('costoc').value = accounting.formatMoney(sliderbarCostoCasa.slider('getValue'));
		chart.options.data[0].dataPoints[0].y = 1 + Math.random();
		chart.options.data[0].dataPoints[1].y = 5 + Math.random();
		chart.options.data[0].dataPoints[2].y = 10 + Math.random();
		chart.options.data[0].dataPoints[3].y = 15 + Math.random();
		chart.options.data[0].dataPoints[4].y = 20 + Math.random();
		chart.options.data[0].dataPoints[5].y = 25 + Math.random();
		chart.options.data[0].dataPoints[6].y = 30 + Math.random();
		chart.render();
		calcula_resultados();
    });

	/*
	 *   Gráfica Tiempo Estimado de Estancía
	 */

	puntosEstacia = [{x: 1, y: 1}, 
			   {x: 5, y: 5}, 
			   {x: 10, y: 6}, 
			   {x: 15, y: 7}, 
			   {x: 20, y: 8},	
			   {x: 25, y: 9},	
			   {x: 30, y: 10}];	
	
	chart1 = new CanvasJS.Chart("chartEstancia", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	axisX: {
		title: "Años"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosEstacia
			}
		  ]
	});	
		
	chart1.render();
	
	document.getElementById('tiempoe').value = '30';
	
	$("#tiempoe").on('keyup', function (e) {
		$('#slider_estancia').slider('setValue', document.getElementById('tiempoe').value);
		chart1.options.data[0].dataPoints[0].y = 1 + Math.random();
		chart1.options.data[0].dataPoints[1].y = 5 + Math.random();
		chart1.options.data[0].dataPoints[2].y = 10 + Math.random();
		chart1.options.data[0].dataPoints[3].y = 15 + Math.random();
		chart1.options.data[0].dataPoints[4].y = 20 + Math.random();
		chart1.options.data[0].dataPoints[5].y = 25 + Math.random();
		chart1.options.data[0].dataPoints[6].y = 30 + Math.random();
		chart1.render();
		calcula_resultados();
	});
		
	$("#slider_estancia").slider({
		ticks: [1, 5, 10, 15, 20, 25, 30],
		ticks_labels: ['1', '5', '10', '15', '20', '25', '30'],
		ticks_snap_bounds: 30
	});	
	
	sliderbarEstancia = $('#slider_estancia').on('slideStop', function () {
		slideStart = false;
		document.getElementById('tiempoe').value = sliderbarEstancia.slider('getValue');
		chart1.options.data[0].dataPoints[0].y = 1 + Math.random();
		chart1.options.data[0].dataPoints[1].y = 5 + Math.random();
		chart1.options.data[0].dataPoints[2].y = 10 + Math.random();
		chart1.options.data[0].dataPoints[3].y = 15 + Math.random();
		chart1.options.data[0].dataPoints[4].y = 20 + Math.random();
		chart1.options.data[0].dataPoints[5].y = 25 + Math.random();
		chart1.options.data[0].dataPoints[6].y = 30 + Math.random();
		chart1.render();
		calcula_resultados();
    });

	/*
	 *   Gráfica Tasa de interés anual Fija
	 */

	puntostiaf = [{x: 0, y: 2.5}, 
			   {x: 1, y: 3}, 
			   {x: 2, y: 3.5}, 
			   {x: 3, y: 4}, 
			   {x: 4, y: 4.5}, 
			   {x: 5, y: 5},	
			   {x: 6, y: 5.5},	
			   {x: 7, y: 6}, 
			   {x: 8, y: 6.5}, 
			   {x: 9, y: 7}, 
			   {x: 10, y: 7.5}, 
			   {x: 11, y: 8}, 
			   {x: 12, y: 8.5},	
			   {x: 13, y: 9},	
			   {x: 14, y: 9.5}, 
			   {x: 15, y: 10}];	
	
	chart2 = new CanvasJS.Chart("chartTIAF", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntostiaf
			}
		  ]
	});	
		
	chart2.render();

	document.getElementById('tasadeinteres').value = '12.5';
	
	$("#slider_tiaf").slider({
		ticks: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		ticks_labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'],
		ticks_snap_bounds: 30
	});	

	$("#tasadeinteres").on('keyup', function (e) {
		$('#slider_tiaf').slider('setValue', document.getElementById('tasadeinteres').value);
		calcula_resultados();
	});
	
	sliderbartiaf = $('#slider_tiaf').on('slideStop', function () {
		slideStart = false;
		document.getElementById('tasadeinteres').value = sliderbartiaf.slider('getValue');
		calcula_resultados();
    });

	/*
	 *   Gráfica Enganche
	 */

	puntosEnganche = [{x: 0, y: 2.5}, 
			   {x: 10, y: 3}, 
			   {x: 20, y: 3.5}, 
			   {x: 30, y: 4}, 
			   {x: 40, y: 4.5}, 
			   {x: 50, y: 5},	
			   {x: 60, y: 5.5},	
			   {x: 70, y: 6}, 
			   {x: 80, y: 6.5}, 
			   {x: 90, y: 7}, 
			   {x: 100, y: 7.5}];	
	
	chart3 = new CanvasJS.Chart("chartEnganche", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Enganche"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosEnganche
			}
		  ]
	});	
		
	chart3.render();

	document.getElementById('enganche').value = accounting.formatMoney(80000);

	$("#slider_enganche").slider({
		ticks: [0,10,20,30,40,50,60,70,80,90,100],
		ticks_labels: ['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
		ticks_snap_bounds: 30
	});	

	$("#enganche").on('keyup', function (e) {
		if (e.which == 13) {
			// Enter key pressed
			document.getElementById('enganche').value = accounting.formatMoney(document.getElementById('enganche').value);
			$('#slider_enganche').slider('setValue', ((accounting.unformat(document.getElementById('enganche').value) * 100) / accounting.unformat(document.getElementById('costoc').value)));
			calcula_resultados();
		}
	});

	sliderbarEnganche = $('#slider_enganche').on('slideStop', function () {
		slideStart = false;
		document.getElementById('enganche').value = accounting.formatMoney( ( sliderbarEnganche.slider('getValue') * (accounting.unformat(document.getElementById('costoc').value))) / 100);
		calcula_resultados();
    });

	/*
	 *   Gráfica Plazo
	 */

	puntosPlazo = [{x: 0, y: 2.5}, 
			   {x: 5, y: 4}, 
			   {x: 10, y: 4.5}, 
			   {x: 15, y: 5},	
			   {x: 20, y: 5.5},	
			   {x: 25, y: 6}, 
			   {x: 30, y: 6.5}, 
			   {x: 35, y: 7}, 
			   {x: 40, y: 7.5}];	
	
	chart4 = new CanvasJS.Chart("chartPlazo", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Años"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosPlazo
			}
		  ]
	});	
		
	chart4.render();

	document.getElementById('plazo').value = '29';

	$("#slider_plazo").slider({
		ticks: [0,5,10,15,20,25,30,35,40],
		ticks_labels: ['0','5','10','15','20','25','30','35','40'],
		ticks_snap_bounds: 30
	});	

	$("#plazo").on('keyup', function (e) {
		$('#slider_plazo').slider('setValue', document.getElementById('plazo').value);
		calcula_resultados();
	});

	sliderbarPlazo = $('#slider_plazo').on('slideStop', function () {
		slideStart = false;
		document.getElementById('plazo').value = sliderbarPlazo.slider('getValue');
		calcula_resultados();
    });

	/*
	 *   Gráfica Comisión por apertura de cuenta
	 */
	
	puntosApertura = [{x: 0, y: 2.5}, 
			   {x: 1, y: 3}, 
			   {x: 2, y: 3.5}, 
			   {x: 3, y: 4}, 
			   {x: 4, y: 4.5}, 
			   {x: 5, y: 5},	
			   {x: 6, y: 5.5},	
			   {x: 7, y: 6}, 
			   {x: 8, y: 6.5}, 
			   {x: 9, y: 7}, 
			   {x: 10, y: 7.5}, 
			   {x: 11, y: 8}, 
			   {x: 12, y: 8.5},	
			   {x: 13, y: 9},	
			   {x: 14, y: 9.5}, 
			   {x: 15, y: 10}];	
	
	chart5 = new CanvasJS.Chart("chartApertura", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosApertura
			}
		  ]
	});	
		
	chart5.render();

	document.getElementById('comisionapertura').value = '3';

	$("#slider_apertura").slider({
		ticks: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		ticks_labels: ['0%','1%','2%','3%','4%','5%','6%','7%','8%','9%','10%','11%','12%','13%','14%','15%'],
		ticks_snap_bounds: 30
	});	

	$("#comisionapertura").on('keyup', function (e) {
		$('#slider_apertura').slider('setValue', document.getElementById('comisionapertura').value);
		calcula_resultados();
	});

	sliderbarApertura = $('#slider_apertura').on('slideStop', function () {
		slideStart = false;
		document.getElementById('comisionapertura').value = sliderbarApertura.slider('getValue');
		calcula_resultados();
    });	

	/*
	 *   Gráfica Costo Escrituras
	 */
	
	puntosEscrituras = [{x: 0, y: 2.5}, 
			   {x: 1, y: 3}, 
			   {x: 2, y: 3.5}, 
			   {x: 3, y: 4}, 
			   {x: 4, y: 4.5}, 
			   {x: 5, y: 5},	
			   {x: 6, y: 5.5},	
			   {x: 7, y: 6}, 
			   {x: 8, y: 6.5}, 
			   {x: 9, y: 7}, 
			   {x: 10, y: 7.5}, 
			   {x: 11, y: 8}, 
			   {x: 12, y: 8.5},	
			   {x: 13, y: 9},	
			   {x: 14, y: 9.5}, 
			   {x: 15, y: 10}];	
	
	chart6 = new CanvasJS.Chart("chartEscrituras", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosEscrituras
			}
		  ]
	});	
		
	chart6.render();

	document.getElementById('costoescrituras').value = '10';

	$("#slider_escrituras").slider({
		ticks: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		ticks_labels: ['0%','1%','2%','3%','4%','5%','6%','7%','8%','9%','10%','11%','12%','13%','14%','15%'],
		ticks_snap_bounds: 30
	});	

	$("#costoescrituras").on('keyup', function (e) {
		$('#slider_escrituras').slider('setValue', document.getElementById('costoescrituras').value);		
		calcula_resultados();
	});

	sliderbarEscrituras = $('#slider_escrituras').on('slideStop', function () {
		slideStart = false;
		document.getElementById('costoescrituras').value = sliderbarEscrituras.slider('getValue');
		calcula_resultados();
    });	

	/*
	 *   Gráfica Incremento anual del precio de la casa
	 */
	
	puntosIncrementoCasa = [{x: -5, y: 2.5}, 
			   {x: -4, y: 3}, 
			   {x: -3, y: 3.5}, 
			   {x: -2, y: 4}, 
			   {x: -1, y: 4.5}, 
			   {x: 0, y: 5},	
			   {x: 1, y: 3}, 
			   {x: 2, y: 3.5}, 
			   {x: 3, y: 4}, 
			   {x: 4, y: 4.5}, 
			   {x: 5, y: 5},	
			   {x: 6, y: 5.5},	
			   {x: 7, y: 6}, 
			   {x: 8, y: 6.5}, 
			   {x: 9, y: 7}, 
			   {x: 10, y: 7.5}, 
			   {x: 11, y: 8}, 
			   {x: 12, y: 8.5},	
			   {x: 13, y: 9},	
			   {x: 14, y: 9.5}, 
			   {x: 15, y: 10}];	
	
	chart7 = new CanvasJS.Chart("chartIncrementoCasa", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosIncrementoCasa
			}
		  ]
	});	
		
	chart7.render();

	document.getElementById('incrementocasa').value = '5';

	$("#slider_incrementocasa").slider({
		ticks: [-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		ticks_labels: ['-5%','-4%','-3%','-2%','-1%','0%','1%','2%','3%','4%','5%','6%','7%','8%','9%','10%','11%','12%','13%','14%','15%'],
		ticks_snap_bounds: 30
	});	

	$("#incrementocasa").on('keyup', function (e) {
		$('#slider_incrementocasa').slider('setValue', document.getElementById('incrementocasa').value);		
		calcula_resultados();
	});

	sliderbarincrementocasa = $('#slider_incrementocasa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('incrementocasa').value = sliderbarincrementocasa.slider('getValue');
		calcula_resultados();
    });	

	/*
	 *   Gráfica Incremento anual de la renta
	 */
	
	puntosIncrementoRenta = [{x: -5, y: 2.5}, 
			   {x: -4, y: 3}, 
			   {x: -3, y: 3.5}, 
			   {x: -2, y: 4}, 
			   {x: -1, y: 4.5}, 
			   {x: 0, y: 5},	
			   {x: 1, y: 3}, 
			   {x: 2, y: 3.5}, 
			   {x: 3, y: 4}, 
			   {x: 4, y: 4.5}, 
			   {x: 5, y: 5},	
			   {x: 6, y: 5.5},	
			   {x: 7, y: 6}, 
			   {x: 8, y: 6.5}, 
			   {x: 9, y: 7}, 
			   {x: 10, y: 7.5}, 
			   {x: 11, y: 8}, 
			   {x: 12, y: 8.5},	
			   {x: 13, y: 9},	
			   {x: 14, y: 9.5}, 
			   {x: 15, y: 10}];	
	
	chart8 = new CanvasJS.Chart("chartIncrementoRenta", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosIncrementoRenta
			}
		  ]
	});	
		
	chart8.render();

	document.getElementById('incrementorenta').value = '4';

	$("#slider_incrementorenta").slider({
		ticks: [-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		ticks_labels: ['-5%','-4%','-3%','-2%','-1%','0%','1%','2%','3%','4%','5%','6%','7%','8%','9%','10%','11%','12%','13%','14%','15%'],
		ticks_snap_bounds: 30
	});	

	$("#incrementorenta").on('keyup', function (e) {
		$('#slider_incrementorenta').slider('setValue', document.getElementById('incrementorenta').value);		
		calcula_resultados();
	});

	sliderbarincrementorenta = $('#slider_incrementorenta').on('slideStop', function () {
		slideStart = false;
		document.getElementById('incrementorenta').value = sliderbarincrementorenta.slider('getValue');
		calcula_resultados();
    });	

	/*
	 *   Gráfica Tasa que te paga el banco (aprox. cetes)
	 */
	
	puntosTasa = [{x: -10, y: 2.5}, 
			   {x: -8, y: 3}, 
			   {x: -6, y: 3.5}, 
			   {x: -4, y: 4}, 
			   {x: -2, y: 4.5}, 
			   {x: 0, y: 5},	
			   {x: 2, y: 3}, 
			   {x: 4, y: 3.5}, 
			   {x: 6, y: 4}, 
			   {x: 8, y: 4.5}, 
			   {x: 10, y: 5},	
			   {x: 12, y: 5.5},	
			   {x: 14, y: 6}, 
			   {x: 16, y: 6.5}, 
			   {x: 18, y: 7}, 
			   {x: 20, y: 7.5}];	
	
	chart9 = new CanvasJS.Chart("chartTasa", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosTasa
			}
		  ]
	});	
		
	chart9.render();

	document.getElementById('tasa').value = '5.9';

	$("#slider_tasa").slider({
		ticks: [-10,-8,-6,-4,-2,0,2,4,6,8,10,12,14,16,18,20],
		ticks_labels: ['-10%','-8%','-6%','-4%','-2%','0%','2%','4%','6%','8%','10%','12%','14%','16%','18%','20%'],
		ticks_snap_bounds: 30
	});	

	$("#tasa").on('keyup', function (e) {
		$('#slider_tasa').slider('setValue', document.getElementById('tasa').value);		
		calcula_resultados();
	});

	sliderbartasa = $('#slider_tasa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('tasa').value = sliderbartasa.slider('getValue');
		calcula_resultados();
    });	

	/*
	 *   Gráfica Inflación estimada
	 */
	
	puntosInflacion = [{x: -5, y: 2.5}, 
			   {x: -4, y: 3}, 
			   {x: -3, y: 3.5}, 
			   {x: -2, y: 4}, 
			   {x: -1, y: 4.5}, 
			   {x: 0, y: 5},	
			   {x: 1, y: 3}, 
			   {x: 2, y: 3.5}, 
			   {x: 3, y: 4}, 
			   {x: 4, y: 4.5}, 
			   {x: 5, y: 5},	
			   {x: 6, y: 5.5},	
			   {x: 7, y: 6}, 
			   {x: 8, y: 6.5}, 
			   {x: 9, y: 7}, 
			   {x: 10, y: 7.5}];	
	
	chart10 = new CanvasJS.Chart("chartInflacion", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosInflacion
			}
		  ]
	});	
		
	chart10.render();

	document.getElementById('inflacion').value = '5';

	$("#slider_inflacion").slider({
		ticks: [-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10],
		ticks_labels: ['-5%','-4%','-3%','-2%','-1%','0%','1%','2%','3%','4%','5%','6%','7%','8%','9%','10%'],
		ticks_snap_bounds: 30
	});	

	$("#inflacion").on('keyup', function (e) {
		$('#slider_inflacion').slider('setValue', document.getElementById('inflacion').value);		
		calcula_resultados();
	});

	sliderbarinflacion = $('#slider_inflacion').on('slideStop', function () {
		slideStart = false;
		document.getElementById('inflacion').value = sliderbarinflacion.slider('getValue');
		calcula_resultados();
    });	

	/*
	 *   Gráfica Impuestos sobre la propiedad por venta de la casa
	 */
	
	puntosimpuestoventacasa = [ 
			   {x: 0, y: 5},	
			   {x: 10, y: 3}, 
			   {x: 20, y: 3.5}, 
			   {x: 30, y: 4}, 
			   {x: 40, y: 4.5}, 
			   {x: 50, y: 5},	
			   {x: 60, y: 5.5},	
			   {x: 70, y: 6}, 
			   {x: 80, y: 6.5}, 
			   {x: 90, y: 7}, 
			   {x: 100, y: 7.5}];	
	
	chart11 = new CanvasJS.Chart("chartImpuestosVentaCasa", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosimpuestoventacasa
			}
		  ]
	});	
		
	chart11.render();

	document.getElementById('impuestoventacasa').value = '30';

	$("#slider_impuestoventacasa").slider({
		ticks: [0,10,20,30,40,50,60,70,80,90,100],
		ticks_labels: ['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
		ticks_snap_bounds: 30
	});	

	$("#impuestoventacasa").on('keyup', function (e) {
		$('#slider_impuestoventacasa').slider('setValue', document.getElementById('impuestoventacasa').value);		
		calcula_resultados();
	});

	sliderbarimpuestoventacasa = $('#slider_impuestoventacasa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('impuestoventacasa').value = sliderbarimpuestoventacasa.slider('getValue');
		calcula_resultados();
    });	

	/*
	 *   Gráfica Deducirá intereses fiscalmente
	 */
	
	puntosdeducirintereses = [ 
			   {x: 0, y: 5},	
			   {x: 10, y: 3}, 
			   {x: 20, y: 3.5}, 
			   {x: 30, y: 4}, 
			   {x: 40, y: 4.5}, 
			   {x: 50, y: 5},	
			   {x: 60, y: 5.5},	
			   {x: 70, y: 6}, 
			   {x: 80, y: 6.5}, 
			   {x: 90, y: 7}, 
			   {x: 100, y: 7.5}];	
	
	chart12 = new CanvasJS.Chart("chartDeducirIntereses", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosdeducirintereses
			}
		  ]
	});	
		
	chart12.render();

	document.getElementById('deducirintereses').value = 'Si';

	$("#deducirintereses").on('keyup', function (e) {
		calcula_resultados();
	});

	/*
	 *   Gráfica Tasa de Impuestos efectiva pagada (para deducir)
	 */
	
	puntostasaimpuestos = [ 
			   {x: 0, y: 5},	
			   {x: 10, y: 3}, 
			   {x: 20, y: 3.5}, 
			   {x: 30, y: 4}, 
			   {x: 40, y: 4.5}, 
			   {x: 50, y: 5},	
			   {x: 60, y: 5.5},	
			   {x: 70, y: 6}, 
			   {x: 80, y: 6.5}, 
			   {x: 90, y: 7}, 
			   {x: 100, y: 7.5}];	
	
	chart13 = new CanvasJS.Chart("chartTasaImpuestos", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntostasaimpuestos
			}
		  ]
	});	
		
	chart13.render();

	document.getElementById('tasaimpuestos').value = '20';

	$("#slider_tasaimpuestos").slider({
		ticks: [0,10,20,30,40,50,60,70,80,90,100],
		ticks_labels: ['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
		ticks_snap_bounds: 30
	});	

	$("#tasaimpuestos").on('keyup', function (e) {
		$('#slider_tasaimpuestos').slider('setValue', document.getElementById('tasaimpuestos').value);		
		calcula_resultados();
	});

	sliderbartasaimpuestos = $('#slider_tasaimpuestos').on('slideStop', function () {
		slideStart = false;
		document.getElementById('tasaimpuestos').value = sliderbartasaimpuestos.slider('getValue');
		calcula_resultados();
    });	

	/*
	 *   Gráfica Costos de Vender la Casa
	 */
	
	puntoscostoventacasa = [ 
			   {x: 0, y: 5},	
			   {x: 1, y: 3}, 
			   {x: 2, y: 3.5}, 
			   {x: 3, y: 4}, 
			   {x: 4, y: 4.5}, 
			   {x: 5, y: 5},	
			   {x: 6, y: 5.5},	
			   {x: 7, y: 6}, 
			   {x: 8, y: 6.5}, 
			   {x: 9, y: 7}, 
			   {x: 10, y: 7.5}];	
	
	chart14 = new CanvasJS.Chart("chartCostoVentaCasa", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	dataPointMaxWidth: 100,
	axisX: {
		title: "Porcentaje"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntoscostoventacasa
			}
		  ]
	});	
		
	chart14.render();

	document.getElementById('costoventacasa').value = '7';

	$("#slider_costoventacasa").slider({
		ticks: [0,1,2,3,4,5,6,7,8,9,10],
		ticks_labels: ['0%','1%','2%','3%','4%','5%','6%','7%','8%','9%','10%'],
		ticks_snap_bounds: 30
	});	

	$("#costoventacasa").on('keyup', function (e) {
		$('#slider_costoventacasa').slider('setValue', document.getElementById('costoventacasa').value);		
		calcula_resultados();
	});

	sliderbarcostoventacasa = $('#slider_costoventacasa').on('slideStop', function () {
		slideStart = false;
		document.getElementById('costoventacasa').value = sliderbarcostoventacasa.slider('getValue');
		calcula_resultados();
    });	

	/*
	 *   Gráfica Mantenimiento / renovación 1er año de la casa
	 */

	puntoscostomantenimiento = [{x: 1000, y: 1}, 
			   {x: 2000, y: 5}, 
			   {x: 3000, y: 10}, 
			   {x: 4000, y: 15}, 
			   {x: 5000, y: 20},	
			   {x: 6000, y: 25},	
			   {x: 7000, y: 30}];	
	
	chart15 = new CanvasJS.Chart("chartCostoMantenimiento", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	axisX: {						
		title: "Pesos"
	},
	axisY: {						
		title: "Años"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntoscostomantenimiento
			}
		  ]
	});	
		
	chart15.render();
	
	document.getElementById('costomantenimiento').value = '5000';
	
	$("#costomantenimiento").on('keyup', function (e) {
		$('#slider_costomantenimiento').slider('setValue', document.getElementById('costomantenimiento').value);
		calcula_resultados();
	});
		
	$("#slider_costomantenimiento").slider({
		ticks: [1000, 2000, 3000, 4000, 5000, 6000, 7000],
		ticks_labels: ['$1000', '$2000', '$3000', '$4000', '$5000', '$6000', '$7000'],
		ticks_snap_bounds: 30
	});	

	sliderbarcostomantenimiento = $('#slider_costomantenimiento').on('slideStop', function () {
		slideStart = false;
		document.getElementById('costomantenimiento').value = sliderbarcostomantenimiento.slider('getValue');
		calcula_resultados();
    });

	/*
	 *   Gráfica Mantenimiento anual de la casa
	 */

	puntosmantenimientoanual = [{x: 10000, y: 1}, 
			   {x: 20000, y: 5}, 
			   {x: 30000, y: 10}, 
			   {x: 40000, y: 15}, 
			   {x: 50000, y: 20},	
			   {x: 60000, y: 25},	
			   {x: 70000, y: 30}];	
	
	chart16 = new CanvasJS.Chart("chartMatenimientoAnual", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	axisX: {						
		title: "Pesos"
	},
	axisY: {						
		title: "Años"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosmantenimientoanual
			}
		  ]
	});	
		
	chart16.render();
	
	document.getElementById('mantenimientoanual').value = '18000';
	
	$("#mantenimientoanual").on('keyup', function (e) {
		$('#slider_mantenimientoanual').slider('setValue', document.getElementById('mantenimientoanual').value);
		calcula_resultados();
	});
		
	$("#slider_mantenimientoanual").slider({
		ticks: [10000, 20000, 30000, 40000, 50000, 60000, 70000],
		ticks_labels: ['$10000', '$20000', '$30000', '$40000', '$50000', '$60000', '$70000'],
		ticks_snap_bounds: 30
	});	

	sliderbarmantenimientoanual = $('#slider_mantenimientoanual').on('slideStop', function () {
		slideStart = false;
		document.getElementById('mantenimientoanual').value = sliderbarmantenimientoanual.slider('getValue');
		calcula_resultados();
    });

	/*
	 *   Gráfica Meses de depósito inicial
	 */

	puntosmesesdeposito = [{x: 1, y: 1}, 
			   {x: 2, y: 5}, 
			   {x: 3, y: 6}, 
			   {x: 4, y: 7}, 
			   {x: 5, y: 8},	
			   {x: 6, y: 6}, 
			   {x: 7, y: 7}, 
			   {x: 8, y: 8},	
			   {x: 9, y: 9},	
			   {x: 10, y: 7}, 
			   {x: 11, y: 8},	
			   {x: 12, y: 10}];	
	
	chart17 = new CanvasJS.Chart("chartMesesDeposito", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	axisX: {
		title: "Meses"
	},
	axisY: {						
		title: "Costo Equivalente a la Renta"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosmesesdeposito
			}
		  ]
	});	
		
	chart17.render();
	
	document.getElementById('mesesdeposito').value = '2';
	
	$("#mesesdeposito").on('keyup', function (e) {
		$('#slider_mesesdeposito').slider('setValue', document.getElementById('mesesdeposito').value);
		calcula_resultados();
	});
		
	$("#slider_mesesdeposito").slider({
		ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		ticks_labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		ticks_snap_bounds: 30
	});	
	
	sliderbarmesesdeposito = $('#slider_mesesdeposito').on('slideStop', function () {
		slideStart = false;
		document.getElementById('mesesdeposito').value = sliderbarmesesdeposito.slider('getValue');
		calcula_resultados();
    });

	/*
	 *   Gráfica Renta mensual de habitación rentada
	 */

	puntosrentamensual = [{x: 10000, y: 1}, 
			   {x: 20000, y: 5}, 
			   {x: 30000, y: 10}, 
			   {x: 40000, y: 15}, 
			   {x: 50000, y: 20},	
			   {x: 60000, y: 25},	
			   {x: 70000, y: 30}];	
	
	chart18 = new CanvasJS.Chart("chartRentaMensual", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	axisX: {						
		title: "Pesos"
	},
	axisY: {						
		title: "Años"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosrentamensual
			}
		  ]
	});	
		
	chart18.render();
	
	document.getElementById('rentamensual').value = accounting.formatMoney(12000);
	
	$("#rentamensual").on('keyup', function (e) {
		if (e.which == 13) {
			// Enter key pressed			
			document.getElementById('rentamensual').value = accounting.formatMoney(document.getElementById('rentamensual').value);			
			$('#slider_rentamensual').slider('setValue', accounting.unformat(document.getElementById('rentamensual').value));
			calcula_resultados();
    	}		
	});
		
	$("#slider_rentamensual").slider({
		ticks: [10000, 20000, 30000, 40000, 50000, 60000, 70000],
		ticks_labels: ['$10000', '$20000', '$30000', '$40000', '$50000', '$60000', '$70000'],
		ticks_snap_bounds: 30
	});	

	sliderbarrentamensual = $('#slider_rentamensual').on('slideStop', function () {
		slideStart = false;
		document.getElementById('rentamensual').value = accounting.formatMoney(sliderbarrentamensual.slider('getValue'));
		calcula_resultados();
    });

	/*
	 *   Gráfica Mantenimiento mensual comunual de habitac. rentada
	 */

	puntosmantenimientomensual = [{x: 100, y: 1}, 
			   {x: 200, y: 5}, 
			   {x: 400, y: 10}, 
			   {x: 600, y: 15}, 
			   {x: 800, y: 20},	
			   {x: 1000, y: 25},	
			   {x: 1200, y: 30},
			   {x: 1400, y: 20},	
			   {x: 1600, y: 25},	
			   {x: 1800, y: 30},
			   {x: 2000, y: 30}];	
	
	chart19 = new CanvasJS.Chart("chartMantenimientoMensual", {
	colorSet: "grayShades",
	title:{
		text: ""
	},
	axisX: {						
		title: "Pesos"
	},
	axisY: {						
		title: "Años"
	},
	animationEnabled: true,
	data: [              
			{
			type: "column",
			dataPoints: puntosmantenimientomensual
			}
		  ]
	});	
		
	chart19.render();
	
	document.getElementById('mantenimientomensual').value = '1000';
	
	$("#mantenimientomensual").on('keyup', function (e) {
		$('#slider_mantenimientomensual').slider('setValue', document.getElementById('mantenimientomensual').value);
		calcula_resultados();
	});
		
	$("#slider_mantenimientomensual").slider({
		ticks: [100, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000],
		ticks_labels: ['$100', '$200', '$400', '$600','$800', '$1000', '$1200', '$1400', '$1600', '$1800', '$2000'],
		ticks_snap_bounds: 30
	});	

	sliderbarmantenimientomensual = $('#slider_mantenimientomensual').on('slideStop', function () {
		slideStart = false;
		document.getElementById('mantenimientomensual').value = sliderbarmantenimientomensual.slider('getValue');
		calcula_resultados();
    });

	/*
	*  Cálculo
	*/

	calcula_resultados();
}

function calcula_resultados(){
	$('#slider_costocasa').slider('setValue', accounting.unformat(document.getElementById('costoc').value));
	$('#slider_estancia').slider('setValue', document.getElementById('tiempoe').value);
	$('#slider_tiaf').slider('setValue', document.getElementById('tasadeinteres').value);
	$('#slider_enganche').slider('setValue', ((accounting.unformat(document.getElementById('enganche').value) * 100) / accounting.unformat(document.getElementById('costoc').value)));
	$('#slider_plazo').slider('setValue', document.getElementById('plazo').value);
	$('#slider_apertura').slider('setValue', document.getElementById('comisionapertura').value);
	$('#slider_escrituras').slider('setValue', document.getElementById('costoescrituras').value);		
	$('#slider_incrementocasa').slider('setValue', document.getElementById('incrementocasa').value);
	$('#slider_incrementorenta').slider('setValue', document.getElementById('incrementorenta').value);		
	$('#slider_tasa').slider('setValue', document.getElementById('tasa').value);
	$('#slider_inflacion').slider('setValue', document.getElementById('inflacion').value);	
	$('#slider_impuestoventacasa').slider('setValue', document.getElementById('impuestoventacasa').value);	

	$('#slider_tasaimpuestos').slider('setValue', document.getElementById('tasaimpuestos').value);
	$('#slider_costoventacasa').slider('setValue', document.getElementById('costoventacasa').value);
	$('#slider_costomantenimiento').slider('setValue', document.getElementById('costomantenimiento').value);
	$('#slider_mantenimientoanual').slider('setValue', document.getElementById('mantenimientoanual').value);
	$('#slider_mesesdeposito').slider('setValue', document.getElementById('mesesdeposito').value);
	$('#slider_rentamensual').slider('setValue', accounting.unformat(document.getElementById('rentamensual').value));
	$('#slider_mantenimientomensual').slider('setValue', document.getElementById('mantenimientomensual').value);

	document.getElementById('costotiempo').innerHTML = "Costo despues de " + document.getElementById('tiempoe').value + " años";
	
	document.getElementById('montocredito').innerHTML = accounting.formatMoney(accounting.unformat(document.getElementById('costoc').value) - accounting.unformat(document.getElementById('enganche').value));
	
	document.getElementById('pagoinicial').innerHTML = accounting.formatMoney(accounting.unformat(document.getElementById('enganche').value) - accounting.unformat(document.getElementById('montocredito').value) * document.getElementById('comisionapertura').value - accounting.unformat(document.getElementById('costoc').value) * document.getElementById('costoescrituras').value);

	document.getElementById('deposito').innerHTML = accounting.formatMoney(accounting.unformat(document.getElementById('rentamensual').value) * document.getElementById('mesesdeposito').value);

	document.getElementById('totalRenta').innerHTML = accounting.formatMoney(accounting.unformat(document.getElementById('montocreditoR').innerHTML) + accounting.unformat(document.getElementById('pagoinicialR').innerHTML) + accounting.unformat(document.getElementById('deposito').innerHTML));
	document.getElementById('totalCompra').innerHTML = accounting.formatMoney(accounting.unformat(document.getElementById('montocredito').innerHTML) + accounting.unformat(document.getElementById('pagoinicial').innerHTML) + accounting.unformat(document.getElementById('depositoC').innerHTML));
}
