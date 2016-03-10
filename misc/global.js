/* ########################################################################## */
/* #### Fancy Page Loading ################################################## */
/* ########################################################################## */

// Header slide-in.
$(document).ready(function(){
	var element = $('.header');
	var delay = 100;
	var time = 1000;
	element.css('left', '100%');
	element.css('transition', time + 'ms');
	setTimeout(function(){
		element.css('left', 0);
	}, delay);
	setTimeout(function(){element.removeAttr('style')}, time + delay);
});

// Logo slide-in.
$(document).ready(function(){
	var element = $('.header-logo');
	var delay = 300;
	var time = 1000;
	element.css('left', '100%');
	element.css('transition', time + 'ms');
	setTimeout(function(){
		element.css('left', 0);
	}, delay);
	setTimeout(function(){element.removeAttr('style')}, time + delay);
});

// Header box slide-in.
$(document).ready(function(){
	var element = $('.header-box');
	var delay = 450;
	var time = 1000;
	element.css('left', '100%');
	element.css('transition', time + 'ms');
	setTimeout(function(){
		element.css('left', '16.67%');
	}, delay);
	setTimeout(function(){element.removeAttr('style')}, time + delay);
});

// Header box cells slide-in.
$(document).ready(function(){
	var element = $('.header-box td');
	var delay = 450;
	var time = 1000;
	element.css('left', '100%');
	element.css('transition', time + 'ms');
	element.each(function(index){
		setTimeout(function(){
			$(element[index]).css('left', '0%');
		}, delay);
		delay += 50;
	});
	setTimeout(function(){element.removeAttr('style')}, time + delay);
});

// Aside left slide-in.
$(document).ready(function(){
	var element = $('.content-nav, .left-box, .left-box2');
	var delay = 800;
	var time = 1000;
	element.css('left', '-100%');
	element.css('transition', time + 'ms');
	element.each(function(index){
		setTimeout(function(){
			if(element[index].className.search('content-nav') > -1){
				$(element[index]).css('left', '-25%');
				$('.left-box').css('display', 'none');
			}else{
				$(element[index]).css('left', 0);
			}
		}, delay);
		delay += 100;
	});
	setTimeout(function(){element.removeAttr('style')}, time + delay);
});

// Aside right slide-in.
$(document).ready(function(){
	var element = $('.right-box, .right-box2');
	var delay = 800;
	var time = 1000;
	element.css('right', '-100%');
	element.css('transition', time + 'ms');
	element.each(function(index){
		setTimeout(function(){
			$(element[index]).css('right', 0);
		}, delay);
		delay += 100;
	});
	setTimeout(function(){element.removeAttr('style')}, time + delay);
});

// Content slide-in.
$(document).ready(contentSlideIn);
function contentSlideIn(){
	var element = $('.content-box');
	var delay = 50;
	var time = 1000;
	element.each(function(index){
		$(element[index]).css('left', index % 2 ? '-500%' : '500%');
	});
	element.css('transition', time + 'ms');
	element.each(function(index){
		setTimeout(function(){
			$(element[index]).css('left', 0);
		}, delay);
		delay +=50;
	});
}

/* ########################################################################## */
/* #### Navigation Bar ###################################################### */
/* ########################################################################## */

// Throttle prevents lag.
$(window).scroll($.throttle(100, navbar));

// Only show the navbar if we need it.
function navbar(){
	if(typeof navbar.element === 'undefined'){
		navbar.element = $('.navbar');
		navbar.headerHeight = $('.header').height();
	}
	var viewOffset = $(window).scrollTop();
	
	if(viewOffset > navbar.headerHeight){
		navbar.element.addClass('navbar-show');
	}else if(navbar.element.hasClass('navbar-show')){
		navbar.element.removeClass('navbar-show');
	}
}

/* ########################################################################## */
/* #### AJAX Content Loader ################################################# */
/* ########################################################################## */

// Store the current state.
var state = window.location.pathname + window.location.hash;

