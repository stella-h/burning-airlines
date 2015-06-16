var app = app || {};

app.SearchView = Backbone.View.extend({
  el: "#main",

  render: function() { 
    
    this.$el.html($("#search").html() );
    var view = this;
    view.collection.each(function (plane){

      var PlaneIndexView = new app.PlaneIndexView({
        model: plane });
      PlaneIndexView.render( view.$el );
    })
  }
});