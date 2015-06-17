var app = app || {};

app.Flights = Backbone.Collection.extend({
  url: function() {
    return '/app/planes/' + this.plane_id + '/flights'
  },
  model: app.Flight
});