var app = app || {};

app.FlightView = Backbone.View.extend({
  el: '#main',
  
  render: function(rows, columns) {
    var flightTemplate = $('#flightView').html();
    var flightHTML = _.template(flightTemplate);

    var data = this.model.toJSON();
    data.rows = rows;
    data.columns = columns;
    var toAppend = this.$el.html(flightHTML(data));

    this.$el.append( toAppend );  
  }

})