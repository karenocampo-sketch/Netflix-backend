# 🎬 Netflix Clone Backend - Microservicios (.NET Edition)

Este es un proyecto de backend distribuido que replica las funcionalidades núcleo de Netflix. El sistema está diseñado bajo una arquitectura de **microservicios**, utilizando el ecosistema de **.NET** para garantizar alta escalabilidad y un desarrollo modular.

## 👥 Equipo de Desarrollo

- **Persona 1:** Servicio de Autenticación (Auth & Users)

- **Persona 2:** Servicio de Catálogo (Movies & Series)

- **Persona 3:** Servicio de Streaming (Video Engine)

- **Persona 4:** Servicio de Actividad (History & Favorites)

---

## 🛠️ Stack Tecnológico

- **Lenguaje:** .NET 7 / 8 (C#)
- **Bases de Datos:** \* **PostgreSQL:** Autenticación y Usuarios.
- **MongoDB:** Catálogo de películas y series.
- **Redis:** Caché de actividad y progreso de video.

- **Contenedores:** Docker & Docker-Compose (Infraestructura de bases de datos).
- **Documentación:** Swagger / OpenAPI.

---

## 🚀 Guía de Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/netflix-backend.git
cd netflix-backend

```

### 2. Levantar la Infraestructura (Docker)

Asegúrate de tener **Docker Desktop** iniciado y ejecuta:

```bash
docker compose up -d

```

_Esto activará Postgres (5432), MongoDB (27017) y Redis (6379)._

### 3. Ejecutar el Proyecto

Para abrir todos los microservicios al tiempo, abre el archivo de solución en la raíz:

```bash
# Abrir con Visual Studio o VS Code
Netflix-backend.sln

```

---

## 🛰️ Mapa de Endpoints y Puertos

| Servicio              | Puerto | Base de Datos   | Descripción                  |
| --------------------- | ------ | --------------- | ---------------------------- |
| **Auth.Service**      | 5001   | PostgreSQL      | Gestión de usuarios y JWT.   |
| **Catalog.Service**   | 5002   | MongoDB         | Catálogo de contenido.       |
| **Streaming.Service** | 5003   | Archivos (.mp4) | Motor de streaming de video. |
| **Activity.Service**  | 5203   | Redis           | Historial y progreso.        |

---

## 📂 Flujo de Trabajo en Git

1. **Main:** Código estable y unificado.
2. **Features:** Cada integrante trabaja en su rama: `feature/auth`, `feature/catalog`, `feature/streaming`, `feature/activity`.
3. **Integración:** Antes de unir cambios a `main`, se debe asegurar que el servicio compila y no rompe la solución global `.sln`.

---

## 📋 Reglas del Proyecto

- **Uso de .sln:** Todos los nuevos proyectos deben agregarse a la solución global mediante `dotnet sln add`.
- **Gitignore:** No subir carpetas `bin/`, `obj/` ni archivos `.env`.
- **Docker:** No detener los contenedores de base de datos mientras se prueban los servicios.

---

### 👑 Nota de la Líder

> "Este proyecto ha sido unificado bajo una solución global de .NET para facilitar la comunicación entre servicios. Por favor, asegúrense de realizar un `git pull origin main` antes de iniciar sus tareas diarias."

---

##-------------

## 🛠️ Solución de Problemas (Troubleshooting)

### 1. Error: "Port is already allocated" (Ej: Puerto 5203 o 6379 ocupado)

Este error ocurre cuando otra aplicación ya está usando el puerto que Docker o .NET necesitan.

- **Solución (Mac/Linux):**

```bash
# Buscar el proceso (ejemplo puerto 6379)
sudo lsof -i :6379
# Matar el proceso usando el PID que aparezca
kill -9 <PID>

```

- **Solución (Windows PowerShell):**

```powershell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 6379).OwningProcess -Force

```

### 2. Error: "Cannot connect to the Docker daemon"

Significa que la aplicación Docker Desktop no está iniciada o el motor se quedó bloqueado.

- **Solución:**

1. Abre la aplicación **Docker Desktop**.
2. Espera a que el icono de la ballena esté quieto (verde).
3. Si persiste, ve a _Settings > Troubleshoot > Restart Docker Desktop_.

### 3. Error: "Project not found in solution"

Si al intentar ejecutar no encuentra un servicio, es porque no está vinculado al archivo `.sln`.

- **Solución:** Ejecuta en la raíz:

```bash

dotnet sln add Nombre.Service/Nombre.Service.csproj

```

### 4. Limpieza de Caché de .NET

Si el código no reconoce cambios nuevos o da errores extraños de compilación:

Solución: Ejecuta estos comandos en la raíz del proyecto para limpiar todo rastro de compilaciones previas:

- **Solución:**

```bash

dotnet clean
dotnet restore

```

---
