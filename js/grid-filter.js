// DOM element loaded and not all stylesheets
document.addEventListener('DOMContentLoaded', function() { 
  // event for changes in input
  document.querySelector("#filterinput").addEventListener('input', filterGrid);

  // event for category button click
  var category_buttons = document.querySelectorAll(".category-button");
  category_buttons.forEach(item => {
    item.addEventListener('click', function(e) {
      selectCategory(e.target);
      // save selection to input for browser to cache it
      document.querySelector("#selected_category").value = e.target.getAttribute('data-value');

      filterGrid();
      filterSubcategories();
    });
  });
}, false);

// when load complete - also autofill values
window.addEventListener('load', () => {
  selectInitialCategory();
  filterGrid();
  filterSubcategories();
}, false);

function selectInitialCategory() {
  // select category selected in the selected_category input (in case browser caches it)
  var input_el = document.querySelector("#selected_category");
  if (input_el) {  // input_le exist only where categories are present (does not exist for subcategoy pages)
    selected = input_el.value;
    document.querySelectorAll('.category-button').forEach(item => {
      if (item.getAttribute('data-value') === selected)
        selectCategory(item);
    });
  }
}

function selectCategory(target) {
  // unselect selected button
  document.querySelectorAll('.category-button.btn-success').forEach(item => {
    item.classList.add('btn-outline-success');
    item.classList.remove('btn-success');
  });
  // select clicked button
  target.classList.remove('btn-outline-success');
  target.classList.add('btn-success');
}

function getCategory() {
  var cat_sel_button = document.querySelector('div#categories button.btn-success');
  if (!cat_sel_button)
    var category_value = "all";
  else
    var category_value = cat_sel_button.getAttribute('data-value');
  return category_value;
}

function filterGrid() {
  /*
  Hide blockst that do not contain text from filter_value 
  or the category_value is not in its class.
  */
  var filter_value = document.querySelector("#filterinput").value.toLowerCase();
  var category_value = getCategory();

  var elements = document.querySelectorAll("#menu-grid>div.col");
	elements.forEach(function(el) {
		var filter_mathces = el.textContent.toLowerCase().indexOf(filter_value) > -1;
		var category_mathces = (
      (category_value === "all") ? true : el.classList.contains(category_value)
    );
    if (filter_mathces && category_mathces)
      el.style.display = '';  // show
    else
      el.style.display = 'none';
  });
}

function filterSubcategories() {
  /*
  Hide subcategories buttons that are not in the category
  */
  var category_value = getCategory();
  var elements = document.querySelectorAll("#sub-categories>a");
  elements.forEach(function(el) {
    if (category_value === "all")
      el.style.display = '';
    else {
      if (el.getAttribute('data-categories').includes(category_value))
        el.style.display = '';
      else
        el.style.display = 'none';
    }
  });
}
