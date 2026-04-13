#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 主函数，处理命令行参数
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const options = parseOptions(args.slice(1));

  switch (command) {
    case 'init':
      initProject(options.projectPath);
      break;
    case 'replace-dimensions':
      replaceDimensions(options.projectPath, options.configFile);
      break;
    case 'replace-questions':
      replaceQuestions(options.projectPath, options.configFile);
      break;
    case 'replace-personalities':
      replacePersonalities(options.projectPath, options.configFile, options.imagePath);
      break;
    case 'replace-matching-rules':
      replaceMatchingRules(options.projectPath, options.configFile);
      break;
    case 'validate':
      validateProject(options.projectPath);
      break;
    case 'deploy':
      deployProject(options.projectPath, options.port || 8000);
      break;
    default:
      console.log('未知命令，请使用以下命令：');
      console.log('  init: 初始化 SBTI 项目');
      console.log('  replace-dimensions: 替换维度系统');
      console.log('  replace-questions: 替换题目系统');
      console.log('  replace-personalities: 替换人格系统');
      console.log('  replace-matching-rules: 替换匹配规则');
      console.log('  validate: 验证与测试');
      console.log('  deploy: 部署配置');
  }
}

// 解析命令行选项
function parseOptions(args) {
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    options[key] = value;
  }
  return options;
}

// 初始化项目
function initProject(projectPath) {
  console.log('开始初始化 SBTI 项目...');
  
  // 确保项目目录存在
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }
  
  // 克隆 GitHub 仓库
  try {
    console.log('从 GitHub 克隆 SBTI 源码...');
    execSync(`git clone https://github.com/4682B4LEE/SBTI ${projectPath}`, { stdio: 'inherit' });
    console.log('项目初始化成功！');
  } catch (error) {
    console.error('克隆失败:', error.message);
    process.exit(1);
  }
}

// 替换维度系统
function replaceDimensions(projectPath, configFile) {
  console.log('开始替换维度系统...');
  
  // 读取配置文件
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  
  // 读取 index.html 文件
  const indexPath = path.join(projectPath, 'index.html');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // 替换 dimensionMeta
  if (config.dimensionMeta) {
    const dimensionMetaStr = JSON.stringify(config.dimensionMeta, null, 2);
    content = content.replace(/const dimensionMeta = \{[\s\S]*?\};/, `const dimensionMeta = ${dimensionMetaStr};`);
  }
  
  // 替换 DIM_EXPLANATIONS
  if (config.DIM_EXPLANATIONS) {
    const dimExplanationsStr = JSON.stringify(config.DIM_EXPLANATIONS, null, 2);
    content = content.replace(/const DIM_EXPLANATIONS = \{[\s\S]*?\};/, `const DIM_EXPLANATIONS = ${dimExplanationsStr};`);
  }
  
  // 替换 dimensionOrder
  if (config.dimensionOrder) {
    const dimensionOrderStr = JSON.stringify(config.dimensionOrder);
    content = content.replace(/const dimensionOrder = \[[\s\S]*?\];/, `const dimensionOrder = ${dimensionOrderStr};`);
  }
  
  // 写回 index.html 文件
  fs.writeFileSync(indexPath, content);
  console.log('维度系统替换成功！');
}

// 替换题目系统
function replaceQuestions(projectPath, configFile) {
  console.log('开始替换题目系统...');
  
  // 读取配置文件
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  
  // 读取 index.html 文件
  const indexPath = path.join(projectPath, 'index.html');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // 替换 questions
  if (config.questions) {
    const questionsStr = JSON.stringify(config.questions, null, 2);
    content = content.replace(/const questions = \[[\s\S]*?\];/, `const questions = ${questionsStr};`);
  }
  
  // 替换 specialQuestions
  if (config.specialQuestions) {
    const specialQuestionsStr = JSON.stringify(config.specialQuestions, null, 2);
    content = content.replace(/const specialQuestions = \[[\s\S]*?\];/, `const specialQuestions = ${specialQuestionsStr};`);
  }
  
  // 写回 index.html 文件
  fs.writeFileSync(indexPath, content);
  console.log('题目系统替换成功！');
}

