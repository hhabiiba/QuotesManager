const storeUser = (user) => {
  try {
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User stored:', user);
  } catch (error) {
      console.error('Error storing user data:', error);
  }
};

const getUser = () => {
  try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
  } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
  }
};

const removeUser = () => {
  try {
      localStorage.removeItem('user');
  } catch (error) {
      console.error('Error removing user data:', error);
  }
};

export { storeUser, getUser, removeUser };