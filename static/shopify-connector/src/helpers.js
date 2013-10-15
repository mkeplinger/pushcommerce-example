
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
            item.$alternate = index % 2 === 0;

            return options.fn(item);
        }).join('');
    });

    /**
     * Truncates and limits the provided text if its length exceeds
     * max.
     * @example
     * {{ limit value 10 }}
     **/
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

    /**
     * Provides equality condition check in template.
     *
     * @example
     * {{#ifEqual val1 val2}}
     * <p>Both values are equal.</p>
     * {{else}}
     * <p>Both values are different.</p>
     * {{/ifEqual}}
     *
     **/
    Handlebars.registerHelper('ifEqual', function(v1, v2, options) {
        if(v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    /**
     * Provides non-equality condition check in template.
     *
     * @example
     * {{#ifNotEqual val1 val2}}
     * <p>Both values are different.</p>
     * {{else}}
     * <p>Both values are equal.</p>
     * {{/ifEqual}}
     *
     **/
    Handlebars.registerHelper('ifEqual', function(v1, v2, options) {
        if(v1 !== v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    /**
     * Provides modulo condition check in template.
     *
     * @example
     * {{#ifDivisibleBy value 3}}
     * <p>The value is divisible by 3.</p>
     * {{else}}
     * <p>The value is not divisible by 3.</p>
     * {{/ifEqual}}
     *
     **/
    Handlebars.registerHelper('ifDivisibleBy', function(value, mod, options) {
        if(value % mod === 0) {
            return options.fn(this);
        }
        return options.inverse(this);
    });




})(this);
