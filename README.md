Time Bandit
===========
Time Bandit makes it simpler to test your time-dependent code.

## Installation
`npm install time-bandit` or `yarn add time-bandit`

## Example
```JavaScript
const { travel, freeze, unfreeze, hours, minutes } = require('time-bandit')

// Travel 20 hours and 30 minutes into the future
travel(hours(20) + minutes(30))

// Restore date
unfreeze()
```

## API

### `travel(duration: number): void`
Travel the given `duration` of milliseconds and freeze the time.
```JavaScript
const timestamp = Date.now()

travel(1000)
Date.now() - timestamp // 1000

travel(-2000)
Date.now() - timestamp // -1000
```

### `freeze(...args): void`
Freeze date and time at the current timestamp.
```JavaScript
freeze(1985, 9, 26, 9, 0, 0)
new Date() // Sat Oct 26 1985 09:00:00

freeze(1445405280000)
new Date() // Wed Oct 21 2015 07:28:00
Date.now() === 1445405280000 // true
```

### `unfreeze(): void`
Restore the native `Date` object.
```JavaScript
const NativeDate = Date;

freeze()
Date === NativeDate // false

unfreeze()
Date === NativeDate // true
```

### `isFrozen(): boolean`
Returns whether the `Date` object is mocked.
```JavaScript
freeze()
isFrozen() // true

unfreeze()
isFrozen() // false
```

### `seconds(amount: number): number`
Returns the given `amount` of seconds in milliseconds.
```JavaScript
seconds(1) // 1000
seconds(-5) // -5000

travel(seconds(-5)) // Travel 5 seconds back in time
travel(seconds(50)) // Travel 50 seconds into the future
```

### `minutes(amount: number): number`
Returns the given `amount` of minutes in milliseconds.
```JavaScript
minutes(1) // 60,000
seconds(-5) // -300,000

travel(minutes(-5)) // Travel 5 minutes back in time
travel(minutes(50)) // Travel 50 minutes into the future
```

### `hours(amount: number): number`
Returns the given `amount` of hours in milliseconds.
```JavaScript
hours(1) // 3,600,000
hours(-2) // -7,200,000

travel(hours(-1)) // Travel 1 hour back in time
travel(hours(23)) // Travel 23 hours into the future
```

### `days(amount: number): number`
Returns the given `amount` of days in milliseconds.
```JavaScript
days(1) // 86,400,000
days(-1) // -86,400,000

travel(days(-1)) // Travel 1 day back in time
travel(days(10)) // Travel 10 days into the future
```
