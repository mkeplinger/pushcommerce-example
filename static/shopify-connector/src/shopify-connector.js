
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
         * @param  {[type]}   url      The request url.
         * @param  {[type]}   params   The request parameters.
         * @param  {Function} callback The callback which needs to be invoked when response is received.
         **/
        getJSON: function getJSON(url, callback, params) {
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

            var parent,
                removableScripts = [],
                source, html, templateTag, template,
                i, iLen,
                j, jLen, templateChildren,
                self = this;

            //debugger;

            if (templateElement.getAttribute('type') !== 'text/x-shopify-connector-template') {
                throw new Error('Invalid template. The attribute type="text/x-shopify-connector-template" not found.');
            }

            if (typeof context === "string") {
                //TODO: Improve caching...
                if (self.cachedContext[context]) {
                    self.renderTemplate(templateElement, self.cachedContext[context]);
                }
                else {
                    self.getJSON(self.rootUrl + context, function(data) {
                        self.cachedContext[context] = data;
                        self.renderTemplate(templateElement, data);
                    });
                }
                return;
            }

            console.log(context);

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

    function renderShopifyConnectorTemplates() {
        var scripts, script, renderableScripts = [],
            type, src,
            i, iLen;

        scripts = document.getElementsByTagName('script');

        for (i=0, iLen=scripts.length; i < iLen; i += 1) {
            script = scripts[i];
            type = script.getAttribute('type');
            src = script.getAttribute('data-src');

            if (type === 'text/x-shopify-connector-template' && src) {
                renderableScripts.push({
                    script: script,
                    src: src
                });
            }
        }
        for(i=0, iLen=renderableScripts.length; i < iLen; i += 1) {
            shopifyConnector.renderTemplate(
                renderableScripts[i].script, renderableScripts[i].src);
        }
    }

    var addListener = window.attachEvent || window.addEventListener,
        loadEvent = window.attachEvent ? "onload" : "load";

    addListener(loadEvent, renderShopifyConnectorTemplates);

})(this);