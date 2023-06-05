import multer, { diskStorage } from "multer";

const maxSize = 10 * 1024 * 1024;

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, './resources/static/uploads/articles');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "__" + file.originalname);
  },
})

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
})

export default uploadFile