# Pency

**Un catálogo online que lleva el pedido hasta WhatsApp.**

Pency reúne productos, variantes y un carrito en una tienda configurable. En lugar de integrar un checkout complejo, prepara el pedido para enviarlo por WhatsApp. Este repositorio es un **fork histórico** del proyecto original (código y dependencias de 2020), no una tienda moderna mantenida activamente.

| Para quien compra | Para quien administra | Para la tienda |
| :-- | :-- | :-- |
| Catálogo, detalle de productos y carrito. | Carga y edición de productos y variantes. | Imagen, título, colores y enlace de pedido por WhatsApp. |

## Primeros pasos

La aplicación usa **Next.js, React, Firebase y Cloudinary**. Para ejecutarla, necesitás configurar servicios externos y las variables de [`.env.template`](.env.template). Las instrucciones originales de desarrollo y creación de una tienda están más abajo; pueden requerir ajustes por la antigüedad de las dependencias.

> [!NOTE]
> Este proyecto fue desarrollado originalmente por otra persona. Para consultas históricas y atribución, conservamos los datos de contacto de la documentación upstream. La licencia [CC BY-NC-SA 4.0](LICENSE.md) **restringe el uso comercial**; leé sus términos antes de reutilizar el código.

## Qué incluye

- Catálogo con imágenes, precios, descripciones y opciones que pueden alterar el precio.
- Panel de administración para gestionar productos.
- Carrito que prepara el pedido para WhatsApp.
- Personalización visual de la tienda.

## Soporte y proyecto original

La documentación upstream indica abrir issues en GitHub y brinda el contacto `gonzalo.pozzo4@gmail.com`. Este fork no implica soporte activo del autor original.

## ¿Cómo puedo correr el proyecto?
Completá todas las variables que aparecen en `.env.template` y guardalo como `.env.development`

> Todas las variables de firebase las encontramos en la configuración del proyecto de firebase y otras de una cuenta de servicio que podés encontrar en firebase yendo a `Configuración > Usuarios y permisos > Cuentas de servicio` y generando una nueva clave privada. El único campo diferente es `FIREBASE_PRIVATE_KEY` que antes de agregarlo al archivo `.env.[ambiente]` lo tenés que pasar a Base64 (podés usar la función `btoa` integrada en los navegadores). Luego el `next.config.js` se encarga de decodificarlo. Copialo con los \n, los espacios, todo, exactamente igual que como está en el archivo .json.

Luego en consola ejecutá:
```bash
# Yarn
yarn
yarn start

# O si usas npm
npm install
npm start
```
> Necesitás tener un .env.[ambiente] para cada ambiente en el que vas a correr la app.

## Configurando Firebase
Para esta aplicación vamos a necesitar dos cosas de Firebase, la primera va a ser configurar las reglas de firestore (las podés encontrar en el archivo `firestore.rules`) y habilitar en firebase el inicio de sesión con usuario y contraseña (lo haces en Firebase desde `Auth > Sign in methods`).

## Configurando Cloudinary
También vamos a necesitar una cuenta en Cloudinary para alojar las imágenes de la tienda. De allí vamos a necesitar el Cloudinary Cloud name para la variable `CLOUDINARY_CLOUD` del _environment_. Además vamos a tener que ir a `Settings > Upload` donde podemos configurar los presets. En principio podemos usar el default para las variables `CLOUDINARY_PRESET_LOW` y `CLOUDINARY_PRESET_HIGH`, pero tenemos que asegurarnos de setear el Signing Mode en *Unsigned*.

## Configurando el proyecto
Una vez que tengamos nuestro `.env.[ambiente]` listo, vamos a la consola, nos paramos en la carpeta de nuestro proyecto y ejecutamos:

```bash
# yarn
yarn && yarn dev

# o si usas npm
npm install && npm run dev
```

### Creando la tienda
 - Bajamos y abrimos [Postman](https://www.postman.com/downloads/).
 - Comprobamos que la aplicación este corriendo en **http://localhost:3000/**.
 - Seleccionamos POST Request y colocamos como URL: `http://localhost:3000/api/tenant?slug=NOMBRE_DE_TU_TIENDA` (si bien podémos poner lo que queramos en slug recomiendo que sean solo letras minúsculas y guiones)
 - En `body` seleccionamos `x-www-form-urlencoded` y colocamos los siguientes valores:
```markdown
	|   KEY  |                    VALUE                         |
	|:------:|:------------------------------------------------:|
	|email   | tuEmail@email.com                                |
	|password| tuContraseña                                     |
	|secret  | valor de SECRET en .env.[ambiente]               |
```
 - Hacemos click en `Send` y comprobamos si se creó la tienda entrando en: `http://localhost:3000/NOMBRE_DE_TU_TIENDA`
 -  Para acceder al panel de administración debemos entrar mediante el siguiente link: `http://localhost:3000/NOMBRE_DE_TU_TIENDA/admin`
 > Tomá en cuenta que ya que usamos el uid del usuario como id del documento, no podémos tener mas de un usuario por tienda ni tampoco mas de una tienda por usuario.

## Licencia y reutilización
Podés leer la licencia [acá](./LICENSE.md). En resumen, podés usar Pency para lo que quieras mientras no lucres con eso y menciones la fuente original cuando lo uses 🥰.
