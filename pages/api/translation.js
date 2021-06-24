import path from "path";
import getConfig from "next/config";
const serverPath = (staticFilePath) => {
  return path.join(
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    staticFilePath
  );
};
export async function runTranslationChecking() {
  //const minutes = 5, the_interval = minutes * 60 * 1000;
  setInterval(function () {
    getTranslationLanguage("en");
  }, 10000);
}

export async function getTranslationLanguage(lang, repeat, timestamp) {
  setTimeout(function () {
    console.log(serverPath(`/locales/${lang}/translation.json`));
    const fs = require("fs");
    const fileName = serverPath(`public/locales/${lang}/translation.json`);
    let file;
    let res, data;
    if (repeat) {
      res = await fetch(
        `http://localhost:81/DataOn/?lang=${lang}&new=0&timestamp=${timestamp}`
      );
      data = await res.json();
    } else {
      res = await fetch(`http://localhost:81/DataOn/?lang=${lang}&new=1`);
      data = await res.json();
    }
    if (!data) {
      console.log("no new update in timestamp", timestamp);
      getTranslationLanguage(lang, repeat, timestamp);
    }
    try {
      if (fs.existsSync(fileName)) {
        console.log("Exist");
        //file = require(fileName);
        let content = JSON.parse(fs.readFileSync(fileName, "utf8"));
        fs.writeFileSync(fileName, JSON.stringify(data));
      }
    } catch (err) {
      console.log("Dont exist");
      console.log(err);
    }
    timestamp = data.timestamp;
    getTranslationLanguage(lang, repeat, timestamp);
  });
}
