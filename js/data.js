// 沖煮方式分類
const BREW_CATEGORIES = {
    pourover: { name: '手沖濾杯', icon: '🫖' },
    immersion: { name: '浸泡萃取', icon: '🍶' },
    pressure: { name: '加壓萃取', icon: '💨' },
    machine: { name: '機器沖煮', icon: '🤖' },
    cold: { name: '冷萃咖啡', icon: '🧊' }
};

// 沖煮方式參數資料
const BREW_METHODS = {
    v60: {
        name: 'V60',
        category: 'pourover',
        ratio: { min: 15, max: 17, default: 16 },
        grind: '中細',
        grindDesc: '類似細砂糖',
        temp: { light: 95, 'medium-light': 93, medium: 92, 'medium-dark': 90, dark: 88 },
        time: '2:30 - 3:00',
        bloomRatio: 2,
        description: '錐形濾杯，流速快，能突顯咖啡明亮的風味'
    },
    kalita: {
        name: 'Kalita Wave',
        category: 'pourover',
        ratio: { min: 15, max: 17, default: 16 },
        grind: '中細',
        grindDesc: '類似細砂糖',
        temp: { light: 95, 'medium-light': 93, medium: 92, 'medium-dark': 90, dark: 88 },
        time: '2:30 - 3:30',
        bloomRatio: 2,
        description: '平底濾杯，萃取均勻，風味平衡'
    },
    chemex: {
        name: 'Chemex',
        category: 'pourover',
        ratio: { min: 15, max: 17, default: 16 },
        grind: '中粗',
        grindDesc: '類似粗砂糖',
        temp: { light: 96, 'medium-light': 95, medium: 94, 'medium-dark': 92, dark: 90 },
        time: '3:30 - 4:30',
        bloomRatio: 2,
        description: '厚濾紙過濾，口感乾淨清澈'
    },
    origami: {
        name: '摺紙濾杯',
        category: 'pourover',
        ratio: { min: 14, max: 17, default: 16 },
        grind: '中細',
        grindDesc: '類似細砂糖',
        temp: { light: 95, 'medium-light': 93, medium: 92, 'medium-dark': 90, dark: 88 },
        time: '2:00 - 3:00',
        bloomRatio: 2,
        description: '可搭配錐形或蛋糕濾紙，風味變化多'
    },
    nel: {
        name: '法蘭絨',
        category: 'pourover',
        ratio: { min: 13, max: 16, default: 15 },
        grind: '中粗',
        grindDesc: '類似粗砂糖',
        temp: { light: 92, 'medium-light': 90, medium: 88, 'medium-dark': 86, dark: 84 },
        time: '3:00 - 4:00',
        bloomRatio: 2,
        description: '絨布過濾，口感絲滑醇厚，風味溫潤'
    },
    clever: {
        name: '聰明濾杯',
        category: 'immersion',
        ratio: { min: 14, max: 17, default: 15 },
        grind: '中',
        grindDesc: '類似粗砂糖',
        temp: { light: 96, 'medium-light': 94, medium: 92, 'medium-dark': 90, dark: 88 },
        time: '2:30 - 4:00',
        bloomRatio: 0,
        description: '浸泡式與濾杯結合，操作簡單穩定'
    },
    frenchpress: {
        name: '法壓壺',
        category: 'immersion',
        ratio: { min: 12, max: 15, default: 14 },
        grind: '粗',
        grindDesc: '類似粗鹽',
        temp: { light: 96, 'medium-light': 95, medium: 94, 'medium-dark': 92, dark: 90 },
        time: '4:00',
        bloomRatio: 0,
        description: '浸泡式萃取，保留油脂，口感厚實'
    },
    siphon: {
        name: '虹吸壺',
        category: 'immersion',
        ratio: { min: 13, max: 16, default: 15 },
        grind: '中細',
        grindDesc: '類似細砂糖',
        temp: { light: 94, 'medium-light': 92, medium: 90, 'medium-dark': 88, dark: 86 },
        time: '1:30 - 2:30',
        bloomRatio: 0,
        description: '真空萃取，風味乾淨明亮，視覺效果佳'
    },
    turkish: {
        name: '土耳其咖啡',
        category: 'immersion',
        ratio: { min: 10, max: 12, default: 10 },
        grind: '極細',
        grindDesc: '類似麵粉',
        temp: { light: 70, 'medium-light': 70, medium: 70, 'medium-dark': 70, dark: 70 },
        time: '3:00 - 5:00',
        bloomRatio: 0,
        description: '不過濾直接飲用，風味濃烈獨特'
    },
    espresso: {
        name: '義式濃縮',
        category: 'pressure',
        ratio: { min: 1.5, max: 2.5, default: 2 },
        grind: '極細',
        grindDesc: '類似細粉',
        temp: { light: 94, 'medium-light': 93, medium: 93, 'medium-dark': 92, dark: 90 },
        time: '25 - 35 秒',
        bloomRatio: 0,
        description: '高壓萃取，濃縮精華'
    },
    moka: {
        name: '摩卡壺',
        category: 'pressure',
        ratio: { min: 7, max: 10, default: 8 },
        grind: '細',
        grindDesc: '比義式稍粗',
        temp: { light: 90, 'medium-light': 90, medium: 90, 'medium-dark': 90, dark: 90 },
        time: '3:00 - 5:00',
        bloomRatio: 0,
        description: '蒸氣壓力萃取，風味濃郁'
    },
    aeropress: {
        name: '愛樂壓',
        category: 'pressure',
        ratio: { min: 12, max: 16, default: 14 },
        grind: '中細',
        grindDesc: '類似細砂糖',
        temp: { light: 92, 'medium-light': 90, medium: 88, 'medium-dark': 85, dark: 82 },
        time: '1:30 - 2:30',
        bloomRatio: 0,
        description: '多變的沖煮方式，可調整參數範圍大'
    },
    phin: {
        name: '越南滴漏',
        category: 'pressure',
        ratio: { min: 5, max: 8, default: 6 },
        grind: '中粗',
        grindDesc: '類似粗砂糖',
        temp: { light: 96, 'medium-light': 96, medium: 96, 'medium-dark': 96, dark: 96 },
        time: '4:00 - 6:00',
        bloomRatio: 0,
        description: '金屬濾網滴漏，濃郁厚實，常搭配煉乳'
    },
    dripmachine: {
        name: '美式滴漏機',
        category: 'machine',
        ratio: { min: 15, max: 18, default: 17 },
        grind: '中',
        grindDesc: '類似粗砂糖',
        temp: { light: 96, 'medium-light': 96, medium: 96, 'medium-dark': 96, dark: 96 },
        time: '4:00 - 6:00',
        bloomRatio: 0,
        description: '全自動萃取，適合大量沖煮'
    },
    coldbrew: {
        name: '冷萃',
        category: 'cold',
        ratio: { min: 8, max: 12, default: 10 },
        grind: '粗',
        grindDesc: '類似粗鹽',
        temp: { light: 4, 'medium-light': 4, medium: 4, 'medium-dark': 4, dark: 4 },
        time: '12 - 24 小時',
        bloomRatio: 0,
        description: '低溫長時間萃取，酸度低，口感滑順'
    },
    icedrip: {
        name: '冰滴',
        category: 'cold',
        ratio: { min: 8, max: 12, default: 10 },
        grind: '中細',
        grindDesc: '類似細砂糖',
        temp: { light: 4, 'medium-light': 4, medium: 4, 'medium-dark': 4, dark: 4 },
        time: '3 - 8 小時',
        bloomRatio: 0,
        description: '冰水逐滴萃取，風味細緻優雅'
    }
};

// 研磨度對照表
const GRIND_SIZES = {
    '極細': { description: '類似麵粉', examples: ['義式濃縮', '土耳其咖啡'] },
    '細': { description: '類似細砂', examples: ['摩卡壺'] },
    '中細': { description: '類似細砂糖', examples: ['手沖', '愛樂壓'] },
    '中': { description: '類似粗砂糖', examples: ['滴漏式咖啡機'] },
    '中粗': { description: '類似粗砂糖', examples: ['Chemex'] },
    '粗': { description: '類似粗鹽', examples: ['法壓壺', '冷萃'] }
};

// 產地風味特色
const ORIGINS = {
    // 非洲
    'ethiopia-yirgacheffe': { name: '衣索比亞 耶加雪菲', flavor: '茉莉花香、檸檬、佛手柑、茶感', acidity: 'high', body: 'light', recommend: '淺焙、高溫、稀比例' },
    'ethiopia-sidamo': { name: '衣索比亞 西達摩', flavor: '藍莓、草莓、花香、柑橘', acidity: 'high', body: 'medium', recommend: '淺焙、V60手沖' },
    'ethiopia-guji': { name: '衣索比亞 古吉', flavor: '熱帶水果、桃子、杏桃、蜂蜜', acidity: 'medium-high', body: 'medium', recommend: '淺中焙、日曬處理更佳' },
    'ethiopia-harrar': { name: '衣索比亞 哈拉', flavor: '藍莓、紅酒、巧克力、野性', acidity: 'medium', body: 'full', recommend: '中焙、法壓壺' },
    'kenya-aa': { name: '肯亞 AA', flavor: '黑醋栗、番茄、葡萄柚、明亮酸質', acidity: 'very-high', body: 'medium', recommend: '淺焙、高溫萃取' },
    'kenya-ab': { name: '肯亞 AB', flavor: '莓果、柑橘、黑醋栗、多汁', acidity: 'high', body: 'medium', recommend: '淺中焙、手沖' },
    'rwanda': { name: '盧安達', flavor: '柳橙、紅茶、蜂蜜、花香', acidity: 'medium-high', body: 'medium', recommend: '淺焙、V60' },
    'burundi': { name: '蒲隆地', flavor: '櫻桃、柑橘、焦糖、絲滑', acidity: 'high', body: 'medium', recommend: '淺焙、手沖' },
    'tanzania': { name: '坦尚尼亞', flavor: '黑醋栗、柑橘、可可、明亮', acidity: 'high', body: 'medium', recommend: '淺中焙' },
    'congo': { name: '剛果', flavor: '熱帶水果、可可、堅果、野性', acidity: 'medium', body: 'full', recommend: '中焙' },
    'ethiopia-limu': { name: '衣索比亞 利姆', flavor: '葡萄酒香、香料、花香、均衡', acidity: 'medium-high', body: 'medium', recommend: '淺中焙、手沖' },
    'ethiopia-jimma': { name: '衣索比亞 金瑪', flavor: '野性、水果、可可、厚實', acidity: 'medium', body: 'full', recommend: '中焙' },
    'ethiopia-nekemte': { name: '衣索比亞 涅坎特', flavor: '水果、花香、酒感、複雜', acidity: 'medium-high', body: 'medium', recommend: '淺焙' },
    'malawi': { name: '馬拉威', flavor: '柑橘、蜂蜜、花香、乾淨', acidity: 'medium-high', body: 'medium', recommend: '淺中焙、手沖' },
    'zambia': { name: '尚比亞', flavor: '柑橘、莓果、花香、明亮', acidity: 'high', body: 'medium', recommend: '淺焙、V60' },
    'uganda': { name: '烏干達', flavor: '巧克力、莓果、香料、厚實', acidity: 'medium', body: 'full', recommend: '中焙' },
    'cameroon': { name: '喀麥隆', flavor: '可可、堅果、香料、醇厚', acidity: 'low-medium', body: 'full', recommend: '中深焙' },
    'ivory-coast': { name: '象牙海岸', flavor: '可可、堅果、泥土、厚重', acidity: 'low', body: 'full', recommend: '深焙、義式' },
    'togo': { name: '多哥', flavor: '可可、堅果、甜感', acidity: 'low-medium', body: 'medium-full', recommend: '中焙' },
    'zimbabwe': { name: '辛巴威', flavor: '柑橘、莓果、花香、明亮', acidity: 'high', body: 'medium', recommend: '淺焙' },

    // 中美洲
    'guatemala-antigua': { name: '瓜地馬拉 安提瓜', flavor: '可可、香料、煙燻、焦糖', acidity: 'medium', body: 'full', recommend: '中深焙、法壓壺' },
    'guatemala-huehue': { name: '瓜地馬拉 薇薇特南果', flavor: '蘋果、太妃糖、花香、乾淨', acidity: 'medium-high', body: 'medium', recommend: '中焙、手沖' },
    'costarica-tarrazu': { name: '哥斯大黎加 塔拉珠', flavor: '杏桃、蜂蜜、柑橘、明亮乾淨', acidity: 'high', body: 'medium', recommend: '淺中焙、蜜處理更佳' },
    'costarica-westvalley': { name: '哥斯大黎加 西部谷地', flavor: '柑橘、紅糖、花香、平衡', acidity: 'medium-high', body: 'medium', recommend: '中焙' },
    'panama-geisha': { name: '巴拿馬 藝伎', flavor: '茉莉花、佛手柑、熱帶水果、茶感、層次豐富', acidity: 'high', body: 'light', recommend: '極淺焙、高溫、稀比例、細細品嚐' },
    'panama-boquete': { name: '巴拿馬 波奎特', flavor: '柑橘、蜂蜜、花香、乾淨', acidity: 'medium-high', body: 'medium', recommend: '淺中焙' },
    'honduras': { name: '宏都拉斯', flavor: '焦糖、可可、堅果、水果', acidity: 'medium', body: 'medium', recommend: '中焙、各種沖煮方式' },
    'elsalvador': { name: '薩爾瓦多', flavor: '可可、焦糖、柳橙、奶油', acidity: 'medium', body: 'medium-full', recommend: '中焙、帕卡瑪拉品種最佳' },
    'nicaragua': { name: '尼加拉瓜', flavor: '可可、柑橘、蜂蜜、奶油', acidity: 'medium', body: 'medium', recommend: '中焙' },
    'mexico': { name: '墨西哥', flavor: '可可、堅果、輕柔果酸', acidity: 'low-medium', body: 'medium', recommend: '中焙、日常飲用' },
    'mexico-chiapas': { name: '墨西哥 恰帕斯', flavor: '柑橘、可可、堅果、乾淨', acidity: 'medium', body: 'medium', recommend: '中焙、手沖' },
    'mexico-oaxaca': { name: '墨西哥 瓦哈卡', flavor: '水果、可可、香料、甜感', acidity: 'medium', body: 'medium', recommend: '中焙' },
    'guatemala-acatenango': { name: '瓜地馬拉 阿卡特南果', flavor: '柑橘、蜂蜜、焦糖、均衡', acidity: 'medium-high', body: 'medium', recommend: '中焙、手沖' },
    'guatemala-coban': { name: '瓜地馬拉 科班', flavor: '香料、可可、水果、厚實', acidity: 'medium', body: 'full', recommend: '中深焙' },
    'honduras-copan': { name: '宏都拉斯 科潘', flavor: '焦糖、可可、柑橘、甜感', acidity: 'medium', body: 'medium', recommend: '中焙' },
    'honduras-marcala': { name: '宏都拉斯 馬卡拉', flavor: '水果、蜂蜜、花香、明亮', acidity: 'medium-high', body: 'medium', recommend: '淺中焙' },
    'elsalvador-apaneca': { name: '薩爾瓦多 阿帕內卡', flavor: '焦糖、可可、柳橙、絲滑', acidity: 'medium', body: 'medium-full', recommend: '中焙' },
    'cuba': { name: '古巴', flavor: '可可、菸草、香料、厚重', acidity: 'low', body: 'full', recommend: '中深焙' },
    'dominican': { name: '多明尼加', flavor: '可可、堅果、香料、醇厚', acidity: 'low-medium', body: 'medium-full', recommend: '中焙' },
    'haiti': { name: '海地', flavor: '可可、香料、水果、濃郁', acidity: 'low-medium', body: 'full', recommend: '中深焙' },
    'puerto-rico': { name: '波多黎各', flavor: '可可、奶油、堅果、甜感', acidity: 'low-medium', body: 'medium-full', recommend: '中焙' },

    // 南美洲
    'colombia-huila': { name: '哥倫比亞 薇拉', flavor: '焦糖、紅蘋果、堅果、甜感佳', acidity: 'medium', body: 'medium-full', recommend: '中焙、蜜處理更甜' },
    'colombia-narino': { name: '哥倫比亞 娜玲瓏', flavor: '柑橘、蔗糖、花香、乾淨', acidity: 'high', body: 'medium', recommend: '淺中焙、手沖' },
    'colombia-cauca': { name: '哥倫比亞 考卡', flavor: '莓果、巧克力、焦糖、平衡', acidity: 'medium-high', body: 'medium', recommend: '中焙' },
    'brazil-santos': { name: '巴西 聖多斯', flavor: '堅果、巧克力、低酸、醇厚', acidity: 'low', body: 'full', recommend: '中深焙、義式綜合' },
    'brazil-mogiana': { name: '巴西 摩吉安納', flavor: '可可、堅果、焦糖、甜感', acidity: 'low', body: 'full', recommend: '中深焙' },
    'brazil-cerrado': { name: '巴西 乾原地區', flavor: '巧克力、堅果、低酸、厚實', acidity: 'low', body: 'full', recommend: '深焙、拿鐵基底' },
    'peru': { name: '秘魯', flavor: '可可、堅果、柔和果酸', acidity: 'low-medium', body: 'medium', recommend: '中焙' },
    'bolivia': { name: '玻利維亞', flavor: '焦糖、蜂蜜、花香、乾淨', acidity: 'medium', body: 'medium', recommend: '淺中焙' },
    'ecuador': { name: '厄瓜多', flavor: '可可、焦糖、果香', acidity: 'medium', body: 'medium', recommend: '中焙' },
    'colombia-santander': { name: '哥倫比亞 桑坦德', flavor: '可可、堅果、焦糖、厚實', acidity: 'medium', body: 'full', recommend: '中深焙' },
    'colombia-tolima': { name: '哥倫比亞 托利馬', flavor: '水果、蜂蜜、花香、均衡', acidity: 'medium-high', body: 'medium', recommend: '中焙、手沖' },
    'brazil-sul-minas': { name: '巴西 南米納斯', flavor: '堅果、焦糖、可可、甜感', acidity: 'low', body: 'full', recommend: '中焙、義式' },
    'venezuela': { name: '委內瑞拉', flavor: '可可、堅果、香料、厚實', acidity: 'low-medium', body: 'full', recommend: '中深焙' },
    'paraguay': { name: '巴拉圭', flavor: '堅果、可可、甜感', acidity: 'low', body: 'medium', recommend: '中焙' },
    'argentina': { name: '阿根廷', flavor: '堅果、可可、輕柔', acidity: 'low', body: 'medium', recommend: '中焙' },

    // 亞洲 / 太平洋
    'indonesia-sumatra': { name: '印尼 蘇門答臘 曼特寧', flavor: '草本、香料、泥土、厚實body、低酸', acidity: 'very-low', body: 'very-full', recommend: '深焙、低溫、法壓壺' },
    'indonesia-java': { name: '印尼 爪哇', flavor: '煙燻、黑巧克力、香料、厚重', acidity: 'low', body: 'full', recommend: '深焙、摩卡壺' },
    'indonesia-sulawesi': { name: '印尼 蘇拉維西', flavor: '香料、可可、泥土、甜感', acidity: 'low', body: 'full', recommend: '中深焙' },
    'indonesia-bali': { name: '印尼 峇里島', flavor: '可可、香料、柑橘、甜感', acidity: 'low-medium', body: 'medium-full', recommend: '中焙' },
    'vietnam': { name: '越南', flavor: '巧克力、堅果、焦糖、厚重', acidity: 'very-low', body: 'very-full', recommend: '深焙、越南滴漏' },
    'yemen': { name: '也門 摩卡', flavor: '紅酒、藍莓乾、野性、複雜', acidity: 'medium', body: 'full', recommend: '中焙、細細品味' },
    'india-malabar': { name: '印度 馬拉巴', flavor: '香料、堅果、泥土、低酸', acidity: 'very-low', body: 'very-full', recommend: '深焙、風漬處理' },
    'india-mysore': { name: '印度 邁索爾', flavor: '香料、可可、甜感', acidity: 'low', body: 'full', recommend: '中深焙' },
    'png': { name: '巴布亞紐幾內亞', flavor: '熱帶水果、可可、香料、厚實', acidity: 'medium', body: 'full', recommend: '中焙' },
    'china-yunnan': { name: '中國 雲南', flavor: '堅果、紅茶、花香、乾淨', acidity: 'medium', body: 'medium', recommend: '中焙' },
    'taiwan-alishan': { name: '台灣 阿里山', flavor: '茶香、花香、柑橘、細緻', acidity: 'medium-high', body: 'light-medium', recommend: '淺焙、手沖' },
    'hawaii-kona': { name: '夏威夷 乳納', flavor: '堅果、奶油、柑橘、絲滑、乾淨', acidity: 'medium', body: 'medium', recommend: '中焙' },
    'jamaica-bluemountain': { name: '牙買加 藍山', flavor: '平衡、柔和果酸、堅果、絲滑', acidity: 'medium', body: 'medium', recommend: '中焙、各種方式' },
    'thailand': { name: '泰國', flavor: '堅果、可可、香料、醇厚', acidity: 'low-medium', body: 'medium-full', recommend: '中焙' },
    'thailand-chiangmai': { name: '泰國 清邁', flavor: '花香、堅果、蜂蜜、柔和', acidity: 'medium', body: 'medium', recommend: '淺中焙、手沖' },
    'myanmar': { name: '緬甸', flavor: '堅果、可可、香料、甜感', acidity: 'low-medium', body: 'medium', recommend: '中焙' },
    'laos': { name: '寮國', flavor: '可可、堅果、香料、厚實', acidity: 'low', body: 'full', recommend: '中深焙' },
    'philippines': { name: '菲律賓', flavor: '可可、水果、堅果、甜感', acidity: 'low-medium', body: 'medium-full', recommend: '中焙' },
    'philippines-benguet': { name: '菲律賓 本格特', flavor: '柑橘、花香、堅果、明亮', acidity: 'medium-high', body: 'medium', recommend: '淺中焙' },
    'timor-leste': { name: '東帝汶', flavor: '可可、香料、泥土、厚重', acidity: 'low', body: 'full', recommend: '中深焙' },
    'nepal': { name: '尼泊爾', flavor: '花香、蜂蜜、柑橘、細緻', acidity: 'medium-high', body: 'light-medium', recommend: '淺焙、手沖' },
    'indonesia-flores': { name: '印尼 弗洛勒斯', flavor: '可可、香料、水果、甜感', acidity: 'medium', body: 'full', recommend: '中焙' },
    'indonesia-gayo': { name: '印尼 迦佑', flavor: '草本、香料、巧克力、厚重', acidity: 'very-low', body: 'very-full', recommend: '深焙、法壓壺' },
    'indonesia-lintong': { name: '印尼 林東', flavor: '草本、可可、香料、泥土', acidity: 'low', body: 'full', recommend: '中深焙' },
    'australia': { name: '澳洲', flavor: '莓果、柑橘、花香、細緻', acidity: 'medium-high', body: 'medium', recommend: '淺中焙、手沖' },
    'china-hainan': { name: '中國 海南', flavor: '堅果、可可、甜感', acidity: 'low', body: 'medium', recommend: '中焙' },
    'china-fujian': { name: '中國 福建', flavor: '茶感、花香、堅果、輕柔', acidity: 'medium', body: 'light-medium', recommend: '淺焙' },
    'taiwan-nantou': { name: '台灣 南投', flavor: '茶香、花香、蜂蜜、細緻', acidity: 'medium-high', body: 'light-medium', recommend: '淺焙、手沖' },
    'taiwan-pingtung': { name: '台灣 屏東', flavor: '可可、堅果、甜感、厚實', acidity: 'low-medium', body: 'medium', recommend: '中焙' },

    // 綜合 / 其他
    'blend-espresso': { name: '義式綜合豆', flavor: '焦糖、可可、堅果、平衡、Crema豐富', acidity: 'low', body: 'full', recommend: '中深焙、義式機、摩卡壺' },
    'blend-breakfast': { name: '早餐綜合豆', flavor: '堅果、焦糖、平衡、易飲', acidity: 'low-medium', body: 'medium', recommend: '中焙、大量沖煮' },
    'blend-house': { name: '自家綜合豆', flavor: '依配方而異', acidity: 'medium', body: 'medium', recommend: '依烘焙度調整' },
    'decaf': { name: '低咖啡因豆', flavor: '依原豆而異，風味略減', acidity: 'low', body: 'medium', recommend: '中焙、晚間飲用' },
    'other': { name: '其他', flavor: '依產地而異', acidity: 'medium', body: 'medium', recommend: '中焙開始嘗試' }
};

