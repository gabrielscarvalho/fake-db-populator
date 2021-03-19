import { DatabaseReservedWords } from '../database/reserved-words';
import { iParser } from '../../interfaces';
import { EntityParser } from './entity.parser';


describe('EntityParser tests', () => {

  const reservedWords = new DatabaseReservedWords();

  it('should have the right type', () => {
    const parser: iParser = new EntityParser(reservedWords);
    expect(parser.type).toBe('entity');
  });

  it('should return valid values', () => {
    
    reservedWords.quotesForValues = '"';
    reservedWords.quotesForEntities = '`';
    
    const parser: iParser = new EntityParser(reservedWords);

    expect(parser.parse('text')).toEqual('`text`');
  });


  it('should return error if informed boolean as param.', () => {
    const parser: iParser = new EntityParser(reservedWords);
    expect(() => {
      parser.parse(true);
    }).toThrow(Error);
  });

  it('should return error if informed number as param.', () => {
    const parser: iParser = new EntityParser(reservedWords);
    expect(() => {
      parser.parse(2);
    }).toThrow(Error);
  });



  it('should return error if informed object as param.', () => {
    const parser: iParser = new EntityParser(reservedWords);
    expect(() => {
      parser.parse(new Date());
    }).toThrow(Error);
  });

});