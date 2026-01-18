// ========================================
// 安全性工具函數
// ========================================

// HTML 字元轉義，防止 XSS 攻擊
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// 驗證物件是否符合預期結構
function validateRecipe(recipe) {
    return recipe &&
        typeof recipe.id === 'string' &&
        typeof recipe.name === 'string' &&
        typeof recipe.method === 'string' &&
        typeof recipe.coffee === 'number' &&
        typeof recipe.water === 'number' &&
        typeof recipe.ratio === 'number';
}

function validateJournalEntry(entry) {
    return entry &&
        typeof entry.id === 'string' &&
        typeof entry.date === 'string' &&
        typeof entry.method === 'string' &&
        typeof entry.coffee === 'number' &&
        typeof entry.water === 'number';
}

// 共用的 AudioContext 實例（避免記憶體洩漏）
let sharedAudioContext = null;

function getAudioContext() {
    if (!sharedAudioContext) {
        try {
            sharedAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            return null;
        }
    }
    return sharedAudioContext;
}

// ========================================
// 應用程式狀態
// ========================================

// 應用程式狀態
const state = {
    currentMethod: 'v60',
    currentRoast: 'medium',
    coffeeAmount: 15,
    waterAmount: 250,
    ratio: 16.7,
    lastChanged: 'ratio', // 'coffee', 'water', 或 'ratio'，用於決定計算方式
    rating: 0,
    timerInterval: null,
    timerSeconds: 0,
    timerRunning: false,
    currentGuide: null,
    myRecipes: [],
    journalEntries: []
};

// 沖煮方式圖示對應
const METHOD_ICONS = {
    v60: '🫖', kalita: '🫖', chemex: '🫖', origami: '🌸', nel: '🧵',
    clever: '🧠', frenchpress: '🍶', siphon: '🔬', turkish: '🏺',
    espresso: '🎯', moka: '☕', aeropress: '💨', phin: '🇻🇳',
    dripmachine: '🤖', coldbrew: '🧊', icedrip: '💧'
};

// DOM 元素
const elements = {
    // 導航
    navLinks: document.querySelectorAll('.nav-link'),
    sections: document.querySelectorAll('.section'),

    // 沖煮方式
    brewMethodSelect: document.getElementById('brewMethodSelect'),
    methodIcon: document.getElementById('methodIcon'),
    methodDescription: document.getElementById('methodDescription'),

    // 咖啡豆資訊
    roastLevel: document.getElementById('roastLevel'),
    origin: document.getElementById('origin'),
    variety: document.getElementById('variety'),
    process: document.getElementById('process'),
    beanHintText: document.getElementById('beanHintText'),

    // 計算器
    coffeeAmount: document.getElementById('coffeeAmount'),
    waterAmount: document.getElementById('waterAmount'),
    recommendedWater: document.getElementById('recommendedWater'),
    ratioDisplay: document.getElementById('ratioDisplay'),
    ratioSlider: document.getElementById('ratioSlider'),
    ratioValue: document.getElementById('ratioValue'),

    // 建議參數
    tempRecommend: document.getElementById('tempRecommend'),
    grindRecommend: document.getElementById('grindRecommend'),
    timeRecommend: document.getElementById('timeRecommend'),
    bloomRecommend: document.getElementById('bloomRecommend'),

    // 風味預測
    strengthMeter: document.getElementById('strengthMeter'),
    acidityMeter: document.getElementById('acidityMeter'),
    bitterMeter: document.getElementById('bitterMeter'),
    sweetMeter: document.getElementById('sweetMeter'),
    bodyMeter: document.getElementById('bodyMeter'),
    flavorText: document.getElementById('flavorText'),
    ratioTag: document.getElementById('ratioTag'),
    tempTag: document.getElementById('tempTag'),
    roastTag: document.getElementById('roastTag'),
    adjustmentTips: document.getElementById('adjustmentTips'),

    // 配方
    saveRecipeBtn: document.getElementById('saveRecipeBtn'),
    saveRecipeModal: document.getElementById('saveRecipeModal'),
    saveRecipeForm: document.getElementById('saveRecipeForm'),
    cancelSaveRecipe: document.getElementById('cancelSaveRecipe'),
    recipeName: document.getElementById('recipeName'),
    recipeNotes: document.getElementById('recipeNotes'),
    defaultRecipes: document.getElementById('defaultRecipes'),
    myRecipes: document.getElementById('myRecipes'),
    recipeSearch: document.getElementById('recipeSearch'),
    filterMethod: document.getElementById('filterMethod'),
    filterOrigin: document.getElementById('filterOrigin'),
    filterRoast: document.getElementById('filterRoast'),
    recipeCount: document.getElementById('recipeCount'),

    // 日誌
    journalForm: document.getElementById('journalForm'),
    journalDate: document.getElementById('journalDate'),
    journalMethod: document.getElementById('journalMethod'),
    journalBean: document.getElementById('journalBean'),
    journalCoffee: document.getElementById('journalCoffee'),
    journalWater: document.getElementById('journalWater'),
    journalTemp: document.getElementById('journalTemp'),
    journalNotes: document.getElementById('journalNotes'),
    journalRating: document.getElementById('journalRating'),
    ratingInput: document.getElementById('ratingInput'),
    journalEntries: document.getElementById('journalEntries'),

    // 指南
    guideSelector: document.getElementById('guideSelector'),
    guideMethodBtns: document.querySelectorAll('.guide-method-btn'),
    guideContent: document.getElementById('guideContent'),
    guideBackBtn: document.getElementById('guideBackBtn'),
    guideTitle: document.getElementById('guideTitle'),
    guideIntro: document.getElementById('guideIntro'),
    guideEquipment: document.getElementById('guideEquipment'),
    guideParams: document.getElementById('guideParams'),
    guideSteps: document.getElementById('guideSteps'),
    guideTips: document.getElementById('guideTips'),
    guideTroubleshooting: document.getElementById('guideTroubleshooting'),

    // 計時器
    timerMinutes: document.getElementById('timerMinutes'),
    timerSeconds: document.getElementById('timerSeconds'),
    timerStart: document.getElementById('timerStart'),
    timerPause: document.getElementById('timerPause'),
    timerReset: document.getElementById('timerReset'),
    currentStepAlert: document.getElementById('currentStepAlert'),
    stepAlertText: document.getElementById('stepAlertText'),

    // Toast
    toast: document.getElementById('toast')
};

