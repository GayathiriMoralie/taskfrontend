// api/autho.ts

/**
 * Registers a new user by sending email and password to the backend.
 * @param userData - Object containing user's email and password.
 * @returns Promise resolving to response JSON (user info or token).
 * @throws Error if registration fails.
 */
export const registerUser = async (userData: { email: string; password: string }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register user');
      }
  
      return await response.json();
    } catch (error: any) {
      console.error('Registration error:', error.message);
      throw new Error(error.message || 'Registration request failed');
    }
  };
  