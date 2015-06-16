var app = app || {} ;

_.templateSettings = {
  evaluate : /\{\[([\s\S]+?)\]\}/g,     // {[ console.log("Hello"); ]} - runs
  interpolate : /\{\{([\s\S]+?)\}\}/g   // {{ key }} - interpolates
};

$(document).ready(function() {
  app.allPlanes = new app.Planes();
  app.allPlanes.fetch().done(function(){
     app.router = new app.AppRouter();
       Backbone.history.start();
  });

});