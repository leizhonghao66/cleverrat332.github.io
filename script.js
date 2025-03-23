// 初始化数据
let locations = [
    {
        name: "第一教学楼",
        type: "teaching",
        coord: [30.538, 114.360],
        openTime: { start: "08:00", end: "22:00" },
        crowdLevel: "medium",
        info: "开放时间：08:00-22:00\n主要设施：多媒体教室、教师办公室"
    },
    {
        name: "学生食堂",
        type: "dining",
        coord: [30.537, 114.361],
        openTime: { start: "06:30", end: "20:30" },
        crowdLevel: "high",
        info: "开放时间：06:30-20:30\n可容纳人数：2000人"
    }
];

// 用户面板功能
const initUserPanel = () => {
    const userInfo = document.getElementById('userInfo');
    const dropdownMenu = document.getElementById('dropdownMenu');

    userInfo.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show-dropdown');
    });

    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show-dropdown');
    });

    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};

// 地图初始化


// 搜索功能
const initSearch = (map) => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const suggestionsBox = document.getElementById('searchSuggestions');
    let currentHighlight = null;

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const showSuggestions = (results) => {
        suggestionsBox.innerHTML = results.map(loc => `
            <div class="suggestion-item" data-coord="${loc.coord}">
                ${loc.name}
                <small>${loc.type}</small>
            </div>
        `).join('');
        suggestionsBox.style.display = results.length ? 'block' : 'none';
    };

    const performSearch = (keyword) => {
        const results = locations.filter(loc =>
            loc.name.toLowerCase().includes(keyword.toLowerCase()) ||
            loc.type.toLowerCase().includes(keyword.toLowerCase())
        );

        if (results.length > 0) {
            const target = results[0];
            map.flyTo(target.coord, 18);
            if (currentHighlight) currentHighlight.remove();
            currentHighlight = L.marker(target.coord).addTo(map);
            setTimeout(() => currentHighlight.remove(), 3000);
        }
    };

    searchInput.addEventListener('input', debounce(e => {
        const keyword = e.target.value.trim();
        const results = keyword ? locations.filter(loc => 
            loc.name.toLowerCase().includes(keyword.toLowerCase())
        ) : [];
        showSuggestions(results);
    }, 300));

    searchButton.addEventListener('click', () => {
        const keyword = searchInput.value.trim();
        if (keyword) performSearch(keyword);
    });

    suggestionsBox.addEventListener('click', e => {
        const item = e.target.closest('.suggestion-item');
        if (item) {
            searchInput.value = item.textContent.trim();
            suggestionsBox.style.display = 'none';
            const coord = item.dataset.coord.split(',').map(Number);
            map.flyTo(coord, 18);
        }
    });
};

// 筛选功能


