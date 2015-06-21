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
    this.$el.attr('id', ("" + row + column));

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

    // setInterval(function() {

    // }, 3000);
  },

  reserveSeat: function() {
    var allRes = app.currentReservations.toJSON();
    var reservation;

    for (var i = 0; i < allRes.length; i++) {
      if (this.$el.attr('id').substring(0, 1) === (allRes[i].row + "") && this.$el.attr('id').substring(1) === (allRes[i].column + "")) {
        reservation = allRes[i];
        app.thisRes = new app.Reservation({'row': allRes[i].row, 'column': allRes[i].column, 'flight_id': allRes[i].flight_id,'user_id': allRes[i].user_id})
      };
    };

    if (this.$el.hasClass('reserved') && reservation.user_id !== gon.user.id) {
      
      var sittingUser;
      for ( var i = 0; i < app.allUsers.toJSON().length; i++ ) {
        if (app.allUsers.toJSON()[i].id === reservation.user_id) {
          sittingUser = app.allUsers.toJSON()
        }
      };
      console.log('this seat is taken by ' + sittingUser.name);
      // console.log(app.allUsers.toJSON()[reservation.user_id - 1].name);
    } else if (this.$el.hasClass('reserved')) {
      this.$el.removeClass('reserved');
      app.thisRes.user_id = false;
    } else {
      this.$el.addClass('reserved');
      app.thisRes.user_id = gon.user.id;
    };

    console.log()

    $.ajax({
      url: ('/app/planes/' + app.currentPlane + '/flights/' + app.currentFlight + '/reservations'),
      method: 'POST',
      data: {
        row: app.thisRes.toJSON().row,
        column: app.thisRes.toJSON().column,
        user_id: app.thisRes.user_id
      }
    }).done(function(data) {
      console.log(data);
    });

    // window.alert('Congrats! This seat is taken so your chance of death in the near future has reduced dramatically!');
  }
});

var seatTaken = function(view, num) {
  var thisUserID = app.currentReservations.toJSON()[num].user_id;
  view.$el.addClass('reserved');
  app.seatsRemaining--;
  var takenBy = app.allUsers.toJSON()[thisUserID - 1].name;
  console.log('one seat taken by ' + takenBy + ', there are now ' + app.seatsRemaining + ' seats on this flight.');
};
