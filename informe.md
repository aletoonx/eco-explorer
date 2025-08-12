
# Informe Técnico del Proyecto: Eco Explorer

## 1. Introducción

### 1.1. Propósito del Proyecto
Eco Explorer es una aplicación web interactiva diseñada para fomentar el ecoturismo y la conciencia sobre la conservación de la vida silvestre en Costa Rica. La plataforma permite a los usuarios explorar información sobre especies en peligro de extinción, descubrir fundaciones dedicadas a su protección y utilizar una herramienta de inteligencia artificial para planificar rutas de exploración personalizadas. El objetivo es conectar a las personas con la naturaleza y las organizaciones que la protegen, de una manera atractiva y educativa.

### 1.2. Objetivo del Informe
Este documento tiene como finalidad presentar de manera detallada el diseño técnico, la arquitectura de software seleccionada, los recursos de la nube utilizados para su despliegue y la prueba de su funcionamiento sobre la plataforma de Microsoft Azure. Sirve como una memoria técnica que documenta las decisiones tomadas y el estado actual del proyecto.

---

## 2. Justificación del Enfoque Arquitectónico

### 2.1. Arquitectura Elegida: Monolítica
Para el proyecto "Eco Explorer" se ha optado por una **arquitectura monolítica**. En este enfoque, todos los componentes de la aplicación —la interfaz de usuario (frontend), la lógica de negocio del servidor (backend), el acceso a la base de datos y las integraciones con servicios de terceros (IA y autenticación)— están acoplados y se despliegan como una única unidad.

El framework **Next.js** es el núcleo de esta arquitectura, ya que gestiona tanto el renderizado de los componentes de React en el cliente como la ejecución de la lógica del servidor (Server Actions, API Routes) en el mismo proceso.

### 2.2. Criterios de Elección
La decisión de usar una arquitectura monolítica se basó en los siguientes criterios:

*   **Tamaño y Complejidad del Proyecto:** Eco Explorer es una aplicación de alcance definido y manejable. Un monolito reduce la complejidad operativa en comparación con los microservicios, que introducirían la necesidad de gestionar comunicación inter-servicios, despliegues coordinados y mayor infraestructura.
*   **Velocidad de Desarrollo y Mantenibilidad:** Al tener todo el código base en un solo repositorio, el desarrollo, la depuración y las pruebas son significativamente más sencillos y rápidos. Esto es ideal para un equipo de desarrollo pequeño o un único desarrollador, permitiendo una rápida iteración.
*   **Patrón de Carga:** Se espera un patrón de carga moderado y predecible, principalmente de lectura. Un servidor Next.js bien optimizado puede manejar eficientemente este tipo de carga sin necesidad de escalar componentes de forma independiente.
*   **Rendimiento:** La comunicación entre el frontend y el backend es interna dentro del mismo proceso de Next.js, eliminando la latencia de red inherente a las arquitecturas distribuidas.

### 2.3. Comparación con Otras Arquitecturas
*   **Microservicios:** Habría sido una opción excesivamente compleja para el estado actual del proyecto. Si bien ofrece escalabilidad granular, el costo en desarrollo y gestión de infraestructura superaría los beneficios. Sería una evolución natural si la aplicación creciera exponencialmente y diferentes dominios de negocio (ej. perfiles, IA, mapas) necesitaran escalar de forma independiente.
*   **Serverless:** Aunque se podrían haber desplegado ciertas funciones (como las llamadas a la IA) en un modelo serverless (ej. Azure Functions), integrarlas con el resto del monolito de Next.js habría añadido complejidad. Next.js ya abstrae parte de este concepto con sus Server Actions, ofreciendo un beneficio similar con menor sobrecarga.

---

## 3. Diagrama Lógico de Arquitectura

A continuación, se describe el flujo lógico de la aplicación desplegada en Azure:

```
+------------------+      +---------------------------------+      +------------------------+
|                  |----->|         Usuario (Navegador)     |----->|                        |
|   Firebase Auth  |      +---------------------------------+      |   Servidor de Nombres  |
| (Autenticación)  |                                |              |      (Azure DNS)       |
+------------------+                                |              +------------------------+
                                                    | (HTTP/S en puerto 3000)
                                                    v
+-------------------------------------------------------------------------------------------+
|                                 Microsoft Azure                                           |
|                                                                                           |
|  +-------------------------------------------------------------------------------------+  |
|  | Grupo de Seguridad de Red (NSG)                                                     |  |
|  | - Regla de entrada: Permitir TCP en puerto 3000                                     |  |
|  | - Regla de entrada: Permitir RDP (3389) para administración                         |  |
|  +----------------------------------+--------------------------------------------------+  |
|                                     |                                                     |
|                                     v                                                     |
|  +----------------------------------+--------------------------------------------------+  |
|  | Máquina Virtual (Windows Server)                                                    |  |
|  |                                                                                     |  |
|  |   +-----------------------------------------------------------------------------+   |  |
|  |   | Aplicación Next.js (Node.js)                                                |   |  |
|  |   | - Frontend (React, ShadCN)                                                  |   |  |
|  |   | - Backend (Server Actions)                                                  |   |  |
|  |   | - Conexión a servicios externos                                             |   |  |
|  |   +---------------------------------+-------------------------------------------+   |  |
|  |                                     |          |                  |                 |  |
|  +-------------------------------------+----------+------------------+-----------------+  |
|                                         |          |                  |
+-----------------------------------------+----------+------------------+-------------------+
                                          |          |                  |
                   (SQL sobre SSL)        |          | (HTTPS API Call) | (HTTPS API Call)
                                          v          v                  v
                               +----------+-------+  +----------------+ +------------------+
                               | Base de Datos  |  |   API de IA    | |   API de Maps    |
                               | (PostgreSQL)   |  | (Google Gemini)| |  (Mapbox, etc.)  |
                               +----------------+  +----------------+ +------------------+

```

