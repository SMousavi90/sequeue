class RequestType {    
    constructor(id, tagName, estimationTime) {
        if(id)
            this.id = id;

        this.tagName = tagName;
        this.estimationTime = estimationTime;
    }
}

module.exports = RequestType;
