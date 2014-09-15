$('document').ready(function(){

	setTimeout(function(){
		$('.logo').removeClass('animated');
		$('.logo').removeClass('fadeInDownBig');
	}, 1000);

	setTimeout(function(){
		$('.logo').addClass('rotate');
		$('.logo-text').removeClass('hidden');
	}, 1050);

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