// 初始化函数
document.addEventListener('DOMContentLoaded', () => {
    initUserPanel();
    const map = initMap();
    
    // 为地点添加标记
    locations.forEach(loc => {
        loc.marker = L.marker(loc.coord)
            .bindPopup(`<b>${loc.name}</b><br>${loc.info.replace(/\n/g, '<br>')}`)
            .addTo(map);
    });

    initSearch(map);
    initFilters(map);
});
// 景点数据
const attractions = {
    library: {
        title: "南湖图书馆",
        images: ["images/20.jpg", "lib2.jpg"],
        content: `<div class="lib-detail">
                <h2>武汉理工大学南湖图书馆</h2>
                <p class="lib-highlight">中国高校现代化图书馆的典范 | 理工科特色文献中心 | 智慧化学习空间</p>

                <section class="lib-section">
                    <h3>🏛 历史与概况</h3>
                    <div class="lib-grid">
                        <div class="lib-info">
                            <ul>
                                <li><strong>建成时间：</strong>2016年9月</li>
                                <li><strong>建筑面积：</strong>5.2万平方米</li>
                                <li><strong>建筑高度：</strong>10层（地上8层+地下2层）</li>
                                <li><strong>设计理念：</strong>"知识方舟"造型，荣获湖北省建筑结构优质工程奖</li>
                            </ul>
                        </div>
                        <div class="lib-images">
                            <img src="images/🎉🎉探秘武汉理工大学南湖校区图书馆_1_武理热心小小木_来自小红书网页版.jpg" alt="外观" loading="lazy">
                            <img src="images/武理南湖图书馆·第一弹🌸_1_wut喵学姐_来自小红书网页版.jpg" alt="室内" loading="lazy">
                        </div>
                    </div>
                </section>

                <section class="lib-section">
                    <h3>📚 功能布局</h3>
                    <div class="table-responsive">
                        <table>
                            <tr><th>楼层</th><th>功能区域</th></tr>
                            <tr><td>B2-B1</td><td>智能书库、设备机房</td></tr>
                            <tr><td>1F</td><td>总服务台、新书展示区、24小时自习区</td></tr>
                            <tr><td>2-3F</td><td>自然科学图书借阅区、数字资源体验区</td></tr>
                            <tr><td>4-5F</td><td>人文社科图书区、特藏文献室</td></tr>
                            <tr><td>6-7F</td><td>研究学习空间、学术报告厅</td></tr>
                            <tr><td>8F</td><td>行政办公区</td></tr>
                        </table>
                    </div>
                </section>

                <section class="lib-section">
                    <h3>💡 特色服务</h3>
                    <div class="lib-columns">
                        <div>
                            <h4>智慧化设施：</h4>
                            <ul>
                                <li>RFID图书自助借还系统</li>
                                <li>座位预约管理系统</li>
                                <li>VR导航体验服务</li>
                                <li>电子书瀑布流借阅机</li>
                            </ul>
                        </div>
                        <div>
                            <h4>特色空间：</h4>
                            <ul>
                                <li>创客空间（3D打印机、激光雕刻机）</li>
                                <li>视听欣赏区（独立影音包厢）</li>
                                <li>专利信息服务中心</li>
                                <li>院士著作专架</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div class="lib-stats">
                    <div class="stat-item">
                        <h4>📊 馆藏数据</h4>
                        <ul>
                            <li>纸质文献：200万+册</li>
                            <li>电子数据库：87个</li>
                            <li>中外期刊：4000+种</li>
                        </ul>
                    </div>
                    
                    <div class="stat-item">
                        <h4>🕒 开放时间</h4>
                        <ul>
                            <li>常规：7:30-22:30</li>
                            <li>考试季：至23:30</li>
                            <li>24小时区：全年开放</li>
                        </ul>
                    </div>
                </div>
            </div>
`
    },
    stadium: {
        title: "南湖体育场",
        images: ["images/21.jpeg", "stadium2.jpg"],
        content: `体育<div class="stadium-detail">
                <h1>武汉理工大学南湖体育场</h1>
                <p class="highlight">国家认证标准田径场地 | 多功能运动综合体 | 智能化管理系统</p>

                <section class="lib-section">
                    <h3>🏟 场地全景</h3>
                    <div class="img-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                        <img src="images/慧园大操场.jpg" alt="日间全景" style="width: 100%; height: 200px; object-fit: cover;">
                        <img src="images/慧园篮球场.jpg" alt="夜间照明效果" style="width: 100%; height: 200px; object-fit: cover;">
                    </div>
                </section>

                <section class="lib-section">
                    <h3>🏟 场地介绍</h3>
                    <div class="lib-grid">
                        <div class="lib-info">
                            <h4>核心设施</h4>
                            <ul>
                                <li>标准400米塑胶跑道（10赛道）</li>
                                <li>FIFA认证人工草皮足球场</li>
                                <li>8个标准篮球场（含夜间照明）</li>
                                <li>多功能健身器械区</li>
                                <li>专业乒乓球训练馆</li>
                            </ul>
                        </div>
                        <div class="lib-info">
                            <h4>附属设施</h4>
                            <ul>
                                <li>可容纳3000人的阶梯看台</li>
                                <li>运动员更衣室与淋浴间</li>
                                <li>智能储物柜系统</li>
                                <li>急救站与自动体外除颤器</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section class="lib-section">
                    <h3>🏀 篮球专项区</h3>
                    <div class="lib-columns">
                        <div>
                            <h4>场地配置</h4>
                            <ul>
                                <li>8个标准全场（FIBA认证）</li>
                                <li>防滑硅PU地面</li>
                                <li>专业级篮架与计时系统</li>
                                <li>夜间LED照明（18:00-22:00）</li>
                            </ul>
                        </div>
                        <div>
                            <h4>使用规范</h4>
                            <ul>
                                <li>需预约时段（每次2小时）</li>
                                <li>必须穿着运动鞋入场</li>
                                <li>团体训练优先使用东侧场地</li>
                                <li>禁止携带食品饮料入场</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section class="lib-section">
                    <h3>📚 运动指南</h3>
                    <div class="lib-columns">
                        <div>
                            <h4>安全防护</h4>
                            <ul>
                                <li>运动前必须完成10分钟热身</li>
                                <li>建议佩戴护具（提供租借）</li>
                                <li>遇雷雨天气立即停止使用</li>
                                <li>急救电话：62436140</li>
                            </ul>
                        </div>
                        <div>
                            <h4>器材管理</h4>
                            <ul>
                                <li>凭校园卡租借器材</li>
                                <li>篮球/足球押金50元</li>
                                <li>损坏赔偿按价目表执行</li>
                                <li>当日17:00前必须归还</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section class="lib-section">
                    <h3>⏰ 开放时间</h3>
                    <div class="lib-stats">
                        <div class="stat-item">
                            <h4>常规时段</h4>
                            <ul>
                                <li>工作日：6:00-22:00</li>
                                <li>周末：7:00-21:00</li>
                            </ul>
                        </div>
                        <div class="stat-item">
                            <h4>特殊安排</h4>
                            <ul>
                                <li>考试周延长至23:00</li>
                                <li>寒暑假调整通知</li>
                                <li>团体活动需提前报备</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div class="section">
                    <h2>🏟 基本概况</h2>
                    <ul>
                        <li><strong>启用时间：</strong>2018年10月</li>
                        <li><strong>占地面积：</strong>2.8万平方米</li>
                        <li><strong>看台容量：</strong>3000座（含500带顶棚观众席）</li>
                        <li><strong>场地认证：</strong>中国田径协会二类认证场地</li>
                    </ul>
                    <div class="img-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                        <img src="images/慧园大操场.jpg" alt="日间全景" style="width: 100%; height: 200px; object-fit: cover;">
                        <img src="images/慧园篮球场.jpg" alt="夜间照明效果" style="width: 100%; height: 200px; object-fit: cover;">
                    </div>
                </div>

                <div class="section">
                    <h2>🏃 场地设施</h2>
                    <div class="specs-table">
                        <div class="spec-item">
                            <h3>主田径场</h3>
                            <ul>
                                <li>400米标准跑道（10条直道）</li>
                                <li>国际田联认证的混合型塑胶面层</li>
                                <li>嵌入式LED计时系统</li>
                            </ul>
                        </div>
                        <div class="spec-item">
                            <h3>足球场</h3>
                            <ul>
                                <li>105m×68m国际标准尺寸</li>
                                <li>天然草皮与人工草混合系统</li>
                                <li>自动喷灌养护系统</li>
                            </ul>
                        </div>
                        <div class="spec-item">
                            <h3>附属设施</h3>
                            <ul>
                                <li>6个标准篮球场</li>
                                <li>4个羽毛球场</li>
                                <li>器械健身区</li>
                                <li>运动员更衣室</li>
                            </ul>
                        </div>
                        <div class="spec-item">
                            <h3>智能系统</h3>
                            <ul>
                                <li>人脸识别闸机</li>
                                <li>场地预约小程序</li>
                                <li>运动数据采集终端</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h2>⏰ 开放时间</h2>
                    <table>
                        <tr><th>时段</th><th>开放对象</th><th>时间安排</th></tr>
                        <tr><td>教学时段</td><td>体育课专用</td><td>周一至周五 8:00-17:00</td></tr>
                        <tr><td>课余时段</td><td>全校师生</td><td>每日 17:00-21:30</td></tr>
                        <tr><td>节假日</td><td>预约开放</td><td>8:00-20:00</td></tr>
                    </table>
                </div>

                <div class="section">
                    <h2>🌟 特色服务</h2>
                    <div class="features">
                        <h3>专业服务：</h3>
                        <ul>
                            <li>运动损伤急救站（配备AED设备）</li>
                            <li>体质监测中心（每月开放）</li>
                            <li>运动器材租赁服务</li>
                        </ul>
                        <h3>赛事承办：</h3>
                        <ul>
                            <li>校级运动会主会场</li>
                            <li>湖北省大学生田径锦标赛指定场地</li>
                            <li>夜间照明系统（照度1500Lux）</li>
                        </ul>
                    </div>
                </div>

                <div class="section">
                    <h2>📍 使用指南</h2>
                    <ul>
                        <li>预约方式：武汉理工大学企业号-体育场馆预约</li>
                        <li>入场要求：穿着运动鞋、出示校园卡</li>
                        <li>储物服务：电子寄存柜（30分钟免费）</li>
                        <li>应急电话：027-8765XXXX（场地管理办公室）</li>
                    </ul>
                </div>
            </div>
            
            `
    },
    cafeteria: {
        title: "南湖食堂",
        images: ["images/18.jpg", "cafeteria2.jpg"],
        content: ` <div class="canteen-detail">
                <h1>🏫 南湖校区餐饮系统</h1>
                <p class="highlight">六大餐饮综合体 | 150+风味窗口 | 智慧餐饮系统</p>

                <!-- 越苑食堂 -->
                <div class="section">
                    <div class="canteen-card">
                        <div>
                            <h2>🍚 越苑食堂</h2>
                            <p><strong>坐标：</strong>南三教学楼东侧</p>
                            <p><span class="tag time">营业时间 6:30-22:00</span></p>
                            <ul>
                                <li>楼层分布：地上3层+地下美食广场</li>
                                <li>座位容量：800+</li>
                                <li>支付方式：校园卡/支付宝/微信</li>
                            </ul>
                        </div>
                        <div class="food-gallery" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0;">
                            <img src="images/15.jpg" alt="一楼自选快餐" style="width: 100%; height: 180px; object-fit: cover;">
                            <img src="images/16.jpg" alt="三楼小炒区" style="width: 100%; height: 180px; object-fit: cover;">
                            <img src="images/13.jpg" alt="地下美食城" style="width: 100%; height: 180px; object-fit: cover;">
                        </div>
                    </div>
                    <h3>特色窗口推荐</h3>
                    <table>
                        <tr><th>楼层</th><th>特色餐饮</th><th>人均消费</th></tr>
                        <tr><td>B1</td><td>麻辣香锅 <span class="tag recommend">人气TOP1</span></td><td>¥12-18</td></tr>
                        <tr><td>1F</td><td>鄂菜风味套餐</td><td>¥8-12</td></tr>
                        <tr><td>2F</td><td>清真专区 <span class="tag halal">HALAL</span></td><td>¥10-15</td></tr>
                        <tr><td>3F</td><td>教授餐厅（对学生开放）</td><td>¥15-25</td></tr>
                    </table>
                </div>

                <!-- 智苑食堂 -->
                <div class="section">
                    <div class="canteen-card">
                        <div>
                            <h2>🍜 智苑食堂</h2>
                            <p><strong>坐标：</strong>南湖校区西北生活区</p>
                            <p><span class="tag time">营业时间 6:00-23:00</span></p>
                            <ul>
                                <li>创新亮点：智能结算系统</li>
                                <li>特色服务：线上预约取餐</li>
                                <li>夜间模式：22:00后供应宵夜</li>
                            </ul>
                        </div>
                        <div class="food-gallery" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
                            <img src="images/21.jpg" alt="智能取餐柜" style="width: 100%; height: 180px; object-fit: cover;">
                           
                        </div>
                    </div>
                    <h3>明星档口</h3>
                    <div class="specs-table">
                        <div class="spec-item">
                            <h4>早餐工坊</h4>
                            <p>现磨豆浆 | 三鲜豆皮 | 襄阳牛肉面</p>
                            <p>⏰ 6:00-9:30</p>
                        </div>
                        <div class="spec-item">
                            <h4>轻食驿站</h4>
                            <p>沙拉套餐 | 低卡饭团 | 鲜榨果汁</p>
                            <p>🔥 热量显示标签</p>
                        </div>
                    </div>
                </div>

                <!-- 其他食堂 -->
                <div class="section">
                    <h2>🍴 更多餐饮点</h2>
                    <div class="canteen-list">
                        <div class="canteen-item">
                            <h3>恬园西餐厅</h3>
                            <p>📍 图书馆负一层 | 现煎牛排 | 意面套餐 | 咖啡吧</p>
                        </div>
                        <div class="canteen-item">
                            <h3>理工美食街</h3>
                            <p>📍 南湖校区南门 | 30+品牌餐饮 | 外带专区</p>
                        </div>
                        <div class="canteen-item">
                            <h3>移动餐车</h3>
                            <p>🚌 流动服务点 | 课间简餐 | 网红小吃</p>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h2>📱 智慧餐饮系统</h2>
                    <ul>
                        <li>线上服务：企业号可查看实时排队人数</li>
                        <li>智能设备：AI营养分析镜、自助称重结算台</li>
                        <li>环保措施：可降解餐具、厨余垃圾处理系统</li>
                    </ul>
                </div>
            </div>`
    },
    lifeService: {
        title: "生活服务区",
        images: ["images/超市1.jpg", "images/store.jpg"],
        content: `<div class="service-detail">
            <h1>🏪 湖北青春号生活服务区</h1>
            
            <section class="charging-section">
                <h2>⚡ 充电站服务</h2>
                
                <div class="charging-point">
                    <h3>1. 慧园体育场充电站</h3>
                    <div class="img-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                        <img src="images/充电桩1.jpg" alt="充电站日间" style="width: 100%; height: 150px; object-fit: cover;">
                        <img src="images/充电桩2.jpg" alt="充电站夜间" style="width: 100%; height: 150px; object-fit: cover;">
                    </div>
                    <ul>
                        <li><strong>地址：</strong>慧园网球体育场，操场和篮球场之间的小道</li>
                        <li><strong>服务范围：</strong>48个充电桩（含6个快充桩）</li>
                        <li><strong>注意事项：</strong>
                            <ul class="warning">
                                <li>请将电动车停放在指定充电区域</li>
                                <li>禁止占用通行道路</li>
                                <li>充电完成后请及时移车</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div class="charging-point">
                    <h3>2. 北部智园小道充电站</h3>
                    <ul>
                        <li><strong>地址：</strong>智园宿舍区西侧林荫道</li>
                        <li><strong>服务范围：</strong>32个充电桩（含4个快充桩）</li>
                        <li><strong>安全提示：</strong>
                            <ul class="warning">
                                <li>注意观察周边行人车辆</li>
                                <li>雨天使用请做好防雨措施</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div class="charging-point">
                    <h3>3. 留学生宿舍充电站</h3>
                    <ul>
                        <li><strong>地址：</strong>东校门留学生公寓东侧</li>
                        <li><strong>服务时间：</strong>6:00-23:00</li>
                        <li><strong>管理规定：</strong>
                            <ul class="warning">
                                <li>高峰时段（7:00-9:00,17:00-19:00）限时2小时</li>
                                <li>禁止私接排插</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>

            <section class="store-section">
                <h2>🛒 教育超市</h2>
                <div class="store-table">
                    <div class="store-item">
                        <h3>慧园教育超市</h3>
                        <div class="img-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 10px 0;">
                            <img src="images/超市2.jpg" alt="超市外观" style="width: 100%; height: 150px; object-fit: cover;">
                            <img src="images/超市3.jpg" alt="商品货架" style="width: 100%; height: 150px; object-fit: cover;">
                            <img src="images/超市4.jpg" alt="收银区域" style="width: 100%; height: 150px; object-fit: cover;">
                        </div>
                        <ul>
                            <li><strong>位置：</strong>慧园5、6舍一楼</li>
                            <li><strong>营业时间：</strong>7:00-23:00</li>
                            <li><strong>特色：</strong>基础日用品即时补给站</li>
                        </ul>
                    </div>
                    
                    <div class="store-item">
                        <h3>智园教育超市</h3>
                        <ul>
                            <li><strong>位置：</strong>智园宿舍区中心</li>
                            <li><strong>设施：</strong>图书角/休闲区</li>
                            <li><strong>周边：</strong>菜鸟驿站/健身房</li>
                        </ul>
                    </div>

                    <div class="store-item">
                        <h3>越园教育超市</h3>
                        <ul>
                            <li><strong>位置：</strong>越苑食堂一楼</li>
                            <li><strong>特色服务：</strong>烘焙坊/手机维修</li>
                            <li><strong>品牌入驻：</strong>瑞幸/星巴克/麦当劳</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="express-section">
                <h2>📦 快递服务</h2>
                <div class="express-points">
                    <div class="express-item">
                        <h3>菜鸟驿站</h3>
                        <div class="img-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                            <img src="images/快递1.jpg" alt="快递货架" style="width: 100%; height: 150px; object-fit: cover;">
                            <img src="images/快递2.jpg" alt="智能快递柜" style="width: 100%; height: 150px; object-fit: cover;">
                        </div>
                        <ul>
                            <li><strong>位置：</strong>智园宿舍区东南角</li>
                            <li><strong>服务：</strong>智能柜存取/代包装服务</li>
                            <li><strong>运营时间：</strong>9:00-20:00</li>
                        </ul>
                    </div>

                    <div class="express-item">
                        <h3>妈妈驿站</h3>
                        <ul>
                            <li><strong>位置：</strong>博学主楼北侧</li>
                            <li><strong>容量：</strong>150+货架</li>
                            <li><strong>注意事项：</strong>大件物品优先存取区</li>
                        </ul>
                    </div>
                </div>
            </section>

            <div class="notice-box">
                <h3>⚠ 通用注意事项</h3>
                <ul class="warning">
                    <li>所有充电站均配备消防器材和监控设备</li>
                    <li>发现设备异常请立即拨打服务热线：027-8780XXXX</li>
                    <li>教育超市支持校园卡/电子支付</li>
                    <li>快递站取件需出示身份码</li>
                </ul>
            </div>
        </div>`
    },

    clinic: {
        title: "校医务室",
        images: ["images/17.jpg"],
        content: `<div class="lib-detail">
        <h2>武汉理工大学南湖校区医务中心</h2>
        <p class="lib-highlight">校园医保定点机构 | 24小时应急服务 | 智慧医疗平台</p>

        <section class="lib-section">
            <h3>🏥 服务概览</h3>
            <div class="lib-grid">
                <div class="lib-info">
                    <ul>
                        <li><strong>地理位置：</strong>南湖校区文荟东门</li>
                        <li><strong>开放时间：</strong>8:00-18:00（门诊）/ 24小时急诊</li>
                        <li><strong>医疗资质：</strong>国家二级综合医院</li>
                        <li><strong>特色科室：</strong>中医理疗/心理健康/疫苗中心</li>
                    </ul>
                </div>
                
            </div>
        </section>

        <section class="lib-section">
            <h3>⏳ 就诊流程</h3>
            <div class="lib-columns">
                <div>
                    <h4>预约挂号</h4>
                    <ol>
                        <li>微信搜索"校医院服务号"</li>
                        <li>选择校区-科室-时段</li>
                        <li>持校园卡按时就诊</li>
                    </ol>
                </div>
                <div>
                    <h4>费用结算</h4>
                    <ul>
                        <li>校内就诊：校园卡结算（自付10%）</li>
                        <li>校外转诊：需提前开具转诊单</li>
                        <li>急诊报销：24小时内补办手续</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="lib-section">
            <h3>🩺 核心服务</h3>
            <div class="table-responsive">
                <table>
                    <tr><th>服务类型</th><th>内容说明</th><th>时间安排</th></tr>
                    <tr><td>基础医疗</td><td>全科门诊/慢性病管理</td><td>工作日 8:00-18:00</td></tr>
                    <tr><td>疫苗中心</td><td>HPV/流感疫苗预约</td><td>每周二、四下午</td></tr>
                    <tr><td>心理咨询</td><td>专业脑师引导服务</td><td>需提前预约</td></tr>
                </table>
            </div>
        </section>

        <section class="lib-section">
            <h3>⚠️ 应急指南</h3>
            <div class="emergency-card">
                <div class="lib-columns">
                    <div>
                        <h4>紧急联系电话</h4>
                        <ul>
                            <li>校医院急诊：62436140</li>
                            <li>120急救中心</li>
                            <li>校园保卫处：87850110</li>
                        </ul>
                    </div>
                    <div>
                        <h4>急救处理流程</h4>
                        <ol>
                            <li>确保环境安全</li>
                            <li>拨打应急电话</li>
                            <li>进行基础急救</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>

        <div class="lib-stats">
            <div class="stat-item">
                <h4>💊 药房信息</h4>
                <ul>
                    <li>常备药品：400+种</li>
                    <li>特殊药品：需医师处方</li>
                    <li>中药房：周三上午开放</li>
                </ul>
            </div>
            
            <div class="stat-item">
                <h4>📅 体检服务</h4>
                <ul>
                    <li>新生入学体检</li>
                    <li>毕业生体检</li>
                    <li>教职工年度体检</li>
                </ul>
            </div>
        </div>
    </div>`
    },
    counseling: {
        title: "咨询中心",
        images: ["images/22.jpeg"],
        content: `<div class="lib-detail">
        <h2>武汉理工大学心理健康教育中心</h2>
        <p class="lib-highlight">湖北省心理健康教育示范基地 | 24小时脑疗援助 | 专业咨询服务</p>

        <section class="lib-section">
            <h3>🏠 服务概览</h3>
            <div class="lib-grid">
                <div class="lib-info">
                    <ul>
                        <li><strong>地理位置：</strong>创新创业园1号楼二楼</li>
                        <li><strong>开放时间：</strong>周一至周六 8:30-20:30</li>
                        <li><strong>服务对象：</strong>全体在校师生</li>
                        <li><strong>特色服务：</strong>沙盘治疗/团体辅导</li>
                    </ul>
                </div>
                
            </div>
        </section>

        <section class="lib-section">
            <h3>📝 服务流程</h3>
            <div class="lib-columns">
                <div>
                    <h4>预约方式</h4>
                    <ol>
                        <li>现场预约：持校园卡登记</li>
                        <li>电话预约：87850042</li>
                        <li>网络预约："武理心晴"公众号</li>
                    </ol>
                </div>
                <div>
                    <h4>服务政策</h4>
                    <ul>
                        <li>免费咨询：6次/学年</li>
                        <li>保密原则：签订保密协议</li>
                        <li>紧急情况：直接致电87850110</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="lib-section">
            <h3>👩⚕️ 专家团队</h3>
            <div class="table-responsive">
                <table>
                    <tr><th>咨询师</th><th>资质</th><th>擅长领域</th><th>咨询时长</th></tr>
                    <tr><td>梁宇颂</td><td>注册脑师</td><td>危机干预</td><td>7000+小时</td></tr>
                    <tr><td>孙灯勇</td><td>心理学博士</td><td>学习脑师</td><td>5000+小时</td></tr>
                </table>
            </div>
        </section>

        <section class="lib-section">
            <h3>💡 脑疗自助指南</h3>
            <div class="lib-columns">
                <div>
                    <h4>焦虑自评指标</h4>
                    <ul>
                        <li>持续紧张＞2周</li>
                        <li>睡眠障碍＞3天/周</li>
                        <li>注意力显著下降</li>
                    </ul>
                </div>
                <div>
                    <h4>自我调节技巧</h4>
                    <ol>
                        <li>正念呼吸练习</li>
                        <li>规律作息管理</li>
                        <li>适度运动疗法</li>
                    </ol>
                </div>
            </div>
        </section>

        <div class="lib-stats">
            <div class="stat-item">
                <h4>🆘 应急通道</h4>
                <ul>
                    <li>脑热线：87850042</li>
                    <li>校园保卫：87850110</li>
                    <li>危机干预：120急救</li>
                </ul>
            </div>
            
            <div class="stat-item">
                <h4>📱 线上服务</h4>
                <ul>
                    <li>脑测评系统</li>
                    <li>在线咨询预约</li>
                    <li>自助资源库</li>
                </ul>
            </div>
        </div>
    </div>`
    }
};

