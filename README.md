# Netflix-backend


# 🎬 Netflix Clone Backend - Microservicios

Este es un proyecto de backend distribuido que replica las funcionalidades núcleo de Netflix. 
El sistema está diseñado bajo una arquitectura de **microservicios**, permitiendo escalabilidad y trabajo en equipo independiente.

## 👥 Equipo de Desarrollo

* **Persona 1:** Servicio de Autenticación (Auth & Users)
* **Persona 2:** Servicio de Catálogo (Movies & Series)
* **Persona 3:** Servicio de Streaming (Video Engine)
* **Persona 4:** Servicio de Actividad (History & Favorites)

---

## 🛠️ Stack Tecnológico

* **Lenguaje:** Node.js (Express)
* **Bases de Datos:** PostgreSQL (Auth), MongoDB (Catalog), Redis (Activity)
* **Contenedores:** Docker & Docker-Compose
* **Seguridad:** JSON Web Tokens (JWT)

---

## 🚀 Guía de Inicio Rápido

### 1. Clonar el repositorio y preparar carpetas

```bash
git clone https://github.com/tu-usuario/netflix-backend.git
cd netflix-backend

```

### 2. Levantar la Infraestructura (Bases de Datos)

Asegúrate de tener Docker abierto y ejecuta:

```bash
docker-compose up -d

```

*Esto activará Postgres (5432), MongoDB (27017) y Redis (6379).*

### 3. Configurar cada Microservicio

Cada integrante debe entrar a su carpeta, instalar dependencias y configurar su `.env`:

```bash
cd nombre-de-tu-servicio
npm install

```

---

## 🛰️ Mapa de Endpoints (Contrato de API)

| Servicio | Puerto | Endpoint | Método | Descripción |
| --- | --- | --- | --- | --- |
| **Auth** | 3001 | `/api/auth/login` | `POST` | Genera el JWT para el usuario. |
| **Catalog** | 3002 | `/api/movies` | `GET` | Lista películas (Requiere Token). |
| **Streaming** | 3003 | `/api/video/:name` | `GET` | Stream de video por partes (206). |
| **Activity** | 3004 | `/api/history` | `POST` | Guarda el progreso del video. |

---

## 📂 Flujo de Trabajo en Git (GitFlow)

Para evitar conflictos, usaremos el siguiente flujo:

1. **Main:** Solo código en producción.
2. **Develop:** Rama de integración.
3. **Features:** Cada uno trabaja en su rama: `feature/auth`, `feature/catalog`, etc.
4. **Pull Requests:** Antes de unir a `develop`, otro compañero debe revisar el código.

---

## 📋 Reglas del Proyecto

* **JWT Obligatorio:** Todas las rutas (excepto Login/Registro) deben usar el `authMiddleware.js`.
* **Nomenclatura de Videos:** El `videoUrl` del Catálogo debe coincidir con el nombre del archivo `.mp4` en el servicio de Streaming.
* **Variables de Entorno:** Nunca subir archivos `.env` al repositorio (están en `.gitignore`).
