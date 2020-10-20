class Counter_RequestType {    
    constructor(id, counter, requestType) {
        if(id)
            this.id = id;

        this.counter = counter;
        this.requestType = requestType;
    }
}

module.exports = Counter_RequestType;
