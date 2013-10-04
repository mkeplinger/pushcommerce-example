
(function(window, undefined){

    window.onload = function() {

        shopConnector.getCollectionDetail('frontpage', function(context){
            shopConnector.render('.frontpage-template', context);
        });

        shopConnector.getCollections(function(context) {
            console.log(context);
            shopConnector.render('.collection-template', context);
        }, 1, 50);

    };


})(this);