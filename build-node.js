#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🚀 Starting Zola build process with Node.js...');
console.log(`📊 Platform: ${os.platform()}, Arch: ${os.arch()}`);

const ZOLA_VERSION = '0.20.0';

function tryStaticBuild() {
    console.log('🔄 Trying static build approach...');

    try {
        // Try using a pre-built static binary from a reliable source
        const staticUrl = `https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz`;

        console.log('📦 Downloading static Zola binary...');
        execSync(`curl -L "${staticUrl}" -o zola.tar.gz`, { stdio: 'pipe' });
        execSync('tar -xzf zola.tar.gz', { stdio: 'pipe' });
        execSync('rm zola.tar.gz', { stdio: 'pipe' });

        console.log('✅ Static binary downloaded');
        return true;
    } catch (error) {
        console.log('⚠️ Static build failed, trying alternative...');
        return false;
    }
}

function tryDockerBuild() {
    console.log('🐳 Trying Docker-based build...');

    try {
        // Check if we're in a container environment
        if (fs.existsSync('/.dockerenv') || process.env.VERCEL) {
            console.log('📦 Detected container environment, using alternative approach...');

            // Use a different approach for container environments
            const alpineUrl = `https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz`;

            execSync(`wget -q "${alpineUrl}" -O zola.tar.gz || curl -L "${alpineUrl}" -o zola.tar.gz`, { stdio: 'pipe' });
            execSync('tar -xzf zola.tar.gz', { stdio: 'pipe' });
            execSync('rm -f zola.tar.gz', { stdio: 'pipe' });

            console.log('✅ Container-optimized binary downloaded');
            return true;
        }
        return false;
    } catch (error) {
        console.log('⚠️ Docker build failed');
        return false;
    }
}

function tryPrecompiledBuild() {
    console.log('🔧 Trying precompiled build approach...');

    try {
        // Use a known working binary from a CDN or alternative source
        const cdnUrl = `https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz`;

        // Try multiple download methods
        const downloadCommands = [
            `curl -fsSL "${cdnUrl}" | tar -xz`,
            `wget -qO- "${cdnUrl}" | tar -xz`,
            `curl -L "${cdnUrl}" -o zola.tar.gz && tar -xzf zola.tar.gz && rm zola.tar.gz`
        ];

        for (const cmd of downloadCommands) {
            try {
                console.log(`🔄 Trying: ${cmd.split('|')[0].trim()}...`);
                execSync(cmd, { stdio: 'pipe' });
                console.log('✅ Download successful');
                return true;
            } catch (error) {
                console.log('⚠️ Method failed, trying next...');
            }
        }

        return false;
    } catch (error) {
        console.log('⚠️ Precompiled build failed');
        return false;
    }
}

function downloadAndExtract() {
    console.log(`📦 Downloading Zola v${ZOLA_VERSION}...`);

    // Try multiple approaches in order of reliability
    const approaches = [
        tryStaticBuild,
        tryDockerBuild,
        tryPrecompiledBuild
    ];

    for (const approach of approaches) {
        if (approach()) {
            return;
        }
    }

    // If all else fails, try the original method
    console.log('🔄 Falling back to original method...');
    const platform = os.platform();

    if (platform === 'linux') {
        const urls = [
            `https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz`,
            `https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz`
        ];

        for (const url of urls) {
            try {
                execSync(`curl -L "${url}" | tar -xz`, { stdio: 'pipe' });
                console.log('✅ Fallback method successful');
                return;
            } catch (error) {
                continue;
            }
        }
    }

    console.error('❌ All download methods failed');
    console.error('🔧 Please check the deployment logs and try manual deployment');
    process.exit(1);
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
    console.error('❌ Zola build process failed:', error.message);
    console.log('🔄 Attempting static fallback build...');

    try {
        // Try static fallback
        require('./build-static.js');
        console.log('✅ Static fallback build completed');
        process.exit(0);
    } catch (fallbackError) {
        console.error('❌ Static fallback also failed:', fallbackError.message);
        console.error('🆘 Please use GitHub Actions workflow for reliable deployment');
        process.exit(1);
    }
}
