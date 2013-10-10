
// JSONP module
(function(window, undefined) {
    "use strict";

    function JSONP() {}

    JSONP.prototype = {

        getJSON: function(url, callback, data) {
            var src = url + (url.indexOf("?")+1 ? "&" : "?"),
                head = document.getElementsByTagName("head")[0],
                newScript = document.createElement("script"),
                timestamp =  (new Date()).getTime(),
                callbackFunc = "callback" + timestamp,
                params = [],
                param_name = "",
                self = this;

            data = data || {};


            this[callbackFunc] = function(data) {
                alert ('cool')
                callback(data);
             };

            data["callback"] = "jsonp." + callbackFunc;
            for(param_name in data){
                if (data.hasOwnProperty(param_name)) {
                    params.push(param_name + "=" + encodeURIComponent(data[param_name]));
                }
            }
            src += params.join("&");

            newScript.type = "text/javascript";
            newScript.src = src;
            newScript.async = true;
            //newScript.id = callbackFunc.replace(/\./g, '-');

            head.appendChild(newScript);
        }
    };

    window.jsonp = new JSONP();

})(this);