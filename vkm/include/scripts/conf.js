/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { getParameterValue } from './url.js';
import { getToken } from './requests.js';
import { getCookie } from './cookies.js';

/* ----- INI Utils ----- */
const iniFilePath = '../../vkm/lib/core/vkm.conf';
const regexSection = /\[(\w+)\]/;
const regexOption = /^(\w+)\s*=\s*(.*)$/;

/* ----- FastApi ----- */
export const fa_host = await getExportValues('fastapi', 'host');
export const fa_port = await getExportValues('fastapi', 'port');
export const fa_url = 'https://' + fa_host + ':' + fa_port + '/'

/* ----- Session ----- */
export var tokenData = JSON.parse(await getToken());
export var cookie_session = getCookie('session');

/* ----- URL ----- */
export var page = getParameterValue('p')

/* ----- Other ----- */
export const fileExport = await getExportValues('general', 'export_file');

function getIniValue(section, option) {
    return new Promise((resolve, reject) => {
        fetch(iniFilePath)
            .then(response => response.text())
            .then(data => {
                
                let currentSection = null;let optionValue = null;
                let sectionFound = false;

                data.split('\n').forEach(line => {
                    const sectionMatch = line.match(regexSection);
                    const optionMatch = line.match(regexOption);

                    if (sectionMatch) {
                        currentSection = sectionMatch[1];
                        if (currentSection === section) {sectionFound = true;}

                    } else if (optionMatch && currentSection === section) {
                        const optionName = optionMatch[1];const optionValueMatch = optionMatch[2];
                        if (optionName === option) {optionValue = optionValueMatch.trim();}
                    }
                });

                if (sectionFound && optionValue !== null) {
                    resolve(optionValue);
                }
            })
            .catch(error => {reject(error);});
    });
}

async function getExportValues(section, option) {
    return await getIniValue(section, option).catch(error => {
        console.error(error);
        return null;
    });
}