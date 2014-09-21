$('document').ready(function(){

    /*=====================================================================================
        Header Animation
    =======================================================================================*/

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

    /*=====================================================================================
        Messenger Animation
    =======================================================================================*/

	var messages = 
	[
		"Hey, I can’t find anyone to help me. Does the medical tent have aspirin?",
		"Hi Camelia, the medical tent has aspirin and is location by the South entrance. Should I notify staff that you need medical assistance?", 
		"Wow, thanks! And I’ll be alright. Just a headache :)",
		"You’re welcome! Feel better, and let us know if there’s anything else we can do!"
	];

	var messageCounter = 1;

	setInterval(function(){

		if (messageCounter >= messages.length)
		{
			messageCounter = 0;
		}

		var messageEntry = generateListEntry(messageCounter, messages[messageCounter]);
		messageCounter++;

		insertListEntry(messageEntry, true);

	}, 3000);
});


function generateListEntry(messageCounter, message)
{
	var listEntry = $('#chat-entry').html();
	var image;

	switch((messageCounter + 1) % 2)
	{
		case 1:
			name = "Camelia Moher";
			image = "camelia.jpg";
			break;
		case 0:
			name = "Festival Staff";
			image = "bmf.jpg";
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