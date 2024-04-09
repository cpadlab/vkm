/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.1
  \_/|_\_\_|_|_|

VKM v6.1
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { requestPost, faFuncs } from '../../requests.js';

async function deleteGroup() {
    const jsondata = {groupname: document.getElementById("group-to-delete").value};
    var result = JSON.parse(await requestPost(jsondata, faFuncs['deleteGroup']));

    if (result.success === true) {window.location.reload();
    } else {hostError(result.error)}
}

export function initializeDelGroup(group) {
    document.getElementById("group-to-delete").value = group;
    document.getElementById("dad-delete-confirm").addEventListener('click', deleteGroup);
}