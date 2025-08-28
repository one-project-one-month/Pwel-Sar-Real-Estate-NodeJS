// import multer from 'multer';

// const storage = multer.diskStorage({
//   //   destination: function (req, file, cb) {
//   //     cb(null, './tmp');
//   //   },
//   filename: function (req, file, cb) {
//     console.log('File received:', file);
//     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     // const fileExtension = file.originalname.split('.')[1];
//     // const fileWithExtension =
//     //   file.fieldname + '-' + uniqueSuffix + '.' + fileExtension;
//     // cb(null, fileWithExtension);
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({ storage });

import multer from "multer"

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, './tmp')
    // },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // const fileExtension = file.originalname.split(".")[1]
        // const fileWithExtension = file.fieldname + '-' + uniqueSuffix + '.' + fileExtension
        // cb(null, fileWithExtension)
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage })