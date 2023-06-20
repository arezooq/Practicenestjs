"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const fetch_1 = require("rxjs/fetch");
const array = [1, 2, 'three', true];
const arrayObserver = ['one', 'two', 'three'];
// array.forEach(el => {
//     console.log(el);
// });
(0, rxjs_1.from)(array).subscribe((val) => console.log('from', val));
(0, rxjs_1.of)(1, 2, 'three', true).subscribe(val => console.log('of', val));
// Observer
const Observer = {
    next: (val) => console.log(val),
    error: undefined,
    complete: undefined,
};
(0, rxjs_1.from)(arrayObserver).subscribe(Observer);
(0, rxjs_1.from)(arrayObserver).subscribe((val) => console.log(val), undefined, undefined);
(0, rxjs_1.from)(arrayObserver).subscribe((val) => console.log(val), undefined, () => console.log('Completed'));
// Observable
const observable = new rxjs_1.Observable(subscriber => {
    subscriber.next('One');
    subscriber.next('Two');
    subscriber.next('Three');
    setTimeout(() => {
        subscriber.next('Four');
        subscriber.complete();
    }, 1000);
    setTimeout(() => {
        subscriber.error('Some error');
    }, 2000);
});
const observer = {
    next: (val) => console.log(val),
    error: (error) => console.log("Error to console: ", error),
    complete: () => console.log('Completed'),
};
observable.subscribe(observer);
const subscribe = (subscriber) => {
    const IntervalId = setInterval(() => {
        console.log('Interval. print something...');
    }, 500);
    ['Oneee', 'Twooo', 'Threeee'].forEach(value => {
        subscriber.next(value + '_NEXT');
        if (value === 'This error will not be thrown') {
            subscriber.error('Some error');
        }
    });
    setTimeout(() => {
        console.log('Triggering complete() function');
        subscriber.complete();
    }, 2000);
    return () => {
        clearInterval(IntervalId);
        console.log('Cleaned');
    };
};
const myOwnObservable = new rxjs_1.Observable(subscribe);
myOwnObservable.subscribe((value) => console.log(value), (error) => console.log('Error: ', error), () => console.log('Subscriber.completed 2'));
// Subscription
const timer = new rxjs_1.Observable(subscriber => {
    let iteration = 0;
    const intervalId = setInterval(() => {
        if (iteration === 10) {
            subscriber.unsubscribe();
        }
        subscriber.next(iteration++);
    }, 500);
    return () => {
        clearInterval(intervalId);
        console.log('Cleaned');
    };
});
const observer1 = {
    next: (val) => console.log(val),
    error: (error) => console.log('Error to console: ', error),
    complete: () => console.log('Completed'),
};
timer.subscribe(observer1);
// Pipe
(0, rxjs_1.of)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe((0, rxjs_1.map)(value => value * 10), (0, rxjs_1.filter)(value => value > 40 && value < 90)).subscribe(val => console.log(val), error => console.log(error), () => console.log('Completed!'));
// concat
const array_1 = ['ONE', 'TWO', 'THREE'];
const array_2 = ['FOUR', 'FIVE', 'SIX'];
const Observable_1 = (0, rxjs_1.from)(array_1);
const Observable_2 = (0, rxjs_1.from)(array_2);
(0, rxjs_1.concat)(Observable_1, Observable_2).subscribe(val => console.log(val));
// merge
const observable_3 = new rxjs_1.Observable(subscribe => {
    setTimeout(() => {
        subscribe.next('Oneeeeee');
    }, 100);
    setTimeout(() => {
        subscribe.next('Oneeeeee_1');
    }, 500);
    setTimeout(() => {
        subscribe.next('Oneeeeee_2');
    }, 1000);
});
const observable_4 = new rxjs_1.Observable(subscribe => {
    setTimeout(() => {
        subscribe.next('Twooooo');
    }, 200);
    setTimeout(() => {
        subscribe.next('Twooooo_1');
    }, 800);
    setTimeout(() => {
        subscribe.next('Twooooo_2');
    }, 1200);
});
const mergedObservable = (0, rxjs_1.merge)(observable_3, observable_4);
mergedObservable.subscribe(value => console.log(value));
// forkJoin
let ms_seconds = 0;
console.log(ms_seconds);
const Intervalid = setInterval(() => {
    console.log(++ms_seconds);
}, 500);
const observable_5 = (0, rxjs_1.forkJoin)({
    one: (0, rxjs_1.of)(11, 22, 33, 44),
    two: Promise.resolve(8),
    three: new Promise((resolve) => {
        setTimeout(() => {
            resolve(100);
        }, 2000);
    })
});
observable_5.subscribe({
    next: value => console.log(value),
    complete: () => {
        console.log('Completeeeed!');
        clearInterval(Intervalid);
    }
});
const fetch = (0, fetch_1.fromFetch)("https://rickandmortyapi.com/api/episode/").pipe((0, rxjs_1.switchMap)(response => response.json()));
fetch.subscribe(value => console.log(value));
