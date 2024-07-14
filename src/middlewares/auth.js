import { CONNECTION_DB } from '../database/config.js';
import { verifyToken } from './generateToken.js';

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    const tokenData = await verifyToken(token);

    if (tokenData.id) {
      next();
    } else {
      res.status(409).json({ error: 'No puede realizar esta acción' });
    }
  } catch (error) {
    res.status(409).send({ error: 'No puede realizar esta acción' });
  }
};

export const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    const tokenData = await verifyToken(token);

    const { rows } = await CONNECTION_DB.query(
      'SELECT * FROM users WHERE id = $1',
      [tokenData.id]
    );

    if ([].concat(roles).includes(rows[0].role)) {
      next();
    } else {
      res.status(409).json({ error: 'No tienes permisos' });
    }
  } catch (error) {
    res.status(409).json({ error: 'No puede realizar esta acción' });
  }
};
