
(function(window, undefined) {
    "use sctrict";

    /**
     * Represents the shop-connector class which defines members useful for
     * fetching shopify data using shop-connector app.
     */
    function ShopConnector() {
        this.rootUrl = "http://localhost:8000";
        this.productUrl = this.rootUrl + '/api/v1/product/';
        this.collectionUrl = this.rootUrl + '/api/v1/collection/';

        this.config = {
            defaultLimit: 20
        };
    }

    ShopConnector.prototype = {

        /**
         * Executes the JSONP get request to fetch json response fron the server.
         *
         * @param  {[type]}   url      The request url.
         * @param  {[type]}   params   The request parameters.
         * @param  {Function} callback The callback which needs to be invoked when response is received.
         **/
        getJSON: function queryServer(url, callback, params) {
            var param,
                queryString = [];

            params = params || {};
            jsonp.getJSON(url, callback, params, this);
        },

        /**
         * Gets the products response from the shop-connector.
         * @param  {Function} callback    [description]
         * @param  {[type]}   productType [description]
         * @param  {[type]}   page        [description]
         * @param  {[type]}   limit       [description]
         **/
        getProducts: function getProducts(callback, productType, page, limit) {
            var params,
                url = this.productUrl;

            params  = {
                page: page || 1,
                limit: limit || this.config.defaultLimit
            };

            if (productType) {
                params.productType = productType;
            }

            jsonp.getJSON(url, callback, params);
        },

        getProductDetail: function getProduct(handle, callback) {
          var url = this.productUrl + handle + '/';
          jsonp.getJSON(url, callback);
        },

        getCollections: function getCollections(callback, page, limit) {
            var params,
                url = this.collectionUrl;

            params  = {
                page: page || 1,
                limit: limit || this.config.defaultLimit
            };

            jsonp.getJSON(url, callback, params);
        },

        getCollectionDetail: function getCollection(handle, callback, productType) {
            var url = this.collectionUrl + handle + '/';
            jsonp.getJSON(url, callback);
        },

        /**
         * Renders the template scripts into its parent node.
         *
         * @function
         * @param {object} context The rendering context, usually the data received from shop-connector application.
         * @param {Array(string)}
         **/
        renderTemplate: function renderTemplate(templateElement, context) {

            var templateElement,
                parent,
                removableScripts = [],
                source, html, templateTag, template,
                i, iLen,
                j, jLen, templateChildren;

            if (templateElement.getAttribute('type') !== 'text/x-shop-connector-template') {
                throw new Error('Invalid template. The attribute type="text/x-shop-connector-template" not found.');
            }


            source = templateElement.innerHTML;
            template = Handlebars.compile(source);
            html = template(context);

            templateTag = document.createElement('div');
            templateTag.innerHTML = html;

            parent = templateElement.parentElement;
            templateChildren = templateTag.children;
            for(j=0, jLen=templateChildren.length; j < jLen; j += 1) {
                parent.insertBefore(templateChildren[0], templateElement);
            }
            removableScripts.push(templateElement);

            for (i=0, iLen=removableScripts.length; i < iLen; i += 1) {
                removableScripts[i].parentElement.removeChild(removableScripts[i]);
            }
        },

        render: function render(selector, context) {
          var i, iLen, elements,
              self = this;

          //If querySelectorAll is available use this function
          //to query selector.
          if (typeof document.querySelectorAll === 'function') {
            elements = document.querySelectorAll(selector);
            for(i=0, iLen=elements.length; i < iLen; i += 1) {
              this.renderTemplate(elements[i], context);
            }
            return;
          }
          //If querySelectorAll is not available, check if jQuery is available.
          //If yes use jQuery
          // else if (window.jQuery !== undefined) {
          //   $(selector).each(function(index, element){
          //     self.renderTemplate(element, context);
          //   });
          //   return;
          // }
          throw new Error('Selector functionality not available in your browser, to fix please either use jQuery or use renderTemplate function.');
        }
    };

    window.shopConnector = new ShopConnector();


})(this);