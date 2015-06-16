var app = app || {};

app.AppRouter = Backbone.Router.extend({

  routes: {

    '': 'search',
    'app/plane/:id' : 'viewPlane'
    // 'app/plane/:id/edit'
  },

  search: function() {
    var searchView = new app.SearchView({ collection: app.allPlanes });
    searchView.render();
  },

  viewPlane: function() {
    var Plane = app.viewPlanes.get(id);
    var viewPlane = new ViewPlane({model: plane});
    viewPlane.render();
  }
});