---

## 4. Descripción de los Servicios de Azure Utilizados

| Servicio | Función en el sistema | Justificación |
| :--- | :--- | :--- |
| **Azure Virtual Machines** | Provee el entorno de computación (servidor) donde se ejecuta la aplicación. Se eligió una instancia con Windows Server. | Ofrece control total sobre el sistema operativo y el software instalado (Node.js, Git). Es una opción flexible y robusta para alojar una aplicación web monolítica como Next.js. |
| **Azure Network Security Group (NSG)** | Actúa como un firewall virtual para la VM, controlando el tráfico de red entrante y saliente. | Es un componente de seguridad esencial. Se configuró para permitir el acceso público al puerto 3000 (donde corre la app) y restringir otros accesos, como el escritorio remoto (RDP), solo a IPs seguras si fuera necesario. |
| **Dirección IP Pública de Azure** | Asigna una dirección IP estática o dinámica a la VM para que sea accesible desde Internet. | Es el punto de entrada a la aplicación. Sin una IP pública, la VM solo sería accesible dentro de la red virtual de Azure. |
| **Azure DNS (Opcional)** | Permite asociar un nombre de dominio personalizado (ej. `eco-explorer.com`) a la dirección IP pública de la VM. | Mejora la experiencia de usuario y la imagen de marca al reemplazar la IP numérica por un nombre fácil de recordar. |

---

## 5. Proceso de Despliegue

### 5.1. Herramientas Utilizadas
- **Git y GitHub:** Para el control de versiones y como repositorio central del código.
- **Node.js y npm:** Para gestionar las dependencias y ejecutar la aplicación en el servidor.
- **Cliente de Escritorio Remoto (RDP):** Para conectarse y administrar la VM de Windows.
- **Azure Portal:** Para crear, configurar y gestionar todos los recursos de Azure (VM, NSG, IP).

### 5.2. Pasos Realizados
1.  **Creación de Recursos en Azure:** Se provisionó una Máquina Virtual con Windows Server a través del portal de Azure, junto con su Grupo de Seguridad de Red y una Dirección IP Pública.
2.  **Configuración de la VM:**
    *   Se estableció conexión con la VM mediante Escritorio Remoto.
    *   Se instaló **Git para Windows** y **Node.js (versión LTS)**.
    *   Se configuró una regla en el **Firewall de Windows Defender** para permitir conexiones entrantes en el puerto TCP 3000.
3.  **Configuración del NSG:** En el portal de Azure, se añadió una regla de seguridad de entrada al NSG asociado a la VM para permitir el tráfico TCP en el puerto 3000 desde cualquier origen (`Any`).
4.  **Clonación del Repositorio:** Desde la terminal (CMD o PowerShell) en la VM, se clonó el repositorio del proyecto desde GitHub.
5.  **Instalación y Ejecución:**
    *   Se navegar a la carpeta del proyecto.
    *   Se ejecutó `npm install` para instalar todas las dependencias.
    *   Se ejecutó `npm run dev` para iniciar el servidor de desarrollo de Next.js. Se utilizó un script modificado para que el servidor escuche en `0.0.0.0`, haciéndolo accesible desde la IP pública.

### 5.3. Comandos y Evidencia

**Comando para iniciar el servidor en la VM:**
```bash
C:\Users\azureuser\Documents\eco-explorer> npm run dev
```

**Salida del servidor confirmando que está escuchando públicamente:**
```
> eco-explorer-app@0.1.0 dev
> next dev -H 0.0.0.0

   ▲ Next.js 15.3.3
   - Local:        http://localhost:3000
   - Network:      http://0.0.0.0:3000
   - Environments: .env
 ✓ Ready in 5.9s
```

**Captura de la configuración del Network Security Group (NSG) en Azure:**
*(Aquí iría una captura de pantalla del portal de Azure mostrando la regla del puerto 3000)*

---

