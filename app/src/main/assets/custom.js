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
    // 查找所有包含网址的文本节点并清空
    const regex = /https:\/\/xiazaishipin\.com\/?/g;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while (node = walker.nextNode()) {
        if (regex.test(node.textContent)) {
            node.textContent = node.textContent.replace(regex, '');
        }
    }
}, 0);
  
(function() {
    let exitFlag = false;

    // 重置状态函数
    function resetState() {
        exitFlag = false;
        // 确保当前历史状态唯一，以便 popstate 能拦截返回键
        if (history.state !== 'ready') {
            history.replaceState('ready', null, location.href);
        }
        // 再压入一个新状态，这样第一次返回时会触发 popstate
        history.pushState(null, null, location.href);
    }

    // 显示提示 toast
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

    // 执行退出（原生或静默失败）
    function exitApp() {
        if (window.NativeBridge && typeof window.NativeBridge.closeApp === 'function') {
            window.NativeBridge.closeApp();
        } else {
            // 无原生桥接时，不弹窗，仅控制台输出（可自行决定其他行为）
            console.log('无法调用原生退出，需要 NativeBridge.closeApp 方法');
            // 如果你希望在这里做点什么（比如返回上一页），可取消注释下面一行
            // history.back();
        }
    }

    // 监听返回键（popstate）
    window.addEventListener('popstate', function() {
        if (!exitFlag) {
            showToast('再按一次退出');
            exitFlag = true;
            // 重新压入历史，保持下一次还能拦截
            history.pushState(null, null, location.href);
            // 3秒后重置标志
            setTimeout(() => { exitFlag = false; }, 3000);
        } else {
            exitApp();
        }
    });

    // 页面加载时重置状态
    resetState();

    // 每次页面显示（包括从缓存/后台恢复）时重新重置，确保逻辑新鲜
    window.addEventListener('pageshow', function(event) {
        // 如果是页面从 bfcache 恢复，也需要重置
        resetState();
    });
})();

setInterval(() => {
    const regex = /https:\/\/xiazaishipin\.com\/?/g;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while (node = walker.nextNode()) {
        if (regex.test(node.textContent)) {
            node.textContent = node.textContent.replace(regex, '');
        }
    }
}, 0);

