var app = app || {};

app.PlaneIndexView = Backbone.View.extend ({
  tagName: 'li',
  render: function ( el ){
    var PlaneIndexTemplate = $('#PlaneIndexTemplate').html();
    var PlaneIndexHTML = _.template(PlaneIndexTemplate);
    var toAppend = this.$el.html(PlaneIndexHTML(this.model.toJSON()) );

    el.append( toAppend );

    
  }
});