export const getters = {
  getUsername(state) {
    return state.username;
  },
  getUserType(state) {
    return state.userType;
  },
  isAdmin(state) {
    return state.userType === 'admin';
  },
  isDoctor(state) {
    return state.userType === 'doctor';
  },
  isPatient(state) {
    return state.userType === 'patient';
  },
};
