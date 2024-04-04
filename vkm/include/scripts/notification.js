/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

export function createNotification(mess) {

    var notification = $('<div class="notification">' +
                                '<div class="notification-content">' +
                                    '<button onclick="$(this).parent().parent().remove()" id="notification-close"><i class="fa-solid fa-xmark"></i></button>' +
                                    '<i class="fa-solid fa-bell"></i>' +
                                    '<p id="notification-text">' + mess + '</p>' +
                                '</div>' +
                            '</div>');
    $('.notification-host').append(notification);
    notification.animate({
        opacity: .8
    }, 500)

    setTimeout(function() {
        notification.animate({
            opacity: 0
        }, 1000, function() {
            $(this).remove();
        });
    }, 3000);
}

