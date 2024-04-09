/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.1
  \_/|_\_\_|_|_|

VKM v6.1
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { deleteParamURL } from '../../url.js';

export function toggleSearch() {
    document.getElementById("search-input").value = '';
    document.getElementById("host-groupskeys").style.display = 'block';
    document.getElementById("host-searchkeys").style.display = 'none';
    deleteParamURL('s');$("#host-searchkeys").empty();
}