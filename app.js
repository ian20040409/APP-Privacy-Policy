// 應用程式清單設定（若有新增 App，在此陣列加入項目即可）
const appList = [
    {
        name: "Shopee Auto Coins",
        folder: "Shopee Auto Coins"
    }
];

// 渲染應用程式清單至頁面
function renderAppList() {
    const container = document.getElementById('list-container');

    if (!appList || appList.length === 0) {
        container.innerHTML = '<div class="loading">目前沒有已登記的 App 目錄。</div>';
        return;
    }

    container.innerHTML = '';

    appList.forEach(app => {
        // 建立卡片連結元素
        const card = document.createElement('a');
        card.className = 'app-card';
        // 使用 encodeURIComponent 處理資料夾名稱中的空格與特殊字元
        card.href = `./${encodeURIComponent(app.folder)}/`;

        // 應用程式名稱
        const nameSpan = document.createElement('span');
        nameSpan.className = 'app-name';
        nameSpan.textContent = app.name;

        // 導向按鈕標籤
        const badge = document.createElement('span');
        badge.className = 'status-badge';
        badge.textContent = '查看隱私權政策';

        card.appendChild(nameSpan);
        card.appendChild(badge);
        container.appendChild(card);
    });
}

// 頁面載入完成後執行渲染
renderAppList();
