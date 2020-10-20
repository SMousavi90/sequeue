class Queue {    
    constructor(queue, requestType, ticketNumber, ticketNumber, counter, date, status) {
        if(queue)
            this.queue = queue;

        this.requestType = requestType;
        this.ticketNumber = ticketNumber;
        this.counter = counter;
        this.date = date;
        this.status = status;
    }
}

module.exports = Queue;
