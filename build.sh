#!/bin/bash

set -e

echo "🚀 Starting Zola build process..."

# Set Zola version
ZOLA_VERSION="0.20.0"

# Try different Zola binaries for compatibility
echo "📦 Downloading Zola v${ZOLA_VERSION}..."

# First try musl version (most compatible)
if curl -L "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz" | tar -xz 2>/dev/null; then
    echo "✅ Downloaded musl version"
elif curl -L "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz" | tar -xz 2>/dev/null; then
    echo "✅ Downloaded gnu version"
else
    echo "❌ Failed to download Zola"
    exit 1
fi

# Make executable
chmod +x zola

# Verify Zola works
echo "🔍 Verifying Zola installation..."
if ./zola --version; then
    echo "✅ Zola is working"
else
    echo "❌ Zola verification failed"
    exit 1
fi

# Build the site
echo "🏗️ Building the site..."
./zola build

echo "🎉 Build completed successfully!"
