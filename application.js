function addBookToTable(book) {
  var row = '<tr>';
  row += '<td>' + book.title + '</td>';
  row += '<td>' + book.author + '</td>';
  row += '<td>' + book.price + '</td>';
  row += '<td></td>';
  row += '</tr>';

  $('table tbody').append( row );
}

$(function() {
  // cargar el listado inicial de libros
  $.ajax({
    url: 'http://127.0.0.1:3000/books',
    method: 'GET',
    dataType: 'json'
  }).done(function(books) {
    _.forEach(books, function(book) {
      addBookToTable( book );
    });
  });
});
