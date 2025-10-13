import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';

export const signupUser = async (userData) => {
  const { email, password, username, photo } = userData;
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: { 
      email, 
      password: hashedPassword, 
      username, 
      photo: photo || null 
    }
  });

  const token = jwt.sign(
    { userId: newUser.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } 
  );

  return { 
    id: newUser.id, 
    email: newUser.email, 
    username: newUser.username,
    photo: newUser.photo,
    token
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    photo: user.photo,
    token,
  };
};