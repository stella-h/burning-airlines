var app = app || {};

app.Flights = Backbone.Collection.extend({
  url: function() {
    if (this.plane_id) {
      return '/app/planes/' + this.plane_id + '/flights'
    } else {
      return '/flights'
    }
  },
  model: app.Flight
});