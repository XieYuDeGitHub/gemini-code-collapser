// --- 基础图标定义 ---
const ICON_COLLAPSE = `<svg viewBox="0 0 24 24"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>`;
const ICON_EXPAND = `<svg viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`;
const ICON_ARROW_DOWN = `<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>`;

// --- 工具函数：检查是否在聊天界面 ---
function isChatPage() {
  // 检查 URL 路径是否以 /app 开头
  return window.location.pathname.startsWith('/app');
}

// --- 功能1：代码折叠 (保持不变) ---
function addCollapseButtons() {
  const copyIcons = document.querySelectorAll('mat-icon[data-mat-icon-name="content_copy"]');
  copyIcons.forEach((icon) => {
    const copyBtn = icon.closest('button');
    if (!copyBtn) return;
    const btnContainer = copyBtn.parentNode;
    if (!btnContainer || btnContainer.querySelector('.gemini-collapse-btn')) return;

    const header = copyBtn.closest('.code-block-decoration');
    if (!header) return;
    const parent = header.parentNode;
    const pre = parent.querySelector('pre');
    if (!pre) return;

    const button = document.createElement('button');
    button.className = 'gemini-collapse-btn';
    button.innerHTML = ICON_COLLAPSE;
    button.title = "折叠代码";
    button.addEventListener('mousedown', (e) => e.stopPropagation());
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const isCollapsed = pre.classList.toggle('code-collapsed');
      
      let placeholder = parent.querySelector('.gemini-code-placeholder');
      if (isCollapsed) {
        button.innerHTML = ICON_EXPAND;
        button.title = "展开代码";
        if (!placeholder) {
            placeholder = document.createElement('div');
            placeholder.className = 'gemini-code-placeholder';
            placeholder.innerText = '... 代码已折叠 ...';
            if (pre.nextSibling) parent.insertBefore(placeholder, pre.nextSibling);
            else parent.appendChild(placeholder);
        }
        placeholder.style.display = 'block';
      } else {
        button.innerHTML = ICON_COLLAPSE;
        button.title = "折叠代码";
        if (placeholder) placeholder.style.display = 'none';
      }
    });
    btnContainer.insertBefore(button, copyBtn);
  });
}

// --- 功能2：回到底部按钮 (带 URL 检查) ---
function initScrollToBottomButton() {
  if (document.getElementById('gemini-scroll-to-bottom')) return;

  const scrollBtn = document.createElement('div');
  scrollBtn.id = 'gemini-scroll-to-bottom';
  scrollBtn.innerHTML = ICON_ARROW_DOWN;
  scrollBtn.title = "回到底部";
  document.body.appendChild(scrollBtn);

  let lastScroller = window;

  // 点击滚动
  scrollBtn.addEventListener('click', () => {
    if (lastScroller && lastScroller.scrollTo) {
        lastScroller.scrollTo({ top: lastScroller.scrollHeight, behavior: 'smooth' });
    } 
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    const main = document.querySelector('main');
    if (main) main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
  });

  // 滚动监听逻辑
  const handleScroll = (e) => {
    // 【核心修改 1】如果在非聊天页面，直接隐藏并退出
    if (!isChatPage()) {
        scrollBtn.classList.add('hidden-btn');
        return;
    }

    const target = e.target;
    if (target.clientHeight && target.clientHeight < 100) return;

    lastScroller = target;

    const scrollTop = target.scrollTop || window.scrollY || document.documentElement.scrollTop;
    const clientHeight = target.clientHeight || window.innerHeight;
    const scrollHeight = target.scrollHeight || document.documentElement.scrollHeight;

    // 只有在距离底部 > 200px 时才显示
    if (scrollHeight - (scrollTop + clientHeight) < 200) {
      scrollBtn.classList.add('hidden-btn'); 
    } else {
      scrollBtn.classList.remove('hidden-btn');
    }
  };

  window.addEventListener('scroll', handleScroll, true);
  
  // 初始隐藏
  scrollBtn.classList.add('hidden-btn');
}

// --- 初始化与监听 ---
addCollapseButtons();
initScrollToBottomButton();

// 监听 DOM 变化 (处理流式输出 + 路由跳转检测)
const observer = new MutationObserver((mutations) => {
  addCollapseButtons();

  // 【核心修改 2】利用 MutationObserver 顺便检查 URL 变化
  // 因为 SPA 切换页面时 DOM 会大变，这里是隐藏按钮的最佳时机
  const scrollBtn = document.getElementById('gemini-scroll-to-bottom');
  if (scrollBtn && !isChatPage()) {
      scrollBtn.classList.add('hidden-btn');
  }
});

observer.observe(document.body, { childList: true, subtree: true });