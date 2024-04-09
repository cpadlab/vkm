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
import { hostError } from '../../host.js';

var groupNameInput = document.getElementById("groupname-input");
var createGroupBtn = document.getElementById("form-creategroup-btn");
var groupColorInput = document.getElementById("groupcolor-input");

function validateEntry() {
    if (groupNameInput.value.trim() !== "") {createGroupBtn.disabled = false;
    } else {createGroupBtn.disabled = true;}
}

async function createGrupo() {

    groupNameInput.disabled = true;
    groupColorInput.disabled = true;

    const jsondata = {
        groupname: groupNameInput.value,
        groupcolor: groupColorInput.value
    };

    var result = JSON.parse(await requestPost(jsondata, faFuncs['addGroup']));
    if (result.success === true) {window.location.reload();
    } else {hostError(result.error)}
}

groupNameInput.addEventListener("input", validateEntry);
createGroupBtn.addEventListener('click', createGrupo);

