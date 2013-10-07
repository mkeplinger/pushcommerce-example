
// HandlebarJS helpers specially designed to simplify shopify connector template enhancement.

(function(window, undefined) {

    /**
     * Provides the looping functionality, adds $first, $last and $index to the item.
     * @example
     * {{#foreach list}}
     * {{#if $first}} First Item {{/if}}
     * {{/foreach}}
     */
    Handlebars.registerHelper("foreach",function(arr,options) {
        if (options.inverse && !arr.length) {
            return options.inverse(this);
        }

        return arr.map(function(item,index) {
            if (typeof item === 'string') {
                var item = new String(item);
            }

            item.$index = index;
            item.$first = index === 0;
            item.$last  = index === arr.length-1;
            return options.fn(item);
        }).join('');
    });

})(this);