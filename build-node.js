#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🚀 Starting Zola build process with Node.js...');
console.log(`📊 Platform: ${os.platform()}, Arch: ${os.arch()}`);

const ZOLA_VERSION = '0.20.0';

function downloadAndExtract() {
    console.log(`📦 Downloading Zola v${ZOLA_VERSION}...`);

    // Determine the best binary for the platform
    const platform = os.platform();
    const arch = os.arch();

    let downloadUrls = [];

    if (platform === 'linux') {
        // Try musl first (most compatible), then gnu
        downloadUrls = [
            `https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz`,
            `https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz`
        ];
    } else if (platform === 'darwin') {
        downloadUrls = [
            `https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-apple-darwin.tar.gz`
        ];
    } else {
        console.error('❌ Unsupported platform:', platform);
        process.exit(1);
    }

    for (let i = 0; i < downloadUrls.length; i++) {
        const url = downloadUrls[i];
        const variant = url.includes('musl') ? 'musl' : url.includes('gnu') ? 'gnu' : 'darwin';

        try {
            console.log(`🔄 Trying ${variant} version...`);
            execSync(`curl -L "${url}" | tar -xz`, { stdio: 'pipe' });
            console.log(`✅ Downloaded ${variant} version successfully`);
            return;
        } catch (error) {
            console.log(`⚠️ ${variant} version failed, trying next...`);
            if (i === downloadUrls.length - 1) {
                console.error('❌ All download attempts failed');
                console.error('Error details:', error.message);
                process.exit(1);
            }
        }
    }
}

function makeExecutable() {
    console.log('🔧 Making Zola executable...');
    execSync('chmod +x zola');
}

function verifyInstallation() {
    console.log('🔍 Verifying Zola installation...');
    try {
        execSync('./zola --version', { stdio: 'inherit' });
        console.log('✅ Zola is working');
    } catch (error) {
        console.error('❌ Zola verification failed');
        process.exit(1);
    }
}

function buildSite() {
    console.log('🏗️ Building the site...');
    try {
        execSync('./zola build', { stdio: 'inherit' });
        console.log('🎉 Build completed successfully!');
    } catch (error) {
        console.error('❌ Build failed');
        process.exit(1);
    }
}

// Main execution
try {
    downloadAndExtract();
    makeExecutable();
    verifyInstallation();
    buildSite();
} catch (error) {
    console.error('❌ Build process failed:', error.message);
    process.exit(1);
}
