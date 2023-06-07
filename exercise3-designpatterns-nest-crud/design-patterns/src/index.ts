import { RecordHandler, loader } from "./loader";


// Observer pattern
type Listener<EventType> = (ev: EventType) => void
function createObserver<EventType>(): {
    subscribe: (listener: Listener<EventType>) => () => void;
    publish: (event: EventType) => void
} {
    let listeners: Listener<EventType>[] = []
    return {
        subscribe: (listener: Listener<EventType>): () => void => {
            listeners.push(listener)
            return () => {
                listeners = listeners.filter(l => l !== listener)
            }
        },
        publish: (event: EventType) => {
            listeners.forEach((l) => l(event))
        }
    }
}

interface BeforeSetEvent<T> {
    value: T;
    newValue: T;
}

interface AfterSetEvent<T> {
    value: T;
}

interface Game {
    id: string;
    attack: number;
    defense: number;
}

interface BaseRecord {
    id: string;
}

interface Database<T extends BaseRecord> {
    set(newValue: T): void;
    get(id: string): T;

    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void
    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void

    visit(visitor: (item: T) => void): void

    selectBest(scoreStrategy: (item: T) => number): T | undefined
}

// Factory pattern
function createDatabase<T extends BaseRecord>(){
    class InMemoryDatabase implements Database<T> {
        private db: Record<string, T> = {}; 

        static instance:InMemoryDatabase = new InMemoryDatabase()

        private beforeAddListeners = createObserver<BeforeSetEvent<T>>()
        private afterAddListeners = createObserver<AfterSetEvent<T>>()

        private constructor() {}
    
        public set(newValue: T): void {
            this.beforeAddListeners.publish({
                newValue,
                value: this.db[newValue.id]
            })
            this.db[newValue.id] = newValue

            this.afterAddListeners.publish({
                value: newValue,
            })
        }
    
        public get(id: string): T {
            return this.db[id]
        }

        onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
            return this.beforeAddListeners.subscribe(listener);
        }
        onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
            return this.afterAddListeners.subscribe(listener);
        }

        // Visitor pattern
        visit(visitor: (item: T) => void): void {
            Object.values(this.db).forEach(visitor)
        }

        // Strategy pattern
        selectBest(scoreStrategy: (item: T) => number): T | undefined {
            const found: {
                max: number;
                item: T | undefined;
            } = {
                max: 0,
                item: undefined
            }

            Object.values(this.db).reduce((f, item) => {
                const score = scoreStrategy(item);
                if (score > f.max) {
                    f.item = item;
                    f.max = score;
                }
                return f;
            }, found)

            return found.item
        }
    }

    // Singleton pattern
    // const db = new InMemoryDatabase()
    // return db;
    return InMemoryDatabase
}

const GameDB = createDatabase<Game>()
// const gameDB = new GameDB()

class GameDBAdapter implements RecordHandler<Game> {
    addRecord(record: Game) {
        GameDB.instance.set(record)
    }
}

const unsubscribe = GameDB.instance.onAfterAdd(({ value }) => {
    console.log(value)
})

loader('./data.json', new GameDBAdapter())


GameDB.instance.set({
    id: "Bulbasaur",
    attack: 50,
    defense: 50,
})

unsubscribe()

GameDB.instance.set({
    id: "Spinosaur",
    attack: 100,
    defense: 20,
})

GameDB.instance.visit((item) => {
    console.log(item.id)
})

// const bestDefensive = GameDB.instance.selectBest(({ defense }) => defense)
// const bestAttack = GameDB.instance.selectBest(({ attack }) => attack)

// console.log(`Best defense = ${bestDefensive?.id} `)
// console.log(`Best attack = ${bestAttack?.id} `)

// unsubscribe()

// console.log(GameDB.instance.get("Bulbasaur"))