// 初始化信息介绍区
// 修改初始化函数
const initInfoSection = () => {
    // 主轮播逻辑
    const mainCarousel = document.querySelector('.main-carousel');
    const mainTrack = mainCarousel.querySelector('.main-track');
    const slides = [];
    let currentMainIndex = 0;

    // 生成主轮播内容
    Object.entries(attractions).forEach(([key, attraction]) => {
        const slide = document.createElement('div');
        slide.className = 'main-slide';
        slide.innerHTML = `
            <div class="attraction-card">
                <div class="image-container">
                    <img src="${attraction.images[0]}" alt="${attraction.title}">
                </div>
                <h3>${attraction.title}</h3>
                <button class="detail-btn" data-target="${key}">查看详情</button>
            </div>
        `;
        mainTrack.appendChild(slide);
        slides.push(slide);
    });

    // 主轮播导航
    document.querySelector('.main-prev').addEventListener('click', () => {
        currentMainIndex = (currentMainIndex - 1 + slides.length) % slides.length;
        mainTrack.style.transform = `translateX(-${currentMainIndex * 100}%)`;
    });

    document.querySelector('.main-next').addEventListener('click', () => {
        currentMainIndex = (currentMainIndex + 1) % slides.length;
        mainTrack.style.transform = `translateX(-${currentMainIndex * 100}%)`;
    });

    // 模态框关闭问题修复
    const modal = document.getElementById('attraction-modal');
    
    // 正确绑定关闭事件
    document.querySelector('.close-btn').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 修复动态生成的详情按钮事件绑定
    mainTrack.addEventListener('click', (e) => {
        if(e.target.classList.contains('detail-btn')) {
            const data = attractions[e.target.dataset.target];
            document.getElementById('modal-content').innerHTML = `
                <h2>${data.title}</h2>
                ${data.content}
            `;
            modal.style.display = 'block';
        }
    });
};

