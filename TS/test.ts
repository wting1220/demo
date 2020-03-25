const hello : string = 'hello world'
console.log(hello)



interface Person {
    firstName: string
    lastName: string
}
function greeter(person: Person) {
    console.log(person.firstName + person.lastName)
}
greeter({ firstName: 'Ting', lastName: 'user'})



class Student {
    fullName: string
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + middleInitial + lastName
    }
}
let stu = new Student('w', 'ting', '123')
greeter(stu)


// 类型断言
let value: any = 'this is a str'
let len: number = (<string>value).length
console.log(len)
let len1: number = (value as string).length
console.log(len1)


// Object
declare function create(o: object | null) : void
create({ prop: 0 })  // OK
create(null) // OK