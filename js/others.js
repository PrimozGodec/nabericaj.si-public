// enable tooltip on any emement containg tag tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(document).scroll(function() {
  $('img.logo').stop().animate(
  	{height: $(this).scrollTop() > 20? "70px":"140px"},
  	700
  );
  if ($(this).scrollTop() > 20) {
  	$('nav.navbar').addClass('shadow-sm');
  } else {
  	$('nav.navbar').removeClass('shadow-sm');
  }
});