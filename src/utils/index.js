import {GENERATE_TOKEN_URL} from "../constants";

export const getToken = async ()=> {
    const body = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: "24fd6f9385cb04507430c9fb67e8b4ce6ac452f984b32c8328", // enter your app secret
        })
    };
    try {
        const response = await fetch(GENERATE_TOKEN_URL, body);
        if (response.ok) {
            const json = await response.json();
            return json.token;
        } else {
            console.log(response.status);
        }
    } catch (error) {
        console.log('error', error);
    }
}
