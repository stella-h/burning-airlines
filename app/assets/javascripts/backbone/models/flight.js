var app = app || {};

app.Flight = Backbone.Model.extend({
  defaults: {
    origin: 'SYD',
    destination: 'SFO',
    date: '',
    plane_id: 0
  }


});