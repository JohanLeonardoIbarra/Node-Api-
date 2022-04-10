import { config } from "dotenv";
config();

export default {
    mongodbURL: process.env.MONGODB_URI,
    apiKey: process.env.API_KEY,
    tokenExpiration: process.env.TOKEN_EXPIRES_IN
}