'use strict'; // Benim diye gezinirsiniz aslanlar @T'
const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

class Duck {
    constructor() {
        this.crayURL;
        this.client = new Discord.Client({ intents: 3276799 });
        this._map = new Map();
        this.queue = new Map();
        this.updownheree = {
            crayArray: [],
            mmpsh(...crayArray) {
                this.crayArray.push(...crayArray);
            },
            mfx(index) {
                return this.crayArray[index];
            },
            mxdt(nmb, letAry) {
                if (!nmb || !letAry) throw new Error("Please provide a valid number and array");
                return delete letAry[nmb];
            }
        };
    }

    uwCray(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async urlBaslat() {
        this.client.on('ready', () => {
            console.log(`Spammer Started With: ${this.client.user.tag}`);
            const guildId = "1242204058752651304"; //SWID
            const vanities = fs.readFileSync("vanities.txt", "utf8").split("\n").filter(Boolean);
            const tokens = fs.readFileSync("tokens.txt", "utf8").split("\n").filter(Boolean);
            console.log(`Loaded ${vanities.length} vanity URLs from vanities.txt`);
            console.log(`Loaded ${tokens.length} tokens from tokens.txt`);

            this.crayURL = setInterval(async () => {
                for (const vanity of vanities) {
                    await this.urlUpdate(vanity, guildId, tokens);
                }
            }, 1); // BURAYA HIZI GIRECEN 5 MS FALAN YAP VSDE NORMAL URL DENERKEN YUKSEKTUT ---- NE DİYON AMK :d
        });

        this.client.login("MTE5MzkyOTQwNjY3MDk3NTAzOQ.G5OOVG.-W8X3u0fx98xVtA0IM5D2ep3Z_MQY9f5gV2TTE");
    }

    get(id) {
        let inn = this._map.get(id);
        if (!inn) {
            inn = new ObjectsQuery(this.client, id);
            this._map.set(id, inn);
        }
        return inn;
    }

    urlDurdur() {
        clearInterval(this.crayURL);
        this.updownheree.crayArray = [];
    }

    async urlUpdate(url, guildId, tokens) {
        try {
            const randomIndex = Math.floor(Math.random() * tokens.length);
            const authorizationToken = tokens[randomIndex];

            const response = await fetch(`https://discord.com/api/v8/guilds/${guildId}/vanity-url`, {
                method: "PATCH",
                headers: {
                    "Authorization": authorizationToken.trim(),
                    "Content-Type": "application/json"
                },
                "referrerPolicy": "no-referrer-when-downgrade",
                body: JSON.stringify({
                    code: url
                })
            });

            const responseCode = response.status;
            console.log(responseCode, url);

         
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

module.exports = Duck;
