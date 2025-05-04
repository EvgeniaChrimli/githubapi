import app from "../server/proxy";
import serverless from "serverless-http";

const handler = serverless(app);

export default handler;
