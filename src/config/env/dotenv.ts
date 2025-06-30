import dotenv from "dotenv";

const mode =
  process.argv.find((arg) => arg.startsWith("--mode="))?.split("=")[1] ||
  "development";
dotenv.config({
  path: `.env.${mode}`,
});
