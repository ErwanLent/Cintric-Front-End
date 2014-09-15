$('document').ready(function(){

	// Fixes IE + Firefox scrolling bug
	// setTimeout(function(){
	// 	window.scrollTo(0, 0);
	// }, 200);

    /*=====================================================================================
        Header Animation
    =======================================================================================*/
	
	setTimeout(function(){
		$('.logo').removeClass('animated');
		$('.logo').removeClass('fadeInDownBig');
	}, 1000);

	setTimeout(function(){
		$('.logo').addClass('rotate');
		$('.logo-text').removeClass('hidden');
	}, 1050);

    /*=====================================================================================
        Messenger Animation
    =======================================================================================*/

	var messages = 
	[
		"Yes, what do you need?", 
		"Where is the French cheese?", 
		"The French cheese can be found in France.", 
		"Wow, you're so helpful. Thanks!",
		"You're welcome. Anything else?",
		"Oh yes, let's keep talking for this animation.",
		"Good idea! I love this animation.",
		"Erwan must have really gone ham to make this.",
		"Tell me about it. It's fucking 6 AM.",
		"LULZ! He just wants Mike to cream himself.",
		"Yah.. That's probably it.",
		"I mean, who won't when they see this?",
		"Everyone will, no doubt about it.",
		"Alright.. Now I'm desperate for content."
	];

	var messageCounter = 0;

	setInterval(function(){

		if (messageCounter < messages.length)
		{
			var messageEntry = generateListEntry(messageCounter, messages[messageCounter]);
			messageCounter++;

			insertListEntry(messageEntry, true);
		}

	}, 2000);

    /*=====================================================================================
        Sticky Navigation + Landscape Phone
    =======================================================================================*/

	var navBarTopPosition = $('.navigation').offset().top;
	var middleDevicePosition = $('.marvel-device.nexus5').offset().top - 220;

	var isNavigationStuck = false;
	var isLandscape = false;

	$(document).on( 'scroll', function(){
	    
		var currentScrollLocation = $(document).scrollTop();

		if ((currentScrollLocation >= navBarTopPosition) && !isNavigationStuck)
		{
			$('.navigation').addClass('fixed');
			$('.section.first').css('margin-top', (500 + $('.navigation').height()) + 'px');
			isNavigationStuck = true;
		}
		else if ((currentScrollLocation < navBarTopPosition) && isNavigationStuck)
		{
			$('.navigation').removeClass('fixed');
			$('.section.first').css('margin-top', '0px');
			isNavigationStuck = false;
		}

		if (!isLandscape && (currentScrollLocation >= middleDevicePosition))
		{
			$('.marvel-device.nexus5').addClass('landscape');
		}
	});


});


function generateListEntry(messageCounter, message)
{
	var listEntry = $('#chat-entry').html();
	var image;

	switch((messageCounter + 1) % 2)
	{
		case 0:
			name = "Camelia Moher";
			image = "camelia.jpg";
			break;
		case 1:
			name = "Kroger Representative";
			image = "kroger.svg";
			break;
	}

	listEntry = listEntry.replace("%NAME%", name);
	listEntry = listEntry.replace("%MESSAGE%", message);
	listEntry = listEntry.replace("empty.jpg", image);

	return listEntry;
}

function insertListEntry(entry, isAnimated)
{
	$('.chat-history').append(entry);

	var lastEntryTopPosition = $($('.screen').children()[$('.screen').children().length - 1]).position().top;

	if (isAnimated)
	{
		$('.screen').stop();
		$('.screen').animate({
			scrollTop: lastEntryTopPosition + $('.screen').scrollTop()
	    }, 2000);
	}
}

