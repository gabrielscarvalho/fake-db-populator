import { DatabaseReservedWords } from '../database/reserved-words';
import { iParser } from '../../interfaces';
import { IntParser } from './int.parser';

describe('IntParser tests', () => {
  const reservedWords = new DatabaseReservedWords();

  it('should have the right type', () => {
    const parser: iParser = new IntParser(reservedWords);
    expect(parser.type).toBe('int');
  });

  it('should return valid values', () => {
    reservedWords.null = 'null-value';
    reservedWords.quotesForValues = '"';

    const parser: iParser = new IntParser(reservedWords);

    expect(parser.parse('1')).toEqual('1');
    expect(parser.parse(2.42)).toEqual('2');
    expect(parser.parse('1234')).toEqual('1234');

    expect(parser.parse(null)).toEqual('null-value');
    expect(parser.parse(undefined)).toEqual('null-value');
  });

  it('should return error if informed object as param.', () => {
    const parser: iParser = new IntParser(reservedWords);
    expect(() => {
      parser.parse(new Date());
    }).toThrow(Error);
  });

  it('should return error if informed boolean', () => {
    const parser: iParser = new IntParser(reservedWords);

    expect(() => {
      parser.parse(false);
    }).toThrow(Error);
  });
});
