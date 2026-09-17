
// 自動從當前 GitHub Pages 網址解析 擁有者 與 儲存庫名稱
// 預設網址結構為: https://<username>.github.io/<repo-name>/
const hostParts = window.location.hostname.split('.');
const pathParts = window.location.pathname.split('/').filter(Boolean);

const owner = hostParts[0];
const repo = pathParts[0];

// 排除非 App 政策的保留資料夾
const ignoredDirs = ['.github', 'assets', 'images', 'scripts', 'css', 'js'];

// 掃描儲存庫目錄並渲染到頁面
async function fetchDirectories() {
    const container = document.getElementById('list-container');

    // 本地測試 fallback（若直接在本機以 localhost 或 127.0.0.1 開啟）
    const targetOwner = (owner === 'localhost' || owner === '127') ? 'your-username' : owner;
    const targetRepo = repo || 'your-repo';

    // GitHub Contents API 網址
    const apiUrl = `https://api.github.com/repos/${targetOwner}/${targetRepo}/contents`;

    try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
            throw new Error(`API 請求失敗: HTTP ${res.status}`);
        }
        const items = await res.json();

        // 篩選出型別為目錄且未在排除清單內的項目
        const directories = items.filter(item => item.type === 'dir' && !ignoredDirs.includes(item.name));

        if (directories.length === 0) {
            container.innerHTML = '<div class="loading">目前沒有找到任何 App 目錄。</div>';
            return;
        }

        container.innerHTML = '';
        directories.forEach(dir => {
            // 建立卡片超連結元素
            const card = document.createElement('a');
            card.className = 'app-card';
            card.href = `./${dir.name}/`;

            // 顯示目錄名稱
            const nameSpan = document.createElement('span');
            nameSpan.className = 'app-name';
            nameSpan.textContent = dir.name;

            // 顯示前往標籤
            const badge = document.createElement('span');
            badge.className = 'status-badge';
            badge.textContent = '查看隱私權政策';

            card.appendChild(nameSpan);
            card.appendChild(badge);
            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = `<div class="error">讀取失敗：${err.message}<br>請確認儲存庫為公開（Public）狀態。</div>`;
    }
}

// 執行目錄掃描
fetchDirectories();
