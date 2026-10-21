# Tripleten web_project_around_es
En este proyecto se inicia con la implementación de javaScript para darle funcionalidad a los botones con los que cuenta la pagina, se añaden funciones que se disparan por medio de detectores de eventos y selectores de elementos HTML que permitan una interacción dinámica con el usuario. 

Como segundo feature se implementan validaciones en los formularios para evitar que el usuario envie información innecesaria o erronea acorde a cada campo con los que cuenta el formulario. También se mejora la experiencia de usuario permitiendo que este cuente con más opciones para interactuar con la página por medio de eventos como el click fuera del modal que se abre, o usando la tecla escape. Se bloquean los botones de submit de cada form, haciendo que el envio de información sea coherente con lo que requiere la página.

Como tercer feature para este proyecto, se aplica el principio o paradigma de la programación orientada a objetos para dividir responsabilidades entre las clases Card.js y FormValidator.js, en donde cada una se responsabiliza de realizar sus respectivas acciones por medio de métodos públicos y privados.

Llegando al cuarto feature de este proyecto, se amplia el uso de la POO para que las partes del proyecto se modelen mediante clases adicionales: `Popup`, `PopupWithForm`, `PopupWithImage`, `Section`, `UserInfo`, además de `Card` y `FormValidator`. Estas clases se añadieron para separar responsabilidades (gestión de modales y formularios, representación y renderizado de tarjetas, validación y manejo de datos del usuario), mejorar la mantenibilidad, facilitar reutilización y permitir un flujo de datos más claro entre componentes.

Para el quinto feature del proyecto, se integra el uso de programación asíncrona y consumo de APIs por medio de promesas para realizar el guardado, actualización y eliminación de los elementos de la pagina por medio de las solicitudes GET, PUT, PATCH, DELETE.

https://jdj-98.github.io/web_project_around_es/src
    