// 初始化
function init() {
    loadFromStorage();
    setupEventListeners();

    // 初始化沖煮方式資訊卡
    const methodData = BREW_METHODS[state.currentMethod];
    updateMethodInfoCard(state.currentMethod, methodData);

    updateCalculator();
    updateBeanFlavorHint();
    renderDefaultRecipes();
    renderMyRecipes();
    renderJournalEntries();
    setTodayDate();

    // 初始化 Hero 和滾動動畫
    initHeaderScroll();
    initHeroAnimations();
    initScrollAnimations();
    setupHeroCTA();
}

// 從 localStorage 載入資料（含錯誤處理與資料驗證）
function loadFromStorage() {
    // 載入配方
    try {
        const savedRecipes = localStorage.getItem('coffeeRecipes');
        if (savedRecipes) {
            const parsed = JSON.parse(savedRecipes);
            // 驗證資料結構並過濾無效項目
            if (Array.isArray(parsed)) {
                state.myRecipes = parsed.filter(validateRecipe);
            }
        }
    } catch (e) {
        console.warn('載入配方資料時發生錯誤，已重置：', e);
        localStorage.removeItem('coffeeRecipes');
        state.myRecipes = [];
    }

    // 載入日誌
    try {
        const savedJournal = localStorage.getItem('coffeeJournal');
        if (savedJournal) {
            const parsed = JSON.parse(savedJournal);
            // 驗證資料結構並過濾無效項目
            if (Array.isArray(parsed)) {
                state.journalEntries = parsed.filter(validateJournalEntry);
            }
        }
    } catch (e) {
        console.warn('載入日誌資料時發生錯誤，已重置：', e);
        localStorage.removeItem('coffeeJournal');
        state.journalEntries = [];
    }
}

// 儲存到 localStorage
function saveToStorage() {
    localStorage.setItem('coffeeRecipes', JSON.stringify(state.myRecipes));
    localStorage.setItem('coffeeJournal', JSON.stringify(state.journalEntries));
}

// 設置事件監聯器
function setupEventListeners() {
    // Logo 點擊回首頁
    const logoLink = document.querySelector('.logo a[data-section]');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('hero');
        });
    }

    // 導航切換
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            switchSection(section);
        });
    });

    // 沖煮方式選擇（下拉選單）
    elements.brewMethodSelect.addEventListener('change', () => {
        selectBrewMethod(elements.brewMethodSelect.value);
    });

    // 烘焙度變更
    elements.roastLevel.addEventListener('change', () => {
        state.currentRoast = elements.roastLevel.value;
        updateRecommendations();
        updateBeanFlavorHint();
    });

    // 產地變更
    elements.origin.addEventListener('change', updateBeanFlavorHint);

    // 品種變更
    elements.variety.addEventListener('change', updateBeanFlavorHint);

    // 處理法變更
    elements.process.addEventListener('change', updateBeanFlavorHint);

    // 咖啡粉量變更
    elements.coffeeAmount.addEventListener('input', () => {
        state.coffeeAmount = parseFloat(elements.coffeeAmount.value) || 0;
        state.lastChanged = 'coffee';
        updateCalculator();
    });

    // 水量變更
    elements.waterAmount.addEventListener('input', () => {
        state.waterAmount = parseFloat(elements.waterAmount.value) || 0;
        state.lastChanged = 'water';
        updateCalculatorFromWater();
    });

    // 水粉比滑桿
    elements.ratioSlider.addEventListener('input', () => {
        state.ratio = parseFloat(elements.ratioSlider.value);
        state.lastChanged = 'ratio';
        updateCalculator();
    });

    // 儲存配方按鈕
    elements.saveRecipeBtn.addEventListener('click', () => {
        openSaveRecipeModal();
    });

    // 取消儲存
    elements.cancelSaveRecipe.addEventListener('click', () => {
        closeSaveRecipeModal();
    });

    // 儲存配方表單
    elements.saveRecipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveRecipe();
    });

    // 點擊 modal 外部關閉
    elements.saveRecipeModal.addEventListener('click', (e) => {
        if (e.target === elements.saveRecipeModal) {
            closeSaveRecipeModal();
        }
    });

    // 配方搜尋和篩選
    elements.recipeSearch.addEventListener('input', filterRecipes);
    elements.filterMethod.addEventListener('change', filterRecipes);
    elements.filterOrigin.addEventListener('change', filterRecipes);
    elements.filterRoast.addEventListener('change', filterRecipes);

    // 星星評分
    elements.ratingInput.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            setRating(rating);
        });
        star.addEventListener('mouseenter', () => {
            highlightStars(parseInt(star.dataset.rating));
        });
    });

    elements.ratingInput.addEventListener('mouseleave', () => {
        highlightStars(state.rating);
    });

    // 日誌表單
    elements.journalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveJournalEntry();
    });

    // 指南方式選擇
    elements.guideMethodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectGuide(btn.dataset.guide);
        });
    });

    // 返回指南選擇
    elements.guideBackBtn.addEventListener('click', () => {
        backToGuideSelector();
    });

    // 計時器控制
    elements.timerStart.addEventListener('click', startTimer);
    elements.timerPause.addEventListener('click', pauseTimer);
    elements.timerReset.addEventListener('click', resetTimer);
}

