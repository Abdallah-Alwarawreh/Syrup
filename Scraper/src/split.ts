import fs from "fs";
import path from "path";
import ProgressBar from "progress";

const coupons: {
    storeName: string;
    storeDomain: string;
    coupons: {
        couponCode: string;
        couponTitle: string;
        couponDescription: string;
        couponExpirationDate: string;
    }[];
}[] = require("./coupons.json");
const bar = new ProgressBar(":bar :current/:total", { total: coupons.length });

coupons.forEach((store) => {
    if (store.coupons) {
        // create a folder in ../../backend with the store.storeDomain
        const folderPath = path.join(
            __dirname,
            "../../backend",
            store.storeDomain
        );
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        // create a file in the folder with the coupons.json
        fs.writeFile(
            `${folderPath}/coupons.json`,
            JSON.stringify(store.coupons, null, 4),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    }
    bar.tick();
});
