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

function validateEntry() {
    
    var createGroupBtn = document.getElementById("form-creategroup-btn");
    var groupNameInput = document.getElementById("groupname-input");
    var groupNameInputOld = document.getElementById("old-groupname-input")

    if (groupNameInput.value === "") {createGroupBtn.disabled = true;return} 
    if (groupNameInput.value === groupNameInputOld.value) {createGroupBtn.disabled = true;return} 

    createGroupBtn.disabled = false;

}

async function createGrupo() {

    var groupNameInput = document.getElementById("groupname-input");
    var groupColorInput = document.getElementById("groupcolor-input");
    var groupNameInputOld = document.getElementById("old-groupname-input")

    groupNameInput.disabled = true;
    groupColorInput.disabled = true;

    const jsondata = {
        old: groupNameInputOld.value,
        new: groupNameInput.value,
        color: groupColorInput.value,
    };

    var result = JSON.parse(await requestPost(jsondata, faFuncs['modifyGroup']));
    if (result.success === true) {window.location.reload();
    } else {hostError(result.error)}
}

export async function initializeModifyGroup(group) {

    var groupNameInput = document.getElementById("groupname-input");
    var createGroupBtn = document.getElementById("form-creategroup-btn");
    var groupColorInput = document.getElementById("groupcolor-input");
    var groupNameInputOld = document.getElementById("old-groupname-input")

    const jsondata = {
        groupname: group,
    };

    var color = JSON.parse(await requestPost(jsondata, faFuncs['getColor']));
    if (color.success === true) {groupColorInput.value = color.color;
    } else {hostError(color.error)}

    groupNameInputOld.value = group;
    groupNameInput.addEventListener("input", validateEntry);
    createGroupBtn.addEventListener('click', createGrupo);

}