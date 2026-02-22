interface JWTPayload {
  email?: string;
  userId?: string;
  role?: string;
  roles?: string[];
  [key: string]: any;
}

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const getUserFromToken = (token: string) => {
  const decoded = decodeJWT(token);
  if (!decoded) return null;

  // Extract role from various possible JWT claim formats
  const role = 
    decoded.role || 
    decoded[`http://schemas.microsoft.com/ws/2008/06/identity/claims/role`] || 
    decoded[`http://schemas.microsoft.com/ws/2005/05/identity/claims/role`] ||
    decoded.roles?.[0] || 
    '';

  // Extract email from various possible JWT claim formats
  const email = 
    decoded.email || 
    decoded[`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier`] ||
    decoded[`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`] ||
    decoded.sub || 
    '';

  // Extract userId
  const userId = decoded.userId || decoded.sub || '';

  return {
    email,
    userId,
    role,
  };
};
