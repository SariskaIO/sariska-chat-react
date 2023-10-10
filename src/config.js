export const SARISKA_API_SERVICE_HOST = 'https://api.sariska.io';
export const SARISKA_API_KEY = process.env.NODE_ENV === 'development' ? "20966faa85cb1d552025cbb631ecaa9b61d658bf8caa74c8358a" : '27fd6f9e85c304447d3cc0fb31e7ba8062df58af86ac3f9437';

export const MESSAGING_API_SERVICE_HOST = process.env.NODE_ENV === 'development' ? 'https://api.dev.sariska.io/api/v1/messaging' : 'https://api.sariska.io/api/v1/messaging';
export const WEB_SOCKET_URL = process.env.NODE_ENV === 'development' ? "wss://api.dev.sariska.io/api/v1/messaging/websocket" :  "wss://api.sariska.io/api/v1/messaging/websocket";
export const SARISKA_WEBSITE = 'https://sariska.io';
export const SARISKA_COMPANY_NAME = 'Sariska.io';