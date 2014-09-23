$('document').ready(function(){

    /*=====================================================================================
        Header Animation
    =======================================================================================*/
    loadScript();
    loadChart();

	setTimeout(function(){
		$('.logo').removeClass('animated');
		$('.logo').removeClass('fadeInDownBig');
	}, 1000);

	setTimeout(function(){
		$('.logo').addClass('rotate');

		if ($(window).width() < 815)
		{
			$('.logo-text').removeClass('fadeInRight');
			$('.logo-text').addClass('fadeInUp');
		}

		$('.logo-text').removeClass('hidden');
	}, 1050);

	setTimeout(function(){
		$('.call').removeClass('hidden');
	}, 1600);
});

/*=====================================================================================
    Functions
=======================================================================================*/

function initialize() {

	$.get('http://ip-api.com/json/').done(function(data){
		var mapOptions = {
	    	zoom: 13,
			scrollwheel: false, 
			mapTypeControl: false, 
			streetViewControl: false, 
			disableDefaultUI: true,
	    	center: new google.maps.LatLng(data["lat"], data["lon"])
	  	};

	  	var map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);
	});
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initialize';
  document.body.appendChild(script);
}

function loadChart()
{
	var data = [],
		barsCount = 50,
		labels = new Array(barsCount),
		updateDelayMax = 500,
		$id = function(id){
			return document.getElementById(id);
		},
		random = function(max){ 
			return Math.round(Math.random()*100)
		},
		helpers = Chart.helpers;


	Chart.defaults.global.responsive = true;
	var canvasWidth = $(window).width();
	var canvasHeight = 700;

	$('#hero-bar').width(canvasWidth);
	$('#hero-bar').height(canvasHeight);

	$('#hero-bar').attr('width', canvasWidth);
	$('#hero-bar').attr('height', canvasHeight);
	
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
}