// 品種風味特色
const VARIETIES = {
    'typica': { name: '鐵皮卡', flavor: '乾淨、甜感、平衡、優雅', desc: '阿拉比卡原生品種，風味乾淨細緻' },
    'bourbon': { name: '波旁', flavor: '甜感佳、焦糖、奶油、複雜', desc: '經典品種，甜度高，風味複雜' },
    'caturra': { name: '卡杜拉', flavor: '明亮酸質、柑橘、乾淨', desc: '波旁變種，酸質明亮' },
    'catuai': { name: '卡杜阿依', flavor: '平衡、甜感、堅果', desc: '新世界與卡杜拉混種' },
    'geisha': { name: '藝伎', flavor: '茉莉花、佛手柑、茶感、細緻、層次豐富', desc: '最頂級品種，風味獨特迷人' },
    'sl28': { name: 'SL28', flavor: '黑醋栗、番茄、明亮果酸', desc: '肯亞培育品種，酸質驚艷' },
    'sl34': { name: 'SL34', flavor: '莓果、柑橘、厚實', desc: '肯亞品種，醇厚度佳' },
    'pacamara': { name: '帕卡瑪拉', flavor: '花香、柑橘、複雜、絲滑', desc: '薩爾瓦多大顆粒品種' },
    'maragogipe': { name: '象豆', flavor: '柔和、甜感、堅果', desc: '超大顆粒，風味柔和' },
    'mundo-novo': { name: '新世界', flavor: '堅果、可可、低酸', desc: '巴西常見品種' },
    'yellow-bourbon': { name: '黃波旁', flavor: '甜感極佳、水果、蜂蜜', desc: '波旁變種，甜度更高' },
    'red-bourbon': { name: '紅波旁', flavor: '甜感、焦糖、平衡', desc: '經典波旁' },
    'pink-bourbon': { name: '粉紅波旁', flavor: '花香、莓果、複雜', desc: '稀有品種，風味獨特' },
    'java': { name: '爪哇', flavor: '草本、香料、厚實', desc: '印尼品種' },
    'heirloom': { name: '原生種', flavor: '複雜、花香、水果、多變', desc: '衣索比亞原生混種' },
    'castillo': { name: '卡斯提優', flavor: '平衡、堅果、可可', desc: '哥倫比亞抗病品種' },
    'colombia-variety': { name: '哥倫比亞', flavor: '平衡、甜感、乾淨', desc: '哥倫比亞培育品種' },
    'robusta': { name: '羅布斯塔', flavor: '苦味重、堅果、低酸、高咖啡因', desc: '咖啡因含量高，常用於即溶咖啡' },
    'liberica': { name: '賴比瑞亞', flavor: '煙燻、木質、獨特', desc: '稀有品種，風味獨特' },

    // 更多阿拉比卡品種
    'pacas': { name: '帕卡斯', flavor: '甜感、柔和酸質、堅果', desc: '薩爾瓦多波旁自然變種' },
    'villa-sarchi': { name: '薇拉莎奇', flavor: '花香、柑橘、甜感、乾淨', desc: '哥斯大黎加波旁變種' },
    'catimor': { name: '卡提摩', flavor: '平衡、些微澀感、堅果', desc: '抗病混種，產量高' },
    'sarchimor': { name: '薩奇摩', flavor: '平衡、堅果、甜感', desc: '薇拉莎奇與帝汶混種' },
    'kent': { name: '肯特', flavor: '香料、甜感、平衡', desc: '印度鐵皮卡選種' },
    's795': { name: 'S795', flavor: '香料、可可、厚實', desc: '印度培育品種' },
    'ruiru11': { name: 'Ruiru 11', flavor: '莓果、柑橘、明亮', desc: '肯亞抗病高產品種' },
    'batian': { name: '巴提安', flavor: '黑醋栗、莓果、複雜', desc: '肯亞新培育高品質品種' },
    'bourbon-pointu': { name: '波旁尖身', flavor: '花香、柑橘、細緻、低咖啡因', desc: '稀有波旁變種，又名蘿莉娜' },
    'laurina': { name: '蘿莉娜', flavor: '花香、茶感、甜感、低咖啡因', desc: '天然低咖啡因品種' },
    'mokka': { name: '摩卡', flavor: '巧克力、莓果、複雜', desc: '也門小圓豆品種' },
    'maracaturra': { name: '馬拉卡杜拉', flavor: '花香、水果、複雜、絲滑', desc: '象豆與卡杜拉混種' },
    'obata': { name: '歐巴塔', flavor: '堅果、可可、平衡', desc: '巴西抗病品種' },
    'icatu': { name: '伊卡圖', flavor: '堅果、可可、甜感', desc: '巴西培育抗病品種' },
    'acaia': { name: '阿卡亞', flavor: '堅果、焦糖、甜感', desc: '巴西新世界選種' },
    'aramosa': { name: '阿拉摩莎', flavor: '花香、柑橘、細緻', desc: '阿拉比卡與Racemosa混種' },
    'ethiopian-74110': { name: '衣索比亞 74110', flavor: '莓果、花香、複雜', desc: '衣索比亞選種' },
    'ethiopian-74158': { name: '衣索比亞 74158', flavor: '花香、柑橘、乾淨', desc: '衣索比亞選種' },
    'ethiopian-74112': { name: '衣索比亞 74112', flavor: '水果、花香、甜感', desc: '衣索比亞選種' },
    'f1-hybrid': { name: 'F1混種', flavor: '複雜、甜感、高品質', desc: '第一代雜交高產品種' },
    'centroamericano': { name: '中美洲混種', flavor: '花香、水果、複雜', desc: 'F1混種，高品質抗病' },
    'marsellesa': { name: '馬塞列薩', flavor: '平衡、甜感、乾淨', desc: '薩奇摩選種' },
    'parainema': { name: '帕萊內瑪', flavor: '甜感、平衡、堅果', desc: '宏都拉斯抗病品種' },
    'lempira': { name: '藍皮拉', flavor: '堅果、可可、厚實', desc: '宏都拉斯卡提摩選種' },
    'ihcafe90': { name: 'IHCAFE 90', flavor: '堅果、焦糖、平衡', desc: '宏都拉斯培育品種' },
    'tekisic': { name: '特奇希克', flavor: '甜感、平衡、柔和', desc: '薩爾瓦多波旁選種' },
    'sl14': { name: 'SL14', flavor: '莓果、柑橘、乾淨', desc: '肯亞培育品種' },
    'k7': { name: 'K7', flavor: '柑橘、甜感、均衡', desc: '肯亞培育品種' },
    'jackson': { name: '傑克森', flavor: '花香、柑橘、均衡', desc: '盧安達波旁選種' },
    'mibirizi': { name: '米比里茲', flavor: '莓果、花香、複雜', desc: '盧安達波旁選種' },
    'red-catuai': { name: '紅卡杜阿依', flavor: '堅果、甜感、平衡', desc: '卡杜阿依紅果品種' },
    'yellow-catuai': { name: '黃卡杜阿依', flavor: '甜感、柔和、乾淨', desc: '卡杜阿依黃果品種' },
    'tabi': { name: '塔比', flavor: '甜感、花香、複雜', desc: '哥倫比亞混種' },
    'caturra-chiroso': { name: '卡杜拉 奇羅索', flavor: '花香、熱帶水果、細緻', desc: '哥倫比亞稀有變種' },
    'eugenioides': { name: '尤金尼奧德斯', flavor: '極甜、花香、茶感、獨特', desc: '阿拉比卡野生親本' },
    'sidra': { name: '希德拉', flavor: '水果、花香、複雜', desc: '厄瓜多稀有品種' },
    'wush-wush': { name: '烏許烏許', flavor: '花香、茶感、細緻', desc: '衣索比亞稀有品種' },

    'blend': { name: '混合品種', flavor: '依配方而異', desc: '多品種混合' },
    'unknown': { name: '未知', flavor: '依豆款而異', desc: '品種未標示' }
};

