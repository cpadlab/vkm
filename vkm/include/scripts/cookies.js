/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

export function createCookie(name, value, mins=15) {
    var fecha = new Date();
    fecha.setTime(fecha.getTime() + (mins * 60 * 1000));
    var expira = "expires=" + fecha.toUTCString();
    document.cookie = name + "=" + value + ";" + expira + ";path=/";
}

export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {return decodeURIComponent(cookie.substring(name.length + 1));}
    }
    return null;
}

export function deleteCookie(name) {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";return;}
    }
}