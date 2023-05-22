import {GENERATE_TOKEN_URL} from "../constants";

export const getToken = async ()=> {

    const body = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: "27fd6f9e85c304447d3cc0fb31e7ba8062df58af86ac3f9437", // enter your app secret
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
