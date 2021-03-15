import { Random } from './src/core/value-generator/random';
import { AutoIncrement } from './src/core/value-generator/auto-increment';
import { LastValue } from './src/core/value-generator/last-value';
import { DateGen } from './src/core/value-generator/date';
import { Fixed } from './src/core/value-generator/fixed';
import { PostgresDatabase } from './src/impl/PostgresDatabase';
import { iDataRow } from './src/interfaces';
import { Database } from './src/core/database/database';
import { Table } from './src/core/database/table';
import { Column } from './src/core/database/column';
import { Parser } from './src/core/parsers/parser';
import { NumberParser } from './src/core/parsers/number.parser';
import { StringParser } from './src/core/parsers/string.parser';
import { IntParser } from './src/core/parsers/int.parser';
import { RawParser } from './src/core/parsers/raw.parser';
import { DateParser } from './src/core/parsers/date.parser';
import { DateTimeParser } from './src/core/parsers/datetime.parser';
import { BooleanParser } from './src/core/parsers/boolean.parser';
import { DataRow } from './src/core/data/data-row';
import { DataRowColumn } from './src/core/data/data-row-column';
import { DatabaseReservedWords } from './src/core/database/reserved-words';
import { NamedMap } from './src/core/utils/map';
import { Optional } from './src/core/utils/optional';

export const RandomDbGenerator = {
  database: {
    DatabaseReservedWords,
    Database,
    Table,
    Column,
    impl: {
      PostgresDatabase
    }
  },
  valueGenerator: {
    Random, AutoIncrement, LastValue, DateGen, Fixed
  },
  util: {
    NamedMap,
    Optional
  },
  data: {
    DataRow,
    DataRowColumn
  },
  parser: {
    Parser,
    NumberParser,
    StringParser,
    IntParser,
    RawParser,
    DateParser,
    DateTimeParser,
    BooleanParser
  }
};