// 切換區段
function switchSection(sectionId) {
    // 更新導航連結狀態
    elements.navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
    });

    // 隱藏所有區段（包括 Hero）
    elements.sections.forEach(section => {
        section.classList.remove('active');
    });

    // 處理 Hero 區塊
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.classList.toggle('active', sectionId === 'hero');
    }

    // 顯示目標區段
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // 滾動到頁面頂部
    if (sectionId !== 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 選擇沖煮方式
function selectBrewMethod(method) {
    state.currentMethod = method;
    const methodData = BREW_METHODS[method];

    // 更新下拉選單
    elements.brewMethodSelect.value = method;

    // 更新方式資訊卡
    updateMethodInfoCard(method, methodData);

    // 更新預設比例
    state.ratio = methodData.ratio.default;
    elements.ratioSlider.value = state.ratio;
    elements.ratioSlider.min = methodData.ratio.min;
    elements.ratioSlider.max = methodData.ratio.max;

    updateCalculator();
    updateRecommendations();
}

// 更新沖煮方式資訊
function updateMethodInfoCard(method, methodData) {
    elements.methodIcon.textContent = METHOD_ICONS[method] || '☕';
    elements.methodDescription.textContent = methodData.description;
}

// 更新計算器（從咖啡粉量或比例計算水量）
function updateCalculator() {
    const methodData = BREW_METHODS[state.currentMethod];
    const water = Math.round(state.coffeeAmount * state.ratio);
    const bloom = methodData.bloomRatio > 0 ? Math.round(state.coffeeAmount * methodData.bloomRatio) : 0;

    // 更新水量
    state.waterAmount = water;
    elements.waterAmount.value = water;

    // 更新建議水量範圍
    const minWater = Math.round(state.coffeeAmount * methodData.ratio.min);
    const maxWater = Math.round(state.coffeeAmount * methodData.ratio.max);
    elements.recommendedWater.textContent = `${minWater}-${maxWater}`;

    // 更新比例顯示
    elements.ratioDisplay.textContent = `1:${state.ratio.toFixed(1)}`;
    elements.ratioValue.textContent = `1:${state.ratio.toFixed(1)}`;
    elements.bloomRecommend.textContent = bloom > 0 ? `${bloom} ml` : '不需要';

    updateRecommendations();
}

// 從水量變更計算比例
function updateCalculatorFromWater() {
    const methodData = BREW_METHODS[state.currentMethod];

    if (state.coffeeAmount > 0) {
        // 計算新比例
        state.ratio = state.waterAmount / state.coffeeAmount;

        // 限制比例範圍在 1-50 之間（合理範圍）
        state.ratio = Math.max(1, Math.min(50, state.ratio));

        // 更新滑桿（如果在範圍內）
        if (state.ratio >= methodData.ratio.min && state.ratio <= methodData.ratio.max) {
            elements.ratioSlider.value = state.ratio;
        }
    }

    const bloom = methodData.bloomRatio > 0 ? Math.round(state.coffeeAmount * methodData.bloomRatio) : 0;

    // 更新建議水量範圍
    const minWater = Math.round(state.coffeeAmount * methodData.ratio.min);
    const maxWater = Math.round(state.coffeeAmount * methodData.ratio.max);
    elements.recommendedWater.textContent = `${minWater}-${maxWater}`;

    // 更新比例顯示
    elements.ratioDisplay.textContent = `1:${state.ratio.toFixed(1)}`;
    elements.ratioValue.textContent = `1:${state.ratio.toFixed(1)}`;
    elements.bloomRecommend.textContent = bloom > 0 ? `${bloom} ml` : '不需要';

    updateRecommendations();
}

// 更新建議參數
function updateRecommendations() {
    const methodData = BREW_METHODS[state.currentMethod];
    const temp = methodData.temp[state.currentRoast];

    elements.tempRecommend.textContent = `${temp}°C`;
    elements.grindRecommend.textContent = `${methodData.grind} (${methodData.grindDesc})`;
    elements.timeRecommend.textContent = methodData.time;

    // 更新風味預測
    updateFlavorPrediction();
}

// 更新咖啡豆風味提示
function updateBeanFlavorHint() {
    const originValue = elements.origin.value;
    const varietyValue = elements.variety.value;
    const processValue = elements.process.value;
    const roastValue = elements.roastLevel.value;

    const originData = ORIGINS[originValue] || {};
    const varietyData = VARIETIES[varietyValue] || {};
    const processData = PROCESSES[processValue] || {};

    let hints = [];

    // 產地風味
    if (originData.flavor) {
        hints.push(`【${originData.name || '產地'}】${originData.flavor}`);
    }

    // 品種特色
    if (varietyData.flavor && varietyValue !== 'unknown') {
        hints.push(`【${varietyData.name}品種】${varietyData.flavor}`);
    }

    // 處理法影響
    if (processData.flavor && processValue !== 'unknown') {
        hints.push(`【${processData.name}】${processData.flavor}`);
    }

    // 烘焙度影響
    const roastHints = {
        'light': '淺焙突顯產地風土特色，酸質明亮，花果香明顯',
        'medium-light': '中淺焙保留果酸，開始展現甜感',
        'medium': '中焙平衡酸甜苦，焦糖堅果風味浮現',
        'medium-dark': '中深焙甜感飽滿，可可巧克力調性增強',
        'dark': '深焙以烘焙風味為主，低酸、苦甜、煙燻'
    };
    if (roastHints[roastValue]) {
        hints.push(`【烘焙】${roastHints[roastValue]}`);
    }

    // 沖煮建議
    if (originData.recommend) {
        hints.push(`【建議】${originData.recommend}`);
    }

    // 組合顯示
    if (hints.length > 0) {
        elements.beanHintText.innerHTML = hints.join('<br>');
    } else {
        elements.beanHintText.textContent = '選擇咖啡豆資訊以獲得風味提示';
    }
}

// 風味預測
function updateFlavorPrediction() {
    const methodData = BREW_METHODS[state.currentMethod];
    const temp = methodData.temp[state.currentRoast];
    const ratio = state.ratio;
    const roast = state.currentRoast;

    // 取得咖啡豆資訊
    const originValue = elements.origin.value;
    const varietyValue = elements.variety.value;
    const processValue = elements.process.value;

    const originData = ORIGINS[originValue] || {};
    const varietyData = VARIETIES[varietyValue] || {};
    const processData = PROCESSES[processValue] || {};

    // 計算各項風味指標 (0-100)
    let strength, acidity, bitter, sweet, body;

    // 濃度：比例越小越濃
    if (ratio <= 10) strength = 95;
    else if (ratio <= 12) strength = 80;
    else if (ratio <= 14) strength = 65;
    else if (ratio <= 16) strength = 50;
    else if (ratio <= 18) strength = 35;
    else strength = 20;

    // 烘焙度對應基礎值
    const roastValues = {
        'light': { acid: 75, bitter: 20, sweet: 50, body: 30 },
        'medium-light': { acid: 60, bitter: 30, sweet: 60, body: 40 },
        'medium': { acid: 45, bitter: 40, sweet: 70, body: 50 },
        'medium-dark': { acid: 30, bitter: 55, sweet: 55, body: 60 },
        'dark': { acid: 20, bitter: 70, sweet: 35, body: 70 }
    };
    const rv = roastValues[roast] || roastValues['medium'];

    // === 產地影響 ===
    const acidityMap = { 'very-high': 20, 'high': 15, 'medium-high': 10, 'medium': 0, 'low-medium': -10, 'low': -15, 'very-low': -20 };
    const bodyMap = { 'very-full': 20, 'full': 15, 'medium-full': 10, 'medium': 0, 'light-medium': -5, 'light': -10 };

    let originAcidBonus = acidityMap[originData.acidity] || 0;
    let originBodyBonus = bodyMap[originData.body] || 0;

    // === 品種影響 ===
    let varietyBonus = { acid: 0, sweet: 0, body: 0 };
    const flavorText = (varietyData.flavor || '').toLowerCase();

    // 分析品種風味描述
    if (flavorText.includes('花香') || flavorText.includes('柑橘') || flavorText.includes('明亮')) {
        varietyBonus.acid += 10;
    }
    if (flavorText.includes('甜') || flavorText.includes('蜂蜜') || flavorText.includes('焦糖')) {
        varietyBonus.sweet += 10;
    }
    if (flavorText.includes('厚實') || flavorText.includes('醇厚') || flavorText.includes('濃郁')) {
        varietyBonus.body += 10;
    }
    if (flavorText.includes('細緻') || flavorText.includes('輕盈') || flavorText.includes('茶感')) {
        varietyBonus.body -= 5;
        varietyBonus.acid += 5;
    }

    // === 處理法影響 ===
    let processBonus = { acid: 0, sweet: 0, body: 0, ferment: 0 };
    const processEffect = (processData.effect || '').toLowerCase();

    // 水洗：乾淨、酸質清晰
    if (processValue === 'washed') {
        processBonus.acid += 10;
        processBonus.body -= 5;
    }
    // 日曬：甜感、厚實、發酵感
    else if (processValue === 'natural') {
        processBonus.sweet += 15;
        processBonus.body += 10;
        processBonus.ferment = 15;
    }
    // 蜜處理
    else if (processValue.includes('honey')) {
        processBonus.sweet += 10;
        if (processValue === 'honey-black') {
            processBonus.body += 10;
            processBonus.ferment = 10;
        }
    }
    // 濕剝法：厚重、低酸
    else if (processValue === 'wet-hulled' || processValue === 'giling-basah') {
        processBonus.body += 20;
        processBonus.acid -= 15;
    }
    // 厭氧發酵
    else if (processValue.includes('anaerobic')) {
        processBonus.ferment = 25;
        processBonus.sweet += 10;
    }

    // === 萃取參數影響 ===
    let tempBonus = temp >= 94 ? 15 : temp >= 91 ? 5 : -10;
    let ratioBonus = ratio >= 16 ? 10 : ratio >= 14 ? 0 : -15;

    // === 綜合計算 ===
    // 酸質
    acidity = rv.acid + tempBonus + ratioBonus + originAcidBonus + varietyBonus.acid + processBonus.acid;
    acidity = Math.min(100, Math.max(10, acidity));

    // 苦味：深焙+高溫+濃比例 = 高苦
    let bitterTempBonus = temp >= 94 ? 15 : temp >= 91 ? 5 : -5;
    let bitterRatioBonus = ratio <= 12 ? 20 : ratio <= 14 ? 10 : 0;
    bitter = Math.min(100, Math.max(10, rv.bitter + bitterTempBonus + bitterRatioBonus));

    // 甜感
    let sweetTempBonus = (temp >= 90 && temp <= 93) ? 15 : 0;
    let sweetRatioBonus = (ratio >= 14 && ratio <= 17) ? 10 : -5;
    sweet = rv.sweet + sweetTempBonus + sweetRatioBonus + varietyBonus.sweet + processBonus.sweet;
    sweet = Math.min(100, Math.max(10, sweet));

    // 醇厚度
    let bodyRatioBonus = ratio <= 12 ? 25 : ratio <= 14 ? 15 : ratio <= 16 ? 5 : -10;
    let methodBonus = ['frenchpress', 'moka', 'espresso', 'turkish', 'phin'].includes(state.currentMethod) ? 15 : 0;
    body = rv.body + bodyRatioBonus + methodBonus + originBodyBonus + varietyBonus.body + processBonus.body;
    body = Math.min(100, Math.max(10, body));

    // 更新儀表顯示
    elements.strengthMeter.style.width = `${strength}%`;
    elements.acidityMeter.style.width = `${acidity}%`;
    elements.bitterMeter.style.width = `${bitter}%`;
    elements.sweetMeter.style.width = `${sweet}%`;
    elements.bodyMeter.style.width = `${body}%`;

    // 生成風味描述
    const flavorDesc = generateFlavorDescription(strength, acidity, bitter, sweet, body, roast, ratio, temp);
    elements.flavorText.textContent = flavorDesc;

    // 更新標籤
    updateFlavorTags(ratio, temp, roast);

    // 生成調整建議
    generateAdjustmentTips(strength, acidity, bitter, sweet, body, ratio, temp, roast);
}

// 生成風味描述
function generateFlavorDescription(strength, acidity, bitter, sweet, body, roast, ratio, temp) {
    let desc = '';

    // 濃度描述
    if (strength >= 75) {
        desc += '濃郁厚重的咖啡，';
    } else if (strength >= 50) {
        desc += '濃度適中，';
    } else {
        desc += '清爽輕盈的口感，';
    }

    // 主要風味特徵（根據烘焙度）
    const roastDescriptions = {
        'light': acidity >= 60
            ? '明亮的果酸突出，可能帶有柑橘、莓果或花香調性，展現產地風土特色。'
            : '溫和的酸質，帶有水果和花香的細緻風味。',
        'medium-light': acidity >= 50
            ? '活潑的果酸與初現的甜感交織，帶有柑橘、蜂蜜與輕微焦糖調性。'
            : '明亮而不刺激的酸質，開始展現甜感與堅果香氣。',
        'medium': sweet >= 60
            ? '平衡的甜感與酸質，焦糖、蜂蜜調性明顯，適合日常品飲。'
            : '均衡的風味表現，堅果與可可香氣，整體和諧順口。',
        'medium-dark': sweet >= 50
            ? '飽滿的甜感與可可調性，帶有太妃糖、黑巧克力與輕微烘焙香氣。'
            : '濃郁的可可與堅果風味，酸質柔和，尾韻帶有焦糖感。',
        'dark': bitter >= 60
            ? '深沉的烘焙風味，帶有黑巧克力、焦糖和堅果調性，尾韻帶有煙燻感。'
            : '圓潤的深焙風味，可可與堅果香氣明顯，苦甜交織。'
    };
    desc += roastDescriptions[roast] || roastDescriptions['medium'];

    // 補充醇厚度
    if (body >= 70) {
        desc += ' 口感厚實綿密，餘韻悠長。';
    } else if (body <= 35) {
        desc += ' 口感清爽，如茶般輕盈。';
    }

    return desc;
}

// 更新風味標籤
function updateFlavorTags(ratio, temp, roast) {
    // 比例標籤
    if (ratio <= 12) {
        elements.ratioTag.textContent = '濃縮比例';
        elements.ratioTag.className = 'flavor-tag highlight';
    } else if (ratio <= 15) {
        elements.ratioTag.textContent = '偏濃比例';
        elements.ratioTag.className = 'flavor-tag';
    } else if (ratio <= 17) {
        elements.ratioTag.textContent = '標準比例';
        elements.ratioTag.className = 'flavor-tag';
    } else {
        elements.ratioTag.textContent = '偏淡比例';
        elements.ratioTag.className = 'flavor-tag';
    }

    // 溫度標籤
    if (temp >= 94) {
        elements.tempTag.textContent = '高溫萃取';
        elements.tempTag.className = 'flavor-tag highlight';
    } else if (temp >= 90) {
        elements.tempTag.textContent = '中溫萃取';
        elements.tempTag.className = 'flavor-tag';
    } else {
        elements.tempTag.textContent = '低溫萃取';
        elements.tempTag.className = 'flavor-tag';
    }

    // 烘焙度標籤
    const roastLabels = {
        light: '花果香調',
        medium: '平衡甜感',
        dark: '焦糖可可'
    };
    elements.roastTag.textContent = roastLabels[roast];
    elements.roastTag.className = 'flavor-tag';
}

// 生成調整建議
function generateAdjustmentTips(strength, acidity, bitter, sweet, body, ratio, temp, roast) {
    const tips = [];

    // 根據當前參數給出建議
    if (ratio <= 12 && roast === 'dark') {
        tips.push({
            icon: '⚠️',
            text: '濃比例搭配深焙可能會過於苦澀，建議將比例調高至 1:14 以上，或降低水溫。',
            type: 'warning'
        });
    }

    if (ratio >= 18 && roast === 'light') {
        tips.push({
            icon: '💡',
            text: '淺焙豆使用稀比例會突顯酸質，如果覺得太酸可以降低比例至 1:15-16。',
            type: 'info'
        });
    }

    if (temp >= 95 && roast === 'dark') {
        tips.push({
            icon: '⚠️',
            text: '深焙豆使用高溫容易過萃產生焦苦味，建議將水溫降至 88-90°C。',
            type: 'warning'
        });
    }

    if (temp <= 88 && roast === 'light') {
        tips.push({
            icon: '💡',
            text: '淺焙豆使用低溫可能萃取不足，風味偏酸偏薄，建議提高水溫至 93-95°C。',
            type: 'info'
        });
    }

    // 風味平衡建議
    if (acidity >= 70 && bitter <= 30) {
        tips.push({
            icon: '🎯',
            text: '想降低酸感？試試降低水溫 2-3°C，或使用較濃的比例。',
            type: ''
        });
    }

    if (bitter >= 70 && sweet <= 40) {
        tips.push({
            icon: '🎯',
            text: '想減少苦味？降低水溫、縮短萃取時間，或使用較稀的比例。',
            type: ''
        });
    }

    if (body <= 35 && strength <= 40) {
        tips.push({
            icon: '🎯',
            text: '想增加醇厚度？試試降低比例至 1:14，或改用法壓壺沖煮。',
            type: ''
        });
    }

    // 如果沒有特別建議
    if (tips.length === 0) {
        if (sweet >= 55 && acidity >= 35 && acidity <= 65 && bitter <= 55) {
            tips.push({
                icon: '✨',
                text: '目前參數平衡良好！這組參數適合大多數咖啡豆，能呈現均衡的風味。',
                type: ''
            });
        } else {
            tips.push({
                icon: '💡',
                text: '可根據個人口味微調：想要更酸可提高水溫和比例；想要更甜可使用中焙豆和適中比例。',
                type: 'info'
            });
        }
    }

    // 加入通用提示
    const methodData = BREW_METHODS[state.currentMethod];
    tips.push({
        icon: '📝',
        text: `${methodData.name} 建議研磨度：${methodData.grind}（${methodData.grindDesc}），萃取時間控制在 ${methodData.time}。`,
        type: ''
    });

    // 渲染建議
    elements.adjustmentTips.innerHTML = tips.map(tip => `
        <div class="tip-item ${tip.type}">
            <span class="tip-icon">${tip.icon}</span>
            <span class="tip-text">${tip.text}</span>
        </div>
    `).join('');
}

// 開啟儲存配方彈窗
function openSaveRecipeModal() {
    elements.saveRecipeModal.classList.add('active');
    elements.recipeName.value = '';
    elements.recipeNotes.value = '';
    elements.recipeName.focus();
}

// 關閉儲存配方彈窗
function closeSaveRecipeModal() {
    elements.saveRecipeModal.classList.remove('active');
}

// 儲存配方
function saveRecipe() {
    const methodData = BREW_METHODS[state.currentMethod];
    const water = Math.round(state.coffeeAmount * state.ratio);

    const recipe = {
        id: 'recipe-' + Date.now(),
        name: elements.recipeName.value,
        method: state.currentMethod,
        coffee: state.coffeeAmount,
        water: water,
        ratio: state.ratio,
        roast: state.currentRoast,
        temp: methodData.temp[state.currentRoast],
        grind: methodData.grind,
        notes: elements.recipeNotes.value,
        createdAt: new Date().toISOString(),
        isDefault: false
    };

    state.myRecipes.unshift(recipe);
    saveToStorage();
    renderMyRecipes();
    closeSaveRecipeModal();
    showToast('配方已儲存！');
}

// 篩選配方
function filterRecipes() {
    const searchTerm = elements.recipeSearch.value.toLowerCase();
    const methodFilter = elements.filterMethod.value;
    const originFilter = elements.filterOrigin.value;
    const roastFilter = elements.filterRoast.value;

    const filteredRecipes = DEFAULT_RECIPES.filter(recipe => {
        const matchSearch = !searchTerm ||
            recipe.name.toLowerCase().includes(searchTerm) ||
            (recipe.origin && recipe.origin.toLowerCase().includes(searchTerm)) ||
            (recipe.notes && recipe.notes.toLowerCase().includes(searchTerm));

        const matchMethod = !methodFilter || recipe.method === methodFilter;
        const matchOrigin = !originFilter || (recipe.origin && recipe.origin.includes(originFilter));
        const matchRoast = !roastFilter || recipe.roast === roastFilter;

        return matchSearch && matchMethod && matchOrigin && matchRoast;
    });

    elements.recipeCount.textContent = `顯示 ${filteredRecipes.length} / ${DEFAULT_RECIPES.length} 個配方`;
    renderFilteredRecipes(filteredRecipes);
}

// 渲染篩選後的配方
function renderFilteredRecipes(recipes) {
    if (recipes.length === 0) {
        elements.defaultRecipes.innerHTML = '<p class="empty-message">沒有符合條件的配方</p>';
        return;
    }

    elements.defaultRecipes.innerHTML = recipes.map(recipe => createRecipeHTML(recipe, true)).join('');

    // 綁定事件
    elements.defaultRecipes.querySelectorAll('.recipe-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.recipe-actions')) {
                const recipeId = item.dataset.id;
                const recipe = DEFAULT_RECIPES.find(r => r.id === recipeId);
                if (recipe) loadRecipe(recipe);
            }
        });
    });
}

