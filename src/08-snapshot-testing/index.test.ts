import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const VALUES_1 = [1, 2, 3];

    expect(generateLinkedList(VALUES_1)).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const VALUES_2 = ['a', 'b', 'c'];

    expect(generateLinkedList(VALUES_2)).toMatchSnapshot();
  });
});
