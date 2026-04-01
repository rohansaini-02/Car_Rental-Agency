export const getBackendOrigin = () => {
  const envURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  return envURL.replace(/\/+$/, '').replace(/\/api$/, '');
};

