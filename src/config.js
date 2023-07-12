export const SARISKA_API_SERVICE_HOST = 'https://api.sariska.io';
export const SARISKA_API_KEY = process.env.NODE_ENV === 'development' ? "20966faa85cb1d552025cbb631ecaa9b61d658bf8caa74c8358a" : '249202aabed00b41363794b526eee6927bd35cbc9bac36cd3edcaa';
//export const SARISKA_API_KEY = '27fd6f9b91c706492720d0e023a8aac067d94da499b03e8c39';

export const MESSAGING_API_SERVICE_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api/v1/messaging' : 'https://api.sariska.io/api/v1/messaging';
export const WEB_SOCKET_URL = process.env.NODE_ENV === 'development' ? "ws://localhost:4000/api/v1/messaging/websocket" :  "wss://api.sariska.io/api/v1/messaging/websocket";
export const SARISKA_WEBSITE = 'https://sariska.io';
export const SARISKA_COMPANY_NAME = 'Sariska.io';