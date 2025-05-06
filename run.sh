#!/bin/bash

set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

# Iniciar backend (Docker)
echo "Iniciando backend con Docker..."
docker compose up -d

# Iniciar frontend
echo "Iniciando frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd "$ROOT_DIR"

# Manejar Ctrl+C para terminar el frontend
trap 'kill $FRONTEND_PID 2>/dev/null' SIGINT

# Esperar a que el frontend termine
wait $FRONTEND_PID
