const addSectionHelper = require('helpers/addSectionHelper.js');

const dropzoneHelpers = require('helpers/dropzoneHelpers.js');
const leavingConfirmationHelper = require('helpers/leavingConfirmationHelper.js');
const phoneHelper = require('helpers/phoneHelper.js');
const validation = require('components/validation/validation.js');
const disableEnterHelper = require('helpers/disableEnterHelper.js');

module.exports = {
  list: Backbone.View.extend(_.extend({
    template: require('./templates/list.pug'),
    events: _.extend({
    })

    initialize(options) {
    },

    render() {
      this.el.innerHTML = 
        this.template({
          objects: this.model.data,
          count: this.model.count,
        });
      return this;
    },

  })),

  detail: Backbone.View.extend(_.extend({
    template: require('./templates/detail.pug'),
    events: _.extend({
    })

    initialize(options) {
    },

    render() {
      this.el.innerHTML = 
        this.template({
          objects: this.model.data,
          count: this.model.count,
        });
      return this;
    },

  })),

  createEdit: Backbone.View.extend(_.extend({
    template: require('./templates/createEdit.pug'),
    events: _.extend({
    })

    initialize(options) {
    },

    render() {
      this.el.innerHTML = 
        this.template({
          object: this.model,
        });
      return this;
    },
  })),

};