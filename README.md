# 🎬 Cinema

Proyecto fullstack de gestión de cartelera de películas, stack:

- ⚙️ Backend: Node.js, Express, MySQL
- 🎨 Frontend: React + Vite
- 🐬 Base de datos: MySQL + phpMyAdmin (opcional)
- 🐳 Docker para facilitar el despliegue local

---

## 📁 Estructura del proyecto

Cinema/
├── backend/
│ ├── server.js
│ ├── dbConnection/
│ │ └── db.js
│ ├── .env
│ └── .env.example
├── frontend/
│ ├── src/
│ ├── vite.config.js
│ ├── .env
│ └── .env.example
├── docker-compose.yml
└── run.sh

---

## 🚀 Pasos para levantar el proyecto localmente

### 1. Clona el repositorio

```bash
git clone https://github.com/ElJST/cinema.git
cd cinema
```
## Copia el archivo .env.example y edítalo si es necesario en el backend:

```bash
cd backend
cp .env.example .env
```

## Copia el archivo .env.example y edítalo si es necesario en el frontend:

```bash
cd ../frontend
cp .env.example .env
```

## Esto levantará la base de datos, el backend y el frontend desde cinema:

```bash
./run.sh
```

Nota: asegúrate de tener Docker y Node.js instalados.

# 🧪 Acceso
    Frontend: http://localhost:5173

    Backend: http://localhost:3001

    phpMyAdmin (opcional): http://localhost:8080
        Usuario: root
        Contraseña: la definida en .env

# 🧰 Comandos útiles

Apagar los contenedores y borrar volúmenes:
    ```bash
    docker compose down -v
    ```

Ver logs en vivo
    ```bash
    docker compose logs -f
    ```

Acceder al contenedor MySQL
    ```bash
    docker exec -it cinema_mysql mysql -u root -p
    ```