// 渲染預設配方
function renderDefaultRecipes() {
    elements.recipeCount.textContent = `顯示 ${DEFAULT_RECIPES.length} / ${DEFAULT_RECIPES.length} 個配方`;
    elements.defaultRecipes.innerHTML = DEFAULT_RECIPES.map(recipe => createRecipeHTML(recipe, true)).join('');

    // 綁定事件
    elements.defaultRecipes.querySelectorAll('.recipe-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.recipe-actions')) {
                const recipeId = item.dataset.id;
                const recipe = DEFAULT_RECIPES.find(r => r.id === recipeId);
                if (recipe) loadRecipe(recipe);
            }
        });
    });
}

// 渲染我的配方
function renderMyRecipes() {
    if (state.myRecipes.length === 0) {
        elements.myRecipes.innerHTML = '<p class="empty-message">尚未儲存任何配方</p>';
        return;
    }

    elements.myRecipes.innerHTML = state.myRecipes.map(recipe => createRecipeHTML(recipe, false)).join('');

    // 綁定事件
    elements.myRecipes.querySelectorAll('.recipe-item').forEach(item => {
        const recipeId = item.dataset.id;

        item.addEventListener('click', (e) => {
            if (!e.target.closest('.recipe-actions')) {
                const recipe = state.myRecipes.find(r => r.id === recipeId);
                if (recipe) loadRecipe(recipe);
            }
        });

        // 刪除按鈕
        const deleteBtn = item.querySelector('.delete-recipe');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteRecipe(recipeId);
            });
        }
    });
}

