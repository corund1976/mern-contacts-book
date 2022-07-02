import multer from "multer";

const upload = multer({ dest: 'tmp/' })

const uploadImage = upload.single('avatar')

export default uploadImage