// 處理法風味特色
const PROCESSES = {
    // 傳統處理法
    'washed': { name: '水洗', flavor: '乾淨、明亮、酸質清晰、風味純淨', desc: '去除果肉後發酵洗淨，風味最乾淨', effect: 'acidity+, clarity+' },
    'natural': { name: '日曬', flavor: '果香濃郁、甜感高、發酵感、厚實', desc: '帶果肉乾燥，風味濃郁奔放', effect: 'sweetness+, body+, ferment+' },
    'honey-yellow': { name: '黃蜜', flavor: '甜感適中、乾淨、輕微果香', desc: '保留少量果膠乾燥', effect: 'sweetness+, clean' },
    'honey-red': { name: '紅蜜', flavor: '甜感明顯、果香、醇厚', desc: '保留較多果膠', effect: 'sweetness++, body+' },
    'honey-black': { name: '黑蜜', flavor: '甜感濃郁、發酵果香、厚實', desc: '保留最多果膠，接近日曬', effect: 'sweetness+++, ferment+' },
    'wet-hulled': { name: '濕剝法', flavor: '草本、泥土、香料、低酸、厚重', desc: '印尼特有，帶殼去皮乾燥', effect: 'body+++, earthy+' },
    'semi-washed': { name: '半水洗', flavor: '平衡、微甜、乾淨', desc: '結合水洗與蜜處理特點', effect: 'balance+' },

    // 特殊處理法
    'anaerobic': { name: '厭氧發酵', flavor: '熱帶水果、酒香、複雜、獨特發酵風味', desc: '無氧環境發酵，風味獨特', effect: 'ferment+++, complex+' },
    'carbonic': { name: '二氧化碳浸漬', flavor: '紅酒、莓果、發酵香、絲滑', desc: '借鏡葡萄酒工藝', effect: 'wine+, ferment++' },
    'double-ferment': { name: '雙重發酵', flavor: '極複雜、水果炸彈、發酵風味強烈', desc: '多次發酵處理', effect: 'complex+++, ferment+++' },
    'lactic': { name: '乳酸發酵', flavor: '優格、奶油、柔和酸質', desc: '乳酸菌發酵', effect: 'creamy+, soft-acidity' },
    'wine': { name: '酒桶發酵', flavor: '紅酒、威士忌、橡木桶、複雜', desc: '酒桶陳釀處理', effect: 'wine++, complex++' },
    'koji': { name: '麴菌處理', flavor: '清酒、味噌、鮮味、獨特', desc: '日本麴菌發酵', effect: 'umami+, unique+' },
    'thermal-shock': { name: '熱衝擊', flavor: '甜感爆發、乾淨、特殊', desc: '溫度衝擊處理', effect: 'sweetness++, clean+' },

    // 更多蜜處理變體
    'honey-white': { name: '白蜜', flavor: '乾淨、微甜、明亮', desc: '保留極少果膠，接近水洗', effect: 'clean+, sweetness+' },
    'honey-gold': { name: '金蜜', flavor: '蜂蜜、甜感、均衡', desc: '介於黃蜜與紅蜜之間', effect: 'sweetness++, balance+' },

    // 更多特殊發酵處理
    'anaerobic-natural': { name: '厭氧日曬', flavor: '發酵感強烈、果香炸彈、複雜', desc: '無氧環境帶果肉發酵', effect: 'ferment+++, fruit+++' },
    'anaerobic-washed': { name: '厭氧水洗', flavor: '乾淨、發酵香、細緻', desc: '無氧環境去果肉發酵後水洗', effect: 'clean+, ferment++' },
    'anaerobic-honey': { name: '厭氧蜜處理', flavor: '甜感濃郁、發酵果香', desc: '無氧環境保留果膠發酵', effect: 'sweetness+++, ferment++' },
    'extended-ferment': { name: '延長發酵', flavor: '發酵感強、酒香、複雜', desc: '延長發酵時間處理', effect: 'ferment++, wine+' },
    'cold-ferment': { name: '冷發酵', flavor: '乾淨、甜感、細緻發酵', desc: '低溫緩慢發酵', effect: 'clean++, sweet+' },
    'yeast-inoculated': { name: '酵母接種', flavor: '水果、酒香、獨特發酵', desc: '添加特定酵母菌發酵', effect: 'fruit++, unique+' },
    'cinnamon': { name: '肉桂發酵', flavor: '香料、甜感、肉桂調性', desc: '添加肉桂發酵處理', effect: 'spice++, sweet+' },
    'fruit-ferment': { name: '水果發酵', flavor: '熱帶水果、發酵甜感、獨特', desc: '添加水果一起發酵', effect: 'fruit+++, unique++' },

    // 酒桶陳釀系列
    'rum-barrel': { name: '蘭姆酒桶', flavor: '蘭姆酒、焦糖、香料、複雜', desc: '蘭姆酒桶陳釀', effect: 'rum+, complex++' },
    'whiskey-barrel': { name: '威士忌桶', flavor: '威士忌、橡木、香草、複雜', desc: '威士忌酒桶陳釀', effect: 'whiskey+, oak+' },
    'sherry-barrel': { name: '雪莉桶', flavor: '雪莉酒、果乾、堅果、複雜', desc: '雪莉酒桶陳釀', effect: 'sherry+, dried-fruit+' },
    'cognac-barrel': { name: '干邑桶', flavor: '干邑、花香、果香、優雅', desc: '干邑酒桶陳釀', effect: 'cognac+, elegant+' },
    'red-wine-barrel': { name: '紅酒桶', flavor: '紅酒、莓果、單寧、複雜', desc: '紅酒桶陳釀', effect: 'wine++, berry+' },

    // 特殊乾燥處理
    'raised-bed': { name: '非洲棚架日曬', flavor: '乾淨、水果、均勻乾燥', desc: '棚架上均勻日曬', effect: 'clean+, even+' },
    'patio-dried': { name: '庭院日曬', flavor: '傳統、果香、厚實', desc: '水泥地傳統日曬', effect: 'traditional+' },
    'mechanical-dried': { name: '機械乾燥', flavor: '穩定、乾淨、標準', desc: '機器控溫乾燥', effect: 'consistent+' },
    'greenhouse': { name: '溫室乾燥', flavor: '乾淨、穩定、細緻', desc: '溫室環境乾燥', effect: 'clean++, controlled+' },

    // 其他
    'monsooned': { name: '風漬', flavor: '泥土、香料、低酸、厚重、獨特', desc: '印度季風處理', effect: 'body+++, earthy++' },
    'aged': { name: '陳年', flavor: '木質、香料、醇厚、低酸', desc: '長時間儲存陳化', effect: 'body++, mellow+' },
    'pulped-natural': { name: '去皮日曬', flavor: '甜感、果香、乾淨', desc: '去皮後帶果膠日曬', effect: 'sweet++, clean+' },
    'giling-basah': { name: '濕剝處理', flavor: '草本、泥土、香料、厚重', desc: '印尼傳統濕剝法', effect: 'body+++, earthy++' },
    'eco-pulped': { name: '生態去皮', flavor: '乾淨、甜感、環保', desc: '低用水量去皮處理', effect: 'clean+, eco+' },
    'decaf-swiss': { name: '瑞士水處理低咖啡因', flavor: '接近原豆，風味略減', desc: '純水萃取咖啡因', effect: '99.9% decaf' },
    'decaf-co2': { name: '二氧化碳低咖啡因', flavor: '保留較多風味', desc: '超臨界CO2萃取', effect: '99.9% decaf, flavor preserved' },
    'decaf-ea': { name: '甘蔗低咖啡因', flavor: '甜感保留、風味自然', desc: 'EA甘蔗萃取法', effect: '99.9% decaf, sweet' },
    'decaf-mc': { name: '化學溶劑低咖啡因', flavor: '風味略減', desc: '化學溶劑萃取法', effect: '99.9% decaf' },
    'unknown': { name: '未知', flavor: '依處理而異', desc: '處理法未標示', effect: '' }
};

