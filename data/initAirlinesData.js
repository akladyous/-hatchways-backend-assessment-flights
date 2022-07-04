import { $ } from "./util.js";
import { writeFile } from "fs";
import { airlinesRaw } from "./airlinesRaw.js";
console.time();

const config = ["totalSeats", "availableSeats", "schedule"];
const airlinesDb = $().removeDuplicates(airlinesRaw, "iataCode");
airlinesDb.forEach(function (airline) {
    config.forEach(function (prop) {
        airline[prop] = $()[prop](airline.seatsConfig);
    }, this);
}, config);
writeFile("./airlinesDB.js", JSON.stringify(airlinesDb, null, 1), (err) => {
    if (err) {
        console.log("error saving file");
    }
    console.log("file saved successfully");
});

console.timeEnd();
