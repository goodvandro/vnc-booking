#!/bin/bash
# Script para iniciar os dois projectos em modo desenvolvimento
# As alterações são reflectidas automaticamente (hot-reload)

echo "🚀 Iniciando VNC Booking em modo desenvolvimento..."
echo ""

# Carregar nvm se disponível
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 20 2>/dev/null

# Carregar variáveis de ambiente do .env da raiz
if [ -f .env ]; then
  echo "📂 Carregando variáveis de ambiente de .env..."
  set -a
  source .env
  set +a
else
  echo "⚠️  Ficheiro .env não encontrado na raiz. Crie um a partir de .env.example"
  exit 1
fi

# Iniciar frontend público (porta 3000)
echo "📦 Iniciando vnc-booking-fe na porta 3000..."
(cd vnc-booking-fe && pnpm dev) &
PID1=$!

# Iniciar admin (porta 3001)
echo "📦 Iniciando vnc-booking-fe-admin na porta 3001..."
(cd vnc-booking-fe-admin && pnpm dev) &
PID2=$!

echo ""
echo "✅ Ambas as aplicações estão a correr:"
echo "   🌐 Frontend:  http://localhost:3000"
echo "   🔐 Admin:     http://localhost:3001"
echo ""
echo "Pressione Ctrl+C para parar ambos."

# Aguardar e terminar ambos ao sair
trap "kill $PID1 $PID2 2>/dev/null; exit" INT TERM
wait
