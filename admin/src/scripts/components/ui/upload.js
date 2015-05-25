require('fileapi');

var _ = require('underscore');
var backbone = require('backbone');
var backboneBase = require('backbone-base');


module.exports = backbone.BaseView.extend({
  events: {  
    'change [data-id=input]': function(E) {
      this.setError(null);

      FileAPI.readAsText(FileAPI.getFiles(E.currentTarget)[0], (function (EV) {
        var descriptor;


        if(EV.type === 'load') {
          try {
            descriptor = JSON.parse(EV.result);
          } catch(exception) {
            this.setError(exception.message);
            return false;
          }

          // If there are no changes in current form just apply uploaded
          // data and leave
          if(!this.parent.hasChanges()) {
            this.updateEditForm(descriptor);
            return false;
          }

          // Ask to overwrite chnages on current form
          window.APP.layout.confirmationDialog
            .setMessage('You have changes. Overwrite?')

            .setCallbacks({yes: (function() {
              this.updateEditForm(descriptor);
              return false;
            }).bind(this)})

            .activate();
        } else if( EV.type ==='progress' ){
          this.setProgress(EV.loaded/EV.total * 100);
        } else {
          this.setError('File upload failed');
        }
      }).bind(this))
    }
  },

  setError: function(message) { this.$('[data-id=error]').html(message || ''); return this; },
  setProgress: function(percents) { return this; },
  updateEditForm: function(descriptor) { this.parent.layout.form.setValue(descriptor); return this; }
});
