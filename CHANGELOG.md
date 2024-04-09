# Changelog

## [6.1]() (2024-)

[Full Changelog](https://github.com/cpadlab/vkm/releases/tag/V6.1)

**What's new?**

1. **Performance**

2. **Visual Aspects**
   - **Opacity layers** have been **fixed** to better differentiate between notification and emergency pop-ups.
   - A **favicon** (`png`) has been **added** to the web server.

3. **New File Structure**
   - The entire **structure** of `vkm/include/content/*` and `vkm/include/scripts/*` has been **modified** to make the source code easier to read.
   - Presented the table of modifications of the path and file name of the folder content:

| Before | After |
| ------ | ----- |
| `content/vault/0-groups.html` | `content/vault/group/none.htm` |
| `content/vault/create-group.html` | `content/vault/group/create.htm` |
| `content/vault/delete-group.html` | `content/vault/group/delete.html` |
| `content/vault/create-key.html` | `content/vault/key/create.html` |
| `content/vault/delete-key.html` | `content/vault/key/delete.html` |
| `content/vault/modify-group.html` | `content/vault/group/modify.html` |
| `content/vault/modify-key.html` | `content/vault/key/modify.html` |
| `content/vault/navbar.html` | `content/vault/other/navbar.html` |
| `content/vault/section-1.html` | `content/vault/other/section-1.html` |
| `content/vault/section-2.html` | `content/vault/other/section-2.html` |
| `content/vault/section-3.html` | `content/vault/other/section-3.html` |
| `content/vault/view-key.html` | `content/vault/key/view.html` |

  - Presented the table of modifications of the path and file name of the folder scripts:
  
| Before | After |
| ------ | ----- |
| `vkm/include/scripts/error.js` | `vkm/include/scripts/pop-up/error.js` |
| `vkm/include/scripts/notification.js` | `vkm/include/scripts/pop-up/notification.js` |
| `vkm/include/scripts/generate.js` | `vkm/include/scripts/other/generate.js` |
| `vkm/include/scripts/clock.js` | `vkm/include/scripts/other/clock.js` |
| `vkm/include/scripts/account.js` | `vkm/include/scripts/pages/account.js` |
| `vkm/include/scripts/login.js` | `vkm/include/scripts/pages/login.js` |
| `vkm/include/scripts/register.js` | `vkm/include/scripts/pages/register.js` |
| `vkm/include/scripts/vault.js` | `vkm/include/scripts/pages/vault.js` |
| `vkm/include/scripts/vault/group/create.js` | `vkm/include/scripts/vault/create-group.js` |
| `vkm/include/scripts/vault/group/delete.js` | `vkm/include/scripts/vault/delete-group.js` |
| `vkm/include/scripts/vault/group/modify.js` | `vkm/include/scripts/vault/modify-group.js` |
| `vkm/include/scripts/vault/key/create.js` | `vkm/include/scripts/vault/create-key.js` |
| `vkm/include/scripts/vault/key/delete.js` | `vkm/include/scripts/vault/key-delete.js` |
| `vkm/include/scripts/vault/key/key.js` | `vkm/include/scripts/vault/key.js` |
| `vkm/include/scripts/vault/key/modify.js` | `vkm/include/scripts/vault/modify-key.js` |
| `vkm/include/scripts/vault/key/view.js` | `vkm/include/scripts/vault/view-key.js` |
| `vkm/include/scripts/vault/other/navbar.js` | `vkm/include/scripts/vault/navbar.js` |
| `vkm/include/scripts/vault/other/toggle.js` | `vkm/include/scripts/vault/toggle.js` |
| `vkm/include/scripts/vault/sections/section-1.js` | `vkm/include/scripts/vault/section-1.js` |
| `vkm/include/scripts/vault/sections/section-2.js` | `vkm/include/scripts/vault/section-2.js` |
| `vkm/include/scripts/vault/sections/section-3.js` | `vkm/include/scripts/vault/section-3.js` |

FALTA ARREGLAR EL BUG DE MODIFICAR EL GRUPO
REVISAR TODO EL CÓDIGO DUPLICADO, BUSCAR SOLUCIONES

## [6.0]() (2024-04-04)

[Full Changelog](https://github.com/cpadlab/vkm/releases/tag/V6.0)

**What's new?**

1. **Security**
   - HTTPS
     - The `web server` and `FastApi` server now work with **https**. Say goodbye to http. A **self-signed certificate** is included in the project, but from the `vkm.conf`, *you can add your own*!
   - HTTP Bearer
     - **All connections** from the server to FastApi (python) are made with a **check token**, using the `HTTP Bearer library`, and python requests are **checked with a session token** *before returning any information*.

2. **New Functionalities**
   - About your Registration or Login
     - Red **indicators** have been added at the bottom of your screen that **tell you what rules your password lacks** in order to be secure and usable in VKM (you can see them in the "How to use it" section). Also, on the registration page there is a button with a short simplified explanation of what your password needs.
   - Keys in the vault
     - You now have a feature that **allows you to delete your password**.
     - You **can now bookmark the passwords** you use the most!
     - A "View key" section has been added to be able to **view the key without modifying** it. No more hassle!
     - **All the options** that you could have when creating the key **have been added inside the key modification** (Now you can change group, add to favorites, ...). That is to say, the "Edit Key" section has been completed.
    - The groups
      - You can now **customize the group banners** by color, for easy visualization.
      - A new feature has been added that allows you to **change the name** and color of your group.
      - A button has been added to facilitate the **deletion of groups**.
      - **Clicking on the group separator** (where an arrow with the group name appears) **will collapse or display the passwords** so that the vault is not "full".
      - From the drop-down next to the search input, **you can filter by favorites or groups** to only see the one you need instead of the whole vault.
    - Account
      - Modify your account, one of the most awaited functionalities!
      - A section has been added to **modify the account username**.
      - You can now **change the login password**.
      - No longer need this account? You can now **delete the account** if you have no use for it and it only occupies disk memory, but be careful, this *operation cannot be undone*.
      - Now you **can export all your account passwords** as a `.csv` file. The format/header of your file is: `['code', 'name', 'url', 'password', 'username', 'favorite', 'color', 'group']`
3. **The new graphical interface**
   - VKM brings a new, **more intuitive** and **complete** graphical interface. Using the vkm colors, it now brings **more customization**, **better organization** and a **cleaner** and more complete vault aesthetics. You can get to know it by looking at the "How to use it" section.
