import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // ← Cookieを送信するために必須
})

// ✅ 追加！CSRFトークンを自動的にリクエストヘッダーにセット
api.interceptors.request.use((config) => {
  const token = getCookieValue('XSRF-TOKEN');
  if (token && config.headers) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  return config;
});

function getCookieValue(name: string): string | null {
  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='));
  return value ? value.split('=')[1] : null;
}


export default api