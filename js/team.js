$('document').ready(function(){
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
});