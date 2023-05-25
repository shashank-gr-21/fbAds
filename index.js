const express = require("express");
// const axios = require("axios");
const bodyParser = require("body-parser");
const bizSdk = require("facebook-nodejs-business-sdk");
const AdAccount = bizSdk.AdAccount;

const access_token =
  "EAAcHh0Bij4oBAFrEVs9vfw6mgMUMjMOTpWTh62lSrJJ54glJfjrKZBwrDGN8BO18vIAnF05kPm7PAaZBtOw20uZC7zqjZBWMuaenzqr7HxGhVJ2BZC9W9ZCNqIZBRECCGRAseIJkfPvCPmFTDoZAuABHDn17QM2SukgqTYcqWFEX99zPUgbkrW27";
  const api = bizSdk.FacebookAdsApi.init(access_token);

const app = express();
app.use(bodyParser.json());

app.get("/", async (request, response) => {
  try {
    const adAccountId = "act_100555887474646";
    const adAccount = new AdAccount(adAccountId);
    const name = ["name","objective","daily_budget"];
    const dataReceived = await adAccount.getCampaigns(name);
    const dataToSend = dataReceived.map((item)=>{
        return {name:item.name,objective:item.objective,id:item.id,daily_budget:item.daily_budget || "NA"}
    })
    response.send(dataToSend);
  } catch (err) {
    console.log(err);
    response.send({ ok: false });
  }
});

app.listen(8000, () => {
  console.log("Listening on 8000");
});
