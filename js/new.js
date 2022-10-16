// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
    let div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: 'var(--leonus-blue)',
        onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
        onrestore: () => { div.innerHTML = '' }
    });
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
    
    <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
    <h2 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）"></a>图片（手机）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img2.baidu.com/it/u=1531020194,525724931&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=866)" class="pimgbox" onclick="changeBg('url(https://img2.baidu.com/it/u=1531020194,525724931&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=866)')"></a>
    </div>
    
    <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)" class="imgbox" onclick="changeBg('url(https\://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)')"></a>
    </div>

    <h2 id="随机图片（电脑）"><a href="#随机图片（电脑）" class="headerlink" title="随机图片（电脑）"></a>随机图片（电脑）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://www.dmoe.cc/random.php)" class="imgbox" onclick="changeBg('url(https\://www.dmoe.cc/random.php)')"></a>
    </div>
    
    
    
    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
    </div>
    
    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a> 
    </div>
`;
}

// 适应窗口大小
function winResize() {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}

"" === GLOBAL_CONFIG_SITE.title.replace("Jayhrn", "") ? document.getElementById("page-name-text").style.display = "none" : document.querySelector("#page-name-text>span").innerHTML = document.title.split(" | Jayhrn")[0];

var $percent = document.querySelector("#nav #hotkey #top-button a.site-page i");
$percent && window.addEventListener("scroll", (function () {
    let e = document.body.scrollHeight || document.documentElement.scrollHeight,
        t = window.innerHeight || document.documentElement.clientHeight;
    $percent.dataset.percent = ((document.body.scrollTop || document.documentElement.scrollTop) / (e - t) * 100).toFixed(0)
}));



let cyan = {};
cyan.showRightMenu = function (isTrue, x = 0, y = 0) {
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top', x + 'px').css('left', y + 'px');

    if (isTrue) {
        $rightMenu.show();
    } else {
        $rightMenu.hide();
    }
}
// 右键菜单事件
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.oncontextmenu = function (event) {
        $('.rightMenu-group.hide').hide();
        if (document.getSelection().toString()) {
            $('#menu-tools').show();
        }
        if (event.ctrlKey) return true;
        if (localStorage.getItem("right_menu_switch") === 'off') return true
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth + 10;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= pageY + rmHeight - window.innerHeight;
        }



        cyan.showRightMenu(true, pageY, pageX);
        return false;
    };

    window.addEventListener('click', function () { cyan.showRightMenu(false); });
}


setInterval(() => {
    // let create_time = Math.round(new Date('2021-10-15 00:00:00').getTime() / 1000); //在此行修改建站时间
    // 有苹果用户发现safari浏览器不能正常运行，百度了一下发现是格式化的问题，改成下面这种应该就可以了。感谢反馈。
    let create_time = Math.round(new Date('2021/10/15 00:00:00').getTime() / 1000); //在此行修改建站时间
    let timestamp = Math.round((new Date().getTime()) / 1000);
    let second = timestamp - create_time;
    let time = new Array(0, 0, 0, 0, 0);

    var nol = function(h) {
        return h > 9 ? h : '0' + h;
    }
    if (second >= 365 * 24 * 3600) {
        time[0] = parseInt(second / (365 * 24 * 3600));
        second %= 365 * 24 * 3600;
    }
    if (second >= 24 * 3600) {
        time[1] = parseInt(second / (24 * 3600));
        second %= 24 * 3600;
    }
    if (second >= 3600) {
        time[2] = nol(parseInt(second / 3600));
        second %= 3600;
    }
    if (second >= 60) {
        time[3] = nol(parseInt(second / 60));
        second %= 60;
    }
    if (second >= 0) {
        time[4] = nol(second);
    }
    let currentTimeHtml = ""
    if (time[0] != 0) {
        currentTimeHtml += time[0] + ' YEAR '
    }
    currentTimeHtml += time[1] + ' DAYS ' + time[2] + ' : ' + time[3] + ' : ' + time[4];
    document.getElementById("runtime").innerHTML = currentTimeHtml;
}, 1000);
function catalogActive () {
    let $list = document.getElementById('catalog-list')
    if ($list) {
      // 鼠标滚轮滚动
      $list.addEventListener('mousewheel', function (e) {
        // 计算鼠标滚轮滚动的距离
        $list.scrollLeft -= e.wheelDelta / 2
        // 阻止浏览器默认方法
        e.preventDefault()
      }, false)
  
      // 高亮当前页面对应的分类或标签
      let $catalog = document.getElementById(decodeURIComponent(window.location.pathname))
      $catalog.classList.add('selected')
  
      // 滚动当前页面对应的分类或标签到中部
      $list.scrollLeft = ($catalog.offsetLeft - $list.offsetLeft) - ($list.offsetWidth - $catalog.offsetWidth) / 2
    }
  }
  catalogActive()



// 如果当前页有评论就执行函数
if (document.getElementById('post-comment')) owoBig();
// 表情放大
function owoBig() {
    let flag = 1, // 设置节流阀
        owo_time = '', // 设置计时器
        m = 3; // 设置放大倍数
    // 创建盒子
    let div = document.createElement('div'),
        body = document.querySelector('body');
    // 设置ID
    div.id = 'owo-big';
    // 插入盒子
    body.appendChild(div)

    // 构造observer
    let observer = new MutationObserver(mutations => {

        for (let i = 0; i < mutations.length; i++) {
            let dom = mutations[i].addedNodes,
                owo_body = '';
            if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
            // 如果需要在评论内容中启用此功能请解除下面的注释
            else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
            else continue;
            
            // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
            if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
            // 鼠标移入
            owo_body.onmouseover = (e) => {
                    if (flag && e.target.tagName == 'IMG') {
                        flag = 0;
                        // 移入300毫秒后显示盒子
                        owo_time = setTimeout(() => {
                            let height = e.path[0].clientHeight * m, // 盒子高
                                width = e.path[0].clientWidth * m, // 盒子宽
                                left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2, // 盒子与屏幕左边距离
                                top = e.y - e.offsetY; // 盒子与屏幕顶部距离

                            if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10); // 右边缘检测，防止超出屏幕
                            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
                            // 设置盒子样式
                            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
                            // 在盒子中插入图片
                            div.innerHTML = `<img src="${e.target.src}">`
                        }, 300);
                    }
                };
            // 鼠标移出隐藏盒子
            owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
        }

    })
    observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true }) // 监听的 元素 和 配置项
}

var foreignTips = (function () {
    var onSuccess = function (geoipResponse) {
      if (!geoipResponse.country.iso_code) {
        return;
      }
      var code = geoipResponse.country.iso_code.toLowerCase();
      if (code != 'cn'){
        btf.snackbarShow('使用国外网络访问将无法访问文章图片，敬请谅解。If you use foreign network access, you will not be able to access articles and pictures.')
      }
    };
    var onError = function (error) {
    };
    return function () {
      geoip2.country(onSuccess, onError);
    };
  }());
  foreignTips();

// function setCookie(cname, cvalue) {
//     //   var d = new Date();
//     //   d.setTime(d.getTime()+(exdays*24*60*60*1000));
//     //   var expires = "expires="+d.toGMTString();
//     //   document.cookie = cname + "=" + cvalue + "; " + expires;
//     document.cookie = cname + "=" + cvalue + ";";
// }
// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i].trim();
//         if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
//     }
//     return "";
// }
// function GetUrlRelativePath() {
//     var url = document.location.toString();
//     var arrUrl = url.split("//");

//     var start = arrUrl[1].indexOf("/");
//     var relUrl = arrUrl[1].substring(start);

//     if (relUrl.indexOf("?") != -1) {
//         relUrl = relUrl.split("?")[0];
//     }
//     return relUrl;
// }
// $(document).ready(function () {
//     const {
//         Query,
//         User
//     } = AV;
//     AV.init({
//         appId: "IvW3T1NjMoh7OmKEdAz1tM0o-gzGzoHsz",
//         appKey: "vG8s9ukVO5bgozEHzR923dew",
//         serverURL: "https://ivw3t1nj.lc-cn-n1-shared.com"
//     });
//     var dianzans = [];
//     var hrefs = [];
//     var ids = [];
//     const query2 = new AV.Query('dianzan');
//     query2.find().then((dzs) => {
//         for (i = dzs.length - 1; i >= 0; i--) {
//             dianzans.push(dzs[i]["attributes"]["count"]);
//             hrefs.push(dzs[i]["attributes"]["href"]);
//             ids.push(dzs[i]["id"])
//         }
//         index = hrefs.indexOf(GetUrlRelativePath());
//         console.log(dianzans[index])
//         if (dianzans[index] === undefined) {
//             document.getElementsByClassName("dianzan-count")[0].innerText = "0";
//         } else {
//             document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index];
//         }
//         if (hrefs.indexOf(GetUrlRelativePath()) == -1) {
//             const TestObject = AV.Object.extend('dianzan');
//             const testObject = new TestObject();
//             testObject.set('href', GetUrlRelativePath());
//             testObject.set('count', 0);
//             testObject.save();
//         }
//     });
// })

// function setCount() {
//     var dianzans = [];
//     var hrefs = [];
//     var ids = [];
//     const query2 = new AV.Query('dianzan');
//     query2.find().then((dzs) => {
//         for (i = dzs.length - 1; i >= 0; i--) {
//             dianzans.push(dzs[i]["attributes"]["count"]);
//             hrefs.push(dzs[i]["attributes"]["href"]);
//             ids.push(dzs[i]["id"])
//         }
//         index = hrefs.indexOf(GetUrlRelativePath());
//         console.log(dianzans[index])
//         if (dianzans[index] === undefined) {
//             document.getElementsByClassName("dianzan-count")[0].innerText = "0";
//         } else {
//             document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index];
//         }
//     });
//     if (getCookie(GetUrlRelativePath() + "isZaned") == "1") {
//         document.getElementsByClassName("fa-thumbs-up")[0].setAttribute("style", "color:var(--lyx-blue)!important")
//     }
//     else {
//         document.getElementsByClassName("fa-thumbs-up")[0].setAttribute("style", "")
//     }
// }

// function dianzan() {
//     if (getCookie(GetUrlRelativePath() + "isZaned") != "1") {
//         // try {
//             var dianzans = [];
//             var hrefs = [];
//             var ids = [];
//             const query = new AV.Query('dianzan');
//             query.find().then((dzs) => {
//                 for (i = dzs.length - 1; i >= 0; i--) {
//                     dianzans.push(dzs[i]["attributes"]["count"]);
//                     hrefs.push(dzs[i]["attributes"]["href"]);
//                     ids.push(dzs[i]["id"])
//                 }
//                 index = hrefs.indexOf(GetUrlRelativePath());
//                 console.log(ids[index])
//                 query.get(ids[index]).then((todo) => {
//                     todo.set('count', dianzans[index] + 1);
//                     todo.save();
//                     setCookie(GetUrlRelativePath() + "isZaned", "1")
//                     setCount();
//                 });
                
//             });
//         // } catch (err) {

//         // }
//     }
//     else {
//         try {
//             var dianzans = [];
//             var hrefs = [];
//             var ids = [];
//             const query = new AV.Query('dianzan');
//             query.find().then((dzs) => {
//                 for (i = dzs.length - 1; i >= 0; i--) {
//                     dianzans.push(dzs[i]["attributes"]["count"]);
//                     hrefs.push(dzs[i]["attributes"]["href"]);
//                     ids.push(dzs[i]["id"])
//                 }
//                 index = hrefs.indexOf(GetUrlRelativePath());
//                 console.log(ids[index])
//                 query.get(ids[index]).then((todo) => {
//                     todo.set('count', dianzans[index] - 1);
//                     todo.save();
//                     setCookie(GetUrlRelativePath() + "isZaned", "0");
//                     setCount();
//                 });
                
//             });
//         } catch (err) { }
//     }
// }

function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}
$(document).ready(function () {
    const {
        Query,
        User
    } = AV;
    AV.init({
        appId: "IvW3T1NjMoh7OmKEdAz1tM0o-gzGzoHsz",
        appKey: "vG8s9ukVO5bgozEHzR923dew",
        serverURL: "https://ivw3t1nj.lc-cn-n1-shared.com"
    });
    var dianzans = [];
    var hrefs = [];
    var ids = [];
    const query2 = new AV.Query('dianzan');
    query2.find().then((dzs) => {
        for (i = dzs.length - 1; i >= 0; i--) {
            dianzans.push(dzs[i]["attributes"]["count"]);
            hrefs.push(dzs[i]["attributes"]["href"]);
            ids.push(dzs[i]["id"])
        }
        index = hrefs.indexOf(GetUrlRelativePath());
        console.log(dianzans[index])
        if (dianzans[index] === undefined) {
            document.getElementsByClassName("dianzan-count")[0].innerText = "0";
        } else {
            document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index];
        }
    });
})

function setCount() {
    var dianzans = [];
    var hrefs = [];
    var ids = [];
    const query2 = new AV.Query('dianzan');
    query2.find().then((dzs) => {
        for (i = dzs.length - 1; i >= 0; i--) {
            dianzans.push(dzs[i]["attributes"]["count"]);
            hrefs.push(dzs[i]["attributes"]["href"]);
            ids.push(dzs[i]["id"])
        }
        index = hrefs.indexOf(GetUrlRelativePath());
        console.log(dianzans[index])
        if (dianzans[index] === undefined) {
            document.getElementsByClassName("dianzan-count")[0].innerText = "0";
        } else {
            document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index] + 1;
        }
    });
}

function dianzan() {
    try {
        var dianzans = [];
        var hrefs = [];
        var ids = [];
        const query = new AV.Query('dianzan');
        query.find().then((dzs) => {
            for (i = dzs.length - 1; i >= 0; i--) {
                dianzans.push(dzs[i]["attributes"]["count"]);
                hrefs.push(dzs[i]["attributes"]["href"]);
                ids.push(dzs[i]["id"])
            }
            if (hrefs.indexOf(GetUrlRelativePath()) == -1) {
                console.log(1)
                const TestObject = AV.Object.extend('dianzan');
                const testObject = new TestObject();
                testObject.set('href', GetUrlRelativePath());
                testObject.set('count', 1);
                testObject.save();
            } else {
                index = hrefs.indexOf(GetUrlRelativePath());
                console.log(ids[index])
                query.get(ids[index]).then((todo) => {
                    todo.set('count', dianzans[index] + 1);
                    todo.save();
                });
            }
            setCount();
        });
    } catch (err) {
        const TestObject = AV.Object.extend('dianzan');
        const testObject = new TestObject();
        testObject.set('href', GetUrlRelativePath());
        testObject.set('count', 1);
        testObject.save();
    }

}

/* 灵动岛代码 */
// Tiny bit of JS to ensure that the notch doesn't move about when you resize the screen


const delay = 300;
let afterResize;
let currentStyle;

window.onresize = function(){
	document.body.classList.add('is-resizing');
  	clearTimeout(afterResize);
  	afterResize = setTimeout(() => document.body.classList.remove('is-resizing'), delay);
};

document.getElementById('zoom').addEventListener('click', () => {
	document.body.classList.add('is-resizing');
	setTimeout(() => 		document.body.classList.remove('is-resizing'), delay)
});


// Generating random gradient

let dimension = 1000; // Size of tile to be download px

const styles = ['colourful', 'moody', 'neon', 'abstract', 'grayscale', 'light-leak'];

const generateBtn = document.querySelector('[for="random"]');
const canvas = document.querySelector('.canvas');

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Generate randomised gradients

generateBtn.addEventListener('click', generateOrSave);

function generateOrSave(e) {
	
	if (e.metaKey) {
		saveGradient(e);
	} else {
		generateGradient();
	}
}

function generateGradient() {
	
	// Assign style
	const newStyle = styles[Math.floor(Math.random() * styles.length)];
	
	// console.log(styles, styles[Math.floor(Math.random() * styles.length)]);
	
	if (currentStyle) canvas.classList.remove(`random--${currentStyle}`);
	
	currentStyle = newStyle;
	canvas.classList.add(`random--${newStyle}`);
	
	// Loop through each canvas and assign a bunch of random CSS variables
	const shapes = canvas.getElementsByClassName('shape');

	document.body.style.setProperty('--r-h', `${random(0, 360)}deg`);
	document.body.style.setProperty('--r-s', `${random(40, 90)}%`);
	document.body.style.setProperty('--r-l', `${random(55, 90)}%`);

	Object.values(shapes).forEach((shape) => {
		shape.style.setProperty('--r-h', `${random(0, 360)}deg`);
		shape.style.setProperty('--r-s', `${random(40, 90)}%`);
		shape.style.setProperty('--r-l', `${random(55, 90)}%`);

		shape.style.setProperty('--w', `${random(0, 30) + 85}%`);
		shape.style.setProperty('--b-r', `${random(20, 60)}%`);
		shape.style.setProperty('--b', `${random(5, 75) / 10}em`);
		shape.style.setProperty('--x', `${random(0, 100) - 50}%`);
		shape.style.setProperty('--y', `${random(0, 100) - 50}%`);
		shape.style.setProperty('--s-x', `${1 + ((random(0, 130) - 30) / 100)}`);
		shape.style.setProperty('--s-y', `${1 + ((random(0, 130) - 30) / 100)}`);
		shape.style.setProperty('--r', `${random(0, 720) - 360}deg`);
	})
}


// Convert RGB colour to Hex
// Needed for api.color.pizza call
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`


// Save gradient
function saveGradient(e) {
	const gradient = canvas;
	const rect = gradient.getBoundingClientRect();
	const scale = dimension / rect.width

	//	Get canvas background color
	const color = rgba2hex(window.getComputedStyle(gradient, null).getPropertyValue('background-color'));
	
	console.log(color, scale, rect);
	
	// Get name of color for use in file name
	fetch(`https://api.color.pizza/v1/${color.substring(1)}`)
		.then(c => c.json())
		.then(c => {
			// console.log(c);
		
			// Convert DOM to canvas
			domtoimage.toPng(gradient, {
				bgColor: '#ffffff',
				width: rect.width * scale,
				height: rect.height * scale,
				style: {
					  'transform': `scale(${scale})`,
					  'transform-origin': 'top left'
				 }
			})
			// Download image
			.then(function (dataUrl) {
				// const img = new Image();
				// img.src = dataUrl;
				// document.body.appendChild(img);
				
				// Render canvas as a link and click dat
				const link = document.createElement('a');
				link.download = `${currentStyle}-${c['paletteTitle'].toLowerCase().replaceAll(' ','-')}-gradient`;
				link.href = dataUrl;
				link.click();
			})
	});
	
}
/* 灵动岛代码结束 */