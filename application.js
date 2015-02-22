function addBookToTable(book) {
  var table = $('table tbody');
  var html = '';

  html += '<tr data-id="' +  book._id + '">';
  html += '<td>' + book.title + '</td>';
  html += '<td>' + book.author + '</td>';
  html += '<td>' + book.price + '</td>';
  html += '<td><button type="button" class="btn btn-xs btn-danger"><span class="glyphicon glyphicon-remove"></span></button></td>';
  html += '</tr>';

  table.append(html);
}

function removeBookFromTable(id) {
  $('tr[data-id="' + id + '"').remove();
}

function addAlert(type, content) {
  var html = '';
  html += '<div class="row"><div class="col-md-8 col-md-offset-2">';
  html += '<div class="alert alert-' + type + ' alert-dismissible" role="alert">';
  html += '<button type="button" class="close" data-dismiss="alert">';
  html += '<span>&times;</span></button>' + content + '</div>';
  html += '</div></div>';

  $('#wrapper').prepend(html);
}

function clearForm() {
  $('#title').val(null);
  $('#author').val(null);
  $('#price').val(null);

  $('#group-title, #group-author, #group-price')
    .removeClass('has-error')
    .removeClass('has-success');

  $('#errors').addClass('hide').html(null);
}

function formWithErrors(errors) {
  var alertErrors = [];

  // resetear todos
  $('#group-title, #group-author, #group-price')
    .removeClass('has-error')
    .addClass('has-success');

  if ( errors.title ) {
    $('#group-title').removeClass('has-success').addClass('has-error');

    if ( errors.title[0] == 'blank' ) {
      alertErrors.push("El título no puede estar en blanco");
    }
  }

  if ( errors.author ) {
    $('#group-author').removeClass('has-success').addClass('has-error');

    if ( errors.author[0] == 'blank' ) {
      alertErrors.push("El autor no puede estar en blanco");
    }
  }

  if ( errors.price ) {
    $('#group-price').removeClass('has-success').addClass('has-error');

    if ( errors.price[0] == 'blank' ) {
      alertErrors.push("El precio no puede estar en blanco");
    }
  }

  if ( alertErrors.length ) {
    var html = '';
    html = '<ul>';

    _.forEach(alertErrors, function(error) {
      html += '<li>' + error + '</li>';
    });

    html += '</ul>';

    $('#errors').html(html);
    $('#errors').removeClass('hide');
  }
}

$(function() {
  // cargar el listado inicial
  $.ajax({
    url: 'http://127.0.0.1:3000/books',
    method: 'GET',
    dataType: 'json'
  }).done(function(books) {
    _.forEach(books, function(book) {
      addBookToTable(book);
    });
  });

  // eliminar libro al pulsar la X
  $('table').on('click', 'button.btn-danger', function(evt) {
    var id = $(this).closest('tr').attr('data-id');
    var confirmation =  confirm('¿Estás seguro de que quieres eliminar el libro?');

    // no hacer nada si no se confirma la operación
    if ( ! confirmation ) return false;

    // enviar la petición de borrado
    $.ajax({
      url: 'http://127.0.0.1:3000/books/' + id,
      method: 'DELETE'
    }).done(function() {
      addAlert('success', 'El libro ha sido correctamente eliminado');
      removeBookFromTable(id);
    });
  });

  // añadir un nuevo libro
  $('#save').click(function(evt) {
    var title = $('#title').val();
    var author = $('#author').val();
    var price = $('#price').val();
    var data = {
      title: title,
      author: author,
      price: parseInt(price, 10)
    };

    $.ajax({
      url: 'http://127.0.0.1:3000/books',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data)
    }).done(function(response) {
      addAlert('success', 'El libro ha sido creado correctamente');
      addBookToTable(response);
      clearForm();
    }).fail(function(jqXHR) {
      if ( jqXHR.status == 422 ) {
        formWithErrors(jqXHR.responseJSON.errors);
      }
    });
  });
});
