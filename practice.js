class Person {
    constructor(name) {
        this.name = name;
    }


print() {
    return 'My name is ' + this.name;
    }
}

class Employee extends Person {
    constructor(name, position) {
        super(name);
        this.position= position;
    }

    print() {
        return super.print() + ' and I am a ' + this.position;
    }
}

const e = new Employee('Eiche' , 'Software Engineer');
console.log(e.print());

