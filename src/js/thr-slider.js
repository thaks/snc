$(document).ready(function(){
    $('.thr-slider__wrapper').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        dots: false,
        arrows: false,

        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
              }
            },
            {
              breakpoint: 870,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
              }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
    });
});

$(document).ready(function(){
  $('.thr-slider__wrapper').slick({
      slidesToShow: 6,
      slidesToScroll: 6,
      autoplay: true,
      dots: false,
      arrows: false,

      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            }
          },
          {
            breakpoint: 870,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            }
          },
          {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
  });
});