async function loadApps() {
    const container = document.getElementById('list-container');

    try {
        // 加上時間戳記防止瀏覽器端強烈快取
        const res = await fetch(`./apps.json?t=${Date.now()}`);
        if (!res.ok) {
            throw new Error(`無法載入 apps.json (HTTP ${res.status})`);
        }

        const appList = await res.json();

        if (!appList || appList.length === 0) {
            container.innerHTML = '<div class="loading">目前沒有已發布的 App 隱私權政策。</div>';
            return;
        }

        container.innerHTML = '';

        appList.forEach(app => {
            const card = document.createElement('a');
            card.className = 'app-card';
            // 處理資料夾名稱中的空格（如 Shopee Auto Coins）
            card.href = `./${encodeURIComponent(app.folder)}/`;

            const nameSpan = document.createElement('span');
            nameSpan.className = 'app-name';
            nameSpan.textContent = app.name;

            const badge = document.createElement('span');
            badge.className = 'status-badge';
            badge.textContent = '查看隱私權政策';

            card.appendChild(nameSpan);
            card.appendChild(badge);
            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = `<div class="error">載入清單失敗：${err.message}</div>`;
    }
}

// 執行載入
loadApps();
