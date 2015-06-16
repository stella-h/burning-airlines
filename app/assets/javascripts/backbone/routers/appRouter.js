var app = app || {};

app.AppRouter = Backbone.Router.extend({

  routes: {

    '': 'search'
  },

  search: function() {

    var searchView = new app.SearchView();
    searchView.render();
  }


});