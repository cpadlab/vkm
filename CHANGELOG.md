# Changelog

## [6.1]() (2024-)

[Full Changelog](https://github.com/cpadlab/vkm/releases/tag/V6.1)

**What's new?**

1. **Bug Fixes**
  - When any parameter of the group was modified, the colour of the group was corrupted. 
  - When the name of the group was changed, it did not update its keys correctly, so it did not allow them to be displayed.

2. **Performance**

3. **Visual Aspects**
   - **Opacity layers** have been **fixed** to better differentiate between notification and emergency pop-ups.
   - A **favicon** (`png`) has been **added** to the web server.

4. **New File Structure**
   - The entire **structure** of `vkm/include/content/*` and `vkm/include/scripts/*` has been **modified** to make the source code easier to read.

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
