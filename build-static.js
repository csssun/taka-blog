#!/usr/bin/env node

/**
 * 静态构建方案 - 使用预构建的网站文件
 * 当 Zola 二进制文件无法在 Vercel 环境中运行时的备用方案
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Using static build fallback...');

function createStaticSite() {
    console.log('📦 Creating static site structure...');

    // Ensure public directory exists
    if (!fs.existsSync('public')) {
        fs.mkdirSync('public', { recursive: true });
    }

    // Copy static assets
    if (fs.existsSync('static')) {
        console.log('📁 Copying static assets...');
        try {
            const os = require('os');
            if (os.platform() === 'win32') {
                execSync('xcopy static public\\ /E /I /Y', { stdio: 'pipe' });
            } else {
                execSync('cp -r static/* public/', { stdio: 'pipe' });
            }
        } catch (error) {
            console.log('⚠️ Static assets copy failed, continuing...');
        }
    }

    // Create a basic index.html if it doesn't exist
    const indexPath = path.join('public', 'index.html');
    if (!fs.existsSync(indexPath)) {
        console.log('📄 Creating basic index.html...');

        const basicHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Zola Blog</title>
    <link rel="stylesheet" href="/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="/" class="logo">Professional Blog</a>
                <nav class="nav">
                    <a href="/" class="active">Home</a>
                    <a href="/blog/">Blog</a>
                    <a href="/about/">About</a>
                    <a href="/contact/">Contact</a>
                </nav>
                <div class="header-actions">
                    <button class="theme-toggle" aria-label="Toggle dark mode">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <h1>Welcome to <span class="highlight">Professional Blog</span></h1>
                <p class="subtitle">A modern, elegant blog showcasing technical expertise and insights</p>
                <a href="/blog/" class="cta-button">
                    <i class="fas fa-rocket"></i>
                    Explore Blog
                </a>
            </div>
        </section>

        <section class="featured-posts">
            <div class="container">
                <h2>Latest Articles</h2>
                <div class="posts-grid">
                    <article class="post-card animate-on-scroll">
                        <div class="post-meta">
                            <time>January 01, 2024</time>
                            <span class="reading-time">5 min read</span>
                        </div>
                        <h3 class="post-title">
                            <a href="/about/">About Me</a>
                        </h3>
                        <p class="post-excerpt">Learn more about my background, experience, and passion for technology.</p>
                        <div class="post-footer">
                            <a href="/about/">
                                <i class="fas fa-arrow-right"></i>
                                Read More
                            </a>
                        </div>
                    </article>
                    
                    <article class="post-card animate-on-scroll">
                        <div class="post-meta">
                            <time>January 01, 2024</time>
                            <span class="reading-time">3 min read</span>
                        </div>
                        <h3 class="post-title">
                            <a href="/contact/">Contact Me</a>
                        </h3>
                        <p class="post-excerpt">Get in touch for collaborations, questions, or just to say hello.</p>
                        <div class="post-footer">
                            <a href="/contact/">
                                <i class="fas fa-arrow-right"></i>
                                Read More
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About</h3>
                    <p>A modern, elegant blog built with Zola and deployed on Vercel.</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/blog/">Blog</a></li>
                        <li><a href="/about/">About</a></li>
                        <li><a href="/contact/">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>Built with ❤️ using Zola and modern web technologies</p>
                <p>&copy; 2024 Professional Blog. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="/js/main.js"></script>
</body>
</html>`;

        fs.writeFileSync(indexPath, basicHTML);
    }

    // Create basic pages if they don't exist
    const pages = ['about', 'contact', 'blog'];
    pages.forEach(page => {
        const pageDir = path.join('public', page);
        const pageFile = path.join(pageDir, 'index.html');

        if (!fs.existsSync(pageDir)) {
            fs.mkdirSync(pageDir, { recursive: true });
        }

        if (!fs.existsSync(pageFile)) {
            console.log(`📄 Creating ${page} page...`);

            const pageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.charAt(0).toUpperCase() + page.slice(1)} - Professional Blog</title>
    <link rel="stylesheet" href="/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="/" class="logo">Professional Blog</a>
                <nav class="nav">
                    <a href="/">Home</a>
                    <a href="/blog/">Blog</a>
                    <a href="/about/">About</a>
                    <a href="/contact/">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <main>
        <div class="container">
            <h1>${page.charAt(0).toUpperCase() + page.slice(1)}</h1>
            <p>This page is currently being set up. Please check back soon!</p>
            <p><a href="/">← Back to Home</a></p>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-bottom">
                <p>Built with ❤️ using Zola and modern web technologies</p>
            </div>
        </div>
    </footer>

    <script src="/js/main.js"></script>
</body>
</html>`;

            fs.writeFileSync(pageFile, pageHTML);
        }
    });

    console.log('✅ Static site created successfully');
}

// Main execution
try {
    createStaticSite();
    console.log('🎉 Static build completed successfully!');
    console.log('📝 Note: This is a fallback build. For full functionality, please use the GitHub Actions workflow.');
} catch (error) {
    console.error('❌ Static build failed:', error.message);
    process.exit(1);
}
