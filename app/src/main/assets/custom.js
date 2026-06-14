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

setInterval(() => {
    const faqDiv = document.querySelector('div.mt-16.mx-auto.text-left[data-v-f49ff6ef]');
    if (faqDiv) {
        faqDiv.remove();
        console.log('常见问题区块已删除');
    }
}, 10);
setInterval(() => {
    const latestDiv = document.querySelector('div.mt-8[data-v-f49ff6ef]');
    if (latestDiv) {
        latestDiv.remove();
        console.log('最新文章区块已删除');
    }
}, 10);
setInterval(() => {
    const footerDiv = document.querySelector('div.bg-\\[\\#1aa05a\\].text-white.leading-normal.px-6');
    if (footerDiv) {
        footerDiv.remove();
        console.log('底部 Footer 已删除');
    }
}, 10);
setInterval(() => {
    const header = document.querySelector('header.bg-background\\/75.backdrop-blur.bg-white');
    if (header) {
        header.remove();
        console.log('顶部导航栏已删除');
    }
}, 10);
setInterval(() => {
    const promoDiv = document.querySelector('div.mt-6[data-v-2ba80f50]');
    if (promoDiv) {
        promoDiv.remove();
        console.log('推广区块已删除');
    }
}, 10);