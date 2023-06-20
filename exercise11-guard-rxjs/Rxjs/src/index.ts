import { Observable, PartialObserver, Subscriber, concat, filter, forkJoin, from, map, merge, of, switchMap } from "rxjs"
import { TeardownLogic } from "rxjs";
import { fromFetch } from "rxjs/fetch"


const array = [1, 2, 'three', true]
const arrayObserver = ['one', 'two', 'three']

// array.forEach(el => {
//     console.log(el);
    
// });

from(array).subscribe((val: any) => console.log('from', val));
of(1, 2, 'three', true).subscribe(val => console.log('of', val));

// Observer

const Observer = {
    next: (val) => console.log(val),
    error: undefined,
    complete: undefined,
} as PartialObserver<string>

from(arrayObserver).subscribe(Observer)

from(arrayObserver).subscribe(
    (val) => console.log(val),
    undefined,
    undefined, 
)

from(arrayObserver).subscribe(
    (val) => console.log(val),
    undefined,
    () => console.log('Completed'), 
);

// Observable

const observable = new Observable<string>(subscriber => {
    subscriber.next('One');
    subscriber.next('Two');
    subscriber.next('Three');
    setTimeout(() => {
        subscriber.next('Four')
        subscriber.complete()
    }, 1000)
    setTimeout(() => {
        subscriber.error('Some error')
    }, 2000)
})

const observer = {
    next: (val) => console.log(val),
    error: (error) => console.log("Error to console: ", error),
    complete: () => console.log('Completed'),
} as PartialObserver<string>

observable.subscribe(observer)

const subscribe = (subscriber: Subscriber<string>): TeardownLogic => {
    const IntervalId = setInterval(() => {
        console.log('Interval. print something...')
    }, 500);
    ['Oneee', 'Twooo', 'Threeee'].forEach(value => {
        subscriber.next(value + '_NEXT')
        if(value === 'This error will not be thrown') {
            subscriber.error('Some error')
        }
    })
    setTimeout(() => {
        console.log('Triggering complete() function')
        subscriber.complete()
    }, 2000)

    return () => {
        clearInterval(IntervalId);
        console.log('Cleaned');
    }
}

const myOwnObservable = new Observable(subscribe);

myOwnObservable.subscribe(
    (value) => console.log(value),
    (error) => console.log('Error: ', error),
    () => console.log('Subscriber.completed 2'),  
);

// Subscription

const timer = new Observable<number>(subscriber => {
    let iteration = 0;
    const intervalId = setInterval(() => {
        if(iteration === 10) {
            subscriber.unsubscribe();
        }
        subscriber.next(iteration++)
    }, 500)

    return () => {
        clearInterval(intervalId)
        console.log('Cleaned');
    }
})

const observer1 = {
    next: (val) => console.log(val),
    error: (error) => console.log('Error to console: ', error),
    complete: () => console.log('Completed'),
} as PartialObserver<number>

timer.subscribe(observer1)

// Pipe

of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
    map(value => value * 10),
    filter(value => value > 40 && value < 90),
).subscribe(
    val => console.log(val),
    error => console.log(error),
    () => console.log('Completed!'),
)

// concat

const array_1 = ['ONE', 'TWO', 'THREE']
const array_2 = ['FOUR', 'FIVE', 'SIX']

const Observable_1 = from(array_1)
const Observable_2 = from(array_2)

concat(Observable_1, Observable_2).subscribe(val => console.log(val))

// merge

const observable_3 = new Observable(subscribe => {
    setTimeout(() => {
        subscribe.next('Oneeeeee')
    },100)
    setTimeout(() => {
        subscribe.next('Oneeeeee_1')
    },500)
    setTimeout(() => {
        subscribe.next('Oneeeeee_2')
    },1000)
})


const observable_4 = new Observable(subscribe => {
    setTimeout(() => {
        subscribe.next('Twooooo')
    },200)
    setTimeout(() => {
        subscribe.next('Twooooo_1')
    },800)
    setTimeout(() => {
        subscribe.next('Twooooo_2')
    },1200)
})

const mergedObservable = merge(observable_3, observable_4)

mergedObservable.subscribe(value => console.log(value))

// forkJoin

let ms_seconds = 0;
console.log(ms_seconds);
const Intervalid = setInterval(() => {
    console.log(++ms_seconds);
}, 500)

const observable_5 = forkJoin({
    one: of(11, 22, 33, 44),
    two: Promise.resolve(8),
    three: new Promise((resolve) => {
        setTimeout(() => {
            resolve(100)
        }, 2000)
    })
})
observable_5.subscribe({
    next: value => console.log(value),
    complete: () => {
        console.log('Completeeeed!');
        clearInterval(Intervalid)
    }
    
})


const fetch = fromFetch("https://rickandmortyapi.com/api/episode/").pipe(
    switchMap(response => response.json())
)
fetch.subscribe(value => console.log(value),)


