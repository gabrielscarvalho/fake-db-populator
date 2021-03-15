import { iDatabaseReservedWords } from '../../interfaces';


export class DatabaseReservedWords implements iDatabaseReservedWords {
  public null: string = 'null';
  public quotes: string = '"';

  public boolean = {
    true: 'TRUE',
    false: 'FALSE'
  }

}