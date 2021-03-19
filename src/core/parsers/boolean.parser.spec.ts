import { BooleanParser } from './boolean.parser';
import { DatabaseReservedWords } from './../database/reserved-words';
import { iParser } from '../../interfaces';


describe('BooleanParser tests', () => {

  const reservedWords = new DatabaseReservedWords();
  
    it('should have the right type', () => {
      const parser: iParser = new BooleanParser(reservedWords);
      expect(parser.type).toBe('boolean');
    });
  
  it('should return valid false value', () => {
      reservedWords.null = 'null-value';
      reservedWords.boolean.false = 'false-value';
      reservedWords.boolean.true = 'true-value';

      const parser: iParser = new BooleanParser(reservedWords);

      expect(parser.parse('true')).toEqual('true-value');
      expect(parser.parse(new Date())).toEqual('true-value');
      expect(parser.parse(true)).toEqual('true-value');
      expect(parser.parse(false)).toEqual('false-value');
      expect(parser.parse(null)).toEqual('null-value');
      expect(parser.parse(undefined)).toEqual('null-value');

  });
});