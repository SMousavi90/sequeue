
class RequestType {

    constructor(id, tagName, estimationTime) {
        if (id) {
            this.id = id;
        }

        this.tagName = tagName;
        this.estimationTime = estimationTime;
    }

    /**
     * Construct a RequestType from a plain object
     * @param {{}} json 
     * @return {RequestType} the newly created RequestType object
     */
    static from(json) {
        const r = Object.assign(new RequestType(), json);
        return r;
    }

}

export default RequestType;

