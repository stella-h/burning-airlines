var app = app || {};

app.SeatView = Backbone.View.extend({
  tagName: 'div',
  render: function(row, column) {
    var seatViewTemplate = $('#seatViewTemplate').html();
    var seatViewHTML = _.template(seatViewTemplate);

    var data = this.model.toJSON();
    data.row = row;
    data.column = column;

    this.$el.addClass('seat');

    var view = this;

    r = app.currentReservations.toJSON();

    console.log(r);
    for (var i = 0; i < r.length; i++) {
      console.log('checking position ' + data.row + ', ' + data.column + ' against reservation: ' + r[i].row + ', ' + r[i].column);
      if (data.row === r[i].row && data.column === r[i].column) {
        view.$el.addClass('reserved');
        app.seatsRemaining--;
        console.log('one seat taken, there are now ' + app.seatsRemaining + 'seats on this flight.');
      }


    }

    var toAppend = view.$el.html(seatViewHTML(data));
    $('#flightViewDiv').append(toAppend);
  }
});
