## Table of Contents

1. [Info General](#info-general)
2. [Tecnologías](#tecnologias)
3. [Instalación](#instalacion)
4. [Extras](#extras)

### Info General

---

El Banco Solar acaba de decidir invertir una importante suma de dinero para contratar un
equipo de desarrolladores Full Stack que desarrollen un nuevo sistema de transferencias, y
han anunciado que todo aquel que postule al cargo debe realizar un servidor con Node que
utilice PostgreSQL para la gestión y persistencia de datos, y simular un sistema de
transferencias.
El sistema debe permitir registrar nuevos usuarios con un balance inicial y basados en éstos,
realizar transferencias de saldos entre ellos.
En esta prueba contarás con una aplicación cliente preparada para consumir las rutas que
deberás crear en el servidor. A continuación se muestra una imagen con la interfaz
mencionada.

## Tecnologías

---

Una lista de tecnologías utilizadas en el proyecto:

- [MomentJS](https://momentjs.com): Version 2.29.1
- [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript): Version ECMAScript 2020
- [Bootstrap](https://bootstrap.com): Version 4.5.3

## Instalación

---

Pasos para la instalación desde github.

```
# clonar repositorio
$ git clone https://github.com/dozz1e/Prueba---Banco-Solar

# Ruta a directorio clonado
$ cd ../ruta/al/directorio/clonado

# instalar dependencias
$ npm install

# servidor con hot relad en localhost:3000
$ npm run dev

# construir para producción y lanzar servidor
$ npm run build
$ npm run start

# generar proyecto estático
$ npm run generate
```

## Extras

---

Lista de extras agregados al código

1. **Modificación index.html**

   - En los "options" se modificó el value, de nombre a las ids de los usuarios.
   - Al eliminar un usuario, en vez de cargar nuevamente usuarios y transacciones, opte mejor por recargar la página, ya que el select no se actulizaba y seguía mostrando el usuario eliminado.
   - Cambié el formato de moment a "DD/MM/YYYY HH:mm:ss" para mostrar el formato pedido.

2. **Estructura de proyecto**

   Archivo principal server.js

   Directorio modulos:
   -- transfencias

   - funciones: Manejo de datos del Front de las transferencias y lógica del JS.
   - index: Manejo de la conexión Pool de las transferencias.

   -- usuarios

   - funciones: Manejo de datos del Front de los usuarios y lógica del JS.
   - index: Manejo de la conexión Pool de los usuarios.

   Directorio public:

   - index.html
   - favicon PNG
