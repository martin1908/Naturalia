'use strict';

$(window).load(function(){

  jQuery("#status").delay(0).fadeOut();
  jQuery("#preloader").delay(1000).fadeOut("slow",function(){

    var text = $.trim($('.main-header').text()),
    word = text.split(' '),
    str = "";
    $.each( word, function( key, value ) {
      if(key != 0) { str += " "; }
      str += "<span class='word'>" + value + "</span>";
    });
    $('.main-header').html(str);

    $('.main-header span').each(function (index) {
      var characters = $(this).text().split("");
      var $this = $(this);
      $this.empty();
      $.each(characters, function (i, el) {
        $this.append("<span class='letter'>" + el + "</span");
      });
    });


    $('.zoom-img').addClass('zoomIn');
    $('.main-header .letter').each(function() {
      $(this).css('display','inline-block').addClass('animated-service-header');
    });
    setTimeout(function(){
      $('.main-header ').addClass('breathing');
    }, 2000);
    setTimeout(function(){
      $('.desc-inner p').addClass('breathing');
    }, 2100);
    $('#home p').addClass('swing-horizontal');
    setTimeout(function(){
      $('.arrow-wrap').addClass('arrow');
    }, 2200);
  });
});

$(document).ready(function(){

  $('.open-map').on('click',function(){  
    $('#map').slideDown();
    initMap();
    $('.close-map').show();
    $('html, body').animate({
      scrollTop: $('footer').offset().top
    }, 'slow');
    $('.open-map').hide();
  });

  $('.close-map').on('click',function(){
    $('#map').slideUp();
    $('.open-map').show();
  });

  $('.nav a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  var counter = new Waypoint({
    element: $('#blog'),
    handler: function(direction) {
      $('.timer').countTo({
        from: 0,
        to: 320,
        speed: 2000,
        refreshInterval: 50,
        onComplete: function(value) {
        }
      });

      $('.timer-2').countTo({
        from: 0,
        to: 2500,
        speed: 2000,
        refreshInterval: 50,
        onComplete: function(value) {
        }
      });

      $('.timer-3').countTo({
        from: 50,
        to: 1234,
        speed: 2000,
        refreshInterval: 50,
        onComplete: function(value) {
        }
      });

      $('.timer-4').countTo({
        from: 0,
        to: 24,
        speed: 2000,
        refreshInterval: 50,
        onComplete: function(value) {
        }
      });
    },
    offset: 510
  });

  $('.navbar-default').addClass('transparent');
  var navbar = new Waypoint({
    element: document.getElementById('about'),
    handler: function(direction) {
      $('.navbar-default').removeClass('transparent').fadeIn('fast');
      this.destroy();
    },
    offset: 104
  });

  $('.navbar-toggle').on('click',function(){
    $('.navbar').css('background','#fff');
    $('.navbar-collapse.collapse .navbar-nav>li>a').css('color','#363636')
  });


  var gallery = new Waypoint({
    element: document.getElementById('gallery'),
    handler: function(direction) {

      $('#Container').mixItUp({
        transitionSpeed: 450,

        callbacks: {
          onMixFail: function(state){
            alert('No elements found matching '+state.activeFilter);
          },
          onMixEnd: function(state){
          }
        }
      });

    },
    offset: 410
  });


  $('.link').on('click', function(){
    var navbarHeight = $('.navbar-header').height();
    console.log(navbarHeight);
    $('html, body').animate({
      scrollTop: $( $(this).attr('href') ).offset().top -(navbarHeight-1)
    }, 1500, 'easeOutSine');
    return false;
  });

  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'showImageNumberLabel':false,
    'positionFromTop':150
  })

  var quotesSlick = $('.quotes-slider').slick({
    dots: false,
    infinite: true,
    speed: 1000,
    fade: false,
    cssEase: 'linear',
    autoplay:true,
    autoplaySpeed:2000,
    arrows:false
  });

  var serviceSlick = $('.service-slider').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows:false,
    autoplay: false,
    autoplaySpeed: 2000,
    easing: 'easeOutElastic', 
    responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }

    ]
  });

  $('.customers').slick({
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    fade:true,
    autoplay: false,
    autoplaySpeed: 2000,
    easing: 'easeOutElastic'
  });

  event.preventDefault();

});

function sendContact() {
  var valid;  
  valid = validateContact();
  if(valid) {
    jQuery.ajax({
      url: "php/contact.php",
      data:'userName='+$("#userName").val()+'&userEmail='+$("#userEmail").val()+'&subject='+$("#subject").val()+'&content='+$(content).val(),
      type: "POST",
      success:function(data){
        $("#mail-status").html(data);
      },
      error:function (){}
    });
  }
}

function validateContact() {
  var valid = true; 
  $(".demoInputBox").css('background-color','');
  $(".info").html('');

  if(!$("#userName").val()) {
    $("#userName-info").html("(required)");
    $("#userName").css('background-color','#FFFFDF');
    valid = false;
  }
  if(!$("#userEmail").val()) {
    $("#userEmail-info").html("(required)");
    $("#userEmail").css('background-color','#FFFFDF');
    valid = false;
  }
  if(!$("#userEmail").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
    $("#userEmail-info").html("(invalid)");
    $("#userEmail").css('background-color','#FFFFDF');
    valid = false;
  }
  if(!$("#subject").val()) {
    $("#subject-info").html("(required)");
    $("#subject").css('background-color','#FFFFDF');
    valid = false;
  }
  if(!$("#content").val()) {
    $("#content-info").html("(required)");
    $("#content").css('background-color','#FFFFDF');
    valid = false;
  }

  return valid;
}