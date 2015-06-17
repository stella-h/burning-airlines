var app = app || {};

app.Reservation = Backbone.Model.extend({
  defaults: {
    row: 99,
    column: 99,
    user_id:0,
    flight_id:0
  }
});