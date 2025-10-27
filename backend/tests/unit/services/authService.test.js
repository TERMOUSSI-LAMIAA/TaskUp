import { jest } from '@jest/globals';

jest.mock('../../../src/config/database.js', () => ({

    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
 
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));


import prisma from '../../../src/config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { signupUser, loginUser } from '../../../src/services/authService.js';

describe('authService', () => {
  const realEnv = process.env;

  beforeAll(() => {
    process.env = { ...realEnv, JWT_SECRET: 'test-secret' };
  });

  afterAll(() => {
    process.env = realEnv;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signupUser - creates new user and returns token', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    bcrypt.hash.mockResolvedValue('hashed-password');

    prisma.user.create.mockResolvedValue({
      id: 1,
      email: 'safaa@example.com',
      username: 'safaa',
      photo: null,
    });

    jwt.sign.mockReturnValue('jwt-token-123');

    const result = await signupUser({
      email: 'safaa@example.com',
      password: 'password123',
      username: 'safaa',
    });

    // assertions
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'safaa@example.com' } });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { email: 'safaa@example.com', password: 'hashed-password', username: 'safaa', photo: null },
    });
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '1d' });

    expect(result).toMatchObject({
      id: 1,
      email: 'safaa@example.com',
      username: 'safaa',
      token: 'jwt-token-123',
    });
  });

  test('signupUser - throws if email already exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 2, email: 'yassin@example.com' });

    await expect(signupUser({
      email: 'yassin@example.com',
      password: 'whatever',
      username: 'yassin',
    })).rejects.toThrow('User already exists');

    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  test('loginUser - returns token when credentials are valid', async () => {
    const dbUser = { id: 5, email: 'youssra@example.com', username: 'youssra', password: 'hashed-pass', photo: null };
    prisma.user.findUnique.mockResolvedValue(dbUser);

    bcrypt.compare.mockResolvedValue(true);

    jwt.sign.mockReturnValue('login-jwt-token');

    const result = await loginUser({ email: 'youssra@example.com', password: 'secret' });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'youssra@example.com' } });
    expect(bcrypt.compare).toHaveBeenCalledWith('secret', 'hashed-pass');
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 5 }, process.env.JWT_SECRET, { expiresIn: '1d' });

    expect(result).toMatchObject({
      id: 5,
      email: 'youssra@example.com',
      username: 'youssra',
      token: 'login-jwt-token',
    });
  });

  test('loginUser - throws when email not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(loginUser({ email: 'notfound@example.com', password: 'x' }))
      .rejects.toThrow('Invalid email or password');

    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  test('loginUser - throws when password is incorrect', async () => {
    const dbUser = { id: 7, email: 'd@example.com', username: 'd', password: 'hashed-pass' };
    prisma.user.findUnique.mockResolvedValue(dbUser);

    bcrypt.compare.mockResolvedValue(false);

    await expect(loginUser({ email: 'd@example.com', password: 'wrong' }))
      .rejects.toThrow('Invalid email or password');

    expect(bcrypt.compare).toHaveBeenCalledWith('wrong', 'hashed-pass');
  });
});