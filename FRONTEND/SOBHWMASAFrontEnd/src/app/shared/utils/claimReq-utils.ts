export const claimReq = {
  adminOnly: (c: any) => c.role == 'Admin',
  adminOrManager: (c: any) => c.role == 'Admin' || c.role == 'Manager',
  cashierOrManager: (c: any) => c.role == 'Cashier' || c.role == 'Manager',
};
