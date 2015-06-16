var app = app || {};


//view for single plane
app.PlaneView = Backbone.View.extend({
  el: "#main",
  events: {
    'click button': 'submitView'
  },

  // render: function () {
  // edit template goes here??? 
  // }

  submitView: function (e) {
    e.preventDefault();

    var name = $('name').val();
    var row = $('row').val();
    var column = $('column').val();

    var plane = new app.Plane({
      name: name,
      row: row,
      column: column
    });

    var view = this;
    plane.save().done(function(){
      view.plane.fetch();
    });
  }
});