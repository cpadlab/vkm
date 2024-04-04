/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { initializeViewKey } from './view-key.js';
import { initializeModKey } from './modify-key.js';
import { initializeDelKey } from './key-delete.js';
import { createNotification } from '../notification.js';

function copyToClipboardAction(text, mess) {
    navigator.clipboard.writeText(text)
    createNotification(mess)
}

export function createKey(host, datakey, color) {

    const keyContainer = document.createElement('div');
    keyContainer.classList.add('key');

    const banner = document.createElement('div');
    banner.classList.add('key-banner');
    banner.title = 'Click to go'

    var nwcc = color
    if (color === null) {nwcc == datakey[6]}
    else if (!datakey[6]) {nwcc = '#8338ec'}

    banner.style.background = nwcc

    banner.addEventListener('click', function() {
        var linkTemporal = document.createElement('a');
        linkTemporal.target = '_blank';
        if (!datakey[2].startsWith('https://')) {datakey[2] = 'https://' + datakey[2];}
        linkTemporal.href = datakey[2];
        document.body.appendChild(linkTemporal);
        linkTemporal.click();linkTemporal.remove();
    })
    
    const lockIcon = document.createElement('span');
    lockIcon.innerHTML = '<i class="fa-solid fa-lock"></i>';
    
    banner.appendChild(lockIcon);
    keyContainer.appendChild(banner);

    const infoSection = document.createElement('div');
    infoSection.classList.add('key-info');

    const leftSection = document.createElement('div');
    leftSection.classList.add('ki-left');
    const siteName = document.createElement('span');
    siteName.setAttribute('id', 'kil-sitename');
    siteName.textContent = datakey[1];
    siteName.addEventListener('click', function() {
        copyToClipboardAction(datakey[1], 'Copied ' + datakey[1] + ' Site.')
    })

    const userName = document.createElement('span');
    userName.setAttribute('id', 'kil-username');
    userName.textContent = datakey[4];
    userName.addEventListener('click', function() {
        copyToClipboardAction(datakey[4], 'Copied ' + datakey[1] + ' Username.')
    })

    leftSection.appendChild(siteName);
    leftSection.appendChild(userName);

    const rightSection = document.createElement('div');
    rightSection.classList.add('ki-right');

    const copyButton = document.createElement('button');
    copyButton.setAttribute('id', 'kir-copy');
    copyButton.innerHTML = '<i class="fa-solid fa-copy"></i>';
    copyButton.addEventListener('click', function() {
        copyToClipboardAction(atob(datakey[3]), 'Copied ' + datakey[1] + ' Password.')
    })


    const optionsButton = document.createElement('button');
    optionsButton.setAttribute('id', 'kir-options');
    optionsButton.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';

    const dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdown-content');
    dropdownContent.setAttribute('id', 'dropdown-content');

    optionsButton.addEventListener('click', function() {
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    });

    const dc_btn_view = document.createElement('button');
    dc_btn_view.classList.add('dc-btn');
    dc_btn_view.innerHTML = '<i class="fa-solid fa-eye"></i> View';
    dc_btn_view.addEventListener('click', function(event) {
        event.preventDefault();
        $('.host-popups').load('vkm/include/content/vault/view-key.html', function() {
            initializeViewKey(datakey[1], datakey[2], datakey[4], datakey[3])
        });
    });

    const dc_btn_edit = document.createElement('button');
    dc_btn_edit.classList.add('dc-btn');
    dc_btn_edit.innerHTML = '<i class="fa-solid fa-pen"></i> Edit';
    dc_btn_edit.addEventListener('click', function(event) {
        event.preventDefault();
        $('.host-popups').load('vkm/include/content/vault/modify-key.html', function() {
            initializeModKey(datakey[0])
        });
    });

    const dc_btn_delete = document.createElement('button');
    dc_btn_delete.classList.add('dc-btn');
    dc_btn_delete.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';
    dc_btn_delete.addEventListener('click', function(event) {
        event.preventDefault();
        $('.host-popups').load('vkm/include/content/vault/delete-key.html', function() {
            initializeDelKey(datakey[1], datakey[0])
        });
    });

    const dc_btn_close = document.createElement('button');
    dc_btn_close.classList.add('dc-btn-close');
    dc_btn_close.innerHTML = '<i class="fa-solid fa-xmark"></i> Close';
    dc_btn_close.addEventListener('click', function() {
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    });
    
    dropdownContent.appendChild(dc_btn_view)
    dropdownContent.appendChild(dc_btn_edit)
    dropdownContent.appendChild(dc_btn_delete)
    dropdownContent.appendChild(dc_btn_close)

    rightSection.appendChild(copyButton);
    rightSection.appendChild(optionsButton);
    rightSection.appendChild(dropdownContent);
    
    infoSection.appendChild(leftSection);
    infoSection.appendChild(rightSection);

    keyContainer.appendChild(infoSection);

    host.appendChild(keyContainer);

}