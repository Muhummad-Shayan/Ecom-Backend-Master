import fs from "fs";

export const deleteLocalFiles = (paths) => {
    paths.forEach((filePath) => {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error(`Error deleting file: ${filePath}`, err);
        }
    });
};