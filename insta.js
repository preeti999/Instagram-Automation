const puppeteer = require('puppeteer');
const data = require("./credentials.json");

let numofPost = process.argv[2];

//open browser
(async function () {
    const browser = await puppeteer.launch({
        headless: false, defaultViewport: null,
        args: ["--start-maximized"]
    });
    const page = await browser.newPage();
    await page.goto(data.url, { waitUntil: "networkidle2" });
    await page.type("input[name='username']", data.user, { delay: 100 });
    await page.type("input[name='password']", data.pwd, { delay: 100 });

    //login button clicked
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("button[type='submit']"),
    ]);

    //search #tag#username
    await page.type("input[placeholder='Search']", data.searchUser, { delay: 190 });
    await page.waitForSelector(".drKGC .fuqBx a", { visible: true });

    //click on the tag
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click(".drKGC .fuqBx a"),
    ]);
    //class name -> ._9AhH0
    await page.waitForSelector("._9AhH0", { visible: true });

    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("._9AhH0"),
    ]);

    let i = 0;
    //like the post one by one
    do {
        await page.waitForSelector(".fr66n button");
        await page.click(".fr66n button");
        await Promise.all([
            page.waitForNavigation({ waitUntil: "networkidle2" }, { visible: true }),
            page.click("._65Bje.coreSpriteRightPaginationArrow", { delay: 100 }),
        ]);
        i++;
    } while (i < numofPost) { }

    
    // to close the browser
    // await browser.close();
})();
