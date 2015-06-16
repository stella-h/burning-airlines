var app = app || {};

app.FlightIndexView = Backbone.View.extend ({
  tagName: 'p',

  events: {
    'click': 'showFlight'
  },

  render: function (){
    var flightIndexTemplate = $('#flightIndexTemplate').html();
    var flightIndexHTML = _.template(flightIndexTemplate);
    
    var toAppend = this.$el.html(flightIndexHTML(this.model.toJSON()));

    $('#searchResults').append(this.$el);
  },

  showFlight: function(){
    app.currentPlane = this.model.get('plane_id');
    app.currentFlight = this.model.get('id');
    console.log('flight id:', app.currentFlight);
    console.log('plane id:', app.currentPlane);
    app.router.navigate('planes/' + app.currentPlane + '/flights/' + app.currentFlight, true);
  }
});