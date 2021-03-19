import { DatabaseReservedWords } from '../database/reserved-words';
import { iParser } from '../../interfaces';
import { DateTimeParser } from './datetime.parser';

describe('DateTimeParser tests', () => {
  const reservedWords = new DatabaseReservedWords();

  it('should have the right type', () => {
    const parser: iParser = new DateTimeParser(reservedWords);
    expect(parser.type).toBe('datetime');
  });

  it('should return valid values', () => {
    reservedWords.quotesForValues = '"';
    reservedWords.quotesForEntities = '`';

    const parser: iParser = new DateTimeParser(reservedWords);
    const date = new Date(2021, 2, 19, 0, 3);
    expect(parser.parse(date)).toEqual('"2021-03-19 12:03:00"');
  });

  it('should return error if informed boolean as param.', () => {
    const parser: iParser = new DateTimeParser(reservedWords);
    expect(() => {
      parser.parse(true);
    }).toThrow(Error);
  });

  it('should return error if informed number as param.', () => {
    const parser: iParser = new DateTimeParser(reservedWords);
    expect(() => {
      parser.parse(2);
    }).toThrow(Error);
  });

  it('should return error if informed string as param.', () => {
    const parser: iParser = new DateTimeParser(reservedWords);
    expect(() => {
      parser.parse('invalid');
    }).toThrow(Error);
  });
});
