var app = app || {};

app.SeatView = Backbone.View.extend ({
  tagName: 'div',
  render: function (row, column){
    var seatViewTemplate = $('#seatViewTemplate').html();
    var seatViewHTML = _.template(seatViewTemplate);

    var data = this.model.toJSON();
    data.row = row;
    data.column = column;

    this.$el.addClass('seat');

    var toAppend = this.$el.html(seatViewHTML(data));
    $('#flightViewDiv').append( toAppend );
  }
});