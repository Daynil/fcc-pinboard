    import Mongoose = require("mongoose");
    
    class DataAccess {
        static mongooseInstance: any;
        static mongooseConnection: Mongoose.Connection;
        
        constructor () {
            DataAccess.connect();
        }
        
        static connect (): Mongoose.Connection {
            if(this.mongooseInstance) return this.mongooseInstance;
            
            this.mongooseConnection = Mongoose.connection;
            this.mongooseConnection.once("open", () => {
                console.log("Connected to mongodb");
            });
            
           this.mongooseInstance = Mongoose.connect(process.env.MONGO_URI);
           return this.mongooseInstance;
        }
        
    }
    
    DataAccess.connect();
    export = DataAccess;
     