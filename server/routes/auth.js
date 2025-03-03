// // // const express = require('express');
// // // const router = express.Router();
// // // const authController = require('../controllers/authController');
// // // const upload = require('../helpers/uploadHelper');

// // // router.post('/register', upload.single('image'), authController.register);
// // // router.post('/login', authController.login);

// // // module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const authController = require('../controllers/authController');
// // const upload = require('../helpers/uploadHelper');

// // // Middleware to handle multer errors
// // const handleMulterError = (err, req, res, next) => {
// //   if (err instanceof multer.MulterError) {
// //     return res.status(400).json({ message: `Multer error: ${err.message}` });
// //   } else if (err) {
// //     return res.status(400).json({ message: err.message });
// //   }
// //   next();
// // };

// // router.post('/register', upload.single('image'), handleMulterError, authController.register);
// // router.post('/login', authController.login);

// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const upload = require('../helpers/uploadHelper');

// // Middleware to handle multer errors
// const handleMulterError = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ message: `Multer error: ${err.message}` });
//   } else if (err) {
//     return res.status(400).json({ message: err.message });
//   }
//   next();
// };

// router.post('/register', upload.single('image'), handleMulterError, authController.register);
// router.post('/login', authController.login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../helpers/uploadHelper');

// Middleware to handle multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err.message);
    return res.status(400).json({ message: `Multer error: ${err.message}` });
  } else if (err) {
    console.error('File upload error:', err.message);
    return res.status(400).json({ message: err.message });
  }
  next();
};

router.post('/register', upload.single('image'), handleMulterError, authController.register);
router.post('/login', authController.login);

module.exports = router;