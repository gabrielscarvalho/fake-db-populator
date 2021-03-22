jest.mock('randexp');

import { randexp } from 'randexp';
import { Chance } from 'chance';
import { Random } from './random';

describe('Random Spec', () => {
  describe('FromRegex', () => {
    it('regex', () => {
      (randexp as any).mockReturnValue('um valor');

      const fn = Random.FromRegularExpression(/[A-Z]/);
      expect(fn()).toBe('um valor');
      expect(randexp).toHaveBeenCalledWith(/[A-Z]/);
    });
  });

  describe('Number', () => {
    it('floating number', () => {
      const floatingSpy = jest.spyOn(Chance.prototype, 'floating').mockReturnValue(10.313);

      const fn = Random.Number(1, 10, 3);
      expect(fn()).toBe(10.313);
      expect(floatingSpy).toHaveBeenCalledWith({ min: 1, max: 10, fixed: 3 });
    });

    it('int number', () => {
      const integerSpy = jest.spyOn(Chance.prototype, 'integer').mockReturnValue(13);

      const fn = Random.Number(1, 10, 0);
      expect(fn()).toBe(13);
      expect(integerSpy).toHaveBeenCalledWith({ min: 1, max: 10 });
    });
  });

  describe('String', () => {
    it('char must send all params', () => {
      const charSpy = jest.spyOn(Chance.prototype, 'character').mockReturnValue('char');

      const fn = Random.Char({ alpha: true, pool: 'ABCDEF213', numeric: true, casing: 'lower', symbols: true });
      expect(fn()).toBe('char');
      expect(charSpy).toHaveBeenCalledWith({
        alpha: true,
        pool: 'ABCDEF213',
        numeric: true,
        casing: 'lower',
        symbols: true,
      });

      const fn2 = Random.Char();
      expect(fn2()).toBe('char');
      expect(charSpy).toHaveBeenCalledWith({ alpha: true });
    });

    it('must send all params', () => {
      const stringSpy = jest.spyOn(Chance.prototype, 'string').mockReturnValue('TEST-STRING');

      const fn = Random.String({ length: 10, numeric: true, alpha: true, casing: 'upper' });
      expect(fn()).toBe('TEST-STRING');
      expect(stringSpy).toHaveBeenCalledWith({ length: 10, numeric: true, alpha: true, casing: 'upper' });
    });

    it('must send all default params', () => {
      const stringSpy = jest.spyOn(Chance.prototype, 'string').mockReturnValue('TEST-STRING');

      const fn = Random.String();
      expect(fn()).toBe('TEST-STRING');
      expect(stringSpy).toHaveBeenCalledWith({ length: 8, alpha: true });
    });

    it('must return a number with length', () => {
      const stringSpy = jest.spyOn(Chance.prototype, 'string').mockReturnValue('123421312');

      const fn = Random.NumberWithLength(5);
      expect(fn()).toBe('123421312');
      expect(stringSpy).toHaveBeenCalledWith({ length: 5, alpha: false, numeric: true });
    });
  });

  describe('PickOne', () => {
    it('must send all params', () => {
      const pickOneSpy = jest.spyOn(Chance.prototype, 'pickone').mockReturnValue('A');

      const fn = Random.PickOne(['A', 'B']);
      expect(fn()).toBe('A');
      expect(pickOneSpy).toHaveBeenCalledWith(['A', 'B']);
    });
  });

  describe('Boolean', () => {
    it('must send all params', () => {
      const boolSpy = jest.spyOn(Chance.prototype, 'bool').mockReturnValue(true);

      const fn = Random.Boolean({ likelihood: 70 });
      expect(fn()).toBe(true);
      expect(boolSpy).toHaveBeenCalledWith({ likelihood: 70 });

      const fn2 = Random.Boolean();
      expect(fn2()).toBe(true);
      expect(boolSpy).toHaveBeenCalledWith({ likelihood: 50 });
    });
  });

  describe('Name', () => {
    it('FirstName must send all params', () => {
      const firstNameSpy = jest.spyOn(Chance.prototype, 'first').mockReturnValue('John');

      const fn = Random.FirstName({ gender: 'female', nationality: 'us' });
      expect(fn()).toBe('John');
      expect(firstNameSpy).toHaveBeenCalledWith({ gender: 'female', nationality: 'us' });

      const fn2 = Random.FirstName();
      expect(fn2()).toBe('John');
      expect(firstNameSpy).toHaveBeenCalledWith({});
    });

    it('LastName must send all params', () => {
      const lastNameSpy = jest.spyOn(Chance.prototype, 'last').mockReturnValue('John');

      const fn = Random.LastName({ nationality: 'us' });
      expect(fn()).toBe('John');
      expect(lastNameSpy).toHaveBeenCalledWith({ nationality: 'us' });

      const fn2 = Random.LastName();
      expect(fn2()).toBe('John');
      expect(lastNameSpy).toHaveBeenCalledWith({ nationality: 'en' });
    });

    it('fullName must send all params', () => {
      const fullNameSpy = jest.spyOn(Chance.prototype, 'name').mockReturnValue('John');

      const fn = Random.FullName({ nationality: 'us' });
      expect(fn()).toBe('John');
      expect(fullNameSpy).toHaveBeenCalledWith({ nationality: 'us' });

      const fn2 = Random.FullName();
      expect(fn2()).toBe('John');
      expect(fullNameSpy).toHaveBeenCalledWith({ nationality: 'en' });
    });
  });
  describe('Email', () => {
    it('must send all params', () => {
      const emailSpy = jest.spyOn(Chance.prototype, 'email').mockReturnValue('john@email.com');

      const fn = Random.Email({ domain: '@google.com' });
      expect(fn()).toBe('john@email.com');
      expect(emailSpy).toHaveBeenCalledWith({ domain: '@google.com' });

      const fn2 = Random.Email();
      expect(fn2()).toBe('john@email.com');
      expect(emailSpy).toHaveBeenCalledWith({});
    });
  });

  describe('Word', () => {
    it('Word must send all params', () => {
      const wordSpy = jest.spyOn(Chance.prototype, 'word').mockReturnValue('three words');

      const fn = Random.Word({ syllables: 5 });
      expect(fn()).toBe('three words');
      expect(wordSpy).toHaveBeenCalledWith({ syllables: 5 });

      const fn2 = Random.Word();
      expect(fn2()).toBe('three words');
      expect(wordSpy).toHaveBeenCalledWith({ syllables: 3 });
    });

    it('Sentence must send all params', () => {
      const sentenceSpy = jest.spyOn(Chance.prototype, 'sentence').mockReturnValue('three words');

      const fn = Random.Sentence({ words: 6 });
      expect(fn()).toBe('three words');
      expect(sentenceSpy).toHaveBeenCalledWith({ words: 6 });

      const fn2 = Random.Sentence();
      expect(fn2()).toBe('three words');
      expect(sentenceSpy).toHaveBeenCalledWith({ words: 3 });
    });
  });

  describe('guid', () => {
    it('guid must send all params', () => {
      const guidSpy = jest.spyOn(Chance.prototype, 'guid').mockReturnValue('guid');

      const fn = Random.Guid({ version: 5 });
      expect(fn()).toBe('guid');
      expect(guidSpy).toHaveBeenCalledWith({ version: 5 });

      const fn2 = Random.Guid();
      expect(fn2()).toBe('guid');
      expect(guidSpy).toHaveBeenCalledWith({});
    });
    it('hash must send all params', () => {
      const hashSpy = jest.spyOn(Chance.prototype, 'hash').mockReturnValue('hash');

      const fn = Random.Hash({ length: 3, casing: 'upper' });
      expect(fn()).toBe('hash');
      expect(hashSpy).toHaveBeenCalledWith({ length: 3, casing: 'upper' });

      const fn2 = Random.Hash();
      expect(fn2()).toBe('hash');
      expect(hashSpy).toHaveBeenCalledWith({});
    });
  });

  describe('cpf', () => {
    it('must send all params', () => {
      const cpfSpy = jest.spyOn(Chance.prototype, 'cpf').mockReturnValue('A');

      const fn = Random.Cpf();
      expect(fn()).toBe('A');
      expect(cpfSpy).toHaveBeenCalledWith();
    });
  });

  describe('avatar', () => {
    it('avatar must send all params', () => {
      const avatarSpy = jest.spyOn(Chance.prototype, 'avatar').mockReturnValue('avatar');

      const fn = Random.AvatarURL({ protocol: 'http', fileExtension: 'jpg' });
      expect(fn()).toBe('avatar');
      expect(avatarSpy).toHaveBeenCalledWith({ protocol: 'http', fileExtension: 'jpg' });

      const fn2 = Random.AvatarURL();
      expect(fn2()).toBe('avatar');
      expect(avatarSpy).toHaveBeenCalledWith({});
    });
  });

  describe('address', () => {
    it('street must send all params', () => {
      const streetSpy = jest.spyOn(Chance.prototype, 'street').mockReturnValue('street');

      const fn = Random.Street({ country: 'us', syllables: 3, short_suffix: true });
      expect(fn()).toBe('street');
      expect(streetSpy).toHaveBeenCalledWith({ country: 'us', syllables: 3, short_suffix: true });

      const fn2 = Random.Street();
      expect(fn2()).toBe('street');
      expect(streetSpy).toHaveBeenCalledWith({ country: 'us' });
    });

    it('city must send all params', () => {
      const citySpy = jest.spyOn(Chance.prototype, 'city').mockReturnValue('city');

      const fn = Random.City();
      expect(fn()).toBe('city');
      expect(citySpy).toHaveBeenCalledWith();
    });

    it('country must send all params', () => {
      const countrySpy = jest.spyOn(Chance.prototype, 'country').mockReturnValue('country');

      const fn = Random.Country({ full: false });
      expect(fn()).toBe('country');
      expect(countrySpy).toHaveBeenCalledWith({ full: false });

      const fn2 = Random.Country();
      expect(fn2()).toBe('country');
      expect(countrySpy).toHaveBeenCalledWith({ full: true });
    });
  });
});
