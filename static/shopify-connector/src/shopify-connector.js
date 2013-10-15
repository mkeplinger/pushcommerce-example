
(function(window, undefined) {
    "use sctrict";

    /**
     * Represents the shop-connector class which defines members useful for
     * fetching shopify data using shop-connector app.
     */
    function ShopifyConnector() {

        //this.rootUrl = "http://shopify-connector.appspot.com/api/v1/";
        this.rootUrl = "http://localhost:8000";
        this.productUrl = this.rootUrl + '/product/';
        this.collectionUrl = this.rootUrl + '/collection/';
        this.utils = {};
        this.cachedContext = {};

        this.config = {
            defaultLimit: 20
        };
    }

    ShopifyConnector.prototype = {

        /**
         * Executes the JSONP get request to fetch json response fron the server.
         *
         * @param  {string}     url      The request url.
         * @param  {function}   callback The request parameters.
         * @param  {params}     callback Optional, the callback which needs to be invoked when the response is received.
         **/
        getJSON: function getJSON(url, callback, params) {
            var param,
                queryString = [];

            params = params || {};
            jsonp.getJSON(url, callback, params, this);
        },

        /**
         * Gets the products response from the shop-connector.
         * @param  {function} callback    The callback which needs to be invoked when the response is received.
         * @param  {string}   productType Optional, If provided returns all the
         * @param  {number}   page        Optional, the page number in the products set. Default 1
         * @param  {number}   limit       Optional, the products count in the products set. Default 20
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

        /**
         * [getProductDetail description]
         * @param  {[type]}   handle   [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
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
         * Renders the template elements into its parent node.
         *
         * @param {htmlElement, Array(htmlElement)} templateElements The template element or array of template elements which need to be renderened.
         * @param {Object, string} context The rendering context, usually the data received from shop-connector application or its url.

         **/
        renderTemplate: function renderTemplate(templateElements, context) {

            var parent,
                element,
                removableScripts = [],
                source, html, templateTag, template,
                i, iLen,
                j, jLen, templateChildren,
                self = this;

            if (typeof context === "string") {
                //TODO: Improve caching...
                if (self.cachedContext[context]) {
                    self.renderTemplate(templateElements, self.cachedContext[context]);
                }
                else {
                    self.getJSON(self.rootUrl + context, function(data) {
                        //self.cachedContext[context] = data;
                        self.renderTemplate(templateElements, data);
                    });
                }
                return;
            }

            if (templateElements instanceof Array === false) {
                templateElements = [templateElements];
            }

            for(i=0, iLen = templateElements.length; i < iLen; i += 1) {

                element = templateElements[i];

                if (element.getAttribute('type') !== 'text/x-shopify-connector-template') {
                    throw new Error('Invalid template. The attribute type="text/x-shopify-connector-template" not found.');
                }

                source = element.innerHTML;
                template = Handlebars.compile(source);
                html = template(context);

                templateTag = document.createElement('div');
                templateTag.innerHTML = html;

                parent = element.parentElement;
                templateChildren = templateTag.children;
                for(j=0, jLen=templateChildren.length; j < jLen; j += 1) {
                    parent.insertBefore(templateChildren[0], element);
                }
                removableScripts.push(element);
            }

            for (i=0, iLen=removableScripts.length; i < iLen; i += 1) {
                removableScripts[i].parentElement.removeChild(removableScripts[i]);
            }
        },

        /**
         * Renders the templates which matches with specified selector using given context.
         * @param  {string} selector The template selector.
         * @param  {Object, string} context   The rendering context, usually the data received from shop-connector application or its url.
         **/
        render: function render(selector, context) {
            var i, iLen, elements,
                self = this;

            elements = shopifyConnector.utils.querySelectorAll(selector);
            if (elements === null) {
                throw new Error('Selector functionality not available in your browser, to fix please either use jQuery or use renderTemplate function.');
            }

            for(i=0, iLen=elements.length; i < iLen; i += 1) {
              this.renderTemplate(elements[i], context);
            }
        }
    };

    var shopifyConnector = new ShopifyConnector();

    /**
     * Finds and returns the array of html elements that matches with specified css selector.
     * @param  {string} selector The selector
     * @return {Array(HtmlElement)} An array of html element.
     *
     **/
    shopifyConnector.utils.querySelectorAll = function querySelectorAll(selector) {
        var elements = [];

        // If querySelectorAll is available use this function
        // to query selector.
        if (typeof document.querySelectorAll === 'function') {
            return document.querySelectorAll(selector);
        }

        // If querySelectorAll is not available, check if jQuery is available.
        // If yes use jQuery
        if (window.jQuery !== undefined) {
            $(selector).each(function(index, element){
              elements.push(element);
            });
            return elements;
        }
        return null;
    };

    window.shopifyConnector = shopifyConnector;

    // On page load, if data-src attribute is set, renders all shopify
    // tempaltes (script elements whose type is "text/x-shopify-connector-template").
    function renderShopifyConnectorTemplates() {
        var scripts, script, renderableScripts = [],
            type, src,
            url, urls = {},
            i, iLen;

        scripts = document.getElementsByTagName('script');

        for (i=0, iLen=scripts.length; i < iLen; i += 1) {
            script = scripts[i];
            type = script.getAttribute('type');
            src = script.getAttribute('data-src');

            if (type === 'text/x-shopify-connector-template' && src) {
                urls[src] = urls[src] || [];
                urls[src].push(script);
            }
        }

        for(url in urls) {
            if (urls.hasOwnProperty(url)) {
                shopifyConnector.renderTemplate(urls[url], url);
            }
        }
    }

    var addListener = window.attachEvent || window.addEventListener,
        loadEvent = window.attachEvent ? "onload" : "load";

    addListener(loadEvent, renderShopifyConnectorTemplates);

})(this);