<?php

define('SHOP_CONNECTOR_API_KEY',  'ce83b1cc1a4b48c2b254006701fc3176');

define('SHOP_CONNECTOR_SECRET_KEY', 'ceee0e497fb14fd9b4e53dad88f20ed5');

define('SHOP_CONNECTOR_HOST', 'localhost:8000');

define('SHOP_CONNECTOR_API_ROOT', "http://".SHOP_CONNECTOR_API_KEY.":".SHOP_CONNECTOR_SECRET_KEY."@".SHOP_CONNECTOR_HOST."/api/v1/");


/**
 * Gets the collections for products page.
 * @return JSON string containing collections.
 */
function get_product_collections() {
    $handles  = array('build-muscle', 'lose-weight', 'better-workouts', 'support-and-recovery', 'energy-endurance');
    $collections  = array();
    foreach ($handles as $handle) {
        $collection = get_collection($handle);
        if($collection) {
            array_push($collections, $collection);
        }
    }
    //echo $collections;
    return '{"collections":['.join(',', $collections).']}';
}

/**
 * Fetches the specified collection using shopify collection api.
 * @param  [string] $handle The collection handle.
 * @return [string] Returns the loaded collection in the form of json string.
 */
function get_collection($handle) {
    $url = SHOP_CONNECTOR_API_ROOT.'collection/'.$handle.'/';
    $session = curl_init($url);
    curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($session);
    $code = curl_getinfo($session, CURLINFO_HTTP_CODE);
    curl_close($session);
    if ($code == 200) {
        return $response;
    }
    //Returns null, if the response is other than 200;
    return null;
}