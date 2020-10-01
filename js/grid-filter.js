$(document).ready(function(){
  $("#filterinput").on("keyup", function() {
    var filter_value = $(this).val().toLowerCase();
    // btn-primary is selected one
    var category_value =  $('div#categories button.btn-primary').data('value');
    if (category_value === undefined) {
      // cases where we do not have
      category_value = "all";
    }
    console.log(category_value);
    filterGrid(filter_value, category_value);
  });

  $(".category-button").on("click", function() {
  	var filter_value = $("#filterinput").val().toLowerCase();
  	var category_value = $(this).data('value');

    // unselect all buttons
    $('.category-button').removeClass('btn-primary')
    $('.category-button').addClass('btn-outline-primary')
    // select clicke button
    $(this).removeClass('btn-outline-primary')
    $(this).addClass('btn-primary');

    filterGrid(filter_value, category_value);
  });
});

function filterGrid(filter_value, category_value) {
  /*
  Hide blockst that do not contain text from filter_value 
  or the category_value is not in its class.
  */
	$("#menu-grid>div.col").filter(function() {
		var filter_mathces = $(this).text().toLowerCase().indexOf(filter_value) > -1;
		var category_mathces = (
      (category_value === "all") ? true : $(this).hasClass(category_value)
    );
    if (filter_mathces && category_mathces)
      $(this).show();
    else
      $(this).hide();
  });
}
