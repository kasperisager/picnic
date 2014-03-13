---
---

/* jshint ignore:start */
;{% include assets/js/vendor/instantclick-3.0.0.min.js %}
;{% include assets/js/vendor/lunr-0.4.5.min.js %}
;{% include assets/js/vendor/hogan-3.0.0.min.js %}
;{% include assets/js/vendor/oboe-1.14.2.min.js %}

;{% include assets/js/picnic.js %}
;{% include assets/js/picnic.search.js %}

;(function (window, document, undefined) {
  // jQuery gone bye!
  window.jQuery = undefined;

  var template = Hogan.compile(
    document.querySelector('#template-search').innerHTML
  );

  var data  = '{{ site.baseurl }}/_search.json'
    , node  = 'pages.*'
    , index = lunr(function () {
      this.field('title', 10);
      this.field('categories', 5);
      this.field('content');
    });

  var search = new Picnic.search(index, data, node).fetch();

  var searchHandler = function (e) {
    var self    = this
      , query   = e.currentTarget.value
      , results = [];

    // Perform the search
    search.perform(query, function (page) {
      // Push page to results array
      results.push({
        title      : page.title
      , url        : page.id
      , categories : page.categories
      });
    });

    // Render the search results
    self.dropdown.innerHTML = template.render({
      query   : query
    , results : results.slice(0, 6) // Only show the first 6 matches
    });

    // Let InstantClick know new links are available
    InstantClick.instantanize();

    // Toggle the results dropdown
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

    // Asynchronous Google Analytics
    ga('send', 'pageview', location.pathname + location.search);

    // Initialize Anchorify
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

    // Cache DOM elements
    this.input    = document.querySelector('.js-search-input');
    this.dropdown = document.querySelector('.js-search-results');

    // Initalize Docs Search
    this.input.addEventListener('input', searchHandler.bind(self));

    this.dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    document.addEventListener('click', function () {
      self.dropdown.classList.remove('open');
    });
  };
})(window, document);

;{% include assets/js/vendor/anchorify-1.1.3.min.js %}
