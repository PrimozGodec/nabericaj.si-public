var TodayDate = new Date();
current_month = TodayDate.getMonth() + 1;

meseci_skl = [
	'januarju', 'februarju', 'marcu', 'aprilu', 
	'maju', 'juniju', 'juliju', 'avgustu', 'septembru',
	'oktobru', 'novembru', 'decembru'
];

document.addEventListener('DOMContentLoaded', function() {
	var buttons = document.querySelectorAll(".month-button");
	buttons.forEach(item => {
		item.addEventListener('click', function(e) {
			// unselect selected button
			var selected_button = document.querySelector(".month-button.btn-dark");
			selected_button.classList.remove('btn-dark');
	    selected_button.classList.add('btn-outline-dark');
	    // select clicke button
	    e.target.classList.remove('btn-outline-dark');
	    e.target.classList.add('btn-dark');

	    filterPlantsMonth(parseInt(e.target.getAttribute('data-value')));
	  });
	});

	// select current month when page opened
	if(document.URL.indexOf("po-mesecih") >= 0) 
		selectCurrentMonth();

	showRandomNCurrent(7);
}, false);

function filterPlantsMonth(selected_month) {
	document.querySelectorAll("#months-grid>div.col").forEach(el => {
		// read data-months, parse to list and transform to numbers
		months = JSON.parse(el.getAttribute('data-months')).map(Number);
		if (months.includes(selected_month)) 
			el.style.display = ""
		else
			el.style.display = "none";
	});

	setTitle(selected_month);
}

function setTitle(selected_month) {
	title_el = document.querySelector('#months-title');
	if (selected_month === current_month)
		title_el.textContent = "Trenutno nabiramo";
	else 
		title_el.textContent = `V ${meseci_skl[selected_month - 1]} nabiramo`;
}

function selectCurrentMonth() {
	document.querySelectorAll("button.month-button").forEach(item => {
		if (parseInt(item.getAttribute('data-value')) === current_month) {
			item.classList.remove('btn-outline-dark');
    	item.classList.add('btn-dark');
    }
	});

	filterPlantsMonth(current_month);
}

/* function for the index page where we show only
random n currently growing buttons */
function showRandomNCurrent(n) {
	var button_el = Array.from(document.querySelectorAll('.trenutno-nabiramo-button'));
	var elements = button_el.filter(el => {
		return JSON.parse(el.getAttribute('data-months')).map(Number).includes(current_month);
	});

	let all = elements.length;

	// Shuffle array
	const shuffled = elements.sort(() => 0.5 - Math.random());
	// Get sub-array of first n elements after shuffled
	let selected = shuffled.slice(0, n);


	button_el.forEach(item => {item.style.display = "none"});
	selected.forEach(item => {item.style.display = ""});

	let n_othr = all - n;
	n_othr_button = document.querySelector('.trenutno-nabiramo-button-others');
	n_othr_button.textContent = `+ ${n_othr} ostalih`;
	// already shown - hide in case when not required
	if (n_othr < 0)
		n_othr_button.style.display = "none";
}