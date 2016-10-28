import enumerate from '../src/enumerateType.jsx';

describe('enumerate type', () => {

    it('to type NULL', () => {
      expect(enumerate(null)).toBe("NULL");
    });

    it('to type UNDEFINED', () => {
      expect(enumerate(undefined)).toBe("UNDEFINED");
    });

    it('to type STRING', () => {
      expect(enumerate('a string')).toBe("STRING");
    });

    it('to type NUMBER', () => {
      expect(enumerate(12.202)).toBe("NUMBER");
      expect(enumerate(5)).toBe("NUMBER");
      expect(enumerate(-15)).toBe("NUMBER");
    });

    it('to type BOOLEAN', () => {
      expect(enumerate(true)).toBe('BOOLEAN');
      expect(enumerate(false)).toBe('BOOLEAN');
    });

    it('to type ARRAY', () => {
      expect(enumerate(['a', 'b'])).toBe("ARRAY");
      expect(enumerate([])).toBe("ARRAY");
    });

    it('to type OBJECT', () => {
      expect(enumerate({a: 1, b: '2', c: true})).toBe("OBJECT");
      expect(enumerate({})).toBe("OBJECT");
    });

});


