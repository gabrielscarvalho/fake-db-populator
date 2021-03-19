import { DatabaseReservedWords } from '../database/reserved-words';
import { iParser } from '../../interfaces';
import { DateParser } from './date.parser';


describe('DateParser tests', () => {

  const reservedWords = new DatabaseReservedWords();

  it('should have the right type', () => {
    const parser: iParser = new DateParser(reservedWords);
    expect(parser.type).toBe('date');
  });

  it('should return valid values', () => {
    
    reservedWords.quotesForValues = '"';
    reservedWords.quotesForEntities = '`';
    reservedWords.null = 'null-value';
    
    const parser: iParser = new DateParser(reservedWords);
    const date = new Date(2021, 2, 19, 0, 3);
    expect(parser.parse(date)).toEqual('"2021-03-19"');


    expect(parser.parse(null)).toEqual('null-value');
    expect(parser.parse(undefined)).toEqual('null-value');
  });


  it('should return error if informed boolean as param.', () => {
    const parser: iParser = new DateParser(reservedWords);
    expect(() => {
      parser.parse(true);
    }).toThrow(Error);
  });

  it('should return error if informed number as param.', () => {
    const parser: iParser = new DateParser(reservedWords);
    expect(() => {
      parser.parse(2);
    }).toThrow(Error);
  });

  it('should return error if informed string as param.', () => {
    const parser: iParser = new DateParser(reservedWords);
    expect(() => {
      parser.parse('invalid');
    }).toThrow(Error);
  });


});