import logo from '../assets/images/logo.png';
import { REACT_APP_API_SERVICE_HOST } from '../config';

export const GENERATE_TOKEN_URL = "https://api.sariska.io/api/v1/misc/generate-token";
export const WEB_SOCKET_URL = "wss://api.sariska.io/api/v1/messaging/websocket";
export const API_KEY = "27fd6f9b91c706492720d0e023a8aac067d94da499b03e8c39";
export const COMPANY_NAME = 'Sariska';
export const COMPANY_LOGO = logo;
export const GET_PRESIGNED_URL = `${REACT_APP_API_SERVICE_HOST}/api/v1/misc/get-presigned`;
