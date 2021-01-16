// enable tooltip on any emement containg tag tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// incerase or decrease logo size
window.addEventListener('scroll', function() {
  // get how much scrooled
  var scrollTop = (
    (window.pageYOffset !== undefined) ? 
    window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
  );
  // all logo elements
  var logo_img = document.querySelectorAll("img.logo");
  // nabar element
  var nav = document.querySelector("nav.navbar");
  if (scrollTop > 20) {
    // when on top of the page - no shadow and logo full size
  	nav.classList.add('shadow-sm');
    logo_img.forEach(function(el) {
      el.classList.add("small");
    });
  } else {
    // when scrooled down - shadow and small logo
  	nav.classList.remove('shadow-sm');
    logo_img.forEach(function(el) {
      el.classList.remove("small");
    });
  }
});
