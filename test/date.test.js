import {
  freeze,
  unfreeze,
  isFrozen,
  travel,
  seconds,
  minutes,
  days,
  hours,
} from '../src';

describe('TimeTravelerDate', () => {
  const NativeDate = Date;

  describe('freeze and unfreeze', () => {
    it('freezes and unfreezes given date', () => {
      freeze(Date.UTC(2016, 10, 16, 17, 45));

      expect(isFrozen()).toBe(true);
      expect(Date.now()).toBe(1479318300000);
      expect(new Date().toISOString()).toMatch('2016-11-16T17:45:00.000Z');

      unfreeze();
      expect(isFrozen()).toBe(false);
      expect(Date).toBe(NativeDate);
    });

    describe('when time is frozen', () => {
      afterEach(unfreeze);

      it('is possible to construct new dates with arguments', () => {
        freeze();
        const date = new Date(Date.UTC(2016, 10, 16, 17, 45));

        expect(date.toISOString()).toMatch('2016-11-16T17:45:00.000Z');
        expect(date.getTime()).toBe(1479318300000);
      });
    });
  });

  describe('travel', () => {
    const timestamp = 1547148020000;

    afterEach(unfreeze);

    it('adjusts time by the given milliseconds', () => {
      freeze(timestamp);

      travel(5000);
      expect(Date.now()).toBe(timestamp + 5000);

      travel(-5000);
      expect(Date.now()).toBe(timestamp);

      travel(-5000);
      expect(Date.now()).toBe(timestamp - 5000);
    });

    describe('when not frozen before travel', () => {
      it('uses the current timestamp as freezed date', () => {
        const currentTimestamp = Date.now();

        travel(1000);

        expect(Date.now()).toBe(currentTimestamp + 1000);
      });
    });
  });

  describe('seconds', () => {
    it('adds or subtracts amount of given seconds in milliseconds', () => {
      expect(seconds(1)).toBe(1000);
      expect(seconds(3)).toBe(3000);
      expect(seconds(-3)).toBe(-3000);
    });
  });

  describe('minutes', () => {
    it('adds or subtracts amount of given minutes in milliseconds', () => {
      expect(minutes(1)).toBe(60000);
      expect(minutes(-1)).toBe(-60000);
      expect(minutes(3)).toBe(180000);
    });
  });

  describe('days', () => {
    it('adds or subtracts amount of given days in milliseconds', () => {
      expect(days(1)).toBe(86400000);
      expect(days(-1)).toBe(-86400000);
      expect(days(3)).toBe(259200000);
    });
  });

  describe('hours', () => {
    it('adds or subtracts amount of given hours in milliseconds', () => {
      expect(hours(1)).toBe(3600000);
      expect(hours(-1)).toBe(-3600000);
      expect(hours(2)).toBe(7200000);
    });
  });
});
