$(function() {
  $("button.btn").click(function(evt) {
    var e = $(evt.target);
    var panel = $(".panel");

    var tipos = ["default", "primary", "success", "info", "warning", "danger"];

    $.each(tipos, function(index, tipo) {
      if ( e.hasClass("btn-" + tipo) ) {
        panel.removeClass();
        panel.addClass('panel');
        panel.addClass("panel-" + tipo);
      }
    });
  });
});
