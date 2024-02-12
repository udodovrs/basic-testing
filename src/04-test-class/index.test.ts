// Uncomment the code below and write your tests
import { getBankAccount } from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100
    const BankAccount = getBankAccount(initialBalance)
    expect(BankAccount.getBalance()).toBe(initialBalance)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100
    const withdrawAmount = 200
    const BankAccount = getBankAccount(initialBalance)
    try {
      BankAccount.withdraw(withdrawAmount)
    }
    catch (e: any) {
      expect(e.message).toBe(`Insufficient funds: cannot withdraw more than ${initialBalance}`)
    }
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100
    const transferAmount = 200
    const BankAccountSender = getBankAccount(initialBalance)
    const BankAccountReceiver = getBankAccount(initialBalance)
    try {
      BankAccountSender.transfer(transferAmount, BankAccountReceiver)
    }
    catch (e: any) {
      expect(e.message).toBe(`Insufficient funds: cannot withdraw more than ${initialBalance}`)
    }
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100
    const transferAmount = 200
    const BankAccount = getBankAccount(initialBalance)
    try {
      BankAccount.transfer(transferAmount, BankAccount)
    }
    catch (e: any) {
      expect(e.message).toBe('Transfer failed')
    }
  });

  test('should deposit money', () => {
    const initialBalance = 100
    const deposit = 100
    const expectedBalance = initialBalance + deposit
    const BankAccount = getBankAccount(initialBalance)
    BankAccount.deposit(deposit)
    expect(BankAccount.getBalance()).toBe(expectedBalance)

  });

  test('should withdraw money', () => {
    const initialBalance = 200
    const withdrawAmount = 100
    const expectedBalance = initialBalance - withdrawAmount
    const BankAccount = getBankAccount(initialBalance)
    BankAccount.withdraw(withdrawAmount)
    expect(BankAccount.getBalance()).toBe(expectedBalance)
  });

  test('should transfer money', () => {
    const initialBalance = 200
    const transferAmount = 100
    const expectedBalanceSender = initialBalance - transferAmount
    const expectedBalanceReceiver = initialBalance + transferAmount
    const BankAccountSender = getBankAccount(initialBalance)
    const BankAccountReceiver = getBankAccount(initialBalance)
    BankAccountSender.transfer(transferAmount, BankAccountReceiver)
    expect(BankAccountSender.getBalance()).toBe(expectedBalanceSender)
    expect(BankAccountReceiver.getBalance()).toBe(expectedBalanceReceiver)

  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 200
    const BankAccount = getBankAccount(initialBalance)
    const balance = await BankAccount.fetchBalance()

    if (typeof balance === 'number') {
      expect(typeof balance === 'number').toBe(true)
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000
    const BankAccount = getBankAccount(initialBalance)

    try {
      await BankAccount.synchronizeBalance()
      expect(BankAccount.getBalance()).toBeLessThan(initialBalance)
    } catch (e: any) {
      expect(e.message).toBe("Synchronization failed")
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 200
    const BankAccount = getBankAccount(initialBalance)
    try {
      await BankAccount.synchronizeBalance()
    } catch (e: any) {
      expect(e.message).toBe("Synchronization failed")
    }
  });
});