#!/bin/bash

# Download and install Zola
ZOLA_VERSION="0.20.0"
curl -L "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz" | tar -xz
chmod +x zola

# Build the site
./zola build
