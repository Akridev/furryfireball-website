const serverless = require("serverless-http");
const app = require ("../../index");
console.log("APP is starting! ...")
exports.handler = serverless(app);
console.log("EXPORTED!")