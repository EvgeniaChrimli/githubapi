import app from "../proxy";
import serverless from "serverless-http";

const handler = serverless(app);

export default handler;
