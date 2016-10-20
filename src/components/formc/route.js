module.exports = Backbone.Router.extend({
  routes: {
    'formc/:id/introduction': 'introduction',
    'formc/:id/team-members/:type/:index': 'teamMemberAdd',
    'formc/:id/team-members': 'teamMembers',
    'formc/:id/related-parties': 'relatedParties',
    'formc/:id/use-of-proceeds': 'useOfProceeds',
    'formc/:id/risk-factors-market': 'riskFactorsMarket',
    'formc/:id/risk-factors-financial': 'riskFactorsFinancial',
    'formc/:id/risk-factors-operational': 'riskFactorsOperational',
    'formc/:id/risk-factors-competitive': 'riskFactorsCompetitive',
    'formc/:id/risk-factors-personnel': 'riskFactorsPersonnel',
    'formc/:id/risk-factors-legal': 'riskFactorsLegal',
    'formc/:id/risk-factors-misc': 'riskFactorsMisc',
    'formc/:id/risk-factors-instruction': 'riskFactorsInstruction',
    'formc/:id/financial-condition': 'financialCondition',
    'formc/:id/outstanding-security': 'outstandingSecurity',
    'formc/:id/background-check': 'backgroundCheck',
  },

  execute: function (callback, args, name) {
    if (app.user.is_anonymous()) {
      const pView = require('components/anonymousAccount/views.js');
      require.ensure([], function() {
        new pView.popupLogin().render(window.location.pathname);
        app.hideLoading();
        $('#sign_up').modal();
      });
      return false;
    }
    if (callback) callback.apply(this, args);
    else alert('Not such url');
  },

  introduction(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/introduction', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/introduction');

    $('#content').scrollTo();
    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.introduction({
        el: '#content',
        fields: fields[0].fields, 
        model: data[0], 
      });
      app.hideLoading();
      i.render();
    })
  },
  
  teamMembers(id) {
    const View = require('components/formc/views.js');
    // var i = new View.memberDirector({
    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/team-members', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/team-members', 'GET');

    $('#content').scrollTo();
    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.teamMembers({
        el: '#content',
        fields: fields[0].fields,
        model: data[0]
      });
      i.render();
      app.hideLoading();
      $('#content').scrollTo();
    });
  },

  teamMemberAdd(id, role, uuid) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/team-members/' + role, 'OPTIONS');

    let dataR = null;
    if(uuid != 'new') {
      dataR = api.makeCacheRequest(formcServer + '/' + id + '/team-members', 'GET');
    }

    $('#content').scrollTo();
    $.when(fieldsR, dataR).done((fields, data) => {
      if(data) {
        data = data[0].team_members.filter(function(el) { return el.uuid == uuid})[0]
        data.formc_id = id;
      } else {
        data = {formc_id: id};
      }
      const addForm = new View.teamMemberAdd({
        el: '#content',
        model: data,
        role: role,
        uuid: uuid,
        fields: fields[0].fields,
      });
      addForm.render();
      app.hideLoading();
    });
  },

  relatedParties(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(
      formcServer + '/' + id + '/related-parties',
      'OPTIONS'
    );
    let dataR = api.makeCacheRequest(
      formcServer + '/' + id + '/related-parties'
    );

    $('#content').scrollTo();
    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.relatedParties({
        fields: fields[0].fields,
        model: data[0],
      });
      i.render();
      app.hideLoading();
    })
  },

  useOfProceeds(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/use-of-proceeds', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/use-of-proceeds');

    $('#content').scrollTo();
    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.useOfProceeds({
        el: '#content',
        model: data[0],
        fields: fields[0].fields,
      });
      i.render();
      app.hideLoading();
    });
  },

  riskFactorsInstruction(id) {
    const View = require('components/formc/views.js');
    const i = new View.riskFactorsInstruction({
      el: '#content',
      model: {
        id: id,
      },
      // fields: {},

    });
    i.render();
    app.hideLoading();
  },

  riskFactorsMarket(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-market', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-market');

    $('#content').scrollTo();
    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.riskFactorsMarket({
        el: '#content',
        model: data[0], 
        fields: fields[0].fields,
      });
      i.render();
      app.hideLoading();
    });
  },

  riskFactorsFinancial(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-financial', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-financial');

    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.riskFactorsFinancial({
        el: '#content',
        model: data[0], 
        fields: fields[0].fields,
      });
      i.render();
      app.hideLoading();
    });
  },

  riskFactorsOperational(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-operational', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-operational');

    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.riskFactorsOperational({
        el: '#content',
        model: data[0], 
        fields: fields[0].fields,
      });
      i.render();
      app.hideLoading();
    });
  },

  riskFactorsCompetitive(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-competitive', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-competitive');

    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.riskFactorsCompetitive({
        el: '#content',
        model: data[0], 
        fields: fields[0].fields,
      });
      i.render();
      app.hideLoading();
    });
  },

  riskFactorsPersonnel(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-personnel', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-personnel');

    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.riskFactorsPersonnel({
        el: '#content',
        model: data[0], 
        fields: fields[0].fields,
      });
      i.render();
      app.hideLoading();
    });
  },

  riskFactorsLegal(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-legal', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-legal');

    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.riskFactorsLegal({
        el: '#content',
        model: data[0], 
        fields: fields[0].fields,
      });
      i.render();
      app.hideLoading();
    });
  },

  riskFactorsMisc(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-misc', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/risk-factors-misc');

    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.riskFactorsMisc({
        el: '#content',
        model: data[0], 
        fields: fields[0].fields,
      });
      i.render();
      app.hideLoading();
    });
  },

  financialCondition(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeRequest(
      formcServer + '/' + id + '/financial-condition', 
      'OPTIONS'
    );
    let dataR = api.makeRequest(
      formcServer + '/' + id + '/financial-condition'
    );

    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.financialCondition({
        el: '#content',
        fields: fields[0].fields,
        model: data[0],
      });
      i.render();
      app.hideLoading();
    })
  },

  outstandingSecurity(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/outstanding-security', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/outstanding-security');

    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.outstandingSecurity({
        el: '#content',
        model: data[0],
        fields: fields[0].fields 
      });
      i.render();
      app.hideLoading();
    });
  },

  backgroundCheck(id) {
    const View = require('components/formc/views.js');

    let fieldsR = api.makeCacheRequest(formcServer + '/' + id + '/background-check', 'OPTIONS');
    let dataR = api.makeCacheRequest(formcServer + '/' + id + '/background-check');

    $.when(fieldsR, dataR).done((fields, data) => {
      data[0].id = id;
      const i = new View.backgroundCheck({
        el: '#content',
        model: data[0],
        fields: fields[0].fields,
      });
      i.render();
      app.hideLoading();
    });
  },

});
