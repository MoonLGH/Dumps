// Set the url to process.env named URL id as $ID and following thus template
// autopatch/client_app/UpdateStatus/Version_Region/$ID/game_hdiff_xxxx.zip
import "dotenv/config"
import fetch from "node-fetch"
let url = process.env.URL

async function Start(){
    for (let i = 0; i < 100; i++) {
        const res = await fetch(url.replace("$ID",`${i}`))
        const body = await res.text()
        if(body.includes("AccessDenied")){
            console.log("AccessDenied " + i)
        }
    }
}
Start()