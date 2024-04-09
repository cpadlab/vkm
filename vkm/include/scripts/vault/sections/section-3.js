/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.1
  \_/|_\_\_|_|_|

VKM v6.1
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { initializeModifyGroup } from '../group/modify.js';
import { initializeDelGroup } from '../group/delete.js';
import { faFuncs, requestGet, requestPost } from '../../requests.js';
import { createKey } from '../key/key.js';
import { getParameterValue } from '../../url.js';
import { createNotification } from '../../pop-up/notification.js';
import { hostError } from '../../host.js';
import { toggleSearch } from '../other/toggle.js';

async function generateGroups() {

    const datalist = document.getElementById('groups-list');
    const output = document.getElementById('host-groupskeys');

    output.innerHTML = '';

    for (let option of datalist.options) {

        if (option.value === 'All') {continue;}

        const div = document.createElement('div');
        div.classList.add('host');
        div.dataset.name = option.value;

        const groupDivider = document.createElement('div');
        groupDivider.classList.add('group-divider');

        const p = document.createElement('p');
        if (option.value === 'Favorites') {p.innerHTML = '<i class="fa-solid fa-bookmark"></i>Favorites';
        } else {p.innerHTML = '<i class="fa-solid fa-chevron-down"></i>' + option.value;}

        const span = document.createElement('span');

        let button;let button2;
        if (option.value != 'Favorites') {
            
            button = document.createElement('button');
            button.id = 'group-settings';
            button.innerHTML = '<i class="fa-solid fa-gear"></i>';

            button.addEventListener('click', function(event) {
                event.preventDefault();
                $('.host-popups').load('vkm/include/content/vault/group/modify.html', function() {
                    initializeModifyGroup(option.value)
                });
            });

            button2 = document.createElement('button');
            button2.id = 'group-delete';
            button2.innerHTML = '<i class="fa-solid fa-trash"></i>';

            button2.addEventListener('click', function(event) {
                event.preventDefault();
                $('.host-popups').load('vkm/include/content/vault/group/delete.html', function() {
                    initializeDelGroup(option.value)
                });
            });

        }

        const hostKeys = document.createElement('div');
        hostKeys.classList.add('host-keys');

        p.addEventListener('click', function() {
            if (hostKeys.classList.contains('hidden')) {
                hostKeys.classList.remove('hidden');
                if (option.value != 'Favorites') {p.innerHTML = '<i class="fa-solid fa-chevron-down"></i>' + option.value;} 
            } else {
                hostKeys.classList.add('hidden');
                if (option.value != 'Favorites') {p.innerHTML = '<i class="fa-solid fa-chevron-up"></i>' + option.value;}
            }
        });

        groupDivider.appendChild(p);
        groupDivider.appendChild(span);

        if (button) {groupDivider.appendChild(button);}
        if (button2) {groupDivider.appendChild(button2);}

        div.appendChild(groupDivider);
        div.appendChild(hostKeys);

        output.appendChild(div);

        if (option.value === 'Favorites') {
            
            var responseFavKeys = JSON.parse(await requestGet(faFuncs['getFavoritesKeys']));
            if (responseFavKeys.success) {for (let keyData of responseFavKeys.keys) {createKey(hostKeys, keyData, keyData[6]);}
            } else {hostError(responseFavKeys.error)};

            continue
        }

        const jsondata = {
            groupname: option.value,
        }
    
        var color = JSON.parse(await requestPost(jsondata, faFuncs['getColor']));
        if (color.success === true) {

            var response = JSON.parse(await requestPost(jsondata, faFuncs['getKeysFromGroup']));
            if (response.success) {for (let keyData of response.keys) {createKey(hostKeys, keyData, color.color);}
            } else {hostError(color.error)}    

        } else {hostError(color.error)}

    }
}

generateGroups()

const selectElement = document.getElementById('ss-group-select');
const output = document.getElementById('host-groupskeys');
selectElement.addEventListener('change', function() {
    toggleSearch()
    const selectedValue = selectElement.value;
    const divs = output.querySelectorAll('.host');
    divs.forEach(function(div) {
        if (div.dataset.name === selectedValue) {div.style.display = 'flex';
        } else if (selectedValue === 'All') {window.location.reload()}
        else {div.style.display = 'none';}
    });
});

var tmpsearch = getParameterValue('s')
if (tmpsearch) {
    document.getElementById("search-input").value = tmpsearch;
    document.getElementById("search-btn").click();
}