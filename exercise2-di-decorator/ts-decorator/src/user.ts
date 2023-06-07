import "reflect-metadata"

const PROPERTY_METADATA_KEY = Symbol("propMeta")

interface IPropertyMetadata {
    name?: string
    description?: string
}

interface IAllPropertyMetadata {
    [key: string]: IPropertyMetadata
}

function addPropertyMetadata(metadata: IPropertyMetadata): PropertyDecorator {
    return function (target: Object,
                    propertyKey: string | symbol): void {
                        const FLAG = 'Metadata'
                        console.log(`[${FLAG} C] Property key: "${String(propertyKey)}"`);
                        console.log(`[${FLAG} A] Target      :`, target);
                        
                        const allMetadata = Reflect.getMetadata(PROPERTY_METADATA_KEY, target) || {}

                        console.log(`[${FLAG} M -1] All metadata: ${JSON.stringify(allMetadata, null, 2)}`)

                        allMetadata[propertyKey] = allMetadata[propertyKey] || {}

                        console.log(`[${FLAG} M -2] All metadata: ${JSON.stringify(allMetadata, null, 2)}`)

                        const ownKeys = Reflect.ownKeys(metadata)
                        console.log(`[${FLAG} K] Own Keys: ${JSON.stringify(ownKeys, null, 2)}`)

                        ownKeys.forEach((key) => {
                            const val = (metadata as IAllPropertyMetadata) [String(key)]
                            console.log(`[${FLAG} V] Value: ${val}`)
                            allMetadata[propertyKey][key] = val
                        })

                        Reflect.defineMetadata(
                            PROPERTY_METADATA_KEY,
                            allMetadata,
                            target
                        )

                        
                    }
}

function logData(message: string): ClassDecorator {
    console.log(`Message is : ${message}`)
    return function (): void {
        console.log('constructor')
    }
}

function logProperty(message: string): PropertyDecorator {
    console.log(`[Property] Message is: ${message}`)
    return function ():void {
        console.log('[Property] constructor')
    }
}

function logMethod(message: string): MethodDecorator {
    console.log(`[Method] Message is: ${message}`)
    return function ():void {
        console.log('[Method] constructor')
    }
}

function logParameter(message: string): ParameterDecorator {
    console.log(`[Parameter] Message is: ${message}`)
    return function ():void {
        console.log('[Parameter] constructor')
    }
}

function addProperty<T>(name: string, value: T): ClassDecorator {
    console.log('[Class] Add property')
    return function (target: any): void {
        target.prototype[name] = value
        const instance = new target() as User

        instance.firstName = "Arezoo"
        instance.lastName = "ghorbanzade"
        console.log('New user', instance)
    }
}


@logData("Hello Word")
@addProperty<boolean>('isOld', true)
class User { 

    @logProperty("Property message")
    public firstName: string

    @addPropertyMetadata({
        name: 'LN Name',
        description: 'Last name description',
    })
    public lastName: string

    constructor (firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }

    @logMethod("Method message")
    public getFullName(@logParameter("Parameter message") text: string): string {
        return `${this.firstName} ${this.lastName}`
    }
}

const user = new User('John', 'Doe')
user.getFullName("!!!!")

// @ts-ignore
console.log('[?] isOld?', user.isOld)

console.log(
    "METADATA",
    Reflect.getMetadata(PROPERTY_METADATA_KEY, user),
)

