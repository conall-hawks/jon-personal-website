/* ########################################################################## */
/* #### Fancy Page Loading ################################################## */
/* ########################################################################## */

// Throttle prevents lag.
$(window).scroll($.throttle(100, contentSlider));
$(window).resize(contentSlider);
function contentSlider(){
	if(typeof contentSlider.window === 'undefined') contentSlider.window = $(window);
	var top = contentSlider.window.scrollTop();
	var height = contentSlider.window.height();
	var fraction = top + height * .9;
	var element = $('.content-box:not(:first-of-type)');//possible filter(): if already in viewport don't select? would remove dependency in ajax callback
	element.each(function(index){
		if($(element[index]).offset().top > fraction){
			$(element[index]).css('transition', '.5s all, .25s opacity');
			$(element[index]).css('left', (index % 2 ? '150%' : '-150%'));
			$(element[index]).css('opacity', 0);
		}else{
			$(element[index]).css('transition', '.8s all, 1.15s opacity');
			$(element[index]).css('left', '0%');
			$(element[index]).css('opacity', 1);
		}
	});
}

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

function asideSlideOut(){
	var element = $('.content-nav, .left-box');
	element.css('left', '-100%');
	element.css('opacity', 0);
}

function contentSlideOut(){
	var element = $('.content-box');
	element.each(function(index){
		$(element[index]).css('left', (index % 2 ? '-150%' : '150%'));
		$(element[index]).css('opacity', 0);
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

// Change the Content when an AJAX link is clicked.
$(document).on('click', '.ajax-link', function(event){
	event.preventDefault();
	if(window.location.pathname !== this.pathname) setState(this.href);
});

// Synchronize with a new state.
function setState(link){
	if(typeof setState.header === 'undefined') setState.header = $('.header-h2');
	if(typeof setState.content === 'undefined') setState.content = $('.content');
	asideSlideOut();
	contentSlideOut();
	document.title = 'Jon Hawks \u2622 Loading...';
	setState.header.text('Loading...');
	setState.header.css({'opacity': .25, 'transition': '.5s opacity'});
	setTimeout(function(){
		setState.content.load(link, function(){
			contentSlider();
			document.title = 'Jon Hawks';
			setState.header.text('/' + link.split('/')[link.split('/').length - 1].replace('.html', ''));
			setState.header.css('opacity', 1);
			
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