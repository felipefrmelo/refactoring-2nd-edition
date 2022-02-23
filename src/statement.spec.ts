import { invoices } from './invoices';
import { plays } from './plays';
import { statement } from './statement';

describe('statement', () => {
  it('should print a statement for multiple plays, single customer and multiple seats in plain text', () => {
    const expected =
      'Statement for BigCo\n' +
      '  Hamlet: $650.00 (55 seats)\n' +
      '  As You Like It: $580.00 (35 seats)\n' +
      '  Othello: $500.00 (40 seats)\n' +
      'Amount owed is $1,730.00\n' +
      'You earned 47 credits\n';

    expect(statement(invoices[0], plays)).toEqual(expected);
  });

  it('should print a statement for multiple plays, multiple customers  for SmallCo', () => {
    const expected =
      'Statement for SmallCo\n' +
      '  Hamlet: $450.00 (35 seats)\n' +
      '  Othello: $400.00 (20 seats)\n' +
      'Amount owed is $850.00\n' +
      'You earned 5 credits\n';

    expect(statement(invoices[1], plays)).toEqual(expected);
  });

  it('should print a statement for multiple plays, multiple customers for MediumCo', () => {
    const expected =
      'Statement for MediumCo\n' +
      '  Hamlet: $500.00 (40 seats)\n' +
      '  As You Like It: $300.00 (0 seats)\n' +
      'Amount owed is $800.00\n' +
      'You earned 10 credits\n';

    expect(statement(invoices[2], plays)).toEqual(expected);
  });

  it('should throw new Error("unknow type: wrongType")', () => {
    expect(() => statement(invoices[3], plays)).toThrow(new Error('unknow type: wrongType'));
  });
});
