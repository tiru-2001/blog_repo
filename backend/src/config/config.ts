import dotenv from "dotenv";
dotenv.config();
const envData = {
  port: (process.env.PORT as string) || 8001,
  mongo_uri: process.env.MONGO_URI as string,
  jwt_access:
    (process.env.JWT_ACCESS_SECRET as string) || "djaflk23lk25khfjal2342l3j4k",
  jwt_refresh:
    (process.env.JWT_REFRESH_SECRET as string) || "fdjkaf98dfa98rhhkdfss9dfuuk",
};
export default envData;
