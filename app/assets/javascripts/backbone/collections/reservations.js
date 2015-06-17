var app = app || {};

app.Reservations = Backbone.Collection.extend({
  model: app.Reservation,
  url: function() {
  if ((app.currentPlane) && (app.currentFlight)) {
      return '/app/planes/' + app.currentPlane + '/flights/' + app.currentFlight + '/reservations'
    } else {
      return '/reservations'
    }
  },
});