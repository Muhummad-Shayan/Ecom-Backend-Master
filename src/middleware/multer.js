import multer from "multer";
import path from 'node:path'

export const uploadMulter = multer({
    dest: path.resolve(__dirname,'../../public/data/upload'),
    limits: {fileSize: 3e7} // for 30 mb size use ' 3e7 '

})

