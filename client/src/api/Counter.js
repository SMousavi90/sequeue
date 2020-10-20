class Counter {    

    constructor(id, number, userId) {
        if(id)
            this.id = id;

        this.number = number;
        this.userId = userId;
    }

    /**
     * Construct a Counter from a plain object
     * @param {{}} json 
     * @return {Counter} the newly created Counter object
     */
    static from(json) {
        const t =  Object.assign(new Counter(), json);
        return t;
    }

}

export default Counter;

