const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'G', url: 'https://www.google.com', name: '谷歌' },
    { logo: 'B', url: 'https://www.bilibili.com', name: 'b站' },
    { logo: 'F', url: 'https://www.bing.com/translator?mkt=zh-CN', name: '翻译' },
    { logo: 'M', url: 'https://www.bing.com/maps/?setmkt=en-US&setlang=en-US', name: '地图' },
    { logo: 'Q', url: ' https://mail.qq.com/', name: 'qq邮箱' },

]


const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${node.name}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    let name = window.prompt('请输入名称')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url,
        name: name,
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
let box = document.querySelector('.search-box');
let bt = document.querySelector('.bt');

let w = window.innerWidth
if (w > 960)
// 增加监听mouseover事件
{
    bt.addEventListener('mouseover', () => {
        // 增加active样式
        bt.classList.add('active');
    });

    box.addEventListener('mouseover', () => {
        // 增加active样式
        box.classList.add('active');
    });

    // 解决点击搜索框会触发 body.click事件问题
    box.addEventListener('click', (e) => {
        // 防止事件冒泡
        e.stopPropagation();
    });
    document.documentElement.addEventListener('click', () => {
        // 移除active样式
        box.classList.remove('active');
        bt.classList.remove('active');
    })

} else {
    bt.addEventListener('touchstart', () => {
        // 增加active样式

        bt.classList.add('active');
    });

    box.addEventListener('mouseover', () => {
        // 增加active样式
        box.classList.add('active');
    });

    // 解决点击搜索框会触发 body.click事件问题
    box.addEventListener('click', (e) => {
        // 防止事件冒泡
        e.stopPropagation();
    });
    document.documentElement.addEventListener('click', () => {
        // 移除active样式
        box.classList.remove('active');
        bt.classList.remove('active');
    })

}