// Change the URL when an AJAX link is clicked.
$(document).on('click', '.ajax-link', function(event){
	event.preventDefault();
	// Change the URL and create history.
	if(window.location.pathname !== this.pathname){
		this.href = $(this).attr('href');
		//history.pushState(null, null, this.href + this.hash);
		setState(this.href);
	}
});

// Change the URL when the back button is clicked. Not sure why this needs to be wrapped in a function.
window.onpopstate = function(){
	if(window.location.pathname !== state.split('#')[0]){
		setState(window.location.href + window.location.hash);
	}
};

// Synchronize with a new state.
function setState(link){
	if(typeof setState.title === 'undefined') setState.title = document.title;
	if(typeof setState.header === 'undefined') setState.header = $('.header-h2');
	if(typeof setState.content === 'undefined') setState.content = $('.content');
	
	document.title = 'Jon Hawks \u2622 Loading...';
	setState.header.text('Loading...');
	setState.header.css({'opacity': .25, 'transition': '1s opacity'});
	setState.content.css({'opacity': 0, 'transition': '1s opacity'});
	setTimeout(function(){
		setState.content.load(link, function(){
			document.title = 'Jon Hawks';
			setState.header.text('/' + link.split('/')[link.split('/').length - 1].replace('.html', ''));
			state =  window.location.pathname + window.location.hash;
			setState.header.css('opacity', 1);
			setState.content.css('opacity', 1);
			
			// Code highlighting.
			$('code').each(function(i, block){hljs.highlightBlock(block);});
		});
	}, 400);
}

/* ########################################################################## */
/* #### Calendar & Clock #################################################### */
/* ########################################################################## */
$(document).ready(function(){$('.calendar').text(calendar())});
function calendar(){
	calendar.date = new Date();
	calendar.year = calendar.date.getFullYear();
	calendar.month = calendar.date.getMonth();
	calendar.day = calendar.date.getDate();
	
	// Verbose month.
	switch(calendar.month){
		case 0: calendar.month = 'January'; break;
		case 1: calendar.month = 'February'; break;
		case 2: calendar.month = 'March'; break;
		case 3: calendar.month = 'April'; break;
		case 4: calendar.month = 'May'; break;
		case 5: calendar.month = 'June'; break;
		case 6: calendar.month = 'July'; break;
		case 7: calendar.month = 'August'; break;
		case 8: calendar.month = 'September'; break;
		case 9: calendar.month = 'October'; break;
		case 10: calendar.month = 'November'; break;
		case 11: calendar.month = 'December'; break;
	}
	
	// Date suffix.
	switch(calendar.day){
		case 1: calendar.day += 'st'; break;
		case 2: calendar.day += 'nd'; break;
		case 3: calendar.day += 'rd'; break;
		case 21: calendar.day += 'st'; break;
		case 22: calendar.day += 'nd'; break;
		case 23: calendar.day += 'rd'; break;
		case 31: calendar.day += 'st'; break;
		default: calendar.day += 'th'; break;
	}
	
	return calendar.month + ' ' + calendar.day + ', ' + calendar.year;
}

setInterval(function(){$('.clock').text(clock())}, 1000);
function clock(){
	clock.time = new Date();
	clock.hours = clock.time.getHours();
	clock.minutes = clock.time.getMinutes();
	clock.seconds = clock.time.getSeconds();
	
	// Leading zeroes.
	if(clock.minutes < 10) clock.minutes = '0' + clock.minutes;
	if(clock.seconds < 10) clock.seconds = '0' + clock.seconds;
	
	// Calculate ante meridiem or post meridiem.
	if(clock.hours > 12){
		clock.meridiem = 'PM';
		clock.hours -= 12;
	}else{
		clock.meridiem = 'AM';
	}
	
	// Zero hour is midnight.
	if(clock.hours == 0) clock.hours = 12;
	
	return clock.hours + ':' + clock.minutes + ':' + clock.seconds + ' ' + clock.meridiem;
}