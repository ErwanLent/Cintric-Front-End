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
		//$('.marvel-device.nexus5').addClass('landscape');
	}, 1050);

    /*=====================================================================================
        Messenger Animation
    =======================================================================================*/

	var messages = ["Yes, what do you need?", "Where is the French cheese?", "The French cheese can be found in France.", "Wow, you're so helpful. Thanks!"];
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
        Sticky Navigation
    =======================================================================================*/

	var navBarTopPosition = $('.navigation').offset().top;
	var isNavigationStuck = false;

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

	var lastEntryTopPosition = $($('.chat-history').children()[$('.chat-history').children().length - 1]).position().top;

	if (isAnimated)
	{
		$('.chat-history').stop();
		$('.chat-history').animate({
			scrollTop: lastEntryTopPosition + $('.chat-history').scrollTop()
	    }, 2000);
	}
}