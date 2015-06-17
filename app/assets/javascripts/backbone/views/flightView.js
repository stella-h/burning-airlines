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

    // Creates the seats on the Flight page
    for (var i = 0; i < rows; i++) {

      for (var j = 0; j < columns; j++) {

        var seat = new app.SeatView({model: this.model});
        seat.render(i, j);

      };

      $('#flightViewDiv').append('<br />');
    };
    // End of seat creation

  }

})


  // {[ for (var i = 0; i < rows; i++) { ]}
  //   {[ for (var j = 0; j < columns; j++) { ]}
  //     <div id="{{i}}{{j}}" class="seat"></div>
  //   {[ } ]}
  //   <br>
  // {[ }; ]}
  // </div>