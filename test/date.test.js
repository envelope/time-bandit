import {
  TimeTravelerDate,
  freeze,
  unfreeze,
  isFrozen,
  travel,
  seconds,
  minutes,
  days,
  hours,
} from '../src';

const NativeDate = Date;

afterEach(unfreeze);

describe('freeze()', () => {
  it('can freeze date and time at the current timestamp', () => {
    const timestamp = Date.now();
    freeze();

    expect(Date.now()).toBe(timestamp);
    expect(new Date().getTime()).toBe(timestamp);
  });

  it('can freeze date and time at a given timestamp', () => {
    freeze(1445412480000);

    expect(Date.now()).toBe(1445412480000);
    expect(new Date().getTime()).toBe(1445412480000);
    expect(new Date().toISOString()).toBe('2015-10-21T07:28:00.000Z');
  });

  it('can freeze date and time at a given date string', () => {
    freeze('2015-10-21T07:28:00.000Z');

    expect(Date.now()).toBe(1445412480000);
    expect(new Date().getTime()).toBe(1445412480000);
    expect(new Date().toISOString()).toBe('2015-10-21T07:28:00.000Z');
  });
});

describe('when date and time is frozen', () => {
  it('is possible to construct new dates with arguments', () => {
    freeze();

    expect(new Date(Date.UTC(1985, 9, 26, 9, 0)).toISOString())
      .toMatch('1985-10-26T09:00:00.000Z');

    expect(new Date(Date.parse('2015-10-21T07:28:00.000Z')).toISOString())
      .toMatch('2015-10-21T07:28:00.000Z');
  });
});

describe('unfreeze()', () => {
  it('restores the global `Date` object back to its original implementation', () => {
    freeze(1445412480000);
    unfreeze();

    expect(Date).not.toBe(TimeTravelerDate);
    expect(Date).toBe(NativeDate);
    expect(Date.now()).not.toBe(1445412480000);
  });

  it('clears the previously frozen date and time', () => {
    freeze(1445412480000);
    expect(Date.now()).toBe(1445412480000);

    unfreeze();
    freeze();
    expect(Date.now()).not.toBe(1445412480000);
  });
});

describe('travel()', () => {
  it('adjusts the frozen time by the given amount of milliseconds', () => {
    freeze(0);

    travel(1000);
    expect(Date.now()).toBe(1000);

    travel(-2000);
    expect(Date.now()).toBe(-1000);

    travel(5000);
    expect(Date.now()).toBe(4000);
  });

  describe('when not frozen before travel', () => {
    it('freezes time at the current timestamp', () => {
      const timestamp = Date.now();

      travel(1000);
      expect(Date.now()).toBe(timestamp + 1000);
    });
  });
});

describe('isFrozen()', () => {
  it('returns whether date and time is currently frozen', () => {
    freeze();
    expect(isFrozen()).toBe(true);

    unfreeze();
    expect(isFrozen()).toBe(false);
  });
});

describe('seconds()', () => {
  it('returns the given amount of seconds in milliseconds', () => {
    expect(seconds(1)).toBe(1000);
    expect(seconds(-1)).toBe(-1000);
  });
});

describe('minutes()', () => {
  it('returns the given amount of minutes in milliseconds', () => {
    expect(minutes(1)).toBe(60000);
    expect(minutes(-1)).toBe(-60000);
  });
});

describe('hours()', () => {
  it('returns the given amount of hours in milliseconds', () => {
    expect(hours(1)).toBe(3600000);
    expect(hours(-1)).toBe(-3600000);
  });
});

describe('days()', () => {
  it('returns the given amount of days in milliseconds', () => {
    expect(days(1)).toBe(86400000);
    expect(days(-1)).toBe(-86400000);
  });
});
