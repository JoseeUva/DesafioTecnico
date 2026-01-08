las dependencias del proyecto son Node.js, firebase-tools, firebase y firebase-functions

para descargar Node.js se debe ingresar a la pagina oficial de node (https://nodejs.org)

para instalar las herramientas: 
firebase-tools: npm install -g firebase-tools (en cualquier terminal) firebase: npm install firebase (en la terminal, dentro de la carpeta web-app "cd web-app")                                                firebase-functions: npm install firebase-functions (en la terminal de la carpeta functions "cd functions")

para ejecutar los emuladores de firebase en la carpeta raiz se debe de ejecutar en la terminal el comando "firebase emulators:start", esto hara que los emuladores de firebase se ejecuten correctamente y podamos ingresar a la pagina, la cual para poder acceder a ella debemos de poner en la terminal de la carpeta web-app (cd web-app) el comando "npm run dev"