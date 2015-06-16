var app = app || {};

app.Planes = Backbone.Collection.extend({
  url: '/app/planes',
  model: app.Plane
});