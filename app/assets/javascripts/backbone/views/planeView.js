var app = app || {};


//view for single plane
app.PlaneView = Backbone.View.extend({
  el: "#main",
  events: {
    'click button': 'submitView'
  },

  render: function () {
    console.log('We are in the render function now, inceptcode!')
    var PlaneViewTemplate = $('#PlaneViewTemplate').html();

    var PlaneTemplateHTML = _.template(PlaneViewTemplate);

    this.$el.html(PlaneTemplateHTML(this.model.toJSON()) );
  },

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