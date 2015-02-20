var validations = {
  username: function(errors) {
    var username = $("#username").val();
    var failed = false;

    // no puede estar en blanco
    if ( _.isEmpty( username ) ) {
      errors.push("El nombre de usuario no puede estar en blanco");
      failed = true;
    }

    // no puede ser un nombre restringido
    var restricted = ["jaranda", "jgalisteo", "cosfera", "nosolosoftware"];

    if ( _.includes(restricted, username) ) {
      errors.push("El nombre de usuario ya existe");
      failed = true;
    }

    return ! failed;
  },

  password: function(errors) {
    var password = $("#password").val();
    var failed = false;

    // no puede estar en blanco
    if ( _.isEmpty( password ) ) {
      errors.push("La contraseña no puede estar en blanco");
      failed = true;
    }

    // tiene que tener una longitud de al menos 8 caracteres
    if ( password.length < 8 ) {
      errors.push("La contraseña tiene que tener al menos 8 caracteres");
      failed = true;
    }

    return ! failed;
  },

  confirmation: function(errors) {
    var password = $("#password").val();
    var confirmation = $("#confirmation").val();
    var failed = false;

    // no puede estar en blanco
    if ( _.isEmpty( confirmation ) ) {
      errors.push("La confirmación de contraseña no puede estar en blanco");
      failed = true;
    }

    // la confirmación debe coincidir con la contraseña
    if ( confirmation !== password ) {
      errors.push("La confirmación de contraseña debe ser igual a la contraseña");
      failed = true;
    }

    return ! failed;
  },

  email: function(errors) {
    var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = $("#email").val();
    var failed = false;

    // no puede estar en blanco
    if ( _.isEmpty( email ) ) {
      errors.push("El email no puede estar en blanco");
      failed = true;
    }

    // debe ser una direccion de email
    if ( ! EMAIL_REGEXP.test( email ) ) {
      errors.push("El email no es válido");
      failed = true;
    }

    return ! failed;
  }
};

$(function() {
  $("#validate").click(function(evt) {
    var errors = [];
    var html = "";

    var fields = ["username", "password", "confirmation", "email"];

    _.each(fields, function(field) {
      if ( validations[field](errors) ) {
        // mostrar el input como valido
        $("#" + field + "-group").removeClass("has-error").addClass("has-success");
        // mostrar el tick verde
        $("#" + field + "-group .glyphicon-ok").removeClass("hide");
        $("#" + field + "-group .glyphicon-remove").addClass("hide");
      } else {
        // mostrar error en el input
        $("#" + field + "-group").removeClass("has-success").addClass("has-error");
        // mostrar la cruz roja
        $("#" + field + "-group .glyphicon-ok").addClass("hide");
        $("#" + field + "-group .glyphicon-remove").removeClass("hide");
      }
    });

    // si hay algún error, mostrar la lista en la parte superior
    if ( errors.length ) {
      html += "<ul>";

      _.forEach(errors, function(error) {
        html += "<li>" + error + "</li>";
      });

      html += "</ul>";

      $("div.alert").html( html ).removeClass("hide");;
    } else {
      $("div.alert").html( "" ).addClass("hide");;
    }
  });
});
