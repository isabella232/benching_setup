import { createBenchmarkDroplets } from "./droplets";
import { CronJob } from "cron";
import { getLatestVersionFromDockerHub } from "./docker_hub";
const fetch = require("node-fetch");
// Runs Monday to Saturday at 19:00:00
const cron = new CronJob("00 00 19 * * 1-6", trigger, null, false, "Europe/Berlin");
// const cron = new CronJob("00 40 13 * * 1-6", trigger, null, false, "Europe/Berlin");

main().catch(console.error);

async function main() {
  console.log("cron started");
  if (process.env["DIGITAL_OCEAN_ACCESS_TOKEN"] == undefined) {
    console.log("env var DIGITAL_OCEAN_ACCESS_TOKEN must bet set");
    process.exit(1);
  }
  cron.start();
}

async function trigger() {
  console.log("Cron triggered. Will create the benchmark droplets now.");
  const version = await getLatestVersionFromDockerHub();
  console.log(`Will benchmark version ${version}`);
  await createBenchmarkDroplets(version);
}
