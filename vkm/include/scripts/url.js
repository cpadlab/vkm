/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

export function getParameterValue(parameter) {
    var queryString = window.location.search.substring(1);
    var pares = queryString.split("&");
    for (var i = 0; i < pares.length; i++) {
        var par = pares[i].split("=");
        if (par[0] === parameter) {return decodeURIComponent(par[1]);}
    }
    return null;
}

export function updatePageURL(page) {

    const urlParams = new URLSearchParams(window.location.search);
    const hasOtherVariables = urlParams.keys().next().done === false;

    urlParams.set('p', page);

    if (hasOtherVariables) {
        const newURL = window.location.origin + window.location.pathname + '?' + urlParams.toString();
        window.history.pushState({ path: newURL }, '', newURL);
    } else {
        const newURL = window.location.origin + window.location.pathname + '?p=' + page;
        window.history.pushState({ path: newURL }, '', newURL);
    }
}

export function updateParamURL(param, value) {

    const urlParams = new URLSearchParams(window.location.search);
    const hasOtherVariables = urlParams.keys().next().done === false;

    urlParams.set(param, value);

    if (hasOtherVariables) {
        const newURL = window.location.origin + window.location.pathname + '?' + urlParams.toString();
        window.history.pushState({ path: newURL }, '', newURL);
    } else {
        const newURL = window.location.origin + window.location.pathname + '?param=' + value;
        window.history.pushState({ path: newURL }, '', newURL);
    }
}

export function deleteParamURL(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const hasParam = urlParams.has(param);

    if (hasParam) {
        urlParams.delete(param);
        const newURL = window.location.origin + window.location.pathname + '?' + urlParams.toString();
        window.history.pushState({ path: newURL }, '', newURL);
    }
}

