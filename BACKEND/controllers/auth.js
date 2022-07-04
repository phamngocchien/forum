import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UsersModel from '../models/users.js'

const refreshTokens = [];
export const login = async (req, res) => {
  const user = await UsersModel.find({ msv: req.body.msv });
  if (user.length === 0) {
    res.status(400).json(
      "Cannot find user"
    );
  }
  try {
    user.map(item => {
      if (req.body.password == item.password) {

        const accessToken = jwt.sign({ item }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
        const refreshToken = jwt.sign({ item }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({
          "user": item,
          accessToken,
          refreshToken
        })
      } else {
        res.status(400).json(
          "Password failed",
        );
      }
    })
  } catch {
    res.status(500).send("Error")
  }
}