var app = app || {};

app.User = Backbone.Model.extend({
  defaults: {
    id: 0,
    name: 'Default User'
  }
});