(function($) {
  $(".nav_btn").on("click", function() {
    $(this).toggleClass('nav_btn_actived');
    $(this).next().toggleClass('nav_actived');
    return false;
  });
})(jQuery);
