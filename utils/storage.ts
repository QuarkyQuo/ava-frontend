export const getAccessToken = (): string | null => {
    if (typeof window !== 'undefined') {
      // We're in the browser
      return localStorage.getItem('access_token');
    }
    // We're on the server
    return null;
  };

  export const setAccessToken = (token:string): void => {
    if (typeof window !== 'undefined') {
      // We're in the browser
      localStorage.setItem('access_token',token);
    }

  };
  
  