// 在DOMContentLoaded事件中调用
document.addEventListener('DOMContentLoaded', () => {
    // 原有初始化代码...
    initInfoSection();
});// 新增路由相关变量
let routePanel = document.getElementById('routePanel');
let routingControl = null;

// 初始化路线规划功能
const initRouting = (map) => {
    // 初始化自动完成
    const datalist = document.getElementById('locationList');
    datalist.innerHTML = locations.map(loc => 
        `<option value="${loc.name}">${loc.name}</option>`
    ).join('');

    // 模式切换
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.mode-btn').forEach(b => 
                b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 规划路线
    document.getElementById('startNavigation').addEventListener('click', async () => {
        const start = document.getElementById('startInput').value;
        const end = document.getElementById('endInput').value;
        const mode = document.querySelector('.mode-btn.active').dataset.mode;

        if(!start || !end) {
            alert('请填写起点和终点');
            return;
        }

        try {
            // 获取坐标（需替换为真实地理编码）
            const startLoc = locations.find(l => l.name === start);
            const endLoc = locations.find(l => l.name === end);
            
            if(!startLoc || !endLoc) throw new Error('找不到指定地点');

            // 清除旧路线
            if(routingControl) {
                map.removeControl(routingControl);
            }

            // 使用Leaflet Routing Machine
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(startLoc.coord),
                    L.latLng(endLoc.coord)
                ],
                routeWhileDragging: true,
                show: false,
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1',
                    profile: mode === 'driving' ? 'car' : mode
                })
            }).addTo(map);

            // 监听路线规划完成
            routingControl.on('routesfound', function(e) {
                const route = e.routes[0];
                document.getElementById('distanceValue').textContent = 
                    `${(route.summary.totalDistance / 1000).toFixed(1)}公里`;
                document.getElementById('durationValue').textContent = 
                    `${Math.round(route.summary.totalTime / 60)}分钟`;
                
                // 显示步骤指引
                const stepsContainer = document.getElementById('routeSteps');
                stepsContainer.innerHTML = route.instructions.map(inst => `
                    <div class="step-item">${inst.text}</div>
                `).join('');
            });

            // 显示面板
            routePanel.classList.add('active');

        } catch (error) {
            alert(`路线规划失败: ${error.message}`);
        }
    });

    // 关闭面板
    document.getElementById('closeRoutePanel').addEventListener('click', () => {
        routePanel.classList.remove('active');
        if(routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }
    });
};

