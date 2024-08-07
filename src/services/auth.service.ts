import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { ResetPasswordUser } from '@dtos/resetPasswordUser.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import tokenModel from '@models/token.model';
import { isEmpty } from '@utils/util';
import passwordValidator from 'password-validator';
import { BaseUserDto } from '@dtos/base.dto';

class AuthService {
  public users = userModel;
  public token = tokenModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    // Validate password
    const schema = new passwordValidator();
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have uppercase letters
      .has()
      .digits() // Must have digits
      .has()
      .symbols() // Must have at least one special character
      .has()
      .not()
      .spaces(); // Should not have spaces

    const isValid = schema.validate(userData.password);
    if (!isValid)
      throw new HttpException(
        409,
        `Your password must be have at least 8 letters, uppercase and lowercase letters, digits, at least one special character, should not have spaces`,
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: BaseUserDto): Promise<{ cookie: string; findUser: User; tokenData: TokenData }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `Your password is incorrect or this account doesn't exist.`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, `Your password is incorrect or this account doesn't exist.`);

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser, tokenData };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }

  public async resetPassword(userToken, userData: ResetPasswordUser): Promise<User> {
    if (isEmpty(userToken)) throw new HttpException(400, 'userToken is empty');
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    console.log('userData', userData);

    const findUser = await this.users.findOne({ email: userData.email });
    console.log('findUser', findUser);
    if (!findUser) throw new HttpException(409, 'Invalid or expired password reset token');

    const findToken = await this.token.findOne({ userId: findUser._id, token: userToken, expiresIn: { $lte: new Date() } });
    console.log('findToken', findToken);
    if (!findToken) throw new HttpException(409, 'Invalid or expired password reset token');

    // Validate password
    const schema = new passwordValidator();
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have uppercase letters
      .has()
      .digits() // Must have digits
      .has()
      .symbols() // Must have at least one special character
      .has()
      .not()
      .spaces(); // Should not have spaces

    const isValid = schema.validate(userData.newPassword);
    if (!isValid) {
      throw new HttpException(
        409,
        `Your password must be have at least min 8 characters, uppercase letter, uppercase letter, have digits, at least one special character and should not have spaces`,
      );
    }

    const hashedPassword = await hash(userData.newPassword, 10);
    const createUserData: User = await this.users.findOneAndUpdate({ _id: findUser._id }, { password: hashedPassword }, { new: true });

    return createUserData;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id, email: user.email };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
