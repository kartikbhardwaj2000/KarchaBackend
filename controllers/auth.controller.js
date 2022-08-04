const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');
const UserModal = require('../modals/user.modal');
const ApiError = require('../utils/apiError');

const saltRounds = 10;

exports.register = async (req,res,next) => {
    try {
        const { email } = req.body;
        const { password } = req.body;
        const {name} = req.body;
        const user = await UserModal.findOne({ email });
        if (user) {
          throw new ApiError({ status: 400, message: 'user already registered' });
        }
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const userDoc = await UserModal.create({ email, name, password: hashPassword });
        const response = {
          status: 200,
          message: 'registeration success',
          data: {
            user: userDoc.name,
            userId: userDoc._id,
          },
        };
        res.json(response);
    } catch (error) {
        next(error);
    }
}
exports.login = async (req,res,next) => {
    try {
        const { email } = req.body;
        const { password } = req.body;
        const user = await UserModal.findOne({ email });
        if (!user) {
          throw new ApiError({ status: 403, message: 'username or password incorrect' });
        }
        const verdict = await bcrypt.compare(password, user.password);
        if (!verdict) {
          throw new ApiError({ status: 403, message: 'username or password incorrect' });
        }
        const token = jwt.sign({ userEmail: user.email,  id: user._id, role:user.role }, JWT_SECRET, { expiresIn: '3h', algorithm: 'HS256' });
        const response = {
          status: 200,
          message: 'login success',
          data: {
            user: user.name,
            token,
          },
        };
        res.json(response);
    } catch (error) {
        next(error);
    }
}