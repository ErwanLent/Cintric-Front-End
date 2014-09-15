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
			$('.section.first').css('margin-top', $('.navigation').height() + 'px');
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
	listEntry = listEntry.replace("%IMAGE%", image);

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