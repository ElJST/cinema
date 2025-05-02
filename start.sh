#!/bin/bash

set -e

# Iniciar frontend
echo "Iniciando frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Iniciar backend
echo "Iniciando backend..."
cd backend
node server.js &
BACKEND_PID=$!
cd ..

wait $FRONTEND_PID $BACKEND_PID
