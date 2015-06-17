var app = app || {} ;

_.templateSettings = {
  evaluate : /\{\[([\s\S]+?)\]\}/g,     // {[ console.log("Hello"); ]} - runs
  interpolate : /\{\{([\s\S]+?)\}\}/g   // {{ key }} - interpolates
};

$(document).ready(function() {
  app.allPlanes = new app.Planes();
  app.allFlights = new app.Flights();
  app.currentPlane = 0;
  app.currentFlight = 0;

  app.allPlanes.fetch().done(function(){
    app.allFlights.fetch().done(function(){
      app.router = new app.AppRouter();
      Backbone.history.start();
    });  
  });

  setInterval(function() {
    if ($('#flightViewDiv').length > 0) {
      console.log('hello');
    }
  }, 5000)

});