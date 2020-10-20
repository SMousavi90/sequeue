class Counter {    
    constructor(id, user, number) {
        if(id)
            this.id = id;

        this.user = user;
        this.number = number;
    }
}

module.exports = Counter;
