var app = app || {};

app.PlaneIndexView = Backbone.View.extend ({
  tagName: 'li',

  events: {
    'click': 'PlaneIndexTemplate'
  },

  render: function (){
    console.log(this.model);
    var PlaneIndexTemplate = $('#PlaneIndexTemplate').html();
    var PlaneIndexHTML = _.template(PlaneIndexTemplate);

    var toAppend = this.$el.html(PlaneIndexHTML(this.model.toJSON()) );

    $('#main').append( toAppend );
  },

  PlaneIndexTemplate: function() {
    console.log('yeah');
    app.router.navigate('app/planes/' + this.model.get('id'), true);
  }
});