window.HELP_IMPROVE_VIDEOJS = false;

var NUM_INTERP_FRAMES = 200;

function preloadInterpolationImages(interp_base) {
  var interp_images = [];
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = interp_base + '/' + String(i).padStart(3, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
  return interp_images;
}

function setInterpolationImage(i, wrapper_id, interp_images) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#' + wrapper_id).empty().append(image);
}

$(document).ready(function() {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  }

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);

  // Loop on each carousel initialized
  for (var i = 0; i < carousels.length; i++) {
    // Add listener to event
    carousels[i].on('before:show', state => {
      console.log(state);
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function(state) {
      console.log(state);
    });
  }

  // Loop through each interpolation video column
  $('.interpolation-video-column').each(function(index) {
    // Retrieve interpBase from data attribute
    var interp_base = $(this).data('interp-base');
    var slider_id = $(this).data('slider-id');
    var wrapper_id = $(this).data('wrapper-id');

    var interp_images = preloadInterpolationImages(interp_base);

    $('#' + slider_id).on('input', function(event) {
      setInterpolationImage(this.value, wrapper_id, interp_images);
    });

    // Set the initial image
    setInterpolationImage(NUM_INTERP_FRAMES / 2, wrapper_id, interp_images);
    $('#' + slider_id).prop('max', NUM_INTERP_FRAMES - 1);
    $('#' + slider_id).val(NUM_INTERP_FRAMES / 2); // Set slider to NUM_INTERP_FRAMES/2
  });

  bulmaSlider.attach();
});