(function(){
	// Colour variables
	var red = "#bf616a",
		blue = "#5B90BF",
		orange = "#d08770",
		yellow = "#ebcb8b",
		green = "#a3be8c",
		teal = "#96b5b4",
		pale_blue = "#8fa1b3",
		purple = "#b48ead",
		brown = "#ab7967";


		var baseDataset = {
			fill: 'rgba(222,225,232,0.4)',
			stroke: 'rgba(222,225,232,1)',
			highlight: 'rgba(222,225,232,0.8)',
			highlightStroke: 'rgba(222,225,232,1)'
		},
		overlayDataset = {
			fill: 'rgba(91,144,191,0.4)',
			stroke: 'rgba(91,144,191,1)',
			highlight: 'rgba(91,144,191,0.8)',
			highlightStroke: 'rgba(91,144,191,1)'
		};

	var data = [],
		barsCount = 50,
		labels = new Array(barsCount),
		updateDelayMax = 500,
		$id = function(id){
			return document.getElementById(id);
		},
		random = function(max){ return Math.round(Math.random()*100)},
		helpers = Chart.helpers;


	Chart.defaults.global.responsive = true;


	for (var i = barsCount - 1; i >= 0; i--) {
		data.push(Math.round(Math.random() * 100));
	};
	new Chart($id('hero-bar').getContext('2d')).Bar({
		labels : labels,
		datasets : [{
			fillColor : '#2B303B',
			data : data
		}]
	},{
		showScale : false,
		barShowStroke : false,
		barValueSpacing: 1,
		showTooltips : false,
		onAnimationComplete : function(){
			// Get scope of the hero chart during updates
			var heroChart = this,
				timeout;
			// Stop this running every time the update is fired
			this.options.onAnimationComplete = randomUpdate;

			this.options.animationEasing = 'easeOutQuint';

			randomUpdate();

			function randomUpdate(){
				heroChart.stop();
				clearTimeout(timeout);
				// Get a random bar
				timeout = setTimeout(function(){
					var randomNumberOfBars = Math.floor(Math.random() * barsCount),
						i;
					for (i = randomNumberOfBars - 1; i >= 0; i--) {
						heroChart.datasets[0].bars[Math.floor(Math.random() * barsCount)].value = Math.round(Math.random() * 100);
					};
					heroChart.update();
				},Math.random() * updateDelayMax);
			};
		}
	});


	//Run any of the smaller demo charts here.

	// Six up carousel
	(function(){
		var contexts = {
				polar : $id('carousel-polar-area').getContext('2d'),
				radar : $id('carousel-radar').getContext('2d'),
				line : $id('carousel-line').getContext('2d'),
				bar : $id('carousel-bar').getContext('2d'),
				doughnut : $id('carousel-doughnut').getContext('2d'),
				pie : $id('carousel-pie').getContext('2d')
			},
			chartInstances = [];

		var data = {
			multiSets: {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [
					{
						label: "My First dataset",
						fillColor: baseDataset.fill,
						strokeColor: baseDataset.stroke,
						pointColor: baseDataset.stroke,
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						highlightFill: baseDataset.highlight,
						pointHighlightStroke: baseDataset.highlightStroke,
						data: [65, 59, 90, 81, 56, 55, 40]
					},
					{
						label: "My Second dataset",
						fillColor: overlayDataset.fill,
						strokeColor: overlayDataset.stroke,
						pointColor: overlayDataset.stroke,
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: overlayDataset.highlightStroke,
						highlightFill: overlayDataset.highlight,
						data: [28, 48, 40, 19, 96, 27, 100]
					}
				]
			},
			segments : [
				{
					value : 25,
					color : orange,
					highlight : Colour(orange, 10),
					label : "Orange"
				},
				{
					value: 14,
					color: blue,
					highlight : Colour(blue, 10),
					label : "Blue"
				},
				{
					value: 6,
					color: yellow,
					highlight : Colour(yellow, 10),
					label : "Yellow"
				},
				{
					value : 28,
					color : purple,
					highlight : Colour(purple, 10),
					label : "Purple"
				},
				{
					value: 18,
					color: teal,
					highlight: Colour(teal, 10),
					label: "Teal"
				}

			]
		}


		var config = {
			animation: false,
			onAnimationComplete: function(){
				this.options.animation = true;
			}
		};
		chartInstances.push(new Chart(contexts.radar).Radar(data.multiSets, config));
		chartInstances.push(new Chart(contexts.polar).PolarArea(data.segments, config));
		chartInstances.push(new Chart(contexts.bar).Bar(data.multiSets, config));
		chartInstances.push(new Chart(contexts.doughnut).Doughnut(data.segments, config));
		chartInstances.push(new Chart(contexts.line).Line(data.multiSets, config));
		chartInstances.push(new Chart(contexts.pie).Pie(data.segments, config));


		var iteratePosition = (function(){
			var position = 1;

			return function(){
				position++;
				return (position > chartInstances.length) ? position = 1 : position;
			};
		})();

		var carousel = $id('js-carousel');


		helpers.addEvent(carousel, 'click', function(){
			var positionPrefix = 'position-',
				carouselPosition = iteratePosition(),
				chartToScrollTo = chartInstances[carouselPosition-1];

			this.className = this.className.replace(new RegExp(positionPrefix+'[1-6]'), positionPrefix+carouselPosition);

			chartToScrollTo.clear();
			chartToScrollTo.render();
		});

	})();

	// Canvas demo

	(function(){
		var mousetrap = $id('js-mouse-bubbles'),
			canvas = mousetrap.getElementsByTagName('canvas')[0],
			ctx = canvas.getContext('2d'),
			colour = 'rgba(239,241,245, <%= alpha %>)',
			maxSize = 50;

		helpers.retinaScale({
			canvas: canvas,
			ctx: ctx
		});

		canvas.style.width = '100%';
		canvas.style.height = 'auto';

		helpers.addEvent(mousetrap, 'mousemove', drawTriangle);

		helpers.addEvent(mousetrap, 'click', function(){
			helpers.clear({
				width: canvas.width,
				height: canvas.height,
				ctx: ctx
			});
		});

		setInterval(function(){
			setTimeout(drawTriangle, Math.random() * 400)
		}, 150);

		function drawTriangle(){
			var x = Math.random() * canvas.width,
				y = Math.random() * canvas.height,
				width = Math.round((maxSize * Math.random() / 2)),
				height = Math.sqrt(3) * width;

			ctx.save();
			ctx.translate(x, y);
			ctx.rotate(Math.random() * (Math.PI * 2));
			ctx.beginPath();
			ctx.moveTo(-1 * width, 0);
			ctx.lineTo(0, -1 * height);
			ctx.lineTo(width, 0);
			ctx.closePath();
			ctx.fillStyle = colour.replace('<%= alpha %>', Math.random() + 0.2);
			ctx.fill();
			ctx.restore();
		};
	})();


	// Simple & flexible
	// Micro line chart
	(function(){
		var canvas = $id('micro-line'),
			ctx = canvas.getContext('2d'),
			lineChartData = [0, 6, 9, 10, 11, 14, 20];

		var Line = new Chart(ctx).Line({
			labels: new Array(lineChartData.length),
			datasets: [{
				strokeColor: overlayDataset.stroke,
				pointColor: '#fff',
				pointStrokeColor: overlayDataset.stroke,
				data: lineChartData
			}]
		}, {
			showScale: false,
			showTooltips: false,
			datasetStrokeWidth: 6,
			datasetFill: false,
			pointDotRadius : 9,
			pointDotStrokeWidth: 4,
			animation: false,
			animationEasing: 'easeInOutQuint',
			onAnimationComplete: function(){
				this.options.animation = true;
			}
		});

		helpers.addEvent(canvas, 'click', function(){
			lineChartData.reverse();
			Line.stop();
			helpers.each(Line.datasets[0].points, function(point, index){
				point.value = lineChartData[index];
			});
			Line.update();
		})
	})();

	// Modular doughnut
	(function(){

		var canvas = $id('modular-doughnut'),
			colours = {
				"Core": blue,
				"Line": orange,
				"Bar": teal,
				"Polar Area": purple,
				"Radar": brown,
				"Doughnut": green
			};

		var moduleData = [
		
			{
				value: 7.57,
				color: colours["Core"],
				highlight: Colour(colours["Core"], 10),
				label: "Core"
			},
		
			{
				value: 1.63,
				color: colours["Bar"],
				highlight: Colour(colours["Bar"], 10),
				label: "Bar"
			},
		
			{
				value: 1.09,
				color: colours["Doughnut"],
				highlight: Colour(colours["Doughnut"], 10),
				label: "Doughnut"
			},
		
			{
				value: 1.71,
				color: colours["Radar"],
				highlight: Colour(colours["Radar"], 10),
				label: "Radar"
			},
		
			{
				value: 1.64,
				color: colours["Line"],
				highlight: Colour(colours["Line"], 10),
				label: "Line"
			},
		
			{
				value: 1.37,
				color: colours["Polar Area"],
				highlight: Colour(colours["Polar Area"], 10),
				label: "Polar Area"
			}
		
		];
		// 
		var moduleDoughnut = new Chart(canvas.getContext('2d')).Doughnut(moduleData, { tooltipTemplate : "<%if (label){%><%=label%>: <%}%><%= value %>kb", animation: false });
		// 
		var legendHolder = document.createElement('div');
		legendHolder.innerHTML = moduleDoughnut.generateLegend();
		// Include a html legend template after the module doughnut itself
		helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index){
			helpers.addEvent(legendNode, 'mouseover', function(){
				var activeSegment = moduleDoughnut.segments[index];
				activeSegment.save();
				activeSegment.fillColor = activeSegment.highlightColor;
				moduleDoughnut.showTooltip([activeSegment]);
				activeSegment.restore();
			});
		});
		helpers.addEvent(legendHolder.firstChild, 'mouseout', function(){
			moduleDoughnut.draw();
		});
		canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);

	})();

	// Interative micro bar chart

	(function(){
		var canvas = $id('interactive-bar'),
			ctx = canvas.getContext('2d'),
			microBar = new Chart(ctx).Bar({
				labels: new Array(7),
				datasets: [{
					fillColor : "rgba(239,241,245,1)",
					strokeColor : "rgba(0,0,0,0)",
					highlightFill: "rgba(230,233,240,1)",
					data: [random(), random(), random(), random(), random(), random(), random()]
				}]
			}, {
				animation: false,
				showScale: false,
				barShowStroke: false,
				tooltipXPadding: 10,
				tooltipYPadding: 6,
				tooltipFontSize: 18,
				tooltipFontStyle: 'bold',
				// Boolean - If we want to override with a hard coded scale
				scaleOverride: true,

				// ** Required if scaleOverride is true **
				// Number - The number of steps in a hard coded scale
				scaleSteps: 2,
				// Number - The value jump in the hard coded scale
				scaleStepWidth: 50,
				// Number - The scale starting value
				scaleStartValue: 0,
			});

		helpers.addEvent(canvas, 'mousemove', function(evt){
			var bars =microBar.getBarsAtEvent(evt);
			if (bars.length > 0){
				canvas.style.cursor = "pointer";
			}
			else {
				canvas.style.cursor = "default";
			}
		});

		helpers.addEvent(canvas, 'click', function(evt){
			microBar.options.animation = true;
			microBar.options.onAnimationComplete = function(){
				this.showTooltip(this.activeElements, true);
			};
			var bars = microBar.getBarsAtEvent(evt);
			helpers.each(bars, function(bar){
				bar.value = Math.max(random(), 5);
			});
			if (bars.length > 0){
				microBar.update();
			}
		});

	})();

	function Colour(col, amt) {

		var usePound = false;

		if (col[0] == "#") {
			col = col.slice(1);
			usePound = true;
		}

		var num = parseInt(col,16);

		var r = (num >> 16) + amt;

		if (r > 255) r = 255;
		else if  (r < 0) r = 0;

		var b = ((num >> 8) & 0x00FF) + amt;

		if (b > 255) b = 255;
		else if  (b < 0) b = 0;

		var g = (num & 0x0000FF) + amt;

		if (g > 255) g = 255;
		else if (g < 0) g = 0;

		return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

	}

})();
