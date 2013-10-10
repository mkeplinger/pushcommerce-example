
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

    Handlebars.registerHelper('limit',function(str,max) {
        if (str.length > max) {
            return str.substring(0,max) + '...';
        }
        return str;
    });

    /**
     * Strip downs html tags from given string and returns its substring
     * truncating charcters from next space onwards after max.
     * @example
     * {{nohtml body_html 100}}
     **/
    Handlebars.registerHelper('nohtml',function(str,max) {

        str = str || '';

        var nohtml = str.replace(/(<([^>]+)>)/ig,""),
            length = max || nohtml.length,
            m, index = length,
            ellipsis = '';


        if (nohtml.length > length) {
            re = /\s/g;
            while(m = re.exec(nohtml)) {
                if (m.index > length-1) {
                    index = m.index;
                    ellipsis = '...'; //string truncted hence provide ellipses
                    break;
                }
            }
            return nohtml.substring(0,index) + ellipsis;
        }
        return nohtml;
    });



})(this);
