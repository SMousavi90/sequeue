class User {    
    constructor(id, username, password, name, role) {
        if(id)
            this.id = id;

        this.username = username;
        this.password = password;
        this.name = name;
        this.role = role;
    }
}

module.exports = User;
