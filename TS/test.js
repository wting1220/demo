var hello = 'hello world';
console.log(hello);
function greeter(person) {
    console.log(person.firstName + person.lastName);
}
greeter({ firstName: 'Ting', lastName: 'user' });
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + middleInitial + lastName;
    }
    return Student;
}());
var stu = new Student('w', 'ting', '123');
greeter(stu);
// 类型断言
var value = 'this is a str';
var len = value.length;
console.log(len);
var len1 = value.length;
console.log(len1);
create({ prop: 0 });
