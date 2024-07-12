import { validatePartialUser, validateUser } from '../schemas/users.js';
import { SALT_ROUNDS } from '../helpers/constants.js';
import bcrypt from 'bcryptjs';

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    const result = await this.userModel.getAll();
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.userModel.getById({ id });
    res.json(result);
  };

  register = async (req, res) => {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message),
      });
    }

    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const passwordHash = await bcrypt.hash(result.data.password, salt);

    const newObject = await this.userModel.register({
      object: { ...result.data, password: passwordHash },
    });

    if (!newObject) {
      return res.status(400).json({
        error:
          'Error al crear el usuario. Nombre de usuario o email ya existente',
      });
    }

    res.status(201).json(newObject);
  };

  login = async (req, res) => {
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message),
      });
    }

    const userLogin = await this.userModel.login({ object: result.data });

    if (!userLogin) {
      return res.status(400).json({
        error: 'Email o contraseña invalido',
      });
    }

    const checkHashPassword = await bcrypt.compare(
      result.data.password,
      userLogin.password
    );

    if (!checkHashPassword) {
      return res.status(400).json({
        error: 'Email o contraseña invalido',
      });
    }

    res.status(201).json(userLogin);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message),
      });
    }

    const updateObject = await this.userModel.update({
      object: result.data,
      id,
    });

    if (!updateObject) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(201).json(updateObject);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const deleteObject = await this.userModel.delete({ id });

    if (!deleteObject) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json({ message: 'Usuario eliminado' });
  };
}
