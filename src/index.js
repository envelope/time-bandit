import {
  MS_IN_SECOND,
  MS_IN_MINUTE,
  MS_IN_HOUR,
  MS_IN_DAY,
} from './constants';

const NativeDate = global.Date;
let timestamp = null;

export class TimeTravelerDate extends NativeDate {
  constructor(...args) {
    const date = args.length ? args : [timestamp];
    super(...date);
  }

  static now() {
    return timestamp;
  }
}

export function freeze(...args) {
  global.Date = TimeTravelerDate;
  const date = new NativeDate(...args);
  timestamp = date.getTime();
}

export function travel(duration) {
  global.Date = TimeTravelerDate;

  if (timestamp === null) {
    timestamp = NativeDate.now();
  }

  timestamp += duration;
}

export function unfreeze() {
  global.Date = NativeDate;
  timestamp = null;
}

export function isFrozen() {
  return global.Date === TimeTravelerDate;
}

export function seconds(amount) {
  return amount * MS_IN_SECOND;
}

export function minutes(amount) {
  return amount * MS_IN_MINUTE;
}

export function hours(amount) {
  return amount * MS_IN_HOUR;
}

export function days(amount) {
  return amount * MS_IN_DAY;
}