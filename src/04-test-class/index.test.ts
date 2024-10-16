import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

const INITIAL_BALANCE = 1000;

describe('BankAccount', () => {
  let sender: BankAccount;
  let recipient: BankAccount;

  beforeEach(() => {
    sender = getBankAccount(INITIAL_BALANCE);
    recipient = getBankAccount(INITIAL_BALANCE);
  });

  test('should create account with initial balance', () => {
    expect(sender).toBeInstanceOf(BankAccount);
    expect(sender.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => sender.withdraw(2 * INITIAL_BALANCE)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => sender.transfer(2 * INITIAL_BALANCE, recipient)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => sender.transfer(INITIAL_BALANCE, sender)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const amount = 100;

    recipient.deposit(amount);
    expect(recipient.getBalance()).toBe(INITIAL_BALANCE + amount);
  });

  test('should withdraw money', () => {
    const amount = INITIAL_BALANCE - 1;

    sender.withdraw(amount);
    expect(sender.getBalance()).toBe(INITIAL_BALANCE - amount);
  });

  test('should transfer money', () => {
    const amount = INITIAL_BALANCE - 1;

    sender.transfer(amount, recipient);
    expect(sender.getBalance()).toBe(INITIAL_BALANCE - amount);
    expect(recipient.getBalance()).toBe(INITIAL_BALANCE + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockedRandomResult = 15;

    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(mockedRandomResult)
      .mockReturnValueOnce(1);

    const balance = await sender.fetchBalance();

    expect(typeof balance).toBe('number');
    expect(balance).toBe(mockedRandomResult);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchBalanceResult = 15;

    jest
      .spyOn(sender, 'fetchBalance')
      .mockResolvedValueOnce(fetchBalanceResult);

    await sender.synchronizeBalance();

    expect(sender.getBalance()).toBe(fetchBalanceResult);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(sender, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(sender.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
