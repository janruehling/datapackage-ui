var backbone = require('backbone');
var navigation = require('./navigation');


module.exports = {
  ListView: backbone.BaseListView.extend({
    clear: function() {
      backbone.BaseListView.prototype.clear.call(this);
      this.layout.tabs.clear();
      return this;
    },

    events: {'click [data-id=back]': function() { window.ROUTER.navigate('/', {trigger: true}); return false; }},

    ItemView: backbone.BaseView.extend({
      attributes: {class: 'error-message', 'data-id': 'messages'},
      render: function() { this.$el.html(this.model.get('result_message')); return this; },
      tagName: 'li'
    }),

    render: function() {
      this.layout.tabs = new navigation.TabsView({el: this.$('[data-id=tabs]')});
      return this;
    },

    // Show certain resource validation errors
    setActive: function(id) { return this; }
  })
};
