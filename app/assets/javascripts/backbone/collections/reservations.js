var app = app || {};

app.Reservations = Backbone.Collection.extend({
  model: app.Reservation
});