// 創建配方 HTML（使用 escapeHTML 防止 XSS）
function createRecipeHTML(recipe, isDefault) {
    const methodName = BREW_METHODS[recipe.method]?.name || recipe.method;
    const originText = recipe.origin ? `<span class="recipe-origin">${escapeHTML(recipe.origin)}</span>` : '';
    const roastText = { light: '淺焙', medium: '中焙', dark: '深焙' }[recipe.roast] || '';
    return `
        <div class="recipe-item" data-id="${escapeHTML(recipe.id)}">
            <div class="recipe-info">
                <h4>${escapeHTML(recipe.name)}</h4>
                <p>${escapeHTML(methodName)} | ${recipe.coffee}g : ${recipe.water}ml | ${roastText} | ${recipe.temp}°C</p>
                ${originText}
                ${recipe.notes ? `<p class="recipe-notes">${escapeHTML(recipe.notes)}</p>` : ''}
            </div>
            <div class="recipe-actions">
                <button class="btn btn-small btn-primary load-recipe">載入</button>
                ${!isDefault ? '<button class="btn btn-small btn-secondary delete-recipe">刪除</button>' : ''}
            </div>
        </div>
    `;
}

// 載入配方
function loadRecipe(recipe) {
    state.currentMethod = recipe.method;
    state.coffeeAmount = recipe.coffee;
    state.waterAmount = recipe.water;
    state.ratio = recipe.ratio;
    state.currentRoast = recipe.roast;

    // 更新沖煮方式選單和資訊卡
    const methodData = BREW_METHODS[recipe.method];
    elements.brewMethodSelect.value = recipe.method;
    updateMethodInfoCard(recipe.method, methodData);

    // 更新滑桿範圍
    elements.ratioSlider.min = methodData.ratio.min;
    elements.ratioSlider.max = methodData.ratio.max;

    // 更新 UI
    elements.coffeeAmount.value = recipe.coffee;
    elements.waterAmount.value = recipe.water;
    elements.ratioSlider.value = recipe.ratio;
    elements.roastLevel.value = recipe.roast;

    updateCalculator();
    switchSection('calculator');
    showToast(`已載入「${escapeHTML(recipe.name)}」配方`);
}

