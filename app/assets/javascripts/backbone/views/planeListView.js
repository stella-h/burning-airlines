var app = app || {};

app.PlaneListView = Backbone.View.extend({
  el: 'main',

  render: function() {
    console.log(this);
    this.$el.html('');

    for (var i = 0; i < app.allPlanes.models.length; i++) {
      var plane = new app.PlaneIndexView({
        model: app.allPlanes.models[i]
      });
      plane.render();
    }
  }
})