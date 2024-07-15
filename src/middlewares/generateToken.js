import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../helpers/constants.js';

export const tokenSign = async (user) => {
  const { id, role } = user;
  return jwt.sign(
    {
      id,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
};

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(400).json({ error: 'No puede realizar esta acción' });
  }
};

export const decodeSign = (token) => {
  return jwt.decode(token, null);
};
