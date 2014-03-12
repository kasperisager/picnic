;(function (window, document, undefined) {

  /**
   * Picnic.search is a small utility object for handling searches using
   * lunr.js and Oboe.js.
   *
   * @param {Object} index A lunr.js search index
   * @param {string} data  The URL at which the search data is located
   * @param {string} node  An Oboe.js data node representation
   */
  Picnic.search = function (index, data, node) {
    this.index   = index;
    this.data    = data;
    this.node    = node;
    this.results = [];
  };

  Picnic.search.prototype = {
    /**
     * Using Oboe.js, stream the list of search data and add them to the
     * index one by one as they're downloaded.
     *
     * @param {Function} next
     * @param {Function} done
     */
    fetch: function (next, done) {
      var self = this;

      // Asynchonously load the search data, object by object
      oboe(self.data).node(self.node, function (result) {
        // Add the result to the Lunr search index
        self.index.add(result);

        // Store the result so we can access it later
        self.results.push(result);

        next(result);
      }).done(done);

      return this; // Allow chaining
    }

    /**
     * Perform a search againt the lunr index
     *
     * @param {string}   query The query to search for
     * @param {Function} next
     */
  , perform: function (query, next) {
      var self    = this
        , results = [];

      self.index.search(query).map(function (match) {
        self.results.map(function (result) {
          // This is not the result you're looking for!
          if (result.id !== match.ref) return;

          next(result);
        });
      });
    }
  };

})(window, document);
