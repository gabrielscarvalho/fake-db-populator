import { BooleanParser } from './boolean.parser';
import { DatabaseReservedWords } from '../database/reserved-words';
import { iParser } from '../../interfaces';
import { StringParser } from './string.parser';


describe('StringParser tests', () => {

  const reservedWords = new DatabaseReservedWords();

  it('should have the right type', () => {
    const parser: iParser = new StringParser(reservedWords);
    expect(parser.type).toBe('string');
  });

  it('should return valid values', () => {
    reservedWords.null = 'null-value';
    reservedWords.quotesForValues = '"';
    
    const parser: iParser = new StringParser(reservedWords);

    expect(parser.parse('true')).toEqual('"true"');
    expect(parser.parse(true)).toEqual('"true"');
    expect(parser.parse(false)).toEqual('"false"');
    expect(parser.parse('value')).toEqual('"value"');
    expect(parser.parse(2.1)).toEqual('"2.1"');
     
    expect(parser.parse(null)).toEqual('null-value');
    expect(parser.parse(undefined)).toEqual('null-value');
  });


  it('should return error if informed object as param.', () => {
    const parser: iParser = new StringParser(reservedWords);
    expect(() => {
      parser.parse(new Date());
    }).toThrow(Error);
  });

});