// 刪除配方
function deleteRecipe(recipeId) {
    if (confirm('確定要刪除這個配方嗎？')) {
        state.myRecipes = state.myRecipes.filter(r => r.id !== recipeId);
        saveToStorage();
        renderMyRecipes();
        showToast('配方已刪除');
    }
}

// 設定今天日期
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    elements.journalDate.value = today;
}

// 設定評分
function setRating(rating) {
    state.rating = rating;
    elements.journalRating.value = rating;
    highlightStars(rating);
}

// 高亮星星
function highlightStars(rating) {
    elements.ratingInput.querySelectorAll('.star').forEach((star, index) => {
        star.classList.toggle('active', index < rating);
        star.textContent = index < rating ? '★' : '☆';
    });
}

// 儲存日誌
function saveJournalEntry() {
    const entry = {
        id: 'journal-' + Date.now(),
        date: elements.journalDate.value,
        method: elements.journalMethod.value,
        bean: elements.journalBean.value,
        coffee: parseFloat(elements.journalCoffee.value),
        water: parseFloat(elements.journalWater.value),
        temp: parseFloat(elements.journalTemp.value),
        rating: state.rating,
        notes: elements.journalNotes.value,
        createdAt: new Date().toISOString()
    };

    state.journalEntries.unshift(entry);
    saveToStorage();
    renderJournalEntries();

    // 重置表單
    elements.journalForm.reset();
    setTodayDate();
    setRating(0);

    showToast('沖煮記錄已儲存！');
}

