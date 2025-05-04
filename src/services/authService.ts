
// Mock authentication service

export const isAuthenticated = () => {
  return localStorage.getItem("professorToken") !== null;
};

export const login = (email: string, password: string) => {
  // In a real app, this would make an API call
  // For demo purposes, we'll just store a dummy token
  const dummyToken = "professor_dashboard_mock_token";
  localStorage.setItem("professorToken", dummyToken);
  return Promise.resolve({ success: true });
};

export const logout = () => {
  localStorage.removeItem("professorToken");
  return Promise.resolve({ success: true });
};

// For demo purposes, we'll initialize with a token
if (!isAuthenticated()) {
  localStorage.setItem("professorToken", "professor_dashboard_mock_token");
}
