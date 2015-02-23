function validateUsername(errors) {
  var username = $('#username').val();
  var forbidden = ['jaranda', 'admin', 'jgalisteo'];
  var hasError = false;

  if ( username == '' ) {
    errors.push('El usuario no puede estar vacío');
    hasError = true;
  }

  if ( forbidden.indexOf(username) != -1) {
    errors.push('El usuario no se puede usar');
    hasError = true;
  }

  if ( hasError ) {
    $('#username-group').addClass('has-error').removeClass('has-success');
  } else {
    $('#username-group').removeClass('has-error').addClass('has-success');
  }
}

function validatePassword(errors) {
  var password = $('#password').val();
  var hasError = false;

  if ( password == '' ) {
    errors.push('La contraseña no puede estar vacía');
    hasError = true;
  }

  if ( hasError ) {
    $('#password-group').addClass('has-error').removeClass('has-success');
  } else {
    $('#password-group').removeClass('has-error').addClass('has-success');
  }
}

function validateConfirmation(errors) {
  var confirmation = $('#confirmation').val();
  var password = $('#password').val();
  var hasError = false;

  if ( confirmation == '' ) {
    errors.push('La confirmación de la contraseña no coincide');
    hasError = true;
  }

  if ( confirmation !== password ) {
    errors.push("La confirmación de contraseña debe ser igual a la contraseña");
    hasError = true;
  }

  if ( hasError ) {
    $('#confirmation-group').addClass('has-error').removeClass('has-success');
  } else {
    $('#confirmation-group').removeClass('has-error').addClass('has-success');
  }
}

function validateEmail(errors) {
  var email = $('#email').val();
  var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var hasError = false;

  if ( email == '' ) {
    errors.push('El email no puede estar vacío');
    hasError = true;
  }

  if ( ! EMAIL_REGEXP.test( email ) ) {
    errors.push("El email no es válido");
    hasError = true;
  }

  if ( hasError ) {
    $('#email-group').addClass('has-error').removeClass('has-success');
  } else {
    $('#email-group').removeClass('has-error').addClass('has-success');
  }
}

$(function() {
  $('#validate').click(function() {
    var errors = [];

    validateUsername(errors);
    validatePassword(errors);
    validateConfirmation(errors);
    validateEmail(errors);

    if ( errors.length ) {
      $('#errors').removeClass('hide');

      var alertErrors = '<ul>';

      _.forEach(errors, function(error) {
        alertErrors += '<li>' + error + '</li>';
      });

      alertErrors += '</ul>';

      $('#errors').html( alertErrors );
    } else {
      $('#errors').addClass('hide').html(null);
    }
  });
});
