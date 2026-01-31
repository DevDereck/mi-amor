 # Sorpresa para ella — Página para San Valentín

 Proyecto estático simple (mobile-first) con:
 - Contador dinámico desde el 28 de noviembre de 2024
 - Galería con citas y lightbox
 - Animaciones de corazones

 Archivos principales:
 - `index.html` — estructura principal
 - `src/styles.css` — estilos (mobile-first)
 - `src/script.js` — contador, galería y animaciones
 - `assets/images` — carpeta para tus fotos (añade imágenes aquí y actualiza los `src` en `index.html`)

 ## Desarrollo local
 Puedes servir la carpeta con un servidor estático simple. Ejemplos:

 PowerShell (Windows):

 ```powershell
 cd "c:\Users\Innovation Computers\OneDrive\Escritorio\projects\mochiweb\Mochi\moi-web"
 python -m http.server 3000
 # luego abrir http://localhost:3000
 ```

 o usando `npx`:

 ```bash
 npx http-server -p 3000
 ```

 ## Despliegue a Vercel
 1. Instala el CLI si quieres: `npm i -g vercel` o usa la web.
 2. Desde la carpeta del proyecto ejecuta `vercel` y sigue los pasos.

 Este proyecto ya incluye `vercel.json` para desplegar como sitio estático.

 ## Primer commit (ejemplo)

 ```powershell
 cd "c:\Users\Innovation Computers\OneDrive\Escritorio\projects\mochiweb\Mochi\moi-web"
 git init
 git add .
 git commit -m "chore: estructura inicial sitio sorpresa San Valentín"
 ```

 ---
 Si quieres, puedo:
 - Añadir más fotos o plantillas de citas
 - Personalizar colores, tipografías y animaciones
 - Preparar el deploy automático con Vercel (hacer el deploy ahora)
