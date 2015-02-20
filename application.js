var count = 1;

function addRowToTable(book) {
  var table = $("table tbody");
  var html = "";

  html += '<tr>';
  html += '<th scope="row">' + count + '</th>';
  html += '<td>' + book.title + '</td>';
  html += '<td>' + book.author + '</td>';
  html += '<td>' + book.price + '</td>';
  html += '</tr>';

  table.append(html);
  count++;
}

$(function() {
  // cargar el listado inicial
  $.ajax({
    url: "http://127.0.0.1:3000/books",
    method: "GET",
    dataType: "json"
  }).done(function(books) {
    _.forEach(books, function(book) {
      addRowToTable(book);
    });
  });
});
