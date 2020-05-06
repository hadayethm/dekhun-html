/*----------------------------------------
         Text Hover Effect
----------------------------------------*/
var $wrap = $("#wrappera"),
  lFollowX = 0,
  lFollowY = 0,
  x = 0,
  y = 0,
  friction = 1 / 10;

function animate() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  $wrap.css({
    transform:
      "translate(-0%, -0%) perspective(900px) rotateY(" +
      -x +
      "deg) rotateX(" +
      y +
      "deg)"
  });
  window.requestAnimationFrame(animate);
}

$(window).on("mousemove click", function(e) {
  var lMouseX = Math.max(-50, Math.min(50, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-50, Math.min(50, $(window).height() / 2 - e.clientY));
  lFollowX = (12 * lMouseX) / 50; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 50;
});

animate();

$("html").on("mousemove", function(e) {
  var wx = $(window).width();
  var wy = $(window).height();

  var x = e.pageX - this.offsetLeft;
  var y = e.pageY - this.offsetTop;

  var newx = x - wx / 2;
  var newy = y - wy / 2;

  $("img").text(newx + ", " + newy);

  $(".about-2-img img").each(function() {
    var speed = $(this).attr("data-speed");
    if ($(this).attr("data-revert")) speed *= -1;
    TweenMax.to($(this), 1, { x: 1 - newx * speed, y: 1 - newy * speed });
  });
});

/*----------------------------------------
            Video Plugin
----------------------------------------*/

var $iframe = $("iframe"),
  $videoLink = $(".video-link"),
  playerTemplate =
    '<div class="player"><div class="player__video"><div class="video-filler"></div><button class="video-close">&times;</button><iframe class="video-iframe" src="{{iframevideo}}" frameborder="0" allowfullscreen></iframe></div><div/>';

$videoLink.on("click", function(e) {
  var localTemplate = "",
    videoWidth = parseInt($(this).data("width")),
    videoHeight = parseInt($(this).data("height")),
    videoAspect = (videoHeight / videoWidth) * 100,
    // elements
    $player = null,
    $video = null,
    $close = null,
    $iframe = null;

  e.preventDefault();

  localTemplate = playerTemplate.replace(
    "{{iframevideo}}",
    $(this).prop("href")
  );

  $player = $(localTemplate);

  $player.find(".video-filler").css("padding-top", videoAspect + "%");

  $close = $player.find(".video-close").on("click", function() {
    $(this)
      .off()
      .closest(".player")
      .hide()
      .remove();
  });

  $player.appendTo("body").addClass("js--show-video");
});

$(".portfolio-item-two").isotope({
  itemSelector: ".work-items-two",
  layoutMode: "fitRows"
});
$(".filter-btn-isotop ul li").on("click", function() {
  $(".filter-btn-isotop ul li").removeClass("active");
  $(this).addClass("active");

  var selector = $(this).attr("data-filter");
  $(".portfolio-item-two").isotope({
    filter: selector
  });
  return false;
});

/*================================
    Navagation
================================*/

$(function() {
  $(window).on("scroll", function() {
    if ($(this).scrollTop() < 50) {
      $(".navber-two-area").removeClass("nav-two");
    } else {
      $(".navber-two-area").addClass("nav-two");
    }
  });
});

/*---------------------------------------------------
            project filter
  ----------------------------------------------------*/
var Container = $("#project-area");
Container.imagesLoaded(function() {
  var portfolio = $(".project-menu");
  portfolio.on("click", "button", function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({
      filter: filterValue
    });
  });
  var $grid = $(".project-items").isotope({
    itemSelector: ".grid-item",
    masonry: {
      columnWidth: 1
    }
  });
});
