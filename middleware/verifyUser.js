const jwt = require("jsonwebtoken");

let decodeduser;

const authError = { message: "Missing Credentials" };
const token = req.headers.token;

function getDecodedUser(token) {
  return async (req, res, next) => {
    const authError = {
      message: "Invalid credentials",
    };

    try {
      const token = req.headers.token;
      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } catch (err) {
      next(err);
    }
  };
}

//   function validateUser(req, res, next) {
//     // do your magic!
//     if (req.body) {
//       if (req.body.username) {
//         getDecodedUser(token){
//             if(decodeduser === req.body.username){
//                 next()
//             }
//             else {
//                 res.status(400).json(authError);
//               }
//         }
//         }
//       }
//     else {
//       res.status(400).json(authError);
//     }
//   }

//   module.exports = validateUser;
