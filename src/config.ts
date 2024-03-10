function fixNewlines(str: string) {
  if (str) {
    return str.replace(/\\n/g, "\n");
  }
  return "";
}

export default {
  port: process.env.PORT || 1337,
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/express-ts-app",
  apiVersion: process.env.API_VERSION || "v01",
  accessTokenTTL: process.env.ACCESS_TOKEN_TTL || "15m",
  refreshTokenTTL: process.env.REFRESH_TOKEN_TTL || "1y",
  privateKey: fixNewlines(process.env.PRIVATE_KEY || ""),
  publicKey: fixNewlines(process.env.PUBLIC_KEY || ""),
  s3BucketName: process.env.S3_BUCKET_AWS || "",
  accessKeyId: process.env.ACCESS_KEY_ID_AWS || "",
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS || "",
  s3BucketRegion: process.env.S3_BUCKET_AWS_REGION || "",
};
