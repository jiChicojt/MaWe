# MaWe
Te recomiendo abrir los proyectos utilizando un IDE más completo, yo utilizo VS Code (https://code.visualstudio.com/) y tiene soporte para python y para apps web como las de angular.</br></br>
# MaWe-Backend
MaWe's python backend\
Antes de correr el programa debes asegurate de tener instalada la versión 3.x de Python, si esta no está instalada habrá problemas al ejecutar el API. Una vez verificado, abre una terminal en la carpeta del proyecto (*si estás en VS Code basta con hacer click en **Terminal>Nueva terminal** en la barra de herramientas*), después de esto deberás instalar virtualenv para crear un entorno virtual.</br></br>
***$ pip install virtualenv***</br></br>
Una vez completado este paso deberás crear un entorno virtual</br></br>
***$ virtualenv vnv***</br></br>
Ahora, deberás ejecutar el entorno virtual</br></br>
***$ .\vnv\Scripts\activate.bat***</br></br>
Luego deberás instalar las dependencias utilizadas para el proyecto</br></br>
***$ pip install flask flask-pymongo flask_cors flask_jwt_extended***</br></br>
Cuando estas terminen de instalarse podrás ejecutar el proyecto utilizando</br></br>
***$ python src/app.py***</br></br>
# MaWe - Frontend
MaWe's angular frontend\
Para levantar esta necesitarás descargar e instalar Node.js en versión LTS (https://nodejs.org/en/). Una vez instalado puedes preparar el ambiente para levantar la página, deberás abrir la terminal dentro de la carpeta **Frontend** y ejecutar el comando</br></br>
***$ npm install @angular/cli***</br></br>
Posteriormente deberás ejecutar el comando</br></br>
***$ ng serve -o***</br></br>
# Nota importante
Deberás estar ejecutando los dos servicios para poder utilizarlos
