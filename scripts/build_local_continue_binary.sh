#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "[1/3] Installing libs/core dependencies..."
cd "$ROOT_DIR/libs/core"
npm install

echo "[2/3] Building libs/core..."
npm run build

echo "[3/3] Building local continue-binary..."
cd "$ROOT_DIR/binary"
npm install
npm run build

echo
echo "Built binary:"
echo "  $ROOT_DIR/binary/bin/darwin-arm64/continue-binary"