// 預設配方
const DEFAULT_RECIPES = [
    // ===== 經典沖煮方式配方 =====
    {
        id: 'default-1',
        name: '經典 V60',
        method: 'v60',
        coffee: 15,
        water: 250,
        ratio: 16.7,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '通用',
        notes: '適合大多數單品咖啡的經典配方',
        isDefault: true
    },
    {
        id: 'default-2',
        name: '濃郁法壓',
        method: 'frenchpress',
        coffee: 20,
        water: 280,
        ratio: 14,
        roast: 'medium',
        temp: 94,
        grind: '粗',
        origin: '通用',
        notes: '口感厚實，保留咖啡油脂',
        isDefault: true
    },
    {
        id: 'default-3',
        name: '愛樂壓標準',
        method: 'aeropress',
        coffee: 17,
        water: 220,
        ratio: 13,
        roast: 'medium',
        temp: 85,
        grind: '中細',
        origin: '通用',
        notes: '反壓法，萃取時間約2分鐘',
        isDefault: true
    },
    {
        id: 'default-4',
        name: '夏日冷萃',
        method: 'coldbrew',
        coffee: 50,
        water: 500,
        ratio: 10,
        roast: 'medium',
        temp: 4,
        grind: '粗',
        origin: '通用',
        notes: '冷藏浸泡12-18小時，可加水稀釋飲用',
        isDefault: true
    },
    {
        id: 'default-5',
        name: '清爽 Chemex',
        method: 'chemex',
        coffee: 30,
        water: 500,
        ratio: 16.7,
        roast: 'light',
        temp: 96,
        grind: '中粗',
        origin: '通用',
        notes: '適合多人分享，口感乾淨',
        isDefault: true
    },

    // ===== 衣索比亞配方 =====
    {
        id: 'ethiopia-1',
        name: '耶加雪菲 花香手沖',
        method: 'v60',
        coffee: 15,
        water: 240,
        ratio: 16,
        roast: 'light',
        temp: 94,
        grind: '中細',
        origin: '衣索比亞 耶加雪菲',
        notes: '高溫萃取突顯花香與柑橘調，水洗處理法最佳',
        isDefault: true
    },
    {
        id: 'ethiopia-2',
        name: '西達摩 莓果冷萃',
        method: 'coldbrew',
        coffee: 40,
        water: 400,
        ratio: 10,
        roast: 'light',
        temp: 4,
        grind: '粗',
        origin: '衣索比亞 西達摩',
        notes: '冷萃18小時，帶出藍莓與草莓風味',
        isDefault: true
    },
    {
        id: 'ethiopia-3',
        name: '古吉 日曬果香',
        method: 'v60',
        coffee: 16,
        water: 250,
        ratio: 15.6,
        roast: 'light',
        temp: 93,
        grind: '中細',
        origin: '衣索比亞 古吉',
        notes: '日曬豆，發酵果香明顯，稍濃比例提升甜感',
        isDefault: true
    },

    // ===== 肯亞配方 =====
    {
        id: 'kenya-1',
        name: '肯亞 AA 明亮酸質',
        method: 'v60',
        coffee: 15,
        water: 255,
        ratio: 17,
        roast: 'light',
        temp: 95,
        grind: '中細',
        origin: '肯亞 AA',
        notes: '高水溫、稀比例突顯黑醋栗與番茄酸香',
        isDefault: true
    },
    {
        id: 'kenya-2',
        name: '肯亞 Chemex 乾淨',
        method: 'chemex',
        coffee: 25,
        water: 400,
        ratio: 16,
        roast: 'light',
        temp: 96,
        grind: '中粗',
        origin: '肯亞',
        notes: '厚濾紙過濾，口感極為乾淨透亮',
        isDefault: true
    },

    // ===== 哥倫比亞配方 =====
    {
        id: 'colombia-1',
        name: '哥倫比亞 平衡手沖',
        method: 'v60',
        coffee: 15,
        water: 240,
        ratio: 16,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '哥倫比亞',
        notes: '中焙展現堅果與焦糖的平衡風味',
        isDefault: true
    },
    {
        id: 'colombia-2',
        name: '哥倫比亞 法壓厚實',
        method: 'frenchpress',
        coffee: 18,
        water: 270,
        ratio: 15,
        roast: 'medium',
        temp: 94,
        grind: '粗',
        origin: '哥倫比亞',
        notes: '法壓壺帶出奶油般的body與可可尾韻',
        isDefault: true
    },
    {
        id: 'colombia-3',
        name: '薇拉 蜜處理甜感',
        method: 'kalita',
        coffee: 16,
        water: 250,
        ratio: 15.6,
        roast: 'medium',
        temp: 91,
        grind: '中細',
        origin: '哥倫比亞 薇拉',
        notes: '蜜處理豆，Kalita萃取均勻展現蜂蜜甜感',
        isDefault: true
    },

    // ===== 巴西配方 =====
    {
        id: 'brazil-1',
        name: '巴西 堅果巧克力',
        method: 'v60',
        coffee: 16,
        water: 240,
        ratio: 15,
        roast: 'medium',
        temp: 90,
        grind: '中細',
        origin: '巴西',
        notes: '稍濃比例與低溫突顯堅果與巧克力調',
        isDefault: true
    },
    {
        id: 'brazil-2',
        name: '巴西 摩卡壺濃縮',
        method: 'moka',
        coffee: 18,
        water: 150,
        ratio: 8.3,
        roast: 'dark',
        temp: 90,
        grind: '細',
        origin: '巴西',
        notes: '深焙巴西豆適合摩卡壺，濃郁不苦',
        isDefault: true
    },
    {
        id: 'brazil-3',
        name: '巴西 冰滴咖啡',
        method: 'coldbrew',
        coffee: 60,
        water: 500,
        ratio: 8.3,
        roast: 'medium',
        temp: 4,
        grind: '粗',
        origin: '巴西',
        notes: '濃縮冷萃，可加牛奶做成拿鐵',
        isDefault: true
    },

    // ===== 瓜地馬拉配方 =====
    {
        id: 'guatemala-1',
        name: '安提瓜 可可香料',
        method: 'v60',
        coffee: 15,
        water: 235,
        ratio: 15.7,
        roast: 'medium',
        temp: 91,
        grind: '中細',
        origin: '瓜地馬拉 安提瓜',
        notes: '火山土壤孕育的可可與香料風味',
        isDefault: true
    },
    {
        id: 'guatemala-2',
        name: '薇薇特南果 愛樂壓',
        method: 'aeropress',
        coffee: 16,
        water: 200,
        ratio: 12.5,
        roast: 'medium',
        temp: 86,
        grind: '中細',
        origin: '瓜地馬拉 薇薇特南果',
        notes: '愛樂壓濃縮萃取，帶出蘋果與太妃糖風味',
        isDefault: true
    },

    // ===== 印尼配方 =====
    {
        id: 'indonesia-1',
        name: '曼特寧 厚實法壓',
        method: 'frenchpress',
        coffee: 20,
        water: 260,
        ratio: 13,
        roast: 'dark',
        temp: 92,
        grind: '粗',
        origin: '印尼 蘇門答臘 曼特寧',
        notes: '濕剝處理法，草本與香料調，body厚重',
        isDefault: true
    },
    {
        id: 'indonesia-2',
        name: '曼特寧 V60 醇厚',
        method: 'v60',
        coffee: 16,
        water: 224,
        ratio: 14,
        roast: 'dark',
        temp: 88,
        grind: '中',
        origin: '印尼 蘇門答臘 曼特寧',
        notes: '低溫、濃比例，減少苦味突顯醇厚',
        isDefault: true
    },
    {
        id: 'indonesia-3',
        name: '爪哇 摩卡壺',
        method: 'moka',
        coffee: 16,
        water: 130,
        ratio: 8.1,
        roast: 'dark',
        temp: 90,
        grind: '細',
        origin: '印尼 爪哇',
        notes: '經典爪哇深焙，煙燻與黑巧克力',
        isDefault: true
    },

    // ===== 巴拿馬配方 =====
    {
        id: 'panama-1',
        name: '藝伎 精品手沖',
        method: 'v60',
        coffee: 14,
        water: 238,
        ratio: 17,
        roast: 'light',
        temp: 94,
        grind: '中細',
        origin: '巴拿馬 藝伎',
        notes: '稀比例展現茉莉花與佛手柑的細緻風味',
        isDefault: true
    },
    {
        id: 'panama-2',
        name: '翡翠莊園 Chemex',
        method: 'chemex',
        coffee: 22,
        water: 374,
        ratio: 17,
        roast: 'light',
        temp: 95,
        grind: '中粗',
        origin: '巴拿馬 翡翠莊園',
        notes: '乾淨萃取，層次分明的熱帶水果香',
        isDefault: true
    },

    // ===== 哥斯大黎加配方 =====
    {
        id: 'costarica-1',
        name: '塔拉珠 蜂蜜處理',
        method: 'v60',
        coffee: 15,
        water: 240,
        ratio: 16,
        roast: 'light',
        temp: 93,
        grind: '中細',
        origin: '哥斯大黎加 塔拉珠',
        notes: '黃蜜處理，帶出杏桃與蜂蜜甜感',
        isDefault: true
    },
    {
        id: 'costarica-2',
        name: '西部谷地 Kalita',
        method: 'kalita',
        coffee: 16,
        water: 256,
        ratio: 16,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '哥斯大黎加 西部谷地',
        notes: '平底濾杯均勻萃取，柑橘與紅糖平衡',
        isDefault: true
    },

    // ===== 也門配方 =====
    {
        id: 'yemen-1',
        name: '也門 摩卡港',
        method: 'v60',
        coffee: 14,
        water: 224,
        ratio: 16,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '也門',
        notes: '野生風味，紅酒與藍莓乾的複雜層次',
        isDefault: true
    },

    // ===== 盧安達配方 =====
    {
        id: 'rwanda-1',
        name: '盧安達 紅波旁',
        method: 'v60',
        coffee: 15,
        water: 250,
        ratio: 16.7,
        roast: 'light',
        temp: 94,
        grind: '中細',
        origin: '盧安達',
        notes: '紅波旁品種，柳橙與紅茶的優雅風味',
        isDefault: true
    },

    // ===== 特殊處理法配方 =====
    {
        id: 'special-1',
        name: '厭氧發酵 低溫手沖',
        method: 'v60',
        coffee: 15,
        water: 255,
        ratio: 17,
        roast: 'light',
        temp: 90,
        grind: '中細',
        origin: '厭氧發酵豆',
        notes: '低溫避免過萃，展現發酵產生的熱帶水果與酒香',
        isDefault: true
    },
    {
        id: 'special-2',
        name: '雙重發酵 愛樂壓',
        method: 'aeropress',
        coffee: 15,
        water: 180,
        ratio: 12,
        roast: 'light',
        temp: 85,
        grind: '中細',
        origin: '特殊處理法',
        notes: '濃縮萃取突顯複雜發酵風味',
        isDefault: true
    },

    // ===== 義式濃縮配方 =====
    {
        id: 'espresso-1',
        name: '經典義式濃縮',
        method: 'espresso',
        coffee: 18,
        water: 36,
        ratio: 2,
        roast: 'medium',
        temp: 93,
        grind: '極細',
        origin: '義式綜合豆',
        notes: '標準雙份濃縮，萃取時間25-30秒',
        isDefault: true
    },
    {
        id: 'espresso-2',
        name: 'Ristretto 短萃',
        method: 'espresso',
        coffee: 18,
        water: 27,
        ratio: 1.5,
        roast: 'dark',
        temp: 92,
        grind: '極細',
        origin: '深焙綜合豆',
        notes: '更濃縮的風味，萃取時間20-25秒',
        isDefault: true
    },
    {
        id: 'espresso-3',
        name: 'Lungo 長萃',
        method: 'espresso',
        coffee: 18,
        water: 54,
        ratio: 3,
        roast: 'light',
        temp: 94,
        grind: '極細',
        origin: '淺焙單品',
        notes: '較淡但風味層次更多，萃取時間35-40秒',
        isDefault: true
    },
    {
        id: 'espresso-4',
        name: '拿鐵基底',
        method: 'espresso',
        coffee: 18,
        water: 40,
        ratio: 2.2,
        roast: 'medium',
        temp: 93,
        grind: '極細',
        origin: '中焙綜合豆',
        notes: '搭配150-180ml牛奶，風味平衡',
        isDefault: true
    },
    {
        id: 'espresso-5',
        name: '單品 SOE',
        method: 'espresso',
        coffee: 17,
        water: 38,
        ratio: 2.2,
        roast: 'light',
        temp: 94,
        grind: '極細',
        origin: '衣索比亞 耶加雪菲',
        notes: '單一產地濃縮，展現產地特色風味',
        isDefault: true
    },

    // ===== 深焙配方 =====
    {
        id: 'dark-1',
        name: '深焙 摩卡壺',
        method: 'moka',
        coffee: 18,
        water: 144,
        ratio: 8,
        roast: 'dark',
        temp: 90,
        grind: '細',
        origin: '義式綜合豆',
        notes: '適合加牛奶做拿鐵或卡布奇諾',
        isDefault: true
    },
    {
        id: 'dark-2',
        name: '深焙 法壓醇厚',
        method: 'frenchpress',
        coffee: 18,
        water: 234,
        ratio: 13,
        roast: 'dark',
        temp: 90,
        grind: '粗',
        origin: '深焙綜合豆',
        notes: '低溫萃取減少苦味，保留焦糖與可可',
        isDefault: true
    },

    // ===== 綜合豆配方 =====
    {
        id: 'blend-1',
        name: '早餐綜合 大容量',
        method: 'chemex',
        coffee: 42,
        water: 700,
        ratio: 16.7,
        roast: 'medium',
        temp: 93,
        grind: '中粗',
        origin: '早餐綜合豆',
        notes: '適合4-6人分享的早晨咖啡',
        isDefault: true
    },
    {
        id: 'blend-2',
        name: '下午茶 輕盈手沖',
        method: 'v60',
        coffee: 12,
        water: 204,
        ratio: 17,
        roast: 'light',
        temp: 93,
        grind: '中細',
        origin: '淺焙綜合豆',
        notes: '輕盈風味，適合下午搭配甜點',
        isDefault: true
    },

    // ===== 日常杯數配方 =====
    {
        id: 'daily-1',
        name: '單人份 快速手沖',
        method: 'v60',
        coffee: 12,
        water: 200,
        ratio: 16.7,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '日常配方',
        notes: '一人份約200ml，2分鐘快速完成',
        isDefault: true
    },
    {
        id: 'daily-2',
        name: '雙人份 V60',
        method: 'v60',
        coffee: 24,
        water: 400,
        ratio: 16.7,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '日常配方',
        notes: '兩人分享，使用02號濾杯',
        isDefault: true
    },
    {
        id: 'daily-3',
        name: '三人份 Kalita',
        method: 'kalita',
        coffee: 30,
        water: 500,
        ratio: 16.7,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '日常配方',
        notes: '三人分享，Kalita 185濾杯',
        isDefault: true
    },
    {
        id: 'daily-4',
        name: '大容量 法壓壺',
        method: 'frenchpress',
        coffee: 56,
        water: 800,
        ratio: 14.3,
        roast: 'medium',
        temp: 94,
        grind: '粗',
        origin: '日常配方',
        notes: '4-5人份，8杯法壓壺滿壺量',
        isDefault: true
    },

    // ===== 場景配方 =====
    {
        id: 'scene-1',
        name: '晨間提神 濃郁版',
        method: 'v60',
        coffee: 18,
        water: 250,
        ratio: 13.9,
        roast: 'medium',
        temp: 93,
        grind: '中細',
        origin: '日常配方',
        notes: '較濃比例，適合需要提神的早晨',
        isDefault: true
    },
    {
        id: 'scene-2',
        name: '餐後咖啡',
        method: 'aeropress',
        coffee: 15,
        water: 180,
        ratio: 12,
        roast: 'dark',
        temp: 85,
        grind: '中細',
        origin: '日常配方',
        notes: '濃郁不膩，飯後來一杯剛好',
        isDefault: true
    },
    {
        id: 'scene-3',
        name: '週末慢沖',
        method: 'chemex',
        coffee: 25,
        water: 400,
        ratio: 16,
        roast: 'light',
        temp: 95,
        grind: '中粗',
        origin: '精品豆',
        notes: '週末不趕時間，慢慢享受沖煮過程',
        isDefault: true
    },
    {
        id: 'scene-4',
        name: '深夜低咖啡因',
        method: 'coldbrew',
        coffee: 30,
        water: 400,
        ratio: 13.3,
        roast: 'dark',
        temp: 4,
        grind: '粗',
        origin: '低咖啡因豆',
        notes: '使用低咖啡因豆，冷萃8-10小時',
        isDefault: true
    },
    {
        id: 'scene-5',
        name: '辦公室簡易',
        method: 'aeropress',
        coffee: 14,
        water: 200,
        ratio: 14.3,
        roast: 'medium',
        temp: 85,
        grind: '中細',
        origin: '日常配方',
        notes: '愛樂壓方便攜帶，1分半快速完成',
        isDefault: true
    },
    {
        id: 'scene-6',
        name: '露營野外',
        method: 'frenchpress',
        coffee: 20,
        water: 300,
        ratio: 15,
        roast: 'medium',
        temp: 90,
        grind: '粗',
        origin: '日常配方',
        notes: '法壓壺不需濾紙，野外沖煮首選',
        isDefault: true
    },

    // ===== 口味偏好配方 =====
    {
        id: 'taste-1',
        name: '酸甜明亮',
        method: 'v60',
        coffee: 14,
        water: 240,
        ratio: 17.1,
        roast: 'light',
        temp: 95,
        grind: '中細',
        origin: '非洲豆',
        notes: '高溫、稀比例突顯酸質與花果香',
        isDefault: true
    },
    {
        id: 'taste-2',
        name: '醇厚濃郁',
        method: 'v60',
        coffee: 18,
        water: 250,
        ratio: 13.9,
        roast: 'dark',
        temp: 88,
        grind: '中',
        origin: '亞洲豆',
        notes: '低溫、濃比例帶出厚實口感',
        isDefault: true
    },
    {
        id: 'taste-3',
        name: '甜感平衡',
        method: 'kalita',
        coffee: 16,
        water: 260,
        ratio: 16.3,
        roast: 'medium',
        temp: 91,
        grind: '中細',
        origin: '中美洲豆',
        notes: 'Kalita均勻萃取，甜感與平衡兼具',
        isDefault: true
    },
    {
        id: 'taste-4',
        name: '奶香基底',
        method: 'moka',
        coffee: 16,
        water: 120,
        ratio: 7.5,
        roast: 'medium',
        temp: 90,
        grind: '細',
        origin: '中焙綜合豆',
        notes: '濃縮後加熱牛奶，自製拿鐵',
        isDefault: true
    },
    {
        id: 'taste-5',
        name: '冰咖啡基底',
        method: 'v60',
        coffee: 20,
        water: 150,
        ratio: 7.5,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '日常配方',
        notes: '濃縮手沖，直接沖入150g冰塊',
        isDefault: true
    },
    {
        id: 'taste-6',
        name: '清爽解渴',
        method: 'coldbrew',
        coffee: 40,
        water: 500,
        ratio: 12.5,
        roast: 'light',
        temp: 4,
        grind: '粗',
        origin: '淺焙豆',
        notes: '冷萃後加氣泡水，清爽消暑',
        isDefault: true
    },

    // ===== 新手入門配方 =====
    {
        id: 'beginner-1',
        name: '新手入門 V60',
        method: 'v60',
        coffee: 15,
        water: 250,
        ratio: 16.7,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '入門推薦',
        notes: '最標準的參數，從這開始學習',
        isDefault: true
    },
    {
        id: 'beginner-2',
        name: '新手入門 法壓',
        method: 'frenchpress',
        coffee: 15,
        water: 225,
        ratio: 15,
        roast: 'medium',
        temp: 94,
        grind: '粗',
        origin: '入門推薦',
        notes: '法壓壺最簡單，泡4分鐘按下即可',
        isDefault: true
    },
    {
        id: 'beginner-3',
        name: '新手入門 愛樂壓',
        method: 'aeropress',
        coffee: 15,
        water: 200,
        ratio: 13.3,
        roast: 'medium',
        temp: 85,
        grind: '中細',
        origin: '入門推薦',
        notes: '正壓法，攪拌後直接壓出',
        isDefault: true
    },
    {
        id: 'beginner-4',
        name: '懶人冷萃',
        method: 'coldbrew',
        coffee: 50,
        water: 500,
        ratio: 10,
        roast: 'medium',
        temp: 4,
        grind: '粗',
        origin: '入門推薦',
        notes: '晚上泡，早上喝，零技巧需求',
        isDefault: true
    },

    // ===== 進階玩家配方 =====
    {
        id: 'advanced-1',
        name: '四六沖煮法',
        method: 'v60',
        coffee: 20,
        water: 300,
        ratio: 15,
        roast: 'light',
        temp: 93,
        grind: '粗',
        origin: '進階技法',
        notes: '粕谷哲四六法：60+60+60+60+60ml分段注水',
        isDefault: true
    },
    {
        id: 'advanced-2',
        name: '一刀流',
        method: 'v60',
        coffee: 16,
        water: 240,
        ratio: 15,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '進階技法',
        notes: '悶蒸後一次注完，考驗水流控制',
        isDefault: true
    },
    {
        id: 'advanced-3',
        name: '點滴式冰滴',
        method: 'coldbrew',
        coffee: 40,
        water: 400,
        ratio: 10,
        roast: 'medium',
        temp: 4,
        grind: '中細',
        origin: '進階技法',
        notes: '冰滴壺，每秒1滴，萃取3-4小時',
        isDefault: true
    },
    {
        id: 'advanced-4',
        name: 'Bypass 旁通法',
        method: 'v60',
        coffee: 20,
        water: 200,
        ratio: 10,
        roast: 'light',
        temp: 94,
        grind: '中細',
        origin: '進階技法',
        notes: '先濃縮萃取，再加100ml熱水稀釋',
        isDefault: true
    },
    {
        id: 'advanced-5',
        name: '冰火手沖',
        method: 'v60',
        coffee: 20,
        water: 200,
        ratio: 10,
        roast: 'light',
        temp: 94,
        grind: '中細',
        origin: '進階技法',
        notes: '下壺放100g冰塊，熱沖直接急冷',
        isDefault: true
    },

    // ===== 季節配方 =====
    {
        id: 'season-1',
        name: '夏日冰美式',
        method: 'aeropress',
        coffee: 18,
        water: 100,
        ratio: 5.6,
        roast: 'medium',
        temp: 85,
        grind: '中細',
        origin: '夏季配方',
        notes: '濃縮後加滿冰塊和冷水至300ml',
        isDefault: true
    },
    {
        id: 'season-2',
        name: '夏日氣泡咖啡',
        method: 'coldbrew',
        coffee: 50,
        water: 400,
        ratio: 8,
        roast: 'light',
        temp: 4,
        grind: '粗',
        origin: '夏季配方',
        notes: '冷萃原液加氣泡水1:2，加檸檬片',
        isDefault: true
    },
    {
        id: 'season-3',
        name: '冬日熱拿鐵',
        method: 'moka',
        coffee: 18,
        water: 150,
        ratio: 8.3,
        roast: 'dark',
        temp: 90,
        grind: '細',
        origin: '冬季配方',
        notes: '摩卡壺萃取後加熱牛奶180ml',
        isDefault: true
    },
    {
        id: 'season-4',
        name: '秋日肉桂咖啡',
        method: 'frenchpress',
        coffee: 18,
        water: 270,
        ratio: 15,
        roast: 'medium',
        temp: 94,
        grind: '粗',
        origin: '秋季配方',
        notes: '沖煮時加入肉桂棒一起浸泡',
        isDefault: true
    },

    // ===== 特調基底配方 =====
    {
        id: 'base-1',
        name: '髒咖啡基底',
        method: 'espresso',
        coffee: 18,
        water: 30,
        ratio: 1.7,
        roast: 'dark',
        temp: 92,
        grind: '極細',
        origin: '特調基底',
        notes: '短萃濃縮，倒入冰牛奶上層',
        isDefault: true
    },
    {
        id: 'base-2',
        name: '阿芙佳朵基底',
        method: 'espresso',
        coffee: 18,
        water: 36,
        ratio: 2,
        roast: 'medium',
        temp: 93,
        grind: '極細',
        origin: '特調基底',
        notes: '標準濃縮，淋在香草冰淇淋上',
        isDefault: true
    },
    {
        id: 'base-3',
        name: '咖啡調酒基底',
        method: 'coldbrew',
        coffee: 80,
        water: 500,
        ratio: 6.25,
        roast: 'medium',
        temp: 4,
        grind: '粗',
        origin: '特調基底',
        notes: '超濃縮冷萃，適合調酒使用',
        isDefault: true
    },
    {
        id: 'base-4',
        name: '咖啡歐蕾基底',
        method: 'v60',
        coffee: 20,
        water: 150,
        ratio: 7.5,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '特調基底',
        notes: '濃縮手沖，與等量熱牛奶混合',
        isDefault: true
    },

    // ===== 虹吸壺配方 =====
    {
        id: 'siphon-1',
        name: '虹吸壺 經典',
        method: 'siphon',
        coffee: 20,
        water: 300,
        ratio: 15,
        roast: 'medium',
        temp: 90,
        grind: '中細',
        origin: '通用',
        notes: '真空萃取，風味乾淨明亮',
        isDefault: true
    },
    {
        id: 'siphon-2',
        name: '虹吸壺 淺焙果香',
        method: 'siphon',
        coffee: 18,
        water: 270,
        ratio: 15,
        roast: 'light',
        temp: 94,
        grind: '中細',
        origin: '衣索比亞',
        notes: '展現淺焙豆的花果香氣',
        isDefault: true
    },

    // ===== 聰明濾杯配方 =====
    {
        id: 'clever-1',
        name: '聰明濾杯 標準',
        method: 'clever',
        coffee: 18,
        water: 270,
        ratio: 15,
        roast: 'medium',
        temp: 92,
        grind: '中',
        origin: '通用',
        notes: '浸泡3分鐘，操作簡單穩定',
        isDefault: true
    },
    {
        id: 'clever-2',
        name: '聰明濾杯 濃郁版',
        method: 'clever',
        coffee: 20,
        water: 280,
        ratio: 14,
        roast: 'medium',
        temp: 94,
        grind: '中',
        origin: '哥倫比亞',
        notes: '延長浸泡至4分鐘，口感更厚實',
        isDefault: true
    },

    // ===== 摺紙濾杯配方 =====
    {
        id: 'origami-1',
        name: '摺紙濾杯 花香手沖',
        method: 'origami',
        coffee: 15,
        water: 240,
        ratio: 16,
        roast: 'light',
        temp: 94,
        grind: '中細',
        origin: '衣索比亞 耶加雪菲',
        notes: '使用錐形濾紙，突顯花香',
        isDefault: true
    },
    {
        id: 'origami-2',
        name: '摺紙濾杯 平衡沖煮',
        method: 'origami',
        coffee: 16,
        water: 256,
        ratio: 16,
        roast: 'medium',
        temp: 92,
        grind: '中細',
        origin: '通用',
        notes: '使用蛋糕濾紙，萃取均勻',
        isDefault: true
    },

    // ===== 越南滴漏配方 =====
    {
        id: 'phin-1',
        name: '越南咖啡 經典',
        method: 'phin',
        coffee: 25,
        water: 150,
        ratio: 6,
        roast: 'dark',
        temp: 96,
        grind: '中粗',
        origin: '越南',
        notes: '加入2大匙煉乳，攪拌享用',
        isDefault: true
    },
    {
        id: 'phin-2',
        name: '越南冰咖啡',
        method: 'phin',
        coffee: 25,
        water: 120,
        ratio: 4.8,
        roast: 'dark',
        temp: 96,
        grind: '中粗',
        origin: '越南',
        notes: '濃縮萃取後倒入冰塊杯，加煉乳',
        isDefault: true
    },

    // ===== 土耳其咖啡配方 =====
    {
        id: 'turkish-1',
        name: '土耳其咖啡 傳統',
        method: 'turkish',
        coffee: 10,
        water: 100,
        ratio: 10,
        roast: 'medium',
        temp: 70,
        grind: '極細',
        origin: '通用',
        notes: '可加糖和小豆蔻，重複加熱2-3次',
        isDefault: true
    },

    // ===== 法蘭絨配方 =====
    {
        id: 'nel-1',
        name: '法蘭絨 醇厚手沖',
        method: 'nel',
        coffee: 20,
        water: 300,
        ratio: 15,
        roast: 'medium',
        temp: 88,
        grind: '中粗',
        origin: '通用',
        notes: '緩慢注水，口感絲滑醇厚',
        isDefault: true
    },
    {
        id: 'nel-2',
        name: '法蘭絨 日式喫茶',
        method: 'nel',
        coffee: 18,
        water: 270,
        ratio: 15,
        roast: 'medium',
        temp: 86,
        grind: '中粗',
        origin: '巴西',
        notes: '低溫慢沖，展現巴西豆的堅果甜感',
        isDefault: true
    },

    // ===== 美式滴漏機配方 =====
    {
        id: 'dripmachine-1',
        name: '美式滴漏 日常',
        method: 'dripmachine',
        coffee: 30,
        water: 500,
        ratio: 16.7,
        roast: 'medium',
        temp: 96,
        grind: '中',
        origin: '早餐綜合豆',
        notes: '4-6杯份量，適合家庭或辦公室',
        isDefault: true
    },
    {
        id: 'dripmachine-2',
        name: '美式滴漏 大壺',
        method: 'dripmachine',
        coffee: 60,
        water: 1000,
        ratio: 16.7,
        roast: 'medium',
        temp: 96,
        grind: '中',
        origin: '自家綜合豆',
        notes: '8-12杯大壺量，適合聚會',
        isDefault: true
    },

    // ===== 冰滴配方 =====
    {
        id: 'icedrip-1',
        name: '冰滴 經典',
        method: 'icedrip',
        coffee: 40,
        water: 400,
        ratio: 10,
        roast: 'medium',
        temp: 4,
        grind: '中細',
        origin: '通用',
        notes: '每秒1滴，萃取約4小時',
        isDefault: true
    },
    {
        id: 'icedrip-2',
        name: '冰滴 精品風味',
        method: 'icedrip',
        coffee: 50,
        water: 500,
        ratio: 10,
        roast: 'light',
        temp: 4,
        grind: '中細',
        origin: '衣索比亞 古吉',
        notes: '淺焙豆冰滴，果香細緻',
        isDefault: true
    }
];

