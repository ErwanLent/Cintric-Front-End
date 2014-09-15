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

function loadChart()
{
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
}