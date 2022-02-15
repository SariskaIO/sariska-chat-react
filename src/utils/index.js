import {GENERATE_TOKEN_URL} from "../constants";

export const getToken = async ()=> {

    const body = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: "27fd6f8080d512442a3694f461adb3986cda5ba39dbe368d75", // enter your app secret
        })
    };

    try {
        const response = await fetch(GENERATE_TOKEN_URL, body);
        
        console.log("response", response);

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
