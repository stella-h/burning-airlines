var app = app || {};

app.SeatView = Backbone.View.extend({
  tagName: 'div',
  
  events: {
    'click': 'reserveSeat'
  },

  render: function(row, column) {
    var seatViewTemplate = $('#seatViewTemplate').html();
    var seatViewHTML = _.template(seatViewTemplate);

    var data = this.model.toJSON();
    data.row = row;
    data.column = column;

    this.$el.addClass('seat');

    var view = this;

    r = app.currentReservations.toJSON();

    for (var i = 0; i < r.length; i++) {
      if (data.row === r[i].row && data.column === r[i].column) {
        if (app.currentReservations.toJSON()[i].user_id > 0) {
          seatTaken(view, i);
        }
      }
    }

    var toAppend = view.$el.html(seatViewHTML(data));
    $('#flightViewDiv').append(toAppend);
  },

  reserveSeat: function() {
    
    console.log('nice');
    console.log(this);

  }
});

var seatTaken = function(view, num) {
  var thisUserID = app.currentReservations.toJSON()[num].user_id;
  view.$el.addClass('reserved');
  app.seatsRemaining--;
  var takenBy = app.allUsers.toJSON()[thisUserID - 1].name;
  console.log('one seat taken by ' + takenBy + ', there are now ' + app.seatsRemaining + ' seats on this flight.');
};