/**
 * PlaySlot simulated instant payment gateway service (UPI / Net Banking / Card)
 */
export const paymentService = {
  async processPayment({ amount, bookingId, paymentMethod = 'UPI' }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: 'TXN-' + Math.floor(10000000 + Math.random() * 90000000),
          bookingId,
          amount,
          paymentMethod,
          status: 'Paid',
          timestamp: new Date().toISOString()
        });
      }, 500);
    });
  }
};

export default paymentService;
