import { Chance } from 'chance';
import { iValueGenerator } from '../../interfaces';
const chance = new Chance();

export const RandomNumber: iValueGenerator = ({ min = 0, max = 999, decimals = 0 }): () => number => {

  return () => {
    if (decimals && decimals > 0) {
      return chance.floating({ min, max, fixed: decimals });
    }
    return chance.integer({ min, max });
  }
};

