import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name:'dc6iirh9z',
  api_key:'927787641993898',
  api_secret:'GUB83JKcWw6Y4Mm_Z0V6STyFRMU',
});

export default cloudinary;
