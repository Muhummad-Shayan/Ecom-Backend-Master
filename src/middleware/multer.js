import multer from "multer";
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadMulter = multer({
    dest: path.resolve(__dirname,'../../public/data/upload'),
    limits: {fileSize: 3e7} // for 30 mb size use ' 3e7 '

})