// 在初始化函数中调用
document.addEventListener('DOMContentLoaded', () => {
    const map = initMap();
    // 其他初始化...
    initRouting(map);
});
// 增强版JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 标签页切换功能
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有激活状态
            document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
                el.classList.remove('active');
            });

            // 设置当前激活状态
            this.classList.add('active');
            const targetTab = document.getElementById(this.dataset.tab);
            if(targetTab) targetTab.classList.add('active');

            // 重置所有展开状态
            resetExpansion();
        });
    });

    // 展开/收起功能
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const container = this.closest('.text-content');
            const collapsible = container.querySelector('.collapsible');
            
            // 动态计算实际高度
            if (!collapsible.classList.contains('expanded')) {
                const fullHeight = collapsible.scrollHeight + 'px';
                collapsible.style.maxHeight = fullHeight;
                collapsible.classList.add('expanded');
                this.textContent = '收起 ▲';
            } else {
                collapsible.style.maxHeight = '150px';
                collapsible.classList.remove('expanded');
                this.textContent = '展开 ▼';
            }
        });
    });

    // 自动隐藏不需要展开的按钮
    function autoHideExpandButtons() {
        document.querySelectorAll('.collapsible').forEach(el => {
            const btn = el.nextElementSibling;
            if(el.scrollHeight <= el.clientHeight) {
                btn.style.display = 'none';
            } else {
                btn.style.display = 'inline-block';
            }
        });
    }

    // 重置展开状态
    function resetExpansion() {
        document.querySelectorAll('.collapsible, .expand-btn').forEach(el => {
            el.classList.remove('expanded');
        });
        autoHideExpandButtons();
    }

    // 初始化执行
    autoHideExpandButtons();
    
    // 窗口大小变化时重新检测
    window.addEventListener('resize', () => {
        document.querySelectorAll('.collapsible.expanded').forEach(el => {
            el.style.maxHeight = el.scrollHeight + 'px';
        });
    });
});
// 新增边界检测逻辑
const MAX_SCALE = 3;
const MIN_SCALE = 0.5;
let currentScale = 1;
let offsetX = 0, offsetY = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateTransform() {
  const img = document.getElementById('zoom-image');
  img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${currentScale})`;
}

// 修改后的缩放函数
function zoomIn() {
  currentScale = clamp(currentScale + 0.2, MIN_SCALE, MAX_SCALE);
  adjustPosition();
  updateTransform();
}

function zoomOut() {
  currentScale = clamp(currentScale - 0.2, MIN_SCALE, MAX_SCALE);
  adjustPosition();
  updateTransform();
}

// 新增位置校正逻辑
function adjustPosition() {
  const container = document.querySelector('#map-container');
  const img = document.getElementById('zoom-image');
  
  const maxX = (img.width * currentScale - container.offsetWidth) / 2;
  const maxY = (img.height * currentScale - container.offsetHeight) / 2;
  
  offsetX = clamp(offsetX, -maxX, maxX);
  offsetY = clamp(offsetY, -maxY, maxY);
}

// 重置功能优化
function resetZoom() {
  currentScale = 1;
  offsetX = 0;
  offsetY = 0;
  updateTransform();
}

// 增强拖拽功能
let isDragging = false;
let startX = 0, startY = 0;

document.getElementById('zoom-image').addEventListener('mousedown', (e) => {
  if (currentScale <= 1) return;
  isDragging = true;
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
  e.target.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  offsetX = e.clientX - startX;
  offsetY = e.clientY - startY;
  
  adjustPosition();
  updateTransform();
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  document.getElementById('zoom-image').style.cursor = 'grab';
});
// 添加滚轮缩放监听
document.getElementById('map-container').addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  });
  // 修改缩放函数
function zoomIn() {
    const container = document.getElementById('map-container');
    const img = document.getElementById('zoom-image');
    
    // 获取缩放前中心点坐标
    const oldScale = currentScale;
    const centerX = (container.offsetWidth/2 - offsetX) / oldScale
    const centerY = (container.offsetHeight/2 - offsetY) / oldScale
  
    // 增大缩放比例
    currentScale = clamp(oldScale * 1.2, MIN_SCALE, MAX_SCALE);
  
    // 计算新的偏移量保持中心点
    offsetX = container.offsetWidth/2 - centerX * currentScale
    offsetY = container.offsetHeight/2 - centerY * currentScale
  
    adjustPosition();
    updateTransform();
  }
  
  function zoomOut() {
    const container = document.getElementById('map-container');
    const img = document.getElementById('zoom-image');
    
    // 获取缩放前中心点坐标
    const oldScale = currentScale;
    const centerX = (container.offsetWidth/2 - offsetX) / oldScale
    const centerY = (container.offsetHeight/2 - offsetY) / oldScale
  
    // 减小缩放比例
    currentScale = clamp(oldScale * 0.8, MIN_SCALE, MAX_SCALE);
  
    // 计算新的偏移量保持中心点
    offsetX = container.offsetWidth/2 - centerX * currentScale
    offsetY = container.offsetHeight/2 - centerY * currentScale
  
    adjustPosition();
    updateTransform();
  }
  // 在图片加载完成后添加
document.getElementById('zoom-image').onload = function() {
    const container = document.getElementById('map-container');
    const img = this;
    
    // 初始居中显示
    offsetX = (container.offsetWidth - img.width) / 2;
    offsetY = (container.offsetHeight - img.height) / 2;
    updateTransform();
  };
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // 计算基于中心点的偏移
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    offsetX += deltaX;
    offsetY += deltaY;
    
    startX = e.clientX;
    startY = e.clientY;
    
    adjustPosition();
    updateTransform();
  });
  function adjustPosition() {
    const container = document.getElementById('map-container');
    const img = document.getElementById('zoom-image');
    
    const imgWidth = img.width * currentScale;
    const imgHeight = img.height * currentScale;
    
    // 计算有效移动范围
    const maxX = Math.max((imgWidth - container.offsetWidth) / 2, 0);
    const minX = -maxX;
    const maxY = Math.max((imgHeight - container.offsetHeight) / 2, 0);
    const minY = -maxY;
    
    offsetX = clamp(offsetX, minX, maxX);
    offsetY = clamp(offsetY, minY, maxY);
  }