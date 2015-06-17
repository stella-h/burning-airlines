var app = app || {};

app.SearchView = Backbone.View.extend({
      el: "#main",

      events: {
        'click': 'findFlights'
      },

  render: function() {

    this.$el.html($("#search").html());
  },
});

var findFlights = function(origin, destination, dateOne, dateTwo) {
  origin = origin || "";
  destination = destination || "";
  dateOne = Date.parse(dateOne) || "";
  dateTwo = Date.parse(dateTwo) || "";
  var dateMatch; 

//Date match checks whether the dates entered by the user (if any) match flight dates and returns a boolean used below.
  var dateMatchFunc = function() {
    if (dateOne !== "" && dateTwo !== "") {
      if ((dateOne < thisDate) && (thisDate < dateTwo)) {
        dateMatch = true;
      } else {
        dateMatch = false;
      }
    } else if (dateOne === "" && dateTwo !== "") {
      if (thisDate < dateTwo) {
        dateMatch = true;
      } else {
        dateMatch = false;
      }
    } else if (dateOne !== "" && dateTwo === "") {
      if (dateOne < thisDate) {
        dateMatch = true;
      } else {
        dateMatch = false;
      }
    } else if (dateOne === "" && dateTwo === "") {
      dateMatch = true;
    }
  }

  var result = [];

//Origin and destination entered (dates entered or empty).
//Results displayed: Origin and destination match, dates either matched or empty.  
  if (origin !== "" && destination !== "") { 
    for (var i = 0; i < app.allFlights.toJSON().length; i++) {
      var thisOri = app.allFlights.toJSON()[i].origin;
      var thisDest = app.allFlights.toJSON()[i].destination;
      var thisDate = Date.parse(app.allFlights.toJSON()[i].date);

      dateMatchFunc();

      if (thisOri === origin.toUpperCase() && thisDest === destination.toUpperCase() && dateMatch) {
        result.push(app.allFlights.models[i]);
      }
    }
//Destination entered, origin not entered (dates entered or empty).
//Results displayed: Destination matches, dates either matched or empty. 
  } else if (destination !== "") { 
    for (var j = 0; j < app.allFlights.toJSON().length; j++) {
      var thisDest = app.allFlights.toJSON()[j].destination;
      var thisDate = Date.parse(app.allFlights.toJSON()[j].date);
      dateMatchFunc();

      if (thisDest === destination.toUpperCase() && dateMatch) {
        result.push(app.allFlights.models[j]);
      }
    }
//Origin entered, destination not entered (dates entered or empty).
//Results displayed: Origin matches, dates either matched or empty. 
  } else if (origin !== "") { 
    for (var k = 0; k < app.allFlights.toJSON().length; k++) {
      var thisOri = app.allFlights.toJSON()[k].origin;
      var thisDate = Date.parse(app.allFlights.toJSON()[k].date);
      dateMatchFunc();
      if (thisOri === origin.toUpperCase() && dateMatch) {
        result.push(app.allFlights.models[k]);
      }
    }
  } else { 
//Neither origin nor destination entered. 
//Results displayed: If dates empty, returns all flights. Otherwise returns flights with matching dates. 

    for (var k = 0; k < app.allFlights.toJSON().length; k++) {
      var thisDate = Date.parse(app.allFlights.toJSON()[k].date);
      dateMatchFunc();
      if (dateMatch) {
        result.push(app.allFlights.models[k]);
      }
    }
  }
  renderResults(result);
};

var renderResults = function(results) {
  $('#searchResults').html('');
     if (results.length === 0) {
    $('#searchResults').html('<p>No flights match your search</p>')
  } else {
    for ( var i = 0; i < results.length; i++ ) {
      var flightIndexView = new app.FlightIndexView({model: results[i]});
    
      flightIndexView.render();
    }
  }
};