// 渲染日誌列表
function renderJournalEntries() {
    if (state.journalEntries.length === 0) {
        elements.journalEntries.innerHTML = '<p class="empty-message">尚未有任何記錄</p>';
        return;
    }

    elements.journalEntries.innerHTML = state.journalEntries.map(entry => {
        const methodName = BREW_METHODS[entry.method]?.name || entry.method;
        const rating = Math.max(0, Math.min(5, entry.rating || 0)); // 確保評分在 0-5 之間
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        const formattedDate = new Date(entry.date).toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="journal-entry" data-id="${escapeHTML(entry.id)}">
                <div class="journal-header">
                    <span class="journal-date">${escapeHTML(formattedDate)}</span>
                    <span class="journal-rating">${stars}</span>
                </div>
                <div class="journal-params">
                    <span>${escapeHTML(methodName)}</span>
                    ${entry.bean ? `<span>${escapeHTML(entry.bean)}</span>` : ''}
                    <span>${entry.coffee}g : ${entry.water}ml</span>
                    <span>${entry.temp}°C</span>
                </div>
                ${entry.notes ? `<div class="journal-notes">"${escapeHTML(entry.notes)}"</div>` : ''}
                <div class="journal-actions">
                    <button class="btn btn-small btn-secondary delete-journal" data-id="${escapeHTML(entry.id)}">刪除</button>
                </div>
            </div>
        `;
    }).join('');

    // 綁定刪除事件
    elements.journalEntries.querySelectorAll('.delete-journal').forEach(btn => {
        btn.addEventListener('click', () => {
            deleteJournalEntry(btn.dataset.id);
        });
    });
}

// 刪除日誌
function deleteJournalEntry(entryId) {
    if (confirm('確定要刪除這筆記錄嗎？')) {
        state.journalEntries = state.journalEntries.filter(e => e.id !== entryId);
        saveToStorage();
        renderJournalEntries();
        showToast('記錄已刪除');
    }
}

// 選擇沖煮指南
function selectGuide(guide) {
    state.currentGuide = guide;
    const guideData = BREW_GUIDES[guide];

    if (!guideData) return;

    elements.guideMethodBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.guide === guide);
    });

    elements.guideTitle.textContent = guideData.title;

    // 渲染介紹
    if (guideData.intro && elements.guideIntro) {
        elements.guideIntro.innerHTML = `<p>${guideData.intro}</p>`;
        elements.guideIntro.style.display = 'block';
    } else if (elements.guideIntro) {
        elements.guideIntro.style.display = 'none';
    }

    // 渲染器材清單
    if (guideData.equipment && elements.guideEquipment) {
        elements.guideEquipment.innerHTML = `
            <h4>所需器材</h4>
            <ul class="equipment-list">
                ${guideData.equipment.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        elements.guideEquipment.style.display = 'block';
    } else if (elements.guideEquipment) {
        elements.guideEquipment.style.display = 'none';
    }

    // 渲染建議參數
    if (guideData.params && elements.guideParams) {
        elements.guideParams.innerHTML = `
            <h4>建議參數</h4>
            <div class="params-grid">
                <div class="param-item">
                    <span class="param-label">咖啡粉</span>
                    <span class="param-value">${guideData.params.coffee}</span>
                </div>
                <div class="param-item">
                    <span class="param-label">水量</span>
                    <span class="param-value">${guideData.params.water}</span>
                </div>
                <div class="param-item">
                    <span class="param-label">比例</span>
                    <span class="param-value">${guideData.params.ratio}</span>
                </div>
                <div class="param-item">
                    <span class="param-label">研磨度</span>
                    <span class="param-value">${guideData.params.grind}</span>
                </div>
                <div class="param-item">
                    <span class="param-label">水溫</span>
                    <span class="param-value">${guideData.params.temp}</span>
                </div>
                <div class="param-item">
                    <span class="param-label">萃取時間</span>
                    <span class="param-value">${guideData.params.time}</span>
                </div>
            </div>
        `;
        elements.guideParams.style.display = 'block';
    } else if (elements.guideParams) {
        elements.guideParams.style.display = 'none';
    }

    // 渲染步驟
    elements.guideSteps.innerHTML = guideData.steps.map((step, index) => `
        <div class="guide-step" data-step="${index}">
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <h4>${step.title}</h4>
                <p>${step.description}</p>
                ${step.detail ? `<p class="step-detail">${step.detail}</p>` : ''}
                ${step.time ? `<div class="step-time">⏱️ ${step.time}</div>` : ''}
            </div>
        </div>
    `).join('');

    // 渲染小技巧
    if (guideData.tips && guideData.tips.length > 0 && elements.guideTips) {
        elements.guideTips.innerHTML = `
            <h4>小技巧</h4>
            <ul class="tips-list">
                ${guideData.tips.map(tip => `
                    <li>
                        <span class="tip-icon">${tip.icon}</span>
                        <span class="tip-text">${tip.text}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        elements.guideTips.style.display = 'block';
    } else if (elements.guideTips) {
        elements.guideTips.style.display = 'none';
    }

    // 渲染問題排解
    if (guideData.troubleshooting && guideData.troubleshooting.length > 0 && elements.guideTroubleshooting) {
        elements.guideTroubleshooting.innerHTML = `
            <h4>常見問題排解</h4>
            <div class="troubleshooting-list">
                ${guideData.troubleshooting.map(item => `
                    <div class="troubleshooting-item">
                        <div class="problem">❓ ${item.problem}</div>
                        <div class="solution">💡 ${item.solution}</div>
                    </div>
                `).join('')}
            </div>
        `;
        elements.guideTroubleshooting.style.display = 'block';
    } else if (elements.guideTroubleshooting) {
        elements.guideTroubleshooting.style.display = 'none';
    }

    // 隱藏選擇區，顯示內容區
    elements.guideSelector.style.display = 'none';
    elements.guideContent.style.display = 'block';

    // 捲動到頁面頂部（指南區塊）
    elements.guideContent.scrollIntoView({ behavior: 'smooth', block: 'start' });

    resetTimer();
}

// 返回指南選擇
function backToGuideSelector() {
    state.currentGuide = null;
    elements.guideContent.style.display = 'none';
    elements.guideSelector.style.display = 'block';

    // 取消所有按鈕的 active 狀態
    elements.guideMethodBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    // 捲動到選擇區頂部
    elements.guideSelector.scrollIntoView({ behavior: 'smooth', block: 'start' });

    resetTimer();
}

// 計時器功能
function startTimer() {
    if (state.timerRunning) return;

    state.timerRunning = true;
    elements.timerStart.disabled = true;

    state.timerInterval = setInterval(() => {
        state.timerSeconds++;
        updateTimerDisplay();
        checkStepAlerts();
    }, 1000);
}

function pauseTimer() {
    state.timerRunning = false;
    elements.timerStart.disabled = false;

    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function resetTimer() {
    pauseTimer();
    state.timerSeconds = 0;
    updateTimerDisplay();
    elements.currentStepAlert.style.display = 'none';
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timerSeconds / 60);
    const seconds = state.timerSeconds % 60;

    elements.timerMinutes.textContent = minutes.toString().padStart(2, '0');
    elements.timerSeconds.textContent = seconds.toString().padStart(2, '0');
}

// 檢查步驟提醒
function checkStepAlerts() {
    if (!state.currentGuide) return;

    const guideData = BREW_GUIDES[state.currentGuide];
    const currentTime = formatTime(state.timerSeconds);

    // 定義提醒時間點
    const alerts = {
        v60: [
            { time: 30, message: '悶蒸結束，開始第一次注水' },
            { time: 75, message: '準備第二次注水' },
            { time: 120, message: '等待萃取完成' },
            { time: 150, message: '萃取應該完成了！' }
        ],
        frenchpress: [
            { time: 30, message: '攪拌咖啡粉' },
            { time: 240, message: '準備壓下濾網！' }
        ],
        aeropress: [
            { time: 10, message: '攪拌完成，蓋上濾蓋' },
            { time: 90, message: '準備翻轉壓出！' }
        ],
        chemex: [
            { time: 45, message: '悶蒸結束，開始主要注水' },
            { time: 180, message: '繼續緩慢注水' },
            { time: 240, message: '萃取即將完成' }
        ]
    };

    const guideAlerts = alerts[state.currentGuide] || [];

    for (const alert of guideAlerts) {
        if (state.timerSeconds === alert.time) {
            showStepAlert(alert.message);
            break;
        }
    }
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function showStepAlert(message) {
    elements.stepAlertText.textContent = message;
    elements.currentStepAlert.style.display = 'flex';

    // 播放提示音（使用共用 AudioContext 避免記憶體洩漏）
    try {
        const audioContext = getAudioContext();
        if (audioContext) {
            // 確保 AudioContext 處於運行狀態
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.3;

            const now = audioContext.currentTime;
            oscillator.start(now);
            oscillator.stop(now + 0.2);
        }
    } catch (e) {
        // 忽略音效錯誤
    }

    // 3秒後隱藏提醒
    setTimeout(() => {
        elements.currentStepAlert.style.display = 'none';
    }, 3000);
}

// 顯示 Toast 通知
function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');

    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 2500);
}

// ========================================
// Hero Section 功能
// ========================================

// 初始化標題欄滾動效果
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

// 初始化 Hero 載入動畫
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-content .fade-in-up');

    // 延遲後觸發動畫，讓頁面有時間載入
    setTimeout(() => {
        heroElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
}

// 初始化滾動動畫 (Intersection Observer)
function initScrollAnimations() {
    // 為所有卡片添加 fade-in-up 類別
    const cards = document.querySelectorAll('.section .card');
    cards.forEach(card => {
        if (!card.classList.contains('fade-in-up')) {
            card.classList.add('fade-in-up');
        }
    });

    // 設置 Intersection Observer
    const observerOptions = {
        root: null, // 使用視窗作為根
        rootMargin: '0px 0px -50px 0px', // 提前觸發
        threshold: 0.1 // 10% 可見時觸發
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一旦動畫觸發，停止觀察
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 觀察所有帶有 fade-in-up 類別的元素（排除 Hero 內的元素）
    const fadeElements = document.querySelectorAll('.section .fade-in-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

// 設置 Hero CTA 按鈕事件
function setupHeroCTA() {
    const ctaButtons = document.querySelectorAll('.hero-cta a[data-section]');

    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const section = btn.dataset.section;
            switchSection(section);
        });
    });

    // 點擊滾動指示器時滾動到下一個區塊
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            switchSection('calculator');
        });
        scrollIndicator.style.cursor = 'pointer';
    }
}

// 啟動應用程式
document.addEventListener('DOMContentLoaded', init);
