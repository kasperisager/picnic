---
---

/* jshint ignore:start */
;{% include js/vendor/instantclick-3.1.0.min.js %}
;{% include js/vendor/lunr-0.4.5.min.js %}
;{% include js/vendor/hogan-3.0.0.min.js %}
;{% include js/vendor/oboe-1.14.2.min.js %}

;{% include js/picnic.js %}
;{% include js/picnic.search.js %}

;(function (window, document, undefined) {
  window.jQuery = undefined;

  var template = Hogan.compile(
    document.querySelector('#template-search').innerHTML
  );

  var data  = '{{ site.baseurl }}/search.json'
    , node  = 'pages.*'
    , index = lunr(function () {
      this.field('title', 10);
      this.field('categories', 5);
      this.field('content');
    });

  var search = new Picnic.Search(index, data, node).fetch();

  var searchHandler = function (e) {
    var self    = this
      , query   = e.currentTarget.value
      , results = [];

    search.perform(query, function (page) {
      results.push({
        title      : page.title
      , url        : page.id
      , categories : page.categories
      });
    });

    self.dropdown.innerHTML = template.render({
      query   : query
    , results : results.slice(0, 6) // Only show the first 6 matches
    });

    if (query.length) {
      self.dropdown.classList.add('open');
    } else {
      self.dropdown.classList.remove('open');
    }
  }

  window.init = window.init || function () {
    var self = this
      , html = document.querySelector('html')

    html.classList.add('js');
    html.classList.remove('no-js');

    anchorify({
      sel      : [
        '.js-markdown-body h1'
      , '.js-markdown-body h2'
      , '.js-markdown-body h3'
      , '.js-markdown-body h4'
      , '.js-markdown-body h5'
      , '.js-markdown-body h6'
      ].join()
    , text     : '#'
    , cssClass : 'anchor'
    , position : 'prepend'
    });

    this.input    = document.querySelector('.js-search-input');
    this.dropdown = document.querySelector('.js-search-results');

    this.input.addEventListener('input', searchHandler.bind(self));

    this.dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    document.addEventListener('click', function () {
      self.dropdown.classList.remove('open');
    });
  };
})(window, document);

;{% include js/vendor/anchorify-1.1.3.min.js %}
