$(document).ready(function(){
	/*=====================================================================================
        Sticky Navigation + Landscape Phone
    =======================================================================================*/

	var navBarTopPosition = $('.navigation').offset().top;
	var middleDevicePosition = 0;

	if ($('.marvel-device.nexus5').length)
	{
		middleDevicePosition = $('.marvel-device.nexus5').offset().top - 220;
	}

	var isNavigationStuck = false;
	var isLandscape = false;
	var isLogoShowing = false;

	$(document).on( 'scroll', function(){
	    
		var currentScrollLocation = $(document).scrollTop();

		if ((currentScrollLocation >= navBarTopPosition) && !isNavigationStuck)
		{
			$('.navigation').addClass('fixed');
			$('.section.products').css('margin-top', ($('.navigation').height()) + 'px');

			if ($(window).width() > 815)
			{
				$('.full-logo').fadeIn();
				isLogoShowing = true;
			}

			isNavigationStuck = true;
		}
		else if ((currentScrollLocation < navBarTopPosition) && isNavigationStuck)
		{
			$('.navigation').removeClass('fixed');
			$('.section.products').css('margin-top', '0px');
			$('.full-logo').fadeOut();

			isLogoShowing = false;
			isNavigationStuck = false;
		}

		if (!isLandscape && (currentScrollLocation >= middleDevicePosition) && ($(window).width() > 650))
		{
			$('.marvel-device.nexus5').addClass('landscape');
		}
	});

	$(window).resize(function() {
  		if ($(window).width() < 815 && isLogoShowing)
  		{
  			$('.full-logo').fadeOut();
  			isLogoShowing = false;
  		}
	});
});