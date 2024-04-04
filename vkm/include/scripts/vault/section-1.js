/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { requestGet, faFuncs, requestPost } from '../requests.js';
import { hostError } from '../host.js';
import { toggleSearch } from './toggle.js';
import { createKey } from './key.js';
import { updateParamURL } from '../url.js';

var groups = JSON.parse(await requestGet(faFuncs['getGroups']));

if (groups.success) {

    var datalist = document.getElementById("groups-list");

    var optionAll = document.createElement("option");
    optionAll.text = "All";optionAll.value = "All";
    datalist.appendChild(optionAll);

    var optionFavorites = document.createElement("option");
    optionFavorites.text = "Favorites";optionFavorites.value = "Favorites";
    datalist.appendChild(optionFavorites);
    
    if (groups.list.length > 0) {

        groups.list.forEach(function(group) {
            var option = document.createElement("option");
            option.value = group;option.text = group;
            datalist.appendChild(option);
        });


        var datalist = document.getElementById("groups-list");
        var select = document.getElementById("ss-group-select");
        var optionsDatalist = datalist.querySelectorAll("option");
        optionsDatalist.forEach(function(optionDatalist) {
            var option = document.createElement("option");
            option.text = optionDatalist.value;
            option.value = optionDatalist.value;
            select.add(option);
        });

        $('#section-3').load('vkm/include/content/vault/section-3.html'); 

    } else {
        $('#section-3').load('vkm/include/content/vault/0-groups.html');
    }
}

document.getElementById("search-btn").addEventListener('click', async function(event) {
    event.preventDefault();

    var serchText = document.getElementById("search-input").value;
    if (serchText) {

        $("#host-searchkeys").empty();
        document.getElementById("host-groupskeys").style.display = 'none';
        document.getElementById("host-searchkeys").style.display = 'block';

        updateParamURL('s', document.getElementById("search-input").value)

        var button = document.createElement("button");
        button.classList.add('return-btn')
        button.innerHTML = '<i class="fa-solid fa-caret-left"></i> <label>Return to the vault</label>';
        button.addEventListener("click", function(event) {event.preventDefault();toggleSearch();});

        var container = document.getElementById("host-searchkeys");
        container.appendChild(button);

        var jsondataSearch = {
            search: document.getElementById("search-input").value
        }

        const hostKeys = document.createElement('div');
        hostKeys.classList.add('host-keys2');
        document.getElementById("host-searchkeys").appendChild(hostKeys);

        var keys = JSON.parse(await requestPost(jsondataSearch, faFuncs['getKeysSearch']));
        if (keys.success) {for (let keyData of keys.keys) {createKey(hostKeys, keyData, keyData[6]);}
        } else {hostError(keys.error)};
    }

});