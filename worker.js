import cron from "node-cron";
import { notifyExpiredProducts,notifyProductsThatShouldBeOrdered } from "./services/notify.js";


cron.schedule("*/5 * * * *", async () => {
  console.log(`[${new Date().toISOString()}] Running low stock check...`);
  await notifyProductsThatShouldBeOrdered();
});

cron.schedule("*/5 * * * *", async () => {
  console.log(`[${new Date().toISOString()}] Running expiry check...`);
  await notifyExpiredProducts();
});

console.log("Background worker started. Waiting for scheduled tasks...");