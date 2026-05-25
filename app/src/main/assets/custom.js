window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

setInterval(() => document.querySelector('div.absolute.top-4.left-4')?.remove(), 0)
setInterval(() => {
    const btnContainer = document.querySelector('div.flex.gap-1.sm\\:gap-2');
    if (btnContainer) btnContainer.remove();
}, 0);
setInterval(() => {
    const openLink = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('打开原网页'));
    if (openLink) openLink.remove();
}, 0);
// 覆盖原生弹窗
window.alert = () => {};
window.confirm = () => true;
window.prompt = () => '';

// 移除自定义弹窗（轮询）
setInterval(() => {
    // 移除常见弹窗容器
    const selectors = [
        '.toast', '.modal', '.popup', '.dialog', '[role="dialog"]',
        '.fixed.inset-0', '.fixed.z-50', '.absolute.z-50',
        '[class*="toast"]', '[class*="modal"]', '[class*="popup"]'
    ];
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove());
    });
}, 0);

(function() {
    // 替换页面为离线页（带网络恢复检测）
    function replaceWithOfflinePage() {
        const offlineHtml = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
            <title>网络已断开</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f8f9fa;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    color: #6c757d;
                    text-align: center;
                }
                .offline-container {
                    padding: 20px;
                }
                h1 {
                    font-size: 24px;
                    margin-bottom: 12px;
                }
                p {
                    font-size: 16px;
                    margin-top: 0;
                }
                .retry-tip {
                    font-size: 14px;
                    color: #adb5bd;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="offline-container">
                <h1>🌐 网络已断开</h1>
                <p>请检查网络连接，恢复后将自动刷新界面。</p>
                <div class="retry-tip">⏳ 正在等待网络恢复...</div>
            </div>
            <script>
                // 监听网络恢复事件
                window.addEventListener('online', function() {
                    // 显示提示
                    var tip = document.querySelector('.retry-tip');
                    if (tip) tip.innerHTML = '✅ 网络已恢复，正在重新加载...';
                    // 延迟一秒后刷新，确保网络稳定
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                });
                // 可选：也可以显示手动刷新按钮
                // 额外：监听页面显示（如果从缓存恢复）
                window.addEventListener('pageshow', function(event) {
                    if (navigator.onLine) {
                        window.location.reload();
                    }
                });
            <\/script>
        </body>
        </html>`;

        document.open();
        document.write(offlineHtml);
        document.close();
    }

    // 断网时触发替换
    window.addEventListener('offline', function() {
        console.log('网络已断开，显示离线页面...');
        replaceWithOfflinePage();
    });

    // 页面加载时如果已经是离线状态，立即替换
    if (!navigator.onLine) {
        console.log('检测到当前网络离线，显示离线页面...');
        replaceWithOfflinePage();
    }
})();
(function() {
    // ========== 1. 强力清除 localStorage（立即 + 轮询） ==========
    function clearStorage() {
        try {
            localStorage.clear();
            sessionStorage.clear();
        } catch(e) {}
    }
    clearStorage();                     // 立即清除
    setInterval(clearStorage, 200);     // 每200ms再清一次，防止网页重新写入

    // 清除 cookies（一次即可）
    try {
        document.cookie.split(";").forEach(c => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    } catch(e) {}

    // ========== 2. 隐藏元素（Logo、按钮、网址文本） ==========
    setInterval(() => {
        // 隐藏 Logo
        const logo = document.querySelector('div.absolute.top-4.left-4');
        if (logo) logo.remove();
        // 隐藏“粘贴”和“历史记录”按钮容器
        const btnContainer = document.querySelector('div.flex.gap-1.sm\\:gap-2');
        if (btnContainer) btnContainer.remove();
        // 移除页面中的网址文本 https://xiazaishipin.com（带/不带斜杠）
        const regex = /https:\/\/xiazaishipin\.com\/?/g;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while (node = walker.nextNode()) {
            if (regex.test(node.textContent)) {
                node.textContent = node.textContent.replace(regex, '');
            }
        }
    }, 500);

    // ========== 3. 返回键“再按一次退出”（无原生桥接时不弹alert） ==========
    let exitFlag = false;
    function showToast(msg) {
        const toast = document.createElement('div');
        toast.innerText = msg;
        toast.style.position = 'fixed';
        toast.style.bottom = '20%';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'rgba(0,0,0,0.7)';
        toast.style.color = '#fff';
        toast.style.padding = '8px 16px';
        toast.style.borderRadius = '8px';
        toast.style.zIndex = 9999;
        toast.style.fontSize = '14px';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
    function exitApp() {
        if (window.NativeBridge && typeof window.NativeBridge.closeApp === 'function') {
            window.NativeBridge.closeApp();
        } else {
            console.log('无法调用原生退出，需提供 NativeBridge.closeApp');
        }
    }
    function resetBackState() {
        exitFlag = false;
        if (history.state !== 'ready') history.replaceState('ready', null, location.href);
        history.pushState(null, null, location.href);
    }
    window.addEventListener('popstate', function() {
        if (!exitFlag) {
            showToast('再按一次退出');
            exitFlag = true;
            history.pushState(null, null, location.href);
            setTimeout(() => { exitFlag = false; }, 3000);
        } else {
            exitApp();
        }
    });
    resetBackState();
    window.addEventListener('pageshow', resetBackState);
})();

function setStatusBarColor(color) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
    }
    meta.content = color;
}

// 使用深色，比如 slate-800
setStatusBarColor('#1e293b');
document.addEventListener('deviceready', function() {
    // 设置状态栏文字为浅色，最适合你的深色主题
    StatusBar.styleLightContent();
    // 可选：设置状态栏背景色，效果不如直接改网页顶部背景自然
    // StatusBar.backgroundColorByHexString("#1e293b");
}, false);