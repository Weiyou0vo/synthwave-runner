// 部署 Apps Script 後,把「網頁應用程式網址」貼在這裡(以 /exec 結尾)
const API_URL = 'https://script.google.com/macros/s/AKfycbyWT3E5bmMrKjKeC-xeg9x67oxq6hN0wFGK-oPOyXk5ifPu2J6aNO_4oMyzhjX8IGDb/exec';

// 前端 → 後端 的共用呼叫函式
async function api(action, data = {}) {
  if (API_URL.includes('貼上')) throw new Error('尚未設定 config.js 的 API_URL');
  let res;
  if (action === 'list') {
    res = await fetch(API_URL + '?action=list&limit=' + (data.limit || 10));
  } else {
    // 用 text/plain 可避免 CORS 預檢(Apps Script 不支援 OPTIONS)
    res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, ...data })
    });
  }
  return res.json();
}
