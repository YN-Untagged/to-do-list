import bcrypt from 'bcryptjs/dist/bcrypt';

const storageHelpers =  {
    getIndex: function(){
        return parseInt(sessionStorage.getItem('userIndex'));
    },
    storeUsers : function(users){
        if(users !== null && users !== undefined){
            localStorage.setItem('users',JSON.stringify(users));
        }
    },
    getUsers : function(){
        return JSON.parse(localStorage.getItem('users'));
    },
    getCurrent : function(){
        const users = this.getUsers();
        return users[this.getIndex()];
    },
    getUserTasks : function(){
        const users = this.getUsers();
        
        return users[this.getIndex()].tasks;
    },
    hashPassword : function(password){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }
};

export default storageHelpers;