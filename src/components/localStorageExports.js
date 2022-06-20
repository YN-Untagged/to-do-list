const storageHelpers =  {
    getIndex: function(){
        return parseInt(sessionStorage.getItem('userIndex'));
    },
    storeUsers : function(users){
        if(users !== null || users !== undefined){
            localStorage.setItem('users',JSON.stringify(users));
        }
        
    },
    getUsers : function(){
        return JSON.parse(localStorage.getItem('users'));
    },
    getCurrent : function(){
        const users = this.storeUsers;
        return users[this.getIndex()];
    },
    getUserTasks : function(){
        const users = this.storeUsers();
        
        return users[this.getIndex()].tasks;
    }
};

export default storageHelpers;