// 沖煮指南步驟
const BREW_GUIDES = {
    v60: {
        title: 'V60 手沖指南',
        intro: 'V60 是由日本 Hario 公司設計的經典錐形濾杯，以其獨特的 60 度角和螺旋肋骨聞名。V60 的設計讓空氣能夠順暢流通，搭配大孔徑能夠精準控制流速，非常適合展現咖啡豆的風土特色。這是一款需要技巧但回報豐富的沖煮器具。',
        equipment: ['V60 濾杯', '濾紙', '手沖壺（細嘴壺）', '電子秤', '計時器', '磨豆機', '分享壺'],
        params: {
            coffee: '15g',
            water: '250ml',
            ratio: '1:15-17',
            grind: '中細研磨（砂糖粗細）',
            temp: '90-96°C',
            time: '2:00-2:30'
        },
        steps: [
            {
                title: '準備器具',
                description: '將濾紙放入濾杯，摺疊濾紙接縫處。用熱水沖洗濾紙 10-15 秒，去除紙味並預熱濾杯和下壺。倒掉預熱水。',
                time: null,
                detail: '預熱非常重要，能避免沖煮時溫度驟降影響萃取。沖洗濾紙也能讓濾紙更貼合濾杯。'
            },
            {
                title: '放入咖啡粉',
                description: '倒入研磨好的咖啡粉，輕敲濾杯側面 2-3 下使粉面平整。用手指在粉中間輕壓一個小凹槽，放上電子秤歸零。',
                time: null,
                detail: '中間的小凹槽有助於悶蒸時水分均勻分布到所有咖啡粉。'
            },
            {
                title: '悶蒸',
                description: '從中心的凹槽開始，以極細水流緩慢向外畫圓注水。水量約為咖啡粉的 2-2.5 倍（30-40ml）。觀察咖啡粉膨脹（稱為「開花」）。',
                time: '0:00 - 0:30',
                detail: '新鮮的咖啡豆會明顯膨脹冒泡，這是 CO2 釋放的現象。悶蒸能讓 CO2 先行釋放，避免影響後續萃取的均勻性。'
            },
            {
                title: '第一次注水',
                description: '悶蒸結束後，從中心開始以穩定細水流緩慢畫同心圓向外注水，到達邊緣前折返。注至總水量的 60%（約 150ml），保持水位穩定。',
                time: '0:30 - 1:15',
                detail: '畫圓時避免直接沖到濾紙，這會導致水直接流下而非通過咖啡粉。水流要穩定，高度保持一致。'
            },
            {
                title: '第二次注水',
                description: '等水位下降至咖啡粉面時，進行第二次注水。同樣從中心畫圓，注至目標水量（250ml）。',
                time: '1:15 - 2:00',
                detail: '第二次注水可以稍微加快速度，但仍要保持穩定。整體水位不要過高，約保持在粉面上 1-2 公分。'
            },
            {
                title: '等待萃取完成',
                description: '停止注水後，等待所有咖啡液滴完。理想總時間約 2:00-2:30。移開濾杯，輕輕搖晃分享壺使咖啡均勻混合。',
                time: '2:00 - 2:30',
                detail: '觀察濾杯底部的咖啡渣，理想狀態是平整的粉床，沒有明顯的高低差或通道。'
            }
        ],
        tips: [
            { icon: '💡', text: '水流控制是關鍵：保持穩定的細水流，水柱高度約離粉面 3-5 公分' },
            { icon: '🌡️', text: '淺焙豆用高溫（93-96°C），深焙豆用低溫（88-91°C）' },
            { icon: '⏱️', text: '萃取時間過長表示研磨太細或注水太慢，時間過短則相反' },
            { icon: '🔄', text: '每次注水後可輕輕旋轉濾杯，幫助咖啡粉均勻萃取' },
            { icon: '☕', text: '使用新鮮烘焙的咖啡豆（烘焙後 7-21 天最佳）' }
        ],
        troubleshooting: [
            { problem: '咖啡太酸', solution: '提高水溫 2-3°C、研磨更細、延長萃取時間、降低水粉比' },
            { problem: '咖啡太苦', solution: '降低水溫 2-3°C、研磨更粗、縮短萃取時間、提高水粉比' },
            { problem: '風味平淡', solution: '使用更新鮮的豆子、增加咖啡粉量、提高水溫' },
            { problem: '萃取時間過長（>3分鐘）', solution: '研磨度調粗、加快注水速度' },
            { problem: '萃取時間過短（<2分鐘）', solution: '研磨度調細、放慢注水速度' },
            { problem: '粉床不平整有通道', solution: '注水時畫圓更均勻、悶蒸要完整、檢查研磨均勻度' }
        ]
    },
    frenchpress: {
        title: '法壓壺沖煮指南',
        intro: '法壓壺（French Press）是最簡單直接的浸泡式萃取方法，發明於 1929 年的義大利。咖啡粉完全浸泡在熱水中，金屬濾網保留了咖啡油脂，帶來濃郁厚實的口感。這是一款非常適合新手的器具，穩定性高且容錯率大。',
        equipment: ['法壓壺', '電子秤', '計時器', '磨豆機', '熱水壺', '攪拌匙'],
        params: {
            coffee: '30g',
            water: '500ml',
            ratio: '1:15-17',
            grind: '粗研磨（粗砂糖或海鹽粗細）',
            temp: '92-96°C',
            time: '4:00'
        },
        steps: [
            {
                title: '預熱法壓壺',
                description: '倒入熱水預熱法壓壺約 30 秒，然後將水倒掉。預熱能保持萃取溫度穩定。',
                time: null,
                detail: '法壓壺通常是玻璃材質，不預熱會造成約 5-10°C 的溫降。'
            },
            {
                title: '放入咖啡粉',
                description: '倒入粗研磨的咖啡粉。法壓壺需要粗研磨以避免細粉穿過濾網，同時避免過度萃取。',
                time: null,
                detail: '研磨度很重要：太細會讓咖啡過苦且有很多細粉，太粗則萃取不足風味淡薄。'
            },
            {
                title: '注水',
                description: '將熱水以穩定速度倒入，確保所有咖啡粉都被浸濕。可以採用繞圈方式注水以確保均勻。',
                time: '0:00',
                detail: '水溫建議 92-96°C。剛煮沸的水可以放置 30 秒再使用。'
            },
            {
                title: '攪拌破渣',
                description: '等待 30 秒讓咖啡粉「開花」釋放氣體，然後用湯匙輕輕攪拌 3-4 下，讓浮在水面的咖啡粉沉入水中。',
                time: '0:30',
                detail: '攪拌要輕柔，目的是讓所有咖啡粉均勻接觸水，而不是劇烈攪動。'
            },
            {
                title: '蓋上蓋子浸泡',
                description: '蓋上蓋子但不要壓下濾網，讓濾網剛好接觸水面。靜置等待萃取。',
                time: '0:30 - 4:00',
                detail: '標準浸泡時間是 4 分鐘。喜歡淡一點可以縮短到 3 分鐘，喜歡濃一點可以延長到 5 分鐘。'
            },
            {
                title: '壓下濾網倒出',
                description: '時間到後，緩慢且穩定地壓下濾網（約 15-20 秒完成）。壓到底後立即將咖啡全部倒出。',
                time: '4:00',
                detail: '壓濾網時如果阻力很大，表示研磨太細。咖啡不要留在壺中，否則會持續萃取變苦。'
            }
        ],
        tips: [
            { icon: '💡', text: '使用粗研磨是關鍵，細粉會讓咖啡混濁且苦澀' },
            { icon: '⏱️', text: '浸泡 4 分鐘是經典時間，可依口味調整 3-5 分鐘' },
            { icon: '🥄', text: '進階技巧：浸泡結束前撈掉浮在水面的泡沫和細粉，口感更乾淨' },
            { icon: '☕', text: '法壓壺咖啡油脂豐富，非常適合搭配牛奶做拿鐵' },
            { icon: '🧹', text: '每次使用後要徹底清洗濾網，咖啡油脂會殘留變質' }
        ],
        troubleshooting: [
            { problem: '咖啡有很多細粉渣', solution: '研磨度調粗、使用品質較好的磨豆機、壓濾網時放慢速度' },
            { problem: '咖啡太苦', solution: '縮短浸泡時間、研磨度調粗、降低水溫' },
            { problem: '咖啡太淡', solution: '延長浸泡時間、增加咖啡粉量、研磨度稍細' },
            { problem: '壓濾網很難壓', solution: '研磨度太細，需要調粗' },
            { problem: '咖啡有油耗味', solution: '法壓壺和濾網沒有清洗乾淨，殘留的咖啡油脂氧化了' }
        ]
    },
    aeropress: {
        title: '愛樂壓沖煮指南（反壓法）',
        intro: '愛樂壓（AeroPress）是 2005 年由飛盤發明家 Alan Adler 設計的創新沖煮器具。它結合了浸泡與加壓萃取的優點，能在短時間內沖煮出濃郁乾淨的咖啡。輕便耐摔的特性讓它成為旅行者的最愛，也是世界愛樂壓大賽的主角。',
        equipment: ['AeroPress', '濾紙', '電子秤', '計時器', '磨豆機', '攪拌棒', '手沖壺'],
        params: {
            coffee: '15-18g',
            water: '200-250ml',
            ratio: '1:12-15',
            grind: '中細研磨（細砂糖粗細）',
            temp: '80-96°C',
            time: '1:30-2:30'
        },
        steps: [
            {
                title: '組裝（反壓法）',
                description: '將活塞插入沖煮筒底部約 1-2cm，形成密封。將整個裝置倒置放在秤上，數字朝向自己。',
                time: null,
                detail: '反壓法能讓咖啡粉完全浸泡在水中，萃取更均勻。活塞不要插太深，約 1-2cm 形成密封即可。'
            },
            {
                title: '放入咖啡粉',
                description: '倒入中細研磨的咖啡粉（約 15-18g），輕敲側面使粉面平整。',
                time: null,
                detail: '研磨度可根據個人口味調整：喜歡濃郁用細一點，喜歡清爽用粗一點。'
            },
            {
                title: '注水與攪拌',
                description: '快速倒入 80-96°C 的熱水至目標水量（約 200ml），用攪拌棒快速攪拌 3-5 下確保咖啡粉完全浸濕。',
                time: '0:00 - 0:10',
                detail: '水溫影響風味：高溫萃取更完整但可能偏苦，低溫口感更柔和。比賽常用 80°C 左右的低溫。'
            },
            {
                title: '等待萃取',
                description: '蓋上濾蓋（先用熱水沖濕濾紙），靜置等待萃取。總浸泡時間約 1-1.5 分鐘。',
                time: '0:10 - 1:30',
                detail: '可以在浸泡中段（約 45 秒）再攪拌一次，增加萃取均勻度。'
            },
            {
                title: '翻轉壓出',
                description: '小心翻轉愛樂壓放在杯子上，穩定且緩慢地壓下活塞。壓出時間約 20-30 秒。聽到嘶嘶聲就停止。',
                time: '1:30 - 2:00',
                detail: '壓太快會增加細粉和苦味，壓太慢咖啡會變冷。保持穩定的力道最重要。'
            }
        ],
        tips: [
            { icon: '💡', text: '反壓法是最受歡迎的方法，萃取更均勻且不易漏水' },
            { icon: '🌡️', text: '嘗試 80-85°C 的低溫沖煮，會得到更甜、更少苦味的咖啡' },
            { icon: '🔢', text: '世界冠軍配方：15g 咖啡粉 + 200ml 水 + 80°C + 浸泡 1:30' },
            { icon: '☕', text: '可以用 2 張濾紙獲得更乾淨的口感，或用金屬濾網保留油脂' },
            { icon: '🧪', text: '愛樂壓非常適合實驗，嘗試不同水溫、研磨度和時間的組合' }
        ],
        troubleshooting: [
            { problem: '壓不下去或很難壓', solution: '研磨太細，調粗研磨度' },
            { problem: '咖啡太苦', solution: '降低水溫、縮短浸泡時間、研磨調粗' },
            { problem: '咖啡太淡', solution: '增加咖啡粉量、延長浸泡時間、提高水溫' },
            { problem: '咖啡太酸', solution: '提高水溫、延長浸泡時間、研磨調細' },
            { problem: '有細粉渣', solution: '使用品質較好的磨豆機、研磨調粗、壓的速度放慢' }
        ]
    },
    chemex: {
        title: 'Chemex 沖煮指南',
        intro: 'Chemex 是 1941 年由德國化學家 Peter Schlumbohm 發明的經典咖啡壺，以其優雅的沙漏造型聞名，甚至被紐約現代藝術博物館永久收藏。Chemex 使用比一般濾紙厚 20-30% 的專用濾紙，能過濾掉更多油脂和細粉，產出口感極為乾淨清澈的咖啡。',
        equipment: ['Chemex', 'Chemex 專用濾紙', '手沖壺（細嘴壺）', '電子秤', '計時器', '磨豆機'],
        params: {
            coffee: '30g',
            water: '500ml',
            ratio: '1:15-17',
            grind: '中粗研磨（粗砂糖粗細）',
            temp: '92-96°C',
            time: '3:30-4:30'
        },
        steps: [
            {
                title: '摺疊濾紙',
                description: '將 Chemex 專用濾紙摺成錐形。三層的一面朝向出水口（有凹槽的那側），這能讓空氣順暢流通。',
                time: null,
                detail: 'Chemex 濾紙有圓形和方形兩種，摺法略有不同。關鍵是三層面朝出水口。'
            },
            {
                title: '沖洗濾紙',
                description: '用大量熱水充分沖洗濾紙，去除紙味並預熱 Chemex。將預熱水倒掉。',
                time: null,
                detail: 'Chemex 厚濾紙的紙味較重，務必充分沖洗。預熱也能避免沖煮時大幅溫降。'
            },
            {
                title: '放入咖啡粉',
                description: '倒入中粗研磨的咖啡粉（約 30g），輕敲 Chemex 側面使粉面平整。將 Chemex 放在秤上歸零。',
                time: null,
                detail: 'Chemex 需要比 V60 稍粗的研磨度，因為厚濾紙會減慢流速。'
            },
            {
                title: '悶蒸',
                description: '從中心開始緩慢注水，水量約為咖啡粉的 2 倍（約 60ml）。等待 30-45 秒讓咖啡粉充分「開花」。',
                time: '0:00 - 0:45',
                detail: '悶蒸時觀察咖啡粉的膨脹程度，新鮮的豆子會明顯鼓起冒泡。'
            },
            {
                title: '第一次注水',
                description: '悶蒸結束後，從中心開始以穩定細水流繞圈向外注水，到達邊緣前折返。注至約 300ml（60%）。',
                time: '0:45 - 1:45',
                detail: '保持水位穩定，不要讓水位過高或過低。避免直接沖到濾紙。'
            },
            {
                title: '第二次注水',
                description: '等水位下降到接近粉面時，進行第二次注水，同樣繞圈注水至目標水量（500ml）。',
                time: '1:45 - 2:45',
                detail: '可以分 2-3 次注水，每次等水位下降後再注。保持整體水位穩定。'
            },
            {
                title: '等待完成',
                description: '停止注水後，等待所有咖啡液滴完。理想總時間約 3:30-4:30。移除濾紙，輕搖 Chemex 使咖啡混合均勻。',
                time: '2:45 - 4:00',
                detail: '時間過長表示研磨太細或注水太慢，時間過短則相反。觀察粉床應該平整。'
            }
        ],
        tips: [
            { icon: '💡', text: 'Chemex 厚濾紙是關鍵，一定要使用原廠濾紙才能達到乾淨口感' },
            { icon: '🌡️', text: '研磨度比 V60 稍粗，因為厚濾紙流速較慢' },
            { icon: '⏱️', text: '總萃取時間 3:30-4:30 是正常範圍，比其他手沖略長' },
            { icon: '☕', text: 'Chemex 非常適合淺焙的花香果酸型咖啡，乾淨度讓風味更突出' },
            { icon: '🧊', text: 'Chemex 做冰咖啡很棒：在壺底放冰塊，用 60% 的熱水沖煮' }
        ],
        troubleshooting: [
            { problem: '萃取時間過長（>5分鐘）', solution: '研磨度調粗、加快注水速度、檢查濾紙是否貼太緊' },
            { problem: '萃取時間過短（<3分鐘）', solution: '研磨度調細、放慢注水速度' },
            { problem: '咖啡風味平淡', solution: '提高水溫、使用更新鮮的豆子、增加咖啡粉量' },
            { problem: '咖啡太酸', solution: '提高水溫、延長萃取時間、研磨調細' },
            { problem: '咖啡太苦', solution: '降低水溫、研磨調粗、縮短萃取時間' },
            { problem: '有紙味', solution: '用更多熱水沖洗濾紙、確保使用原廠濾紙' }
        ]
    },
    siphon: {
        title: '虹吸壺沖煮指南',
        intro: '虹吸壺（Siphon/Vacuum Pot）源自 19 世紀歐洲，利用真空原理萃取咖啡。水加熱後上升至上壺與咖啡粉混合，關火後透過負壓回流至下壺。這種視覺效果極具戲劇性的沖煮方式，能產出風味乾淨明亮的咖啡，是日本咖啡店的經典器具。',
        equipment: ['虹吸壺', '酒精燈或瓦斯爐', '攪拌棒（竹製或木製）', '電子秤', '計時器', '磨豆機', '濾布或濾紙'],
        params: {
            coffee: '20g',
            water: '300ml',
            ratio: '1:15',
            grind: '中細研磨（砂糖粗細）',
            temp: '88-92°C（上壺）',
            time: '1:00-1:30'
        },
        steps: [
            {
                title: '準備濾器',
                description: '將濾布用熱水浸濕，擰乾後安裝在上壺底部，確保鏈子從管子穿出並固定好。',
                time: null,
                detail: '濾布使用前需煮沸消毒，用後保存在清水中冷藏。也可使用專用濾紙替代。'
            },
            {
                title: '加水預熱',
                description: '在下壺加入熱水（約 300ml），開火加熱。先使用熱水能縮短等待時間。',
                time: null,
                detail: '使用 80°C 以上的熱水開始，約 2-3 分鐘就能沸騰。'
            },
            {
                title: '安裝上壺',
                description: '將上壺斜插入下壺（不要壓緊），等水開始沸騰時才將上壺完全壓緊。這時水會開始上升。',
                time: null,
                detail: '斜插是為了觀察水溫，太早壓緊會讓溫度過高。水沸騰後再壓緊，上升的水溫度剛好。'
            },
            {
                title: '加入咖啡粉',
                description: '等水完全上升至上壺後，將火調小，倒入咖啡粉。用攪拌棒輕輕將所有咖啡粉壓入水中，攪拌 2-3 下。',
                time: '0:00',
                detail: '攪拌要輕柔，目的是讓咖啡粉完全浸濕並均勻分散，不是劇烈攪動。'
            },
            {
                title: '浸泡萃取',
                description: '維持小火，讓咖啡粉浸泡萃取約 45-60 秒。中間（約 30 秒時）可輕攪一次。',
                time: '0:00 - 1:00',
                detail: '火不要太大，保持水剛好不回流的狀態。上壺溫度約 88-92°C 是理想範圍。'
            },
            {
                title: '關火回流',
                description: '關火或移開熱源，用攪拌棒攪拌 2-3 下。咖啡液會開始透過濾布回流至下壺。',
                time: '1:00 - 1:30',
                detail: '回流時可以用濕抹布包住下壺加速冷卻。理想回流時間約 30-45 秒。'
            },
            {
                title: '完成',
                description: '等咖啡完全回流後，輕輕左右搖晃移開上壺。觀察粉床應該呈現圓頂狀。倒出咖啡享用。',
                time: '1:30 - 2:00',
                detail: '圓頂狀粉床表示萃取均勻。如果粉床是平的或有裂縫，表示攪拌不夠或過度。'
            }
        ],
        tips: [
            { icon: '💡', text: '火候控制是關鍵：太大會讓咖啡過萃變苦，太小水會回流' },
            { icon: '🌡️', text: '上壺溫度約 88-92°C，比直接接觸沸水的溫度低' },
            { icon: '⏱️', text: '萃取時間短（約 1 分鐘），風味乾淨明亮' },
            { icon: '🧹', text: '濾布用後一定要清洗並浸泡在清水中冷藏，否則會有異味' },
            { icon: '☕', text: '虹吸壺特別適合展現咖啡的花香和果酸' }
        ],
        troubleshooting: [
            { problem: '水無法上升', solution: '檢查上壺是否壓緊、濾布是否堵塞、火力是否足夠' },
            { problem: '咖啡太苦', solution: '縮短萃取時間、火力調小、研磨調粗' },
            { problem: '咖啡太淡', solution: '延長萃取時間、增加咖啡粉量' },
            { problem: '回流太慢', solution: '用濕布包住下壺加速冷卻、檢查濾布是否堵塞' },
            { problem: '咖啡有異味', solution: '濾布可能需要更換或沒有清洗乾淨' },
            { problem: '粉床不是圓頂狀', solution: '攪拌次數和力道需要調整，確保咖啡粉均勻分散' }
        ]
    },
    clever: {
        title: '聰明濾杯沖煮指南',
        intro: '聰明濾杯（Clever Dripper）是台灣設計的創新器具，巧妙結合了浸泡式萃取與濾紙過濾的優點。底部的專利閥門讓咖啡粉能完全浸泡在水中，放到杯子上時閥門才會打開釋放咖啡液。這種設計讓沖煮過程極為簡單穩定，是新手入門的最佳選擇。',
        equipment: ['聰明濾杯', '梯形濾紙', '電子秤', '計時器', '磨豆機', '馬克杯或分享壺'],
        params: {
            coffee: '20g',
            water: '300ml',
            ratio: '1:15',
            grind: '中研磨（粗砂糖粗細）',
            temp: '92-96°C',
            time: '3:00-4:00'
        },
        steps: [
            {
                title: '準備濾紙',
                description: '將梯形濾紙放入聰明濾杯，用熱水充分沖洗濾紙並預熱濾杯。倒掉預熱水。',
                time: null,
                detail: '聰明濾杯使用梯形濾紙（如 Kalita 或 Melitta 濾紙），不是 V60 的錐形濾紙。'
            },
            {
                title: '放入咖啡粉',
                description: '倒入中研磨的咖啡粉（約 20g），輕敲側面使粉面平整。將濾杯放在秤上歸零。',
                time: null,
                detail: '研磨度比 V60 稍粗，接近法壓壺的粗細，因為浸泡時間較長。'
            },
            {
                title: '注水',
                description: '一次性注入所有熱水（約 300ml），確保所有咖啡粉都被浸濕。可以用畫圓方式注水。',
                time: '0:00',
                detail: '水溫 92-96°C。由於是浸泡式，不需要像手沖那樣控制水流，一次倒完即可。'
            },
            {
                title: '攪拌',
                description: '注水後等待約 30 秒，用湯匙輕輕攪拌 3-4 下，讓浮在水面的咖啡粉沉入水中。',
                time: '0:30',
                detail: '攪拌要輕柔，目的是讓所有咖啡粉均勻接觸水，不是劇烈攪動。'
            },
            {
                title: '蓋上蓋子浸泡',
                description: '蓋上蓋子，靜置等待萃取。標準浸泡時間約 2-3 分鐘。',
                time: '0:30 - 3:00',
                detail: '蓋上蓋子能保溫。浸泡時間可依口味調整：喜歡淡一點縮短，喜歡濃一點延長。'
            },
            {
                title: '釋放咖啡',
                description: '將聰明濾杯放在杯子或分享壺上，底部閥門會自動打開，咖啡液開始流出。等待約 1 分鐘濾完。',
                time: '3:00 - 4:00',
                detail: '過濾時間約 45-60 秒。如果流太慢表示研磨太細，流太快表示研磨太粗。'
            }
        ],
        tips: [
            { icon: '💡', text: '聰明濾杯最大優點是穩定性高、容錯率大，非常適合新手' },
            { icon: '⏱️', text: '浸泡時間 2-3 分鐘是標準，可依口味調整 2-4 分鐘' },
            { icon: '🌡️', text: '使用較高的水溫（94-96°C）能補償浸泡過程中的溫降' },
            { icon: '☕', text: '口感介於法壓壺的厚實和手沖的乾淨之間' },
            { icon: '🧹', text: '清洗非常簡單，只要移除濾紙和沖水即可' }
        ],
        troubleshooting: [
            { problem: '咖啡太苦', solution: '縮短浸泡時間、研磨調粗、降低水溫' },
            { problem: '咖啡太淡', solution: '延長浸泡時間、增加咖啡粉量、研磨稍細' },
            { problem: '過濾太慢', solution: '研磨度太細，需要調粗' },
            { problem: '過濾太快', solution: '研磨度太粗，需要調細' },
            { problem: '咖啡有雜味', solution: '檢查濾紙是否充分沖洗、咖啡豆是否新鮮' }
        ]
    },
    origami: {
        title: '摺紙濾杯沖煮指南',
        intro: '摺紙濾杯（Origami Dripper）是日本岐阜縣美濃燒陶瓷工藝與現代咖啡美學的結合，以其獨特的 20 道褶皺設計聞名。這款濾杯的最大特色是可以同時使用錐形濾紙（如 V60）或蛋糕濾紙（如 Kalita Wave），讓使用者能夠在同一個濾杯上體驗不同的沖煮風格。',
        equipment: ['摺紙濾杯', '濾紙（錐形或蛋糕）', '手沖壺（細嘴壺）', '電子秤', '計時器', '磨豆機', '分享壺', '摺紙濾杯底座'],
        params: {
            coffee: '15g',
            water: '250ml',
            ratio: '1:15-17',
            grind: '中細研磨（砂糖粗細）',
            temp: '90-95°C',
            time: '2:00-2:30'
        },
        steps: [
            {
                title: '選擇濾紙',
                description: '根據想要的風味選擇濾紙：錐形濾紙流速快、口感明亮；蛋糕濾紙流速穩定、風味均衡。將濾紙放入濾杯並用熱水沖洗預熱。',
                time: null,
                detail: '錐形濾紙讓摺紙濾杯表現接近 V60，蛋糕濾紙則更接近 Kalita Wave。這是摺紙濾杯最大的優勢。'
            },
            {
                title: '放入咖啡粉',
                description: '倒入研磨好的咖啡粉，輕敲濾杯側面 2-3 下使粉面平整。將濾杯放在秤上歸零。',
                time: null,
                detail: '使用錐形濾紙時研磨度可稍粗，蛋糕濾紙則維持中細研磨。'
            },
            {
                title: '悶蒸',
                description: '從中心開始注水，水量約為咖啡粉的 2-2.5 倍（30-40ml）。等待 30 秒讓咖啡粉充分「開花」。',
                time: '0:00 - 0:30',
                detail: '摺紙濾杯的褶皺設計讓空氣流通更好，悶蒸時膨脹效果會很明顯。'
            },
            {
                title: '第一次注水',
                description: '從中心開始以穩定細水流繞圈向外注水，到達邊緣前折返。注至總水量的 60%（約 150ml）。',
                time: '0:30 - 1:00',
                detail: '褶皺設計讓水流路徑更多變，注水時可以稍微調整角度讓水流沿著褶皺。'
            },
            {
                title: '第二次注水',
                description: '等水位下降至咖啡粉面時，進行第二次注水至目標水量（250ml）。',
                time: '1:00 - 1:45',
                detail: '蛋糕濾紙的流速較穩定，可以一次注完；錐形濾紙則建議分段注水。'
            },
            {
                title: '等待萃取完成',
                description: '停止注水後等待所有咖啡液滴完。理想總時間約 2:00-2:30。移開濾杯享用咖啡。',
                time: '1:45 - 2:30',
                detail: '使用蛋糕濾紙時萃取時間會稍長（約 2:30-3:00），這是正常的。'
            }
        ],
        tips: [
            { icon: '💡', text: '摺紙濾杯最大特色是可以切換濾紙類型，建議都嘗試看看' },
            { icon: '🌸', text: '陶瓷材質保溫性佳，務必預熱以維持萃取溫度穩定' },
            { icon: '⏱️', text: '錐形濾紙萃取較快（約 2 分鐘），蛋糕濾紙較慢（約 2:30）' },
            { icon: '🎨', text: '摺紙濾杯有多種顏色可選，是兼具美觀與實用的器具' },
            { icon: '☕', text: '適合中淺焙的精品咖啡，能展現細緻的風味層次' }
        ],
        troubleshooting: [
            { problem: '萃取時間過長', solution: '研磨度調粗、換用錐形濾紙、加快注水速度' },
            { problem: '萃取時間過短', solution: '研磨度調細、換用蛋糕濾紙、放慢注水速度' },
            { problem: '風味不穩定', solution: '固定使用同一種濾紙、保持注水手法一致' },
            { problem: '咖啡太酸', solution: '提高水溫、研磨調細、延長悶蒸時間' },
            { problem: '咖啡太苦', solution: '降低水溫、研磨調粗、縮短萃取時間' }
        ]
    },
    kalita: {
        title: 'Kalita 蛋糕濾杯沖煮指南',
        intro: 'Kalita Wave 是日本 Kalita 公司設計的平底濾杯，以其獨特的三孔設計和波浪形蛋糕濾紙聞名。平底設計讓水流更均勻，三個小孔控制流速，加上蛋糕濾紙與濾杯之間的空氣層，造就了極高的穩定性。這是一款非常適合新手的手沖器具，容錯率高且風味一致。',
        equipment: ['Kalita Wave 濾杯', '蛋糕濾紙', '手沖壺（細嘴壺）', '電子秤', '計時器', '磨豆機', '分享壺'],
        params: {
            coffee: '15-20g',
            water: '250-300ml',
            ratio: '1:15-17',
            grind: '中研磨（粗砂糖粗細）',
            temp: '90-94°C',
            time: '2:30-3:30'
        },
        steps: [
            {
                title: '準備濾紙',
                description: '將蛋糕濾紙放入 Kalita 濾杯，用熱水充分沖洗濾紙並預熱濾杯。倒掉預熱水。',
                time: null,
                detail: '蛋糕濾紙的波浪設計會在濾杯內壁形成空氣層，這有助於均勻萃取。預熱時確保整張濾紙都被熱水沖到。'
            },
            {
                title: '放入咖啡粉',
                description: '倒入中研磨的咖啡粉，輕敲濾杯側面使粉面平整。將濾杯放在秤上歸零。',
                time: null,
                detail: 'Kalita 需要比 V60 稍粗的研磨度，因為三孔設計流速較慢。'
            },
            {
                title: '悶蒸',
                description: '從中心開始緩慢注水，水量約為咖啡粉的 2 倍（30-40ml）。等待 30-45 秒。',
                time: '0:00 - 0:45',
                detail: '平底設計讓悶蒸更均勻，觀察咖啡粉應該整體均勻膨脹。'
            },
            {
                title: '第一次注水',
                description: '從中心開始以穩定水流繞小圈注水，保持在中心區域（不要太靠近邊緣）。注至約 150ml。',
                time: '0:45 - 1:30',
                detail: 'Kalita 的關鍵是保持小範圍繞圈，不要像 V60 那樣繞大圈到邊緣。'
            },
            {
                title: '第二次注水',
                description: '等水位下降到接近粉面時，再次從中心繞小圈注水至目標水量。',
                time: '1:30 - 2:15',
                detail: '可以分 2-3 次注水，每次等水位下降後再注。保持穩定的節奏。'
            },
            {
                title: '等待萃取完成',
                description: '停止注水後等待所有咖啡液滴完。理想總時間約 2:30-3:30。',
                time: '2:15 - 3:00',
                detail: '三孔設計讓流速穩定可控，萃取時間會比 V60 略長，這是正常的。'
            }
        ],
        tips: [
            { icon: '💡', text: 'Kalita 最大優點是穩定性高，每次沖煮結果都很一致' },
            { icon: '🔄', text: '注水時繞小圈集中在中心，不要像 V60 那樣繞到邊緣' },
            { icon: '⏱️', text: '萃取時間比 V60 長是正常的，約 2:30-3:30' },
            { icon: '🌡️', text: '因為流速慢，可以用稍低的水溫（90-92°C）避免過萃' },
            { icon: '☕', text: '非常適合中焙咖啡，能展現均衡的甜感和醇厚度' }
        ],
        troubleshooting: [
            { problem: '萃取時間過長（>4分鐘）', solution: '研磨度調粗、減少咖啡粉量、確認三孔沒有堵塞' },
            { problem: '萃取時間過短（<2分鐘）', solution: '研磨度調細、放慢注水速度' },
            { problem: '咖啡風味平淡', solution: '增加咖啡粉量、提高水溫、使用更新鮮的豆子' },
            { problem: '咖啡太苦', solution: '研磨調粗、降低水溫、縮短浸泡時間' },
            { problem: '粉床有高低差', solution: '注水時保持繞小圈、不要沖到邊緣濾紙' }
        ]
    },
    nel: {
        title: '法蘭絨沖煮指南',
        intro: '法蘭絨濾布沖煮（Nel Drip）是日本咖啡文化的代表，源自 1920 年代的日本喫茶店。使用法蘭絨布作為濾材，能保留咖啡油脂的同時過濾細粉，產出口感圓潤綿密、風味飽滿的咖啡。這是一種需要耐心和技巧的沖煮方式，也是老派咖啡職人的堅持。',
        equipment: ['法蘭絨濾布', '濾布架（木柄或金屬）', '手沖壺（鶴嘴壺最佳）', '電子秤', '計時器', '磨豆機', '分享壺', '保存濾布的容器'],
        params: {
            coffee: '20g',
            water: '300ml',
            ratio: '1:15',
            grind: '中粗研磨（粗砂糖粗細）',
            temp: '85-90°C',
            time: '3:30-4:30'
        },
        steps: [
            {
                title: '準備濾布',
                description: '將濾布從保存的清水中取出，用熱水充分浸濕後擰乾（不要擰太乾），套在濾布架上整理成袋狀。',
                time: null,
                detail: '新濾布首次使用前需煮沸 10-15 分鐘去除棉絮味。濾布保持微濕狀態使用效果最佳。'
            },
            {
                title: '放入咖啡粉',
                description: '倒入中粗研磨的咖啡粉（約 20g），輕輕搖晃讓粉面平整。用手指在中心輕壓一個小凹槽。',
                time: null,
                detail: '法蘭絨需要比濾紙稍粗的研磨度，因為布的過濾速度較慢。'
            },
            {
                title: '悶蒸',
                description: '從中心凹槽開始，用極細水流點滴注水。水量約為咖啡粉的 2 倍（40ml），讓咖啡粉均勻濕潤膨脹。',
                time: '0:00 - 0:45',
                detail: '法蘭絨悶蒸時間比濾紙長（約 30-45 秒），讓咖啡粉充分「開花」。'
            },
            {
                title: '第一階段注水',
                description: '以極細的點滴水流從中心開始，畫非常小的同心圓向外注水。水流要細如線，高度離粉面約 2-3 公分。',
                time: '0:45 - 2:00',
                detail: '法蘭絨沖煮的精髓在於極慢的注水速度，水流像絲線般細，這樣能萃取出圓潤的口感。'
            },
            {
                title: '第二階段注水',
                description: '保持同樣的細水流繼續注水，繞圈範圍可以稍大但不要碰到濾布邊緣。注至目標水量（300ml）。',
                time: '2:00 - 3:30',
                detail: '整個過程保持「細、慢、穩」的節奏。不要讓水位過高，保持在粉面上 1 公分左右。'
            },
            {
                title: '完成與保養',
                description: '等待咖啡液完全滴完。萃取結束後立即清洗濾布（只用清水沖洗），然後浸泡在清水中冷藏保存。',
                time: '3:30 - 4:30',
                detail: '濾布保養是關鍵：用後必須清洗並泡在乾淨的清水中冷藏。每 1-2 天換水一次。約使用 2-3 個月後需更換。'
            }
        ],
        tips: [
            { icon: '💡', text: '水流控制是法蘭絨的關鍵：越細越慢，口感越圓潤' },
            { icon: '🌡️', text: '建議使用較低的水溫（85-90°C），避免過萃' },
            { icon: '🧹', text: '濾布保養非常重要：只用清水洗、泡在清水中冷藏、定期更換' },
            { icon: '☕', text: '法蘭絨特別適合深焙咖啡，能展現圓潤醇厚的口感' },
            { icon: '⏱️', text: '萃取時間較長（3-4 分鐘）是正常的，不要急' }
        ],
        troubleshooting: [
            { problem: '咖啡有異味', solution: '濾布可能沒清洗乾淨或保存不當，需要更換新濾布' },
            { problem: '咖啡太苦', solution: '水溫太高、注水太快或浸泡太久，調整參數' },
            { problem: '咖啡太淡', solution: '注水太快、研磨太粗或咖啡粉量不足' },
            { problem: '萃取太慢', solution: '研磨度太細、濾布可能堵塞需要更換' },
            { problem: '口感不夠圓潤', solution: '注水速度放更慢、水流再細一點' }
        ]
    },
    phin: {
        title: '越南滴漏沖煮指南',
        intro: '越南滴漏壺（Phin）是越南傳統的咖啡沖煮器具，簡單的金屬結構由濾杯、壓片、蓋子三部分組成。Phin 沖煮出的咖啡濃郁厚重，傳統上會搭配煉乳飲用（Cà Phê Sữa Đá）。這是一種需要耐心等待的沖煮方式，滴漏過程本身就是一種享受。',
        equipment: ['越南滴漏壺 (Phin)', '電子秤', '計時器', '磨豆機', '玻璃杯或馬克杯', '煉乳（可選）', '冰塊（可選）'],
        params: {
            coffee: '20-25g',
            water: '100-120ml',
            ratio: '1:5-6',
            grind: '中粗研磨（粗砂糖粗細）',
            temp: '96-100°C',
            time: '4:00-6:00'
        },
        steps: [
            {
                title: '預熱器具',
                description: '用熱水沖洗 Phin 和杯子進行預熱。如果要加煉乳，先在杯底倒入 2-3 湯匙煉乳。',
                time: null,
                detail: '傳統越南咖啡使用深焙的羅布斯塔豆，搭配煉乳飲用。當然也可以用阿拉比卡豆純飲。'
            },
            {
                title: '放入咖啡粉',
                description: '將 Phin 放在杯子上，倒入中粗研磨的咖啡粉（約 20-25g）。輕敲側面使粉面平整。',
                time: null,
                detail: 'Phin 使用的咖啡粉量比一般沖煮多，比例約 1:5-6，沖出的咖啡非常濃郁。'
            },
            {
                title: '輕壓濾片',
                description: '將壓片放入並輕輕旋轉壓下。壓片不要壓太緊，只需輕輕接觸咖啡粉表面即可。',
                time: null,
                detail: '壓片的壓力會影響滴漏速度：壓太緊會太慢，太鬆會太快。需要多次嘗試找到最佳壓力。'
            },
            {
                title: '第一次注水（悶蒸）',
                description: '先倒入少量熱水（約 20ml），剛好蓋過壓片即可。等待 30 秒讓咖啡粉吸水膨脹。',
                time: '0:00 - 0:30',
                detail: '使用接近沸騰的水（96-100°C）。越南咖啡傳統上用非常高的水溫。'
            },
            {
                title: '主要注水',
                description: '將熱水注滿 Phin（約 100ml），蓋上蓋子保溫。然後耐心等待咖啡一滴一滴滴完。',
                time: '0:30 - 5:00',
                detail: '理想的滴漏速度是每秒約 1-2 滴。如果太快表示研磨太粗或壓片太鬆，太慢則相反。'
            },
            {
                title: '享用咖啡',
                description: '等咖啡完全滴完（約 4-6 分鐘），移開 Phin。如果加了煉乳，用湯匙充分攪拌。可以加冰塊做成冰咖啡。',
                time: '5:00 - 6:00',
                detail: '傳統越南冰咖啡（Cà Phê Sữa Đá）是先沖好熱咖啡，再倒入裝滿冰塊的杯中。'
            }
        ],
        tips: [
            { icon: '💡', text: '壓片的壓力是關鍵，需要多次嘗試找到最佳設定' },
            { icon: '🌡️', text: '使用非常高的水溫（接近沸騰），這是越南咖啡的特色' },
            { icon: '🥛', text: '煉乳是傳統搭配，甜度可依個人喜好調整用量' },
            { icon: '⏱️', text: '滴漏時間約 4-6 分鐘是正常的，這是享受等待的時刻' },
            { icon: '🧊', text: '做冰咖啡時，直接把熱咖啡倒在冰塊上，不要用冷咖啡' }
        ],
        troubleshooting: [
            { problem: '滴漏太慢（>8分鐘）', solution: '研磨度調粗、壓片不要壓太緊' },
            { problem: '滴漏太快（<3分鐘）', solution: '研磨度調細、壓片稍微壓緊一點' },
            { problem: '咖啡太淡', solution: '增加咖啡粉量、研磨調細、壓片稍壓緊' },
            { problem: '咖啡太苦', solution: '減少咖啡粉量或調整煉乳比例增加甜度' },
            { problem: '有咖啡渣', solution: '研磨不要太細、確認壓片放置正確' }
        ]
    },
    turkish: {
        title: '土耳其咖啡沖煮指南',
        intro: '土耳其咖啡（Türk Kahvesi）是世界上最古老的咖啡沖煮方式之一，於 2013 年被聯合國教科文組織列入非物質文化遺產。使用極細研磨的咖啡粉直接與水一起煮沸，不過濾直接飲用。濃郁的口感和獨特的泡沫是其標誌，咖啡渣還可以用來占卜。',
        equipment: ['土耳其咖啡壺 (Cezve/Ibrik)', '極細研磨咖啡（比麵粉還細）', '小火源（最好是沙爐）', '土耳其咖啡杯', '小湯匙', '糖（可選）'],
        params: {
            coffee: '7-10g',
            water: '60-80ml',
            ratio: '1:8-10',
            grind: '極細研磨（粉狀）',
            temp: '煮沸',
            time: '3:00-5:00'
        },
        steps: [
            {
                title: '準備材料',
                description: '在 Cezve（土耳其咖啡壺）中加入冷水（每杯約 60-80ml）。依個人喜好加入糖：不加糖（sade）、微甜（az şekerli）、中甜（orta）、甜（şekerli）。',
                time: null,
                detail: '傳統土耳其咖啡有四種甜度選擇，糖要在加熱前就加入，不是沖好後才加。'
            },
            {
                title: '加入咖啡粉',
                description: '加入極細研磨的咖啡粉（每杯約 7-10g），用湯匙輕輕攪拌讓咖啡粉與水混合均勻。',
                time: null,
                detail: '土耳其咖啡的研磨度要比濃縮咖啡還細，像麵粉一樣的粉狀。專用磨豆機才能達到這種細度。'
            },
            {
                title: '小火加熱',
                description: '將 Cezve 放在最小火上慢慢加熱。加熱過程中不要攪拌，讓咖啡自然升溫。',
                time: '0:00 - 2:00',
                detail: '傳統是使用熱沙爐（Cezve 埋在熱沙中），現代可用最小瓦斯火或電熱爐。關鍵是「慢」。'
            },
            {
                title: '觀察泡沫形成',
                description: '當咖啡開始產生細密的泡沫並開始上升時，立即將 Cezve 移離火源。不要讓咖啡沸騰溢出。',
                time: '2:00 - 2:30',
                detail: '泡沫（köpük）是土耳其咖啡的精華，代表咖啡的品質。泡沫越細密越好。'
            },
            {
                title: '重複加熱',
                description: '等泡沫稍微下降後，再次將 Cezve 放回小火上加熱至泡沫上升，再移開。重複此步驟 2-3 次。',
                time: '2:30 - 4:00',
                detail: '每次加熱都要在泡沫即將溢出前移開。重複加熱能增加風味的複雜度和泡沫的細緻度。'
            },
            {
                title: '倒出享用',
                description: '最後一次加熱後，先將一部分泡沫舀入杯中，然後緩慢將咖啡倒入杯中。等待 1-2 分鐘讓咖啡渣沉澱後飲用。',
                time: '4:00 - 6:00',
                detail: '土耳其咖啡連渣一起喝（但不吃渣），喝到杯底的渣時就停止。傳統上會搭配一杯水和土耳其軟糖。'
            }
        ],
        tips: [
            { icon: '💡', text: '研磨度是關鍵：必須像麵粉一樣細，普通磨豆機無法達到' },
            { icon: '🔥', text: '火候控制非常重要：一定要用最小火，慢慢加熱' },
            { icon: '☕', text: '泡沫（köpük）是品質的象徵，好的土耳其咖啡泡沫細密豐厚' },
            { icon: '🍬', text: '糖要在煮之前加，不是煮好後才加' },
            { icon: '🔮', text: '喝完後可以將杯子倒扣在碟子上，用咖啡渣占卜（土耳其傳統）' }
        ],
        troubleshooting: [
            { problem: '沒有泡沫', solution: '火太大、加熱太快、咖啡粉不夠細' },
            { problem: '咖啡溢出', solution: '火太大或沒有及時移開火源' },
            { problem: '咖啡太苦', solution: '加熱次數減少、火再小一點' },
            { problem: '口感有渣', solution: '等待更久讓渣沉澱、研磨要更細更均勻' },
            { problem: '風味平淡', solution: '增加咖啡粉量、確認豆子新鮮、重複加熱次數增加' }
        ]
    },
    moka: {
        title: '摩卡壺沖煮指南',
        intro: '摩卡壺（Moka Pot）是 1933 年由義大利人 Alfonso Bialetti 發明的經典咖啡器具，以其八角形的經典造型聞名。利用蒸氣壓力將水推過咖啡粉，產出濃郁近似濃縮咖啡的咖啡液。這是義大利家庭的必備器具，也是在家製作義式咖啡基底的最佳選擇。',
        equipment: ['摩卡壺', '電子秤', '磨豆機', '瓦斯爐或電熱爐', '毛巾（降溫用）'],
        params: {
            coffee: '15-20g（依壺大小）',
            water: '填滿下壺至閥門下方',
            ratio: '約 1:7-10',
            grind: '中細研磨（略比濃縮粗）',
            temp: '使用熱水',
            time: '3:00-5:00'
        },
        steps: [
            {
                title: '加水',
                description: '在摩卡壺下壺加入熱水（約 80°C），水位不要超過安全閥。使用熱水能縮短加熱時間，避免咖啡過度加熱。',
                time: null,
                detail: '使用熱水是現代摩卡壺沖煮的重要技巧，能減少咖啡粉被高溫蒸烤的時間，避免過萃。'
            },
            {
                title: '放入咖啡粉',
                description: '在濾斗中裝滿中細研磨的咖啡粉，用手指輕輕抹平表面。不要壓實咖啡粉。',
                time: null,
                detail: '摩卡壺的研磨度比濃縮咖啡稍粗。重要：不要像義式機那樣壓粉（Tamp），否則水無法通過。'
            },
            {
                title: '組裝摩卡壺',
                description: '將濾斗放入下壺，旋緊上壺。注意下壺已經加了熱水會燙手，可以用毛巾輔助。',
                time: null,
                detail: '確保旋緊密封，否則會漏氣影響萃取效果。'
            },
            {
                title: '加熱萃取',
                description: '將摩卡壺放在中小火上加熱。保持蓋子打開觀察萃取過程。咖啡液會開始從中間管子流出。',
                time: '0:00 - 3:00',
                detail: '火力不要太大，用中小火讓萃取緩慢進行。太大火會讓咖啡過萃變苦。'
            },
            {
                title: '觀察顏色',
                description: '當咖啡液從深褐色變成淺黃色，並且開始有噴濺聲時，立即關火並用濕毛巾包住下壺降溫。',
                time: '3:00 - 4:00',
                detail: '這個時機點很重要：顏色變淺表示萃取進入尾段，繼續加熱會萃取出苦味。'
            },
            {
                title: '享用咖啡',
                description: '等待幾秒讓剩餘咖啡液流完，然後倒入杯中享用。可以直接喝或加熱水/牛奶稀釋。',
                time: '4:00 - 5:00',
                detail: '摩卡壺咖啡濃度介於手沖和濃縮之間，可以用來做美式咖啡或拿鐵的基底。'
            }
        ],
        tips: [
            { icon: '💡', text: '使用熱水開始是關鍵，能避免咖啡被長時間高溫加熱' },
            { icon: '🔥', text: '中小火慢慢加熱，火太大會讓咖啡焦苦' },
            { icon: '☕', text: '不要壓咖啡粉！只要抹平表面即可' },
            { icon: '🛑', text: '顏色變淺就關火，不要等到完全萃取完' },
            { icon: '🧼', text: '清洗時只用清水，不要用清潔劑（會破壞咖啡油脂形成的保護層）' }
        ],
        troubleshooting: [
            { problem: '咖啡太苦', solution: '研磨調粗、火力減小、顏色變淺就關火' },
            { problem: '咖啡太淡', solution: '研磨調細、確認咖啡粉量足夠' },
            { problem: '萃取太慢或不出咖啡', solution: '研磨太細堵塞、檢查安全閥是否堵塞' },
            { problem: '有咖啡渣', solution: '檢查膠圈密封、濾片是否損壞' },
            { problem: '咖啡有金屬味', solution: '新壺需要先沖煮幾次「養壺」、不要用清潔劑清洗' }
        ]
    },
    espresso: {
        title: '義式濃縮咖啡指南',
        intro: '義式濃縮咖啡（Espresso）是現代咖啡文化的基石，透過 9 大氣壓的高壓在 25-30 秒內萃取出 30ml 的濃郁咖啡液。完美的濃縮咖啡應該有金黃色的 Crema（油脂層）、甜蜜的口感和複雜的香氣。這是所有義式咖啡飲品（拿鐵、卡布奇諾等）的基底。',
        equipment: ['義式咖啡機', '磨豆機（刀盤式）', '填壓器（Tamper）', '電子秤', '計時器', '濃縮咖啡杯'],
        params: {
            coffee: '18-20g（雙份）',
            water: '36-40ml',
            ratio: '1:2',
            grind: '極細研磨',
            temp: '90-94°C',
            time: '25-30秒'
        },
        steps: [
            {
                title: '預熱設備',
                description: '確保咖啡機已經充分預熱（至少 15-20 分鐘）。沖一些熱水通過沖煮頭，預熱濾杯把手。',
                time: null,
                detail: '溫度穩定是萃取濃縮咖啡的關鍵，機器必須完全預熱才能有穩定的萃取溫度。'
            },
            {
                title: '研磨與佈粉',
                description: '研磨新鮮咖啡豆（約 18-20g 做雙份），直接磨入濾杯。用手指輕輕撥動讓咖啡粉均勻分布（WDT 技巧）。',
                time: null,
                detail: '研磨度極細但要根據萃取時間調整：萃取太快要磨更細，太慢要磨更粗。'
            },
            {
                title: '整粉與填壓',
                description: '用整粉器（Distribution Tool）或手指整平粉面。然後用填壓器垂直均勻施力壓實咖啡粉（約 15-20kg 壓力）。',
                time: null,
                detail: '填壓的重點是「水平均勻」而非力道大小。傾斜的粉餅會導致通道效應。'
            },
            {
                title: '裝入沖煮頭',
                description: '將濾杯把手鎖入沖煮頭，確保鎖緊。在把手下方放置濃縮杯和電子秤，歸零準備。',
                time: null,
                detail: '裝好後應立即開始萃取，不要讓咖啡粉在沖煮頭中待太久被預熱。'
            },
            {
                title: '萃取',
                description: '啟動萃取，同時開始計時。觀察咖啡液流出：應該在 5-8 秒後開始滴出，呈現深褐色蜂蜜狀。目標是 25-30 秒萃取出 36-40ml。',
                time: '0:00 - 0:30',
                detail: '完美萃取會呈現老鼠尾巴般的細流。如果一開始就很稀或很慢，需要調整研磨度。'
            },
            {
                title: '評估與享用',
                description: '萃取完成後觀察 Crema（應該是金棕色、細緻、持久）。好的濃縮咖啡應該有甜感、平衡的酸苦、和豐富的香氣。',
                time: '0:30',
                detail: 'Crema 太淺表示萃取不足，太深或有黑斑表示過萃。理想的 Crema 像老虎斑紋。'
            }
        ],
        tips: [
            { icon: '💡', text: '研磨度是最重要的變數，每天（甚至每幾小時）都需要微調' },
            { icon: '⏱️', text: '目標是 25-30 秒萃取出 1:2 的咖啡液（18g 粉出 36g 液）' },
            { icon: '🌡️', text: '機器預熱非常重要，至少需要 15-20 分鐘' },
            { icon: '☕', text: '新鮮烘焙的豆子（烘焙後 7-21 天）最適合做濃縮' },
            { icon: '🔄', text: '萃取太快：磨更細；萃取太慢：磨更粗' }
        ],
        troubleshooting: [
            { problem: '萃取太快（<20秒）', solution: '研磨調細、增加粉量、確認填壓均勻' },
            { problem: '萃取太慢（>35秒）', solution: '研磨調粗、減少粉量' },
            { problem: 'Crema 很淡或沒有', solution: '豆子不夠新鮮、研磨太粗、萃取溫度太低' },
            { problem: '味道太苦', solution: '萃取時間過長、研磨調粗、降低溫度' },
            { problem: '味道太酸', solution: '萃取不足、研磨調細、提高溫度或延長時間' },
            { problem: '有通道效應（咖啡液不均勻）', solution: '佈粉要更均勻、填壓要水平' }
        ]
    },
    coldbrew: {
        title: '冷萃咖啡沖煮指南',
        intro: '冷萃咖啡（Cold Brew）是用室溫或冷水長時間浸泡咖啡粉萃取的方法，通常需要 12-24 小時。低溫萃取減少了酸性物質和咖啡因的釋出，產出口感滑順、甜感明顯、低酸的咖啡。冷萃咖啡可以保存一週以上，是炎夏的最佳選擇。',
        equipment: ['冷萃壺或玻璃罐', '濾網或濾袋', '電子秤', '磨豆機', '冰箱'],
        params: {
            coffee: '100g',
            water: '1000ml',
            ratio: '1:10-15',
            grind: '粗研磨（粗海鹽粗細）',
            temp: '室溫或冷藏',
            time: '12-24小時'
        },
        steps: [
            {
                title: '研磨咖啡豆',
                description: '將咖啡豆研磨成粗顆粒（像粗海鹽或法壓壺的粗度）。冷萃需要較多咖啡粉，建議比例約 1:10-15。',
                time: null,
                detail: '研磨度要粗，因為長時間浸泡會萃取很多物質。太細會過萃變苦。'
            },
            {
                title: '混合咖啡粉與水',
                description: '將咖啡粉放入冷萃壺或玻璃罐中，倒入室溫過濾水。輕輕攪拌確保所有咖啡粉都被浸濕。',
                time: null,
                detail: '可以用濾袋裝咖啡粉方便後續過濾，或直接倒入後續再過濾。'
            },
            {
                title: '浸泡萃取',
                description: '蓋上蓋子，放在室溫或冰箱中浸泡。室溫浸泡約 12-18 小時，冷藏浸泡約 18-24 小時。',
                time: '12-24小時',
                detail: '室溫浸泡萃取較快但保存期較短，冷藏浸泡較慢但風味更乾淨、保存更久。'
            },
            {
                title: '過濾',
                description: '浸泡完成後，用濾網、濾布或濾紙過濾咖啡液。可以過濾兩次讓口感更乾淨。',
                time: null,
                detail: '過濾是關鍵步驟，濾得越乾淨口感越好。如果不過濾完全，咖啡會繼續萃取變苦。'
            },
            {
                title: '保存與享用',
                description: '將過濾好的冷萃咖啡存放在密封容器中冷藏，可保存 1-2 週。飲用時可以直接喝或加水/牛奶稀釋。',
                time: null,
                detail: '冷萃原液濃度較高，通常會加等量的水或牛奶稀釋飲用。'
            }
        ],
        tips: [
            { icon: '💡', text: '研磨度要粗，比法壓壺還粗一點' },
            { icon: '⏱️', text: '室溫浸泡 12-18 小時，冷藏浸泡 18-24 小時' },
            { icon: '🧊', text: '冷萃原液很濃，建議加水或牛奶 1:1 稀釋飲用' },
            { icon: '☕', text: '冷萃特別適合中深焙咖啡，甜感和巧克力調會很明顯' },
            { icon: '🥛', text: '加牛奶做成冷萃拿鐵非常美味，比熱萃更順滑' }
        ],
        troubleshooting: [
            { problem: '咖啡太苦', solution: '縮短浸泡時間、研磨度調粗、減少咖啡粉量' },
            { problem: '咖啡太淡', solution: '延長浸泡時間、增加咖啡粉量、研磨稍細' },
            { problem: '有很多細粉', solution: '研磨度調粗、用更細的濾網或濾紙過濾' },
            { problem: '味道有酸敗感', solution: '咖啡豆可能不新鮮或保存太久' },
            { problem: '口感不夠滑順', solution: '嘗試冷藏浸泡（而非室溫）、用好水' }
        ]
    },
    icedrip: {
        title: '冰滴咖啡沖煮指南',
        intro: '冰滴咖啡（Ice Drip / Dutch Coffee）使用冰水一滴一滴緩慢滴過咖啡粉，萃取時間可達 3-8 小時。相較於冷萃的浸泡法，冰滴是緩慢的滴濾萃取，產出的咖啡風味更細緻、層次更分明、口感如紅酒般優雅。這是追求極致風味的冷咖啡製作方式。',
        equipment: ['冰滴壺（上中下三層結構）', '電子秤', '磨豆機', '冰塊'],
        params: {
            coffee: '40-50g',
            water: '400-500ml（冰+水）',
            ratio: '1:10',
            grind: '中細研磨（砂糖粗細）',
            temp: '冰水（0-4°C）',
            time: '3-8小時'
        },
        steps: [
            {
                title: '準備咖啡粉',
                description: '研磨咖啡豆至中細研磨（比冷萃細，接近手沖的粗度）。將咖啡粉放入中層濾杯，輕敲使粉面平整。',
                time: null,
                detail: '冰滴的研磨度比冷萃細，因為是滴濾萃取而非浸泡。但也不能太細，否則滴不下去。'
            },
            {
                title: '濕潤咖啡粉',
                description: '用少量室溫水（約 50ml）先將咖啡粉完全濕潤。這個步驟能讓後續萃取更均勻。等待約 30 秒讓咖啡粉吸水。',
                time: null,
                detail: '預濕是重要步驟，讓咖啡粉先膨脹，避免冰水直接滴落造成萃取不均。'
            },
            {
                title: '裝入冰水',
                description: '在上層水壺中放入冰塊，再加入冷水（總量約 400-500ml）。調整閥門讓水以每秒約 1 滴的速度滴落。',
                time: null,
                detail: '滴速是影響風味的關鍵：滴太快會萃取不足，太慢會過萃。理想是每秒 0.5-1 滴。'
            },
            {
                title: '等待萃取',
                description: '讓冰滴壺慢慢工作。根據粉量和滴速，整個過程約需 3-8 小時。過程中需要補充冰塊維持低溫。',
                time: '3-8小時',
                detail: '可以每隔幾小時檢查一下滴速，冰塊融化後滴速會加快，可能需要調整閥門。'
            },
            {
                title: '收集與熟成',
                description: '萃取完成後，將咖啡液裝入密封玻璃瓶冷藏。冰滴咖啡最好「熟成」1-3 天，風味會更圓潤。',
                time: null,
                detail: '剛做好的冰滴咖啡可能有點銳利，冷藏熟成幾天後風味會變得更滑順柔和。'
            }
        ],
        tips: [
            { icon: '💡', text: '滴速控制是關鍵：每秒約 0.5-1 滴最理想' },
            { icon: '🧊', text: '過程中要補充冰塊，保持水溫在 0-4°C' },
            { icon: '⏱️', text: '熟成 1-3 天後風味會更好，不急著喝' },
            { icon: '☕', text: '冰滴特別適合淺焙精品豆，能展現細緻的花果香' },
            { icon: '🍷', text: '好的冰滴咖啡口感如紅酒般優雅，層次分明' }
        ],
        troubleshooting: [
            { problem: '滴不下去', solution: '研磨度太細、咖啡粉可能壓太緊' },
            { problem: '滴太快（<3小時就滴完）', solution: '研磨度調細、調小閥門、增加咖啡粉量' },
            { problem: '咖啡太淡', solution: '滴速太快、研磨調細、增加咖啡粉量' },
            { problem: '咖啡太苦', solution: '滴速太慢、研磨調粗、減少萃取時間' },
            { problem: '風味不夠細緻', solution: '嘗試熟成更久、使用更新鮮的淺焙豆' }
        ]
    }
};
