// api/auth.js

/**
 * Logs in a user by sending email and password to the backend login endpoint.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - Resolves with user data or token on success.
 * @throws {Error} - Throws an error if login fails.
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to log in');
    }

    const data = await response.json();

    // Optional: Save token to localStorage or cookies
    // localStorage.setItem('authToken', data.token);

    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};
