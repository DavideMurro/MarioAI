# MarioAI

Simple chat bot of Artificial Intelligence that generate text and images.

It uses Stable Diffusion API for generate images
**documentation**
https://stable-diffusion-art.com/install-windows/#Step_3_Clone_web-ui
https://github.com/AUTOMATIC1111/stable-diffusion-webui.git

It uses AI Companion API for generate text
**documentation**
https://github.com/Hukasx0/ai-companion/tree/main

## File structure

- **docs**
  Folder of the application build. all configurationis already setted to work with GitHub Pages, just need torun the command ng build
- **src/assets**
  Assets of the application, for now just the languages folder and the logos folder
- **src/environments**
  Custom general settings like default language, or default API url
- **src/app**
  Core application

## Libraries

- **angular material**
  Material for the application UI
- **material icons**
  Application icon package
- **ngx translate**
  To manage the translation of the application.

## Translation i18n

It has its folder in _assets_ directory called _i18n_ that contains all translation files configurable in the environment file. Each file is named with its own language code and has an extension configurable in environment file. The directory also contains the _i18n.ts_ file where is written the structure of the languages

## Environment

The environment is divided in development and production and it has these attributions:

- **production**
  Boolean that says if the file is for production build
- **appTitle**
  Application title
- **languagesPathDirectory**
  Path of languages directory that the library uses as root
- **languagesFileFormat**
  Format of the language files
- **defaultLanguageCode**
  Default language used by the application
- **defaultStableDiffusionApiUrl**
  Default API url for stable diffusion used by the application
- **defaultAiCompanionApiUrl**
  Default API url for AI Companion used by the application

## Demo link

https://davide-murro.github.io/mario-ai/

## Screenshots

![marioai_1](https://github.com/davide-murro/mario-ai/assets/118051417/a2ae19dc-4759-404d-a5fe-8b91c60604b2)
![marioai_2](https://github.com/davide-murro/mario-ai/assets/118051417/57ecc148-afb1-47cb-b11d-506a1de7b8f5)
![marioai_3](https://github.com/davide-murro/mario-ai/assets/118051417/e7190700-942b-46a7-a71b-3897ada6ba95)