// 替换人格系统
function replacePersonalities(projectPath, configFile, imagePath) {
  console.log('开始替换人格系统...');
  
  // 读取配置文件
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  
  // 读取 index.html 文件
  const indexPath = path.join(projectPath, 'index.html');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // 替换 TYPE_LIBRARY
  if (config.TYPE_LIBRARY) {
    const typeLibraryStr = JSON.stringify(config.TYPE_LIBRARY, null, 2);
    content = content.replace(/const TYPE_LIBRARY = \{[\s\S]*?\};/, `const TYPE_LIBRARY = ${typeLibraryStr};`);
  }
  
  // 替换 TYPE_IMAGES
  if (config.TYPE_IMAGES) {
    const typeImagesStr = JSON.stringify(config.TYPE_IMAGES, null, 2);
    content = content.replace(/const TYPE_IMAGES = \{[\s\S]*?\};/, `const TYPE_IMAGES = ${typeImagesStr};`);
  }
  
  // 写回 index.html 文件
  fs.writeFileSync(indexPath, content);
  
  // 复制图片文件
  if (imagePath && fs.existsSync(imagePath)) {
    const imageDir = path.join(projectPath, 'image');
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir);
    }
    
    const imageFiles = fs.readdirSync(imagePath);
    imageFiles.forEach(file => {
      const srcPath = path.join(imagePath, file);
      const destPath = path.join(imageDir, file);
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
      }
    });
    console.log('图片文件复制成功！');
  }
  
  console.log('人格系统替换成功！');
}

// 替换匹配规则
function replaceMatchingRules(projectPath, configFile) {
  console.log('开始替换匹配规则...');
  
  // 读取配置文件
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  
  // 读取 index.html 文件
  const indexPath = path.join(projectPath, 'index.html');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // 替换 NORMAL_TYPES
  if (config.NORMAL_TYPES) {
    const normalTypesStr = JSON.stringify(config.NORMAL_TYPES, null, 2);
    content = content.replace(/const NORMAL_TYPES = \[[\s\S]*?\];/, `const NORMAL_TYPES = ${normalTypesStr};`);
  }
  
  // 写回 index.html 文件
  fs.writeFileSync(indexPath, content);
  console.log('匹配规则替换成功！');
}

// 验证项目
function validateProject(projectPath) {
  console.log('开始验证项目...');
  
  // 检查 index.html 文件是否存在
  const indexPath = path.join(projectPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('错误：index.html 文件不存在！');
    process.exit(1);
  }
  
  // 读取 index.html 文件
  const content = fs.readFileSync(indexPath, 'utf8');
  
  // 检查维度系统
  if (!content.includes('dimensionMeta')) {
    console.error('错误：维度系统配置缺失！');
    process.exit(1);
  }
  
  // 检查题目系统
  if (!content.includes('questions')) {
    console.error('错误：题目系统配置缺失！');
    process.exit(1);
  }
  
  // 检查人格系统
  if (!content.includes('TYPE_LIBRARY')) {
    console.error('错误：人格系统配置缺失！');
    process.exit(1);
  }
  
  // 检查匹配规则
  if (!content.includes('NORMAL_TYPES')) {
    console.error('错误：匹配规则配置缺失！');
    process.exit(1);
  }
  
  // 检查图片目录
  const imageDir = path.join(projectPath, 'image');
  if (!fs.existsSync(imageDir)) {
    console.error('错误：image 目录不存在！');
    process.exit(1);
  }
  
  console.log('项目验证成功！');
}

// 部署项目
function deployProject(projectPath, port) {
  console.log('开始部署项目...');
  
  // 检查项目是否存在
  if (!fs.existsSync(projectPath)) {
    console.error('错误：项目目录不存在！');
    process.exit(1);
  }
  
  // 启动本地服务器
  console.log(`启动本地服务器，端口：${port}...`);
  console.log(`访问地址：http://localhost:${port}`);
  console.log('按 Ctrl+C 停止服务器');
  
  // 执行启动服务器命令
  try {
    execSync(`cd ${projectPath} && python3 -m http.server ${port}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('启动服务器失败:', error.message);
    process.exit(1);
  }
}

// 运行主函数
main();
