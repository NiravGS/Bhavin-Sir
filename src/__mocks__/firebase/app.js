export default {
  auth: () => ({ currentUser: { getIdToken: jest.fn().mockResolvedValue('') } }),
  initializeApp: () => {},
  database: () => {}
}
