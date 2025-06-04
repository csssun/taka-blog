#!/usr/bin/env node

/**
 * 部署前检查脚本
 * 验证所有必要文件和配置是否正确
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 检查 Vercel 部署配置...\n');

const checks = [
    {
        name: 'vercel.json 配置文件',
        check: () => fs.existsSync('vercel.json'),
        fix: '确保 vercel.json 文件存在'
    },
    {
        name: 'package.json 配置文件',
        check: () => fs.existsSync('package.json'),
        fix: '确保 package.json 文件存在'
    },
    {
        name: 'Node.js 构建脚本',
        check: () => fs.existsSync('build-node.js'),
        fix: '确保 build-node.js 文件存在'
    },
    {
        name: 'Bash 构建脚本',
        check: () => fs.existsSync('build.sh'),
        fix: '确保 build.sh 文件存在'
    },
    {
        name: 'Zola 配置文件',
        check: () => fs.existsSync('config.toml'),
        fix: '确保 config.toml 文件存在'
    },
    {
        name: 'content 目录',
        check: () => fs.existsSync('content') && fs.statSync('content').isDirectory(),
        fix: '确保 content 目录存在'
    },
    {
        name: 'templates 目录',
        check: () => fs.existsSync('templates') && fs.statSync('templates').isDirectory(),
        fix: '确保 templates 目录存在'
    },
    {
        name: 'sass 目录',
        check: () => fs.existsSync('sass') && fs.statSync('sass').isDirectory(),
        fix: '确保 sass 目录存在'
    },
    {
        name: 'package.json 构建脚本',
        check: () => {
            try {
                const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
                return pkg.scripts && (pkg.scripts.build || pkg.scripts['vercel-build']);
            } catch {
                return false;
            }
        },
        fix: '确保 package.json 包含 build 或 vercel-build 脚本'
    },
    {
        name: 'vercel.json 格式正确',
        check: () => {
            try {
                const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
                return vercelConfig.buildCommand && vercelConfig.outputDirectory;
            } catch {
                return false;
            }
        },
        fix: '确保 vercel.json 包含 buildCommand 和 outputDirectory'
    }
];

let allPassed = true;

checks.forEach((check, index) => {
    const passed = check.check();
    const status = passed ? '✅' : '❌';
    const message = passed ? '通过' : '失败';

    console.log(`${status} ${check.name}: ${message}`);

    if (!passed) {
        console.log(`   💡 解决方案: ${check.fix}`);
        allPassed = false;
    }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
    console.log('🎉 所有检查通过！您的项目已准备好部署到 Vercel。');
    console.log('\n🚀 部署步骤：');
    console.log('1. 推送代码到 GitHub');
    console.log('2. 点击一键部署按钮');
    console.log('3. 等待构建完成');
} else {
    console.log('⚠️ 发现问题，请修复后重新检查。');
    console.log('\n🔧 修复完成后，重新运行: node check-deployment.js');
}

console.log('\n📖 更多帮助: 查看 VERCEL_DEPLOYMENT.md');
