var app = app || {};

app.Reservation = Backbone.Model.extend({
  defaults: {
    row: 0,
    column: 0,
    user_id:0,
    flight_id:0
  }
});