var app = app || {};

app.SearchView = Backbone.View.extend({
      el: "#main",
      events: {
        'click': 'PlaneIndexTemplate'

      },

      render: function() {

        this.$el.html($("#search").html());
        var view = this;
        view.collection.each(function(plane) {

          var PlaneIndexView = new app.PlaneIndexView({
            model: plane
          });

          PlaneIndexView.render(view.$el);
        });
      },

      PlaneIndexTemplate: function() {
        app.router.navigate('app/planes/' + this.collection.models[0].get('id') + true);
        // app.router.navigate('app/planes/' + this.model.get('name') + '/edit' + true)
      }
    });