# Welcome to VKM

**VKM** (*VaultKeyManager*) is a **personal project** that I started in November 2021 when I was just starting to learn how to program. It was my first project and over time it has become my personal challenge to make it more professional and secure. 

**But... What is VKM?** VKM is a **self-hosted password manager** with an **intuitive web interface** programmed in `Python` and `JS` using `FastApi` and `Jquery` technologies.

# VKMv6 has been released!

The sixth version of vkm is packed with changes and improvements. For version 6.0, vkm has been **reprogrammed** from scratch, to bring a **new web redesign**, **more features**, **security** and a cleaner code and better structure for all those who want to contribute to this *small project*.

**But... What does this new version bring?**

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

*A changelog has been re-created. It has been reset for this new era of VKM.*

What would you like to see in the future? [Open an Issue](https://github.com/cpadlab/vkm/issues)

# Table of Contents

1. [What is VKM?]()
2. [The new version!]()
3. [Install]()
4. [How to use it]()
5. [Gallery]()
6. [Contribute]()
8. [AutoCompile]()
9. [License]()
11. [Technologies]()

# Install 

```shell
git clone https://github.com/cpadlab/vkm
cd vkm && pip install -r requirements.txt
python3 vkm.py --setup
```

# How to use it

**Switch on VKM**

```shell
python vkm.py  # You can also use --start
```

## Register

Welcome to the vkm registration page! Enter your username and password for your new account and ...

![Register Page](screenshots\register-page.png)

Please read the warnings carefully in order to create a secure password and create your account.

![Register Errors](screenshots\register-error.png)

If you still have some doubts, you can check the little help box by clicking on the button `?`

![Register Help](screenshots\register-help.png)

If your password is secure, it is time to create your account. This text will tell you if it is suitable.

![Register Correct](screenshots\register-correct.png)

Once you have created your account, an on-screen message will tell you it's time to log in!

![Register Succesful](screenshots\register-succesful.png)

## Login

This is the login page:

![Login Page](screenshots\login-page.png)

Don't forget that when logging in there are also password limitations and help at the bottom of the page,

## Vault

![Vault](screenshots\vault.png)

## Groups

When we enter the vault, it looks very empty, so we have to create our first group!

![Vault 0 Grups](screenshots\vault-non-groups.png)

In this screen the groups are created:

![Create Grups](screenshots\create-group.png)

Edit the name and colour of the group as you see fit.

![Modify Group](screenshots\group-edit.png)

Filter by groups for faster results!

![Filter Group](screenshots\filter-group.png)

## Keys

In this screen the keys are created:

![Create Keys](screenshots\create-key.png)

These are the options that vkm allows you with your password. Click on the copy button and copy the password! If you click on the username it will be copied and the same with the title! Modify, delete or review your password from the dropdown with the 3 dots.

![Key Option](screenshots\key-options.png)

### Vault (Other)

Do you know that it is also possible to search within vkm? Search by username, site title or url!

![Search](screenshots\search.png)

You've gone to the toilet for 5 minutes and don't want anyone to see your passwords? When you switch tabs you'll get this floating box!

![Auto Logout](screenshots\auto-logout.png)

When you log out manually or after 15 minutes of session time, you will see a floating box telling you that your session has ended.

![Logout](screenshots\logout.png)

Generate a secure and personalised password whenever you need it, but don't forget that when registering a new password you can also generate it with a single button!

![Generate Password](screenshots\create-password.png)

## Account

Change your password or username as you wish!

![Change Account](screenshots\account-change.png)

No longer use your account? Delete it!

![Delete Account](screenshots\account-delete.png)

Don't forget that you can export your passwords!

# Gallery

![Vault](screenshots\vault.png)

# Contribute

Welcome to VKM! We are delighted that you wish to contribute to our project. To ensure that all contributors have a positive experience, we have created these contribution guidelines. Please be sure to read them carefully before contributing.

We value and appreciate all contributions, large and small. If you have any questions or need help contributing, please don't hesitate to contact us. Thank you for being part of the VKM community.

[How to contribute?](https://github.com/cpadlab/vkm/blob/master/CONTRIBUTING.md)

# Possible "Errors"

# AutoCompile

```bash
pyinstaller --onefile --add-data="./*:." --icon="vkm/include/assets/logo.ico" --name="vkm" vkm.py
```

# License

**GNU GENERAL PUBLIC LICENSE** Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/> Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.

[Read More](https://github.com/cpadlab/vkm/blob/master/LICENSE)

# Technologies

| Python    | JavaScript | HTML | CSS | SQLite3 | JQuery | FastApi | Bearer |
| -------- | ------- | -------- | ------- | -------- | ------- | -------- | ------- |