module.exports = {
  events: {
    'submit form': 'submit',
    'click .delete': 'deleteRisk',
    'click .edit-risk': 'editRisk',
  },
  deleteRisk (e) {
    e.stopPropagation();
    e.preventDefault();
    if (!confirm("Do you really want to delete this risk?")) return;
    let index = e.target.dataset.index;
    let url = this.urlRoot.replace(':id', this.model.id).replace(':index', index);
    // let data = $(e.target).serializeJSON({ useIntKeysAsArrayIndex: true });

    api.makeRequest(url, 'DELETE', {}).then((data) => {
      if (index < Object.keys(this.defaultRisks).length) {
        let $form = this.$('form[index=' + index + ']');
        $form.find('.buttons').css({display: 'none'});
        $form.find('.unadded-state').css({display: 'inline-block'});
        $form.find('textarea').val(this.defaultRisks[index].risk);
        let $panel = this.$('.risk-panel[index=' + index + ']');
        $panel.find('a').removeClass('added-risk-title');
        let $textarea = $(e.target).find('textarea');
        $textarea.prop('readonly', true).addClass('borderless-textarea').css({ height: $textarea.prop('scrollHeight')+'px' });
      } else {
        let $section = $('.risk-panel[index=' + index + ']');
        $section.remove();
      }
    // $form.find('.added-span').text(' (added to Form C)');
    }).fail((xhr, status, text) => {
      api.errorAction(this, xhr, status, text, this.fields);
    });
  },

  editRisk (e) {
    e.preventDefault();
    let $target = $(e.target);
    let index = $target.data('index');
    // let $form = $('form[index=' + index + ']');
    let $form = $('form[index=' + index + ']');
    // $panel.find('.add-risk').css({display: 'inline-block'});
    // $panel.find('.alter-risk').css({display: 'none'});
    $form.find('.buttons').css({display: 'none'});
    $form.find('.editing-state').css({display: 'inline-block'});
    $form.find('.added-span').text('');
    $('textarea[index=' + index + ']').attr('readonly', false).removeClass('borderless-textarea').css({height: ''});
    // $target.css({display: 'none'});
  },

  submitRisk(e) {
    e.preventDefault();
    let index = e.target.dataset.index;
    if (!index) {
      index = Object.keys(this.defaultRisks).length - 1;
      $('.risk-panel').each(function(idx, elem) {
        let $elem = $(this);
        let panelIdx = parseInt($elem.attr('index'))
        if (panelIdx > index) index = panelIdx;
      });
      index += 1;
    }
    let url = this.urlRoot.replace(':id', this.model.id).replace(':index', index);
    let formData = $(e.target).serializeJSON({ useIntKeysAsArrayIndex: true });

    api.makeRequest(url, 'PATCH', formData).then((data) => {
      let $textarea = $(e.target).find('textarea')
      $textarea.prop('readonly', true).addClass('borderless-textarea').css({ height: $textarea.prop('scrollHeight')+'px' });
      let $form = $('form[index=' + index + ']');
      if ($form.length > 0) { // find the form    
        $form.find('.buttons').css({display: 'none'});
        $form.find('.added-state').css({display: 'inline-block'});
        $form.find('.added-span').text(' (added to Form C)');
        let $panel = this.$('.risk-panel[index=' + index + ']');
        $panel.find('a').addClass('added-risk-title');
      } else {
        // create and append panel
        let template = require('components/formc/templates/risk.pug');
        $('#accordion-risk').append(template({
          k: index,
          v: formData,
        }));
        $('.add-risk-form').find('input:text, textarea').val('');
      }
    }).
    fail((xhr, status, text) => {
      api.errorAction(this, xhr, status, text, this.fields);
    });
  },
};