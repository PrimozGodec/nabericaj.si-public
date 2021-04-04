// enable tooltip on any emement containg tag tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// incerase or decrease logo size
window.addEventListener('scroll', function() {
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  // get how much scrooled
  var scrollTop = (
    (window.pageYOffset !== undefined) ? 
    window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
  );
  // all logo elements
  var logo_img = document.querySelectorAll("img.logo.collapsable");
  // nabar element
  var nav = document.querySelector("nav.navbar");
  if (scrollTop > 20) {
    // when on top of the page - no shadow and logo full size
    if (width > 768)  // on small screen navbar is not fixed-top
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

// hide social bar when over image
document.addEventListener('DOMContentLoaded', function() {
  // gather all relevant elements on page
  var images_all = Array.from(document.querySelectorAll("img"));
  images_all = images_all.filter(el => !el.classList.contains("social-button"));
  var social_bar = document.getElementById("social-bar");

  // on every scrool
  if (typeof(social_bar) != 'undefined' && social_bar != null) {
    window.addEventListener('scroll', function() {
      var social_rect = social_bar.getBoundingClientRect();
      function elements_sticks(element, index, array) {
        el_rect = element.getBoundingClientRect();
        return !(el_rect.right < social_rect.left || 
                 el_rect.left > social_rect.right || 
                 el_rect.bottom < (social_rect.top - 100) || 
                 el_rect.top > (social_rect.bottom + 100))
      }
      var overlap = images_all.some(elements_sticks);

      // hide with opacity - because of animation
      if (overlap)
        social_bar.style.opacity = "0";
      else
        social_bar.style.opacity = "1";
    });
  }
}, false);