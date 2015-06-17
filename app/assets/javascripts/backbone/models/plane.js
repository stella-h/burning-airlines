var app = app || {};

app.Plane = Backbone.Model.extend({
  defaults: {
    name: 'PP',
    rows: 0,
    columns: 0
  }
});