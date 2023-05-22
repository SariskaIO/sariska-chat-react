import {GENERATE_TOKEN_URL, GET_PRESIGNED_URL} from "../constants";
import linkifyHtml from 'linkify-html';

const Compressor = require('compressorjs');



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


export function getPresignedUrl(params) {
    return new Promise((resolve, reject) => {
        const body = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("SARISKA_TOKEN")}`
            },
            body: JSON.stringify({
                fileType: params.fileType,
                fileName: params.fileName
            })
        };

        fetch(GET_PRESIGNED_URL, body)
            .then((response) => {
                if (response.ok) {
                    return response.json(); //then consume it again, the error happens
                }
            })
            .then(function (response) {
                resolve(response);
            }).catch((error) => {
            reject(error)
        })
    });
}

export function formatBytes(bytes) {
    var marker = 1024; // Change to 1000 if required
    var decimal = 3; // Change as required
    var kiloBytes = marker; // One Kilobyte is 1024 bytes
    var megaBytes = marker * marker; // One MB is 1024 KB
    var gigaBytes = marker * marker * marker; // One GB is 1024 MB
    var teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

    // return bytes if less than a KB
    if (bytes < kiloBytes) return bytes + " Bytes";
    // return KB if less than a MB
    else if (bytes < megaBytes) return (bytes / kiloBytes).toFixed(decimal) + " KB";
    // return MB if less than a GB
    else if (bytes < gigaBytes) return (bytes / megaBytes).toFixed(decimal) + " MB";
    // return GB if less than a TB
    else return (bytes / gigaBytes).toFixed(decimal) + " GB";
}


export function compressFile(file, type) {
    return new Promise((resolve, reject) => {
        if (type === "attachment") {
            resolve(file);
        } else {
            new Compressor(file, {
                quality: 0.6,
                success(result) {
                    resolve(result);
                },
                error(err) {
                    reject(err.message);
                }
            });
        }
    });
}

export function getUniqueNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}


export const linkify=(inputText) =>{
    const options = { defaultProtocol: 'https',   target: '_blank'};
    return linkifyHtml(inputText, options);
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}