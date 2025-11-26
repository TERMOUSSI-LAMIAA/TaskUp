import prisma from "../config/database.js";
import bcrypt from 'bcrypt';


export const updateUserProfile = async (userId, userData) => {
  const { username, password, photo } = userData;
  
  const updateData = {};

  if (username) {
    updateData.username = username;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    updateData.password = hashedPassword;
  }

  if (photo) {
    updateData.photo = photo;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      username: true,
      email: true,
      photo: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};