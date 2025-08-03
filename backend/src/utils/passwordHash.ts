import bcrypt from "bcryptjs";
const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (reqpassword: string, dbpassword: string) => {
  return bcrypt.compareSync(reqpassword, dbpassword);
};

export { hashPassword, comparePassword };
