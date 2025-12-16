const codespace = process.env.REACT_APP_CODESPACE_NAME;
const BASE_API = codespace
  ? `https://${codespace}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function getApiBase() {
  return (typeof window !== 'undefined' && window.BASE_API) || BASE_API;
}

export function buildEndpoint(resource) {
  const base = getApiBase();
  return `${base.replace(/\/+$/,'')}/${resource.replace(/^\/+/, '')}/`;
}

export default { getApiBase, buildEndpoint };
