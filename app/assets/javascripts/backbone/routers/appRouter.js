var app = app || {};

app.AppRouter = Backbone.Router.extend({

  routes: {
    '': 'search',
    'app/planes/:id' : 'planeView',
    'planes/:plane_id/flights/:id': 'flightView',
    'planes': 'planeListView'
    // 'app/plane/:id/edit'
  },

  search: function() {
    var searchView = new app.SearchView();
    searchView.render();

    $('#searchForm').on('submit', function(e) {
      e.preventDefault();

      findFlights($('#departingSearch').val(), $('#arrivingSearch').val(), $('#dateSearch').val());
    });
  },

  flightView: function(plane_id, flight_id) {
    $('#main').html('');
    
    var rows = app.allPlanes.toJSON()[plane_id-1].rows;
    var columns = app.allPlanes.toJSON()[plane_id-1].columns;
    
    var flightView = new app.FlightView({model: app.allFlights.models[flight_id-1]});
    flightView.render(rows, columns);
  },

  planeView: function(planeID) {
    // We get a number from the URL and store it as a plane ID
    // That's not a model though, it is just a number

    // Then we need to go through the collection of all of your planes and grab the one that you need 
    // Then pass it in as the model

    console.log('oh shiiiiiiiiiiiieeeeeet homie, we are in the planeView function now dawg');

    // var plane = app.allPlanes.get( planeID );

    // app.planeView = new app.PlaneView({ model: plane });
    // app.planeView.render();
  },

  planeListView: function() {
    planeListView = new app.PlaneListView();
    planeListView.render({collection: app.allPlanes});
  }
});