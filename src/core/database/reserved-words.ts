import { iDatabaseReservedWords } from '../../interfaces';

const SINGLE_QUOTES = "'";
const DOUBLE_QUOTES = '"';

export class DatabaseReservedWords implements iDatabaseReservedWords {
  public null: string = 'null';
  public quotesForValues: string = SINGLE_QUOTES;
  public quotesForEntities: string = DOUBLE_QUOTES;

  public boolean = {
    true: 'true',
    false: 'false',
  };
}
