var app = app || {};

app.AppRouter = Backbone.Router.extend({

  routes: {

    '': 'search',
    'app/planes/:id' : 'planeView'
    // 'app/plane/:id/edit'
  },

  search: function() {
    var searchView = new app.SearchView({ collection: app.allPlanes });
    searchView.render();
  },

  planeView: function(planeID) {
    // We get a number from the URL and store it as a plane ID
    // That's not a model though, it is just a number

    // Then we need to go through the collection of all of your planes and grab the one that you need 
    // Then pass it in as the model

    var plane = app.allPlanes.get( planeID );

    app.planeView = new app.PlaneView({ model: plane });
    app.planeView.render();
  }
});