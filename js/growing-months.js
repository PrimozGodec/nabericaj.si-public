var TodayDate = new Date();
current_month = TodayDate.getMonth() + 1;

meseci_skl = [
	'januarju', 'februarju', 'marcu', 'aprilu', 
	'maju', 'juniju', 'juliju', 'avgustu', 'septembru',
	'oktobru', 'novembru', 'decembru'
];

$(document).ready(function(){
	$(".month-button").on("click", function() {
		// unselect all buttons
    $('.month-button').removeClass('btn-primary');
    $('.month-button').addClass('btn-outline-primary');
    // select clicke button
    $(this).removeClass('btn-outline-primary');
    $(this).addClass('btn-primary');

    filterPlantsMonth($(this).data('value'));
	});

	// select current month when page opened
	selectCurrentMonth();

	showRandomNCurrent(7);
})

function filterPlantsMonth(selected_month) {
	$("#months-grid>div.col").filter(function() {
		months = $(this).data('months');
		if (months.includes(selected_month)) 
			$(this).show();
		else
			$(this).hide();
	});

	setTitle(selected_month);
} 

function setTitle(selected_month) {
	if (selected_month === current_month)
		$('#months-title').text("Trenutno nabiramo");
	else 
		$('#months-title').text(`V ${meseci_skl[selected_month - 1]} nabiramo`);
}

function selectCurrentMonth() {
	$("button.month-button").filter(function() {
		if ($(this).data('value') === current_month) {
			$(this).removeClass('btn-outline-primary');
    	$(this).addClass('btn-primary');
    }
	});

	filterPlantsMonth(current_month);
}

/* function for the index page where we show only
random n currently growing buttons */
function showRandomNCurrent(n) {
	var elements = $('.trenutno-nabiramo-button').filter(function() {
		return $(this).data('months').includes(current_month);
	});

	let all = elements.length;

	// Shuffle array
	const shuffled = elements.sort(() => 0.5 - Math.random());
	// Get sub-array of first n elements after shuffled
	let selected = shuffled.slice(0, n);

	$('.trenutno-nabiramo-button').hide();
	selected.show();

	let n_othr = all - n;
	$('.trenutno-nabiramo-button-others').text(`+ ${n_othr} ostalih`);
	if (n_othr > 0)
		$('.trenutno-nabiramo-button-others').show();
	else 
		$('.trenutno-nabiramo-button-others').hide();
}