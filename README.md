# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## ¿Cómo funciona el registro de usuario en este proyecto? (Explicación sencilla para el equipo)

### 1. ¿Qué archivos están involucrados?
- **src/api/api.jsx**: Aquí está la función que se encarga de hacer las peticiones a nuestro backend (servidor). Es como el "cartero" que lleva los datos.
- **src/features/auth/services/authService.jsx**: Aquí creamos una función especial para registrar usuarios, usando la función del cartero.
- **src/features/auth/components/RegisterForm/RegisterForm.jsx**: Aquí está el formulario donde el usuario escribe sus datos. Aquí armamos el paquete de datos y lo enviamos usando la función de registro.

### 2. ¿Cómo se arma el paquete de datos (payload)?
- El formulario guarda todos los datos que el usuario escribe en un objeto llamado `formData`.
- Antes de enviar los datos, quitamos el campo `confirmPassword` (que solo sirve para validar en el frontend) y armamos un nuevo objeto llamado `payload`.
- Ejemplo:
  ```js
  const { confirmPassword, ...payload } = formData;
  // payload ahora tiene solo los datos que el backend necesita
  ```

### 3. ¿Cómo se envían los datos al backend?
- Usamos una función llamada `registerUser` (está en el archivo de servicios).
- Esta función usa la función del cartero (`apiFetch`) para enviar los datos al backend.
- Todo esto se hace de forma "asíncrona" (con `async/await`), lo que significa que el formulario espera la respuesta del servidor antes de continuar.
- Ejemplo en el formulario:
  ```js
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }
    const { confirmPassword, ...payload } = formData;
    try {
      await registerUser(payload);
      navigate('/login');
    } catch (error) {
      alert(error.message || "No se pudo registrar el usuario");
    }
  };
  ```

### 4. ¿Qué hace cada archivo?
- **api.jsx**: Tiene la función `apiFetch`, que se encarga de enviar cualquier petición al backend. Siempre se usa para no repetir código.
- **authService.jsx**: Aquí creamos la función `registerUser`, que solo se encarga de decirle a `apiFetch` a qué ruta debe ir y con qué datos.
- **RegisterForm.jsx**: Aquí el usuario llena el formulario, se arma el paquete de datos, se valida que las contraseñas coincidan y se llama a `registerUser` para enviar los datos.

### 5. ¿Por qué usamos async/await?
- Porque enviar datos al servidor toma tiempo y no queremos que la página se congele.
- `async/await` nos permite esperar la respuesta del servidor de forma sencilla y manejar errores si algo sale mal.

### 6. Resumen del flujo
1. El usuario llena el formulario y da clic en "Crear Cuenta".
2. El formulario arma el paquete de datos (sin confirmPassword).
3. Llama a la función de registro (`registerUser`).
4. Esa función usa el cartero (`apiFetch`) para enviar los datos al backend.
5. Si todo sale bien, el usuario es redirigido al login. Si hay error, se muestra un mensaje.

---
**¡Así de sencillo funciona el registro de usuario en nuestro proyecto!**
