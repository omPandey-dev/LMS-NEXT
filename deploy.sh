#!/bin/bash

set -e

# ============================================================
# LMS-NEXT REACT FRONTEND DEPLOYMENT
# ============================================================

APP_DIR="/home/sigma-01/LMS-NEXT"
BRANCH="development"

echo
echo "============================================================"
echo "        LMS-NEXT FRONTEND DEPLOYMENT"
echo "============================================================"
echo "Directory : $APP_DIR"
echo "Branch    : $BRANCH"
echo "============================================================"
echo


# ------------------------------------------------------------
# Go to application
# ------------------------------------------------------------

cd "$APP_DIR"


# ------------------------------------------------------------
# Check Git repository
# ------------------------------------------------------------

if [ ! -d ".git" ]; then
    echo "[ERROR] This directory is not a Git repository."
    exit 1
fi


# ------------------------------------------------------------
# Pull latest development code
# ------------------------------------------------------------

echo "[1/5] Updating source code..."

git fetch origin

git checkout "$BRANCH"

git reset --hard "origin/$BRANCH"

echo "[OK] Latest development code pulled."


# ------------------------------------------------------------
# Install dependencies
# ------------------------------------------------------------

echo
echo "[2/5] Installing dependencies..."

npm install

echo "[OK] Dependencies installed."


# ------------------------------------------------------------
# Build React application
# ------------------------------------------------------------

echo
echo "[3/5] Building React application..."

npm run build

echo "[OK] React build completed."


# ------------------------------------------------------------
# Check build
# ------------------------------------------------------------

echo
echo "[4/5] Checking build output..."

if [ ! -d "$APP_DIR/dist" ]; then
    echo "[ERROR] dist directory was not created."
    exit 1
fi

if [ ! -f "$APP_DIR/dist/index.html" ]; then
    echo "[ERROR] dist/index.html not found."
    exit 1
fi

echo "[OK] Production build verified."


# ------------------------------------------------------------
# Deployment complete
# ------------------------------------------------------------

echo
echo "[5/5] Deployment completed successfully."

echo
echo "============================================================"
echo "              DEPLOYMENT SUCCESSFUL"
echo "============================================================"
echo
echo "Build directory:"
echo "$APP_DIR/dist"
echos