## 6. URL de Acceso y Prueba de Funcionamiento

- **URL de Acceso:** `http://<IP_PUBLICA_DE_LA_VM>:3000`
- **Captura del sitio funcionando:**
*(Aquí iría una captura de pantalla de la página principal de Eco Explorer cargada en un navegador local usando la IP pública)*

- **Datos de prueba ingresados:**
Se accedió a la página de un animal específico, como el "Perezoso de Tres Dedos", y se utilizó el planificador de rutas con IA.

- **Respuesta del sistema:**
La aplicación cargó correctamente, mostrando los detalles del animal. El componente de IA generó una ruta de exploración coherente, demostrando que la comunicación con los servicios externos (Base de Datos y API de Gemini) funciona correctamente desde el entorno de Azure.

---

## 7. Consideraciones de Seguridad y Mantenimiento

- **Protección de Datos:** Las credenciales de la base de datos, las claves de API de Google y los secretos de Firebase se gestionan a través de variables de entorno en el servidor (`.env`), las cuales no se suben al repositorio de Git (el archivo `.env` está en `.gitignore`).
- **Configuraciones Seguras:** El acceso administrativo a la VM (RDP) debe estar restringido a direcciones IP de confianza a través de las reglas del NSG.
- **Mantenimiento:** El mantenimiento de la VM implica aplicar regularmente las actualizaciones de seguridad de Windows Server y mantener actualizada la versión de Node.js.
- **HTTPS:** Para un entorno de producción real, sería indispensable configurar un servidor proxy inverso (como Nginx o Caddy) en la VM para gestionar certificados SSL/TLS y servir la aplicación a través de HTTPS en el puerto 443, en lugar de HTTP en el 3000.

---

## 8. Conclusiones

El despliegue de la aplicación monolítica de Next.js en una máquina virtual de Azure ha demostrado ser un enfoque viable y relativamente sencillo.

- **Ventajas:** El control total sobre el entorno que ofrece una VM fue una gran ventaja para depurar y asegurar que todas las herramientas (Git, Node.js) estuvieran configuradas correctamente. El proceso es directo y fácil de entender.
- **Dificultades:** La principal dificultad es la gestión manual de la infraestructura. A diferencia de las plataformas PaaS (Platform-as-a-Service) como Vercel o Firebase Hosting, el desarrollador es responsable de la configuración del sistema operativo, el firewall, la seguridad y las actualizaciones.
- **Mejoras Futuras:**
    1.  **Automatización del Despliegue (CI/CD):** Implementar un flujo de trabajo con GitHub Actions que, tras un `push` a la rama principal, se conecte a la VM vía SSH y automáticamente haga `git pull`, instale dependencias y reinicie el servidor.
    2.  **Paso a Producción:** Utilizar un gestor de procesos como **PM2** para ejecutar la aplicación de forma persistente (`npm run build` y `npm run start`) en lugar de usar el servidor de desarrollo (`npm run dev`).
    3.  **Contenerización:** Empaquetar la aplicación en un contenedor de **Docker** para simplificar el despliegue y asegurar la consistencia entre entornos.

---

## 9. Anexos

### 9.1. Comandos CLI Relevantes

**Instalación de dependencias en la VM:**
```bash
npm install
```

**Modificación en `package.json` para aceptar conexiones externas:**
```json
"scripts": {
  "dev": "next dev -H 0.0.0.0",
  ...
}
```

### 9.2. Fragmentos de Código Clave

**Función de conversión de coordenadas para el mapa interactivo (`src/components/map/interactive-map.tsx`):**
Este fragmento muestra cómo las coordenadas geográficas (latitud, longitud) de las fundaciones se convierten en coordenadas porcentuales (`top`, `left`) para posicionarlas sobre la imagen del mapa.

```tsx
// Límites geográficos de Costa Rica (ajustados para precisión)
const bounds = {
    minLng: -86.0,  // Oeste
    maxLng: -82.4,  // Este
    minLat: 8.0,    // Sur
    maxLat: 11.2,   // Norte
};

// Convierte coordenadas de latitud/longitud a coordenadas porcentuales
function convertCoords(lat: number, lng: number) {
  const left = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  const top = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
  return { left, top };
}
```

**Llamada al flujo de IA desde el componente React (`src/components/ai/exploration-path-planner.tsx`):**
Este código se ejecuta en el cliente, invoca la función del servidor `suggestExplorationPath` y maneja los estados de carga, error y éxito.

```tsx
const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const input: SuggestExplorationPathInput = {
        interest,
        ...(initialAnimal && { specificAnimal: initialAnimal }),
      };
      // Invocación de la Server Action que ejecuta el flujo de Genkit
      const response = await suggestExplorationPath(input);
      setResult(response);
    } catch (e) {
      console.error(e);
      setError('La IA no pudo generar una ruta en este momento.');
    } finally {
      setLoading(false);
    }
};
```
