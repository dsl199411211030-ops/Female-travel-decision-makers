const questions = [
  {
    id: 1,
    category: "目的地偏好",
    question: "喜欢什么类型的旅行目的地？",
    type: "single",
    options: [
      { value: "beach", label: "海岛/沙滩", icon: "🏝️" },
      { value: "mountain", label: "山川/森林/自然公园", icon: "🏔️" },
      { value: "city", label: "大城市/都市商圈", icon: "🏙️" },
      { value: "ancient_town", label: "古镇/古村/历史文化街区", icon: "🏘️" },
      { value: "theme_park", label: "游乐园/动物园/海洋馆", icon: "🎢" },
      { value: "hot_spring", label: "温泉/养生度假村", icon: "♨️" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 2,
    category: "目的地偏好",
    question: "想去国内哪个区域？",
    type: "single",
    options: [
      { value: "around", label: "周边游（车程2-3小时内）", icon: "🏘️" },
      { value: "jiangzhehu", label: "江浙沪（上海/杭州/苏州/南京等）", icon: "🌸" },
      { value: "guangdong", label: "广东/福建/海南（广州/深圳/厦门/三亚等）", icon: "🌴" },
      { value: "southwest", label: "西南（成都/重庆/昆明/大理/丽江等）", icon: "🏔️" },
      { value: "north", label: "北方（北京/天津/西安/东北等）", icon: "❄️" },
      { value: "central", label: "中部（湖北/湖南/安徽/江西等）", icon: "🏯" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 3,
    category: "目的地偏好",
    question: "清明假期想要什么气候体验？",
    type: "single",
    options: [
      { value: "warm_beach", label: "温暖阳光（海边/南方，避开梅雨）", icon: "☀️" },
      { value: "cool_spring", label: "凉爽舒适（山上/湖边/春天踏青）", icon: "🍃" },
      { value: "hot_spring", label: "温泉泡汤（天冷也想泡温泉）", icon: "♨️" },
      { value: "any", label: "无所谓，看心情", icon: "🤷" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 4,
    category: "时间预算",
    question: "清明假期打算玩几天？",
    type: "single",
    options: [
      { value: "3days", label: "3天（4.4-4.6纯假期）", icon: "🗓️" },
      { value: "2days", label: "2天（周末+请假1天）", icon: "📅" },
      { value: "4days", label: "4天（假期+请假1天）", icon: "📆" },
      { value: "5days", label: "5天（假期+请假2天）", icon: "📆" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 5,
    category: "时间预算",
    question: "人均预算大概多少？",
    type: "single",
    options: [
      { value: "low", label: "500以下（穷游/当日往返）", icon: "💵" },
      { value: "medium_low", label: "500-1000（经济实惠）", icon: "💰" },
      { value: "medium", label: "1000-2000（中等水平）", icon: "💸" },
      { value: "medium_high", label: "2000-3000（舒适出行）", icon: "💳" },
      { value: "high", label: "3000-5000（品质游）", icon: "🤑" },
      { value: "luxury", label: "5000以上（奢华度假）", icon: "💎" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 6,
    category: "时间预算",
    question: "出行时间怎么安排？",
    type: "single",
    options: [
      { value: "holiday", label: "清明小长假（4.4-4.6）", icon: "🏮" },
      { value: "before_holiday", label: "4月3日晚上出发+假期", icon: "🌙" },
      { value: "after_holiday", label: "假期结束延后1-2天", icon: "☀️" },
      { value: "paid_leave", label: "请年假凑长假", icon: "✈️" },
      { value: "anytime", label: "不限制，凑到时间就走", icon: "🚀" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 7,
    category: "出行方式",
    question: "偏好哪种交通工具？",
    type: "single",
    options: [
      { value: "plane", label: "飞机（速度快，远距离首选）", icon: "✈️" },
      { value: "highspeed", label: "高铁/动车（舒适准时）", icon: "🚄" },
      { value: "selfdrive", label: "自驾（自由灵活）", icon: "🚗" },
      { value: "train", label: "普通火车（便宜）", icon: "🚃" },
      { value: "bus", label: "大巴/顺风车（便宜）", icon: "🚌" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 8,
    category: "出行方式",
    question: "喜欢什么行程节奏？",
    type: "single",
    options: [
      { value: "very_relaxed", label: "非常轻松（睡到自然醒，一天一个点）", icon: "😴" },
      { value: "relaxed", label: "轻松休闲（睡到自然醒，一天2-3个点）", icon: "😌" },
      { value: "balanced", label: "适中平衡（不赶也不闲）", icon: "⚖️" },
      { value: "intensive", label: "充实紧凑（多走几个地方）", icon: "🏃" },
      { value: "full", label: "满满当当（特种兵式旅游）", icon: "🔥" },
      { value: "any", label: "看情况，随机应变", icon: "🎲" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 9,
    category: "出行方式",
    question: "这次旅行想和谁一起？",
    type: "single",
    options: [
      { value: "boyfriend", label: "和男友", icon: "�" },
      { value: "friends", label: "和闺蜜", icon: "👯" },
      { value: "three_people", label: "三个人一起", icon: "👫" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 10,
    category: "住宿偏好",
    question: "喜欢什么档次的住宿？",
    type: "single",
    options: [
      { value: "hostel", label: "青旅/胶囊旅馆（便宜能住）", icon: "🏨" },
      { value: "budget", label: "经济型酒店（如家/汉庭等）", icon: "🏨" },
      { value: "comfortable", label: "舒适型酒店（四星/精品酒店）", icon: "⭐" },
      { value: "luxury", label: "高档酒店（五星/度假酒店）", icon: "⭐⭐⭐" },
      { value: "bnb", label: "民宿/公寓（有特色像家）", icon: "🏠" },
      { value: "unique", label: "特色住宿（帐篷/树屋/集装箱等）", icon: "⛺" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 11,
    category: "住宿偏好",
    question: "房间有什么要求？",
    type: "single",
    options: [
      { value: "double_bed", label: "大床房（1.5米以上）", icon: "🛏️" },
      { value: "twin_beds", label: "双床房（两张单人床）", icon: "🛏️🛏️" },
      { value: "family_room", label: "家庭房/亲子房（有儿童设施）", icon: "👶" },
      { value: "suite", label: "套房（客厅+卧室分开）", icon: "🏩" },
      { value: "any", label: "无所谓，有地方睡就行", icon: "🤷" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 12,
    category: "住宿偏好",
    question: "住宿位置偏好哪里？",
    type: "single",
    options: [
      { value: "near_scenery", label: "景区里面或旁边（方便游玩）", icon: "🏞️" },
      { value: "near_station", label: "地铁站/火车站附近（交通方便）", icon: "🚇" },
      { value: "city_center", label: "市中心/商业街（逛街吃饭方便）", icon: "🏙️" },
      { value: "quiet", label: "郊区/海边/山里（安静风景好）", icon: "🌳" },
      { value: "any", label: "无所谓，住哪都行", icon: "🤷" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 13,
    category: "住宿偏好",
    question: "想体验什么特色住宿？（可多选，最多3项）",
    type: "multi",
    maxSelect: 3,
    options: [
      { value: "sea_view", label: "海景房/看日出", icon: "🌊" },
      { value: "hot_spring_room", label: "私汤温泉房", icon: "♨️" },
      { value: "tent", label: "帐篷/露营", icon: "⛺" },
      { value: "tree_house", label: "树屋", icon: "🌳" },
      { value: "overwater", label: "水上屋/漂浮屋", icon: "🏝️" },
      { value: "container", label: "集装箱/泡泡屋/星空房", icon: "✨" },
      { value: "traditional", label: "传统民居/老宅（古色古香）", icon: "�" },
      { value: "any", label: "普通酒店就好", icon: "🏨" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 14,
    category: "美食偏好",
    question: "餐饮预算每餐大概多少？",
    type: "single",
    options: [
      { value: "street", label: "路边摊/小吃（20元以下）", icon: "🍡" },
      { value: "normal", label: "普通餐厅（20-50元）", icon: "🍜" },
      { value: "good", label: "好一点餐厅（50-100元）", icon: "🍽️" },
      { value: "nice", label: "特色餐厅（100-200元）", icon: "✨" },
      { value: "michelin", label: "高档餐厅/米其林（200元以上）", icon: "⭐🍽️" },
      { value: "any", label: "看情况，丰俭由人", icon: "🤷" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 15,
    category: "美食偏好",
    question: "口味偏好是什么？",
    type: "single",
    options: [
      { value: "light", label: "清淡养生（少油少盐）", icon: "🥬" },
      { value: "sweet", label: "甜口/甜品为主", icon: "🍰" },
      { value: "spicy", label: "麻辣/重口味（川菜湘菜）", icon: "🌶️" },
      { value: "seafood", label: "海鲜为主", icon: "🦐" },
      { value: "local", label: "当地特色菜（地方菜系）", icon: "🍲" },
      { value: "meat", label: "肉食为主（烧烤/火锅/烤肉）", icon: "🥩" },
      { value: "vegetarian", label: "素食/斋菜", icon: "🥗" },
      { value: "any", label: "无所谓，什么都吃", icon: "🤷" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 16,
    category: "美食偏好",
    question: "必吃的美食类型？（可多选，最多3项）",
    type: "multi",
    maxSelect: 3,
    options: [
      { value: "street_food", label: "街头小吃/夜市", icon: "🍢" },
      { value: "internet_famous", label: "网红餐厅/打卡店", icon: "📸" },
      { value: "local_special", label: "本地人推荐的老店", icon: "👍" },
      { value: "breakfast", label: "早茶/早餐必吃", icon: "�" },
      { value: "seafood", label: "海鲜大餐", icon: "🦞" },
      { value: "hotpot", label: "火锅/串串/冒菜", icon: "�" },
      { value: "bbq", label: "烧烤/烤肉", icon: "🍖" },
      { value: "dimsum", label: "早茶/点心/粤菜", icon: "🥟" },
      { value: "any", label: "走到哪吃到哪", icon: "🚶" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 17,
    category: "景点偏好",
    question: "喜欢什么类型的景点？",
    type: "single",
    options: [
      { value: "nature", label: "自然风光（山/水/森林/草原）", icon: "🏞️" },
      { value: "history", label: "历史古迹/博物馆/寺庙", icon: "🏛️" },
      { value: "city", label: "城市地标/商圈/老街", icon: "🌃" },
      { value: "theme_park", label: "游乐园/游乐场", icon: "🎢" },
      { value: "entertainment", label: "演出/演艺/剧场", icon: "🎭" },
      { value: "instagram", label: "网红打卡点/拍照圣地", icon: "📷" },
      { value: "shopping", label: "购物/奥特莱斯/免税店", icon: "🛍️" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 18,
    category: "景点偏好",
    question: "对门票价格的态度是？",
    type: "single",
    options: [
      { value: "free_only", label: "只去免费景点", icon: "🆓" },
      { value: "free_first", label: "优先免费景点，收费的不太想去", icon: "💰" },
      { value: "worth_it", label: "值得就去，不超过100元", icon: "🎫" },
      { value: "ok_pay", label: "喜欢就买，门票不是问题", icon: "💳" },
      { value: "any", label: "无所谓，看心情", icon: "🤷" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  },
  {
    id: 19,
    category: "景点偏好",
    question: "喜欢怎么逛景点？（可多选，最多3项）",
    type: "multi",
    maxSelect: 3,
    options: [
      { value: "photo", label: "拍照打卡（发朋友圈）", icon: "📸" },
      { value: "deep", label: "深度游览（仔细看慢慢逛）", icon: "🔍" },
      { value: "experience", label: "参与体验（动手/互动/表演）", icon: "🎭" },
      { value: "view_only", label: "远观欣赏（看一眼就走）", icon: "👀" },
      { value: "guide", label: "请导游讲解（听故事）", icon: "📢" },
      { value: "audio_guide", label: "租讲解器/手机讲解", icon: "📱" },
      { value: "self_explore", label: "自己探索发现", icon: "🧭" },
      { value: "no_visit", label: "不去景点，就发呆/逛街", icon: "☕" },
      { value: "other", label: "其他（自己输入）", icon: "✏️", isCustom: true }
    ]
  }
];