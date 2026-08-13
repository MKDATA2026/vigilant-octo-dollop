const API_BASE = (() => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  if (typeof window === 'undefined') {
    return 'http://localhost:4000/api';
  }
  const { protocol, hostname, port } = window.location;
  if (/\.app\.github\.dev$/.test(hostname)) {
    const backendHost = hostname.replace(/-3000(?=\.app\.github\.dev$)/, '-4000');
    if (backendHost !== hostname) {
      return `${protocol}//${backendHost}/api`;
    }
  }
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}:4000/api`;
  }
  return `${protocol}//${hostname}${port === '3000' ? ':4000' : ''}/api`;
})();

function getAuthHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
}

export async function authRequest(path, token, options = {}) {
  return request(path, {
    ...options,
    headers: getAuthHeaders(token)
  });
}

export default request;
