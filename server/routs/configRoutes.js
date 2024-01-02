
const usersR=require("./users");
const chatR=require("./chats");
const cookieR=require("./cookies");
const uploadR=require("./upload");



exports.routsInit=(app)=>{
    app.use("/users", usersR);
    app.use("/chats", chatR);
    app.use("/cookies", cookieR);
    app.use("/upload", uploadR);

}


