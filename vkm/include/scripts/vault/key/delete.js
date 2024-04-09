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
    const jsondata = {code: document.getElementById("key-to-delete").getAttribute('data-code')};
    var result = JSON.parse(await requestPost(jsondata, faFuncs['deleteKey']));

    if (result.success === true) {window.location.reload();
    } else {hostError(result.error)}
}

export function initializeDelKey(key, code) {
    document.getElementById("key-to-delete").value = key;
    document.getElementById("key-to-delete").setAttribute('data-code', code);;
    document.getElementById("dad-delete-confirm").addEventListener('click', deleteGroup);
}