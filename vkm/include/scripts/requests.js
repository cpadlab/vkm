/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { fa_url, tokenData } from './conf.js';

export const faFuncs = {
    'getToken': 'Z2V0VG9rZW4K',
    'registerUsername': 'cmVnaXN0ZXJVc2VybmFtZQo',
    'checkCredentials': 'Y2hlY2tDcmVkZW50aWFscwo',
    'getTotalKey': 'Z2V0VG90YWxLZXkK',
    'getKeysFromGroup': 'Z2V0S2V5c0Zyb21Hcm91cAo',
    'getFavoritesKeys': 'Z2V0RmF2b3JpdGVzS2V5cwo',
    'addKey': 'YWRkS2V5Cg',
    'modifyKey': 'bW9kaWZ5S2V5Cg',
    'deleteKey': 'ZGVsZXRlS2V5Cg',
    'getGroups': 'Z2V0R3JvdXBzCg',
    'addGroup': 'YWRkR3JvdXAK',
    'modifyGroup': 'bW9kaWZ5R3JvdXAK',
    'deleteGroup': 'ZGVsZXRlR3JvdXAK',
    'modifyUsername': 'bW9kaWZ5VXNlcm5hbWUK',
    'modifyPassword': 'bW9kaWZ5UGFzc3dvcmQK',
    'deleteUsername': 'ZGVsZXRlVXNlcm5hbWUK',
    'checkCookie': 'Y2hlY2tDb29raWUK',
    'getUsername': 'Z2V0VXNlcm5hbWUK',
    'getPassword': 'Z2V0UGFzc3dvcmQK',
    'getColor': 'Z2V0Q29sb3JHcm91cAo',
    'getKey': 'Z2V0S2V5Cg',
    'getKeysSearch': 'Z2V0S2V5c1NlYXJjaAo',
    'exportKeys' : 'ZXhwb3J0S2V5cwo'
};

export async function getToken() {
    try {
        const response = await fetch(fa_url + faFuncs['getToken']);
        if (!response.ok) {throw new Error('Error in the request');}
        return await response.json();
    } catch (error) {console.error(error);}
}

export async function requestGet(fa_path) {
    try {
        const response = await fetch(fa_url + fa_path, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${tokenData.token}`,},
            credentials: 'include'
        });
        if (!response.ok) {throw new Error(`GET request failed: ${response.statusText}`);}
        return await response.json();
    } catch (error) {console.error(error);throw error;}
}

export async function requestPost(data, fa_path) {
    try {
        const response = await fetch(fa_url + fa_path, {
            method: 'Post',
            headers: {
                'Authorization': `Bearer ${tokenData.token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        if (!response.ok) {throw new Error(`POST request failed: ${response.statusText}`);}
        return await response.json();
    } catch (error) {console.error(error);throw error;}
}