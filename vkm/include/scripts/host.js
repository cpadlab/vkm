/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.1
  \_/|_\_\_|_|_|

VKM v6.1
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { setError } from './pop-up/error.js';

export function hostRegister() {$('register').load('vkm/include/content/register.html', function() {});}
export function hostLogin() {$('login').load('vkm/include/content/login.html', function() {});}
export function hostVault() {$('vault').load('vkm/include/content/vault.html', function() {});}
export function hostAccount() {$('account').load('vkm/include/content/account.html', function() {});}

export function delRegister() {$('register').empty();}
export function delLogin() {$('login').empty();}

export function hostError(error) {$('.alerts').load('vkm/include/content/pop-up/error.html', function() {
    setError(error)
});}
