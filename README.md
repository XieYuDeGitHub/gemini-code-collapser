# gemini-code-collapser
一个简单的 Chrome/Edge 扩展，用于折叠 Gemini 的长代码块并添加回到底部按钮。
# Gemini Code Block Collapser & Scroll Assistant
(Gemini 代码块折叠与滚动助手)

一个轻量级的 Chrome/Edge 浏览器扩展，旨在优化 Google Gemini 的网页使用体验。

## ✨ 主要功能 (Features)

1.  **代码块折叠 (Code Folding):** - 自动识别 Gemini 输出的长代码块。
    - 在代码块右上角添加“折叠/展开”按钮。
    - 折叠后仅占用极小空间，方便快速浏览上下文。
    
2.  **一键回到底部 (Scroll to Bottom):**
    - 在屏幕右下角添加一个悬浮按钮。
    - **智能隐藏:** 只有当你向上翻看历史消息时才会显示，阅读最新消息时自动隐藏。
    - **防干扰:** 只在 `/app` 聊天界面生效，不会干扰设置页或其他页面。

## 📸 截图预览 (Screenshots)

![代码折叠效果](screenshot1.png)
![回到底部按钮](screenshot2.png)

## 🚀 安装方法 (Installation)

由于这只是一个脚本，尚未发布到商店，你需要手动安装：

1.  点击右上角的绿色 **Code** 按钮，选择 **Download ZIP**，并解压到文件夹。
2.  打开 Chrome 或 Edge 浏览器，进入扩展管理页面：
    - Chrome: `chrome://extensions/`
    - Edge: `edge://extensions/`
3.  打开右上角的 **开发者模式 (Developer mode)** 开关。
4.  点击左上角的 **加载已解压的扩展程序 (Load unpacked)**。
5.  选择你解压的文件夹即可。

## 📝 源码结构
- `manifest.json`: 配置文件 (Manifest V3)
- `content.js`: 核心逻辑 (DOM 监听与按钮注入)
- `styles.css`: 样式表

---
*Created with the help of Gemini AI.*
