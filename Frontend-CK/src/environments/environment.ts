export const environment = {
  production: true,
  apiUrl: (typeof process !== 'undefined' && process.env['API_URL']) 
    ? process.env['API_URL'] 
    : 'https://cottonknit-backend.onrender.com/api' // Fallback para cliente o compilación
};
