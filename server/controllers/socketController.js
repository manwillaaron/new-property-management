module.exports = {
  joinRoom(roomid, socket, io) {
    socket.join(roomid);
    io.in(roomid).emit("login", "Hey there is a newbie!");
  },

  sendMessageToRoom(payload, io) {
    const { room, message } = payload;
    io.in(room).emit("new message from sever", message);
  },
  
  leaveRoom() {},
  
  async getMessages(req, res) {
    const db = req.app.get("db");
    let { admin_id } = req.params;
    console.log(+admin_id);
    let messages = await db.get_chatroom_messages(+admin_id);
    console.log(messages);
    res.send(messages);
  },

  async saveMessage(req, res) {
    const db = req.app.get("db");
    let { id, firstName } = req.session.admin;
    let { message_content, admin_id} = req.body;
    console.log(message_content ,id, firstName);
    console.log(req.body, req.session);

    let messages = await db.save_messages([
      message_content,
      +id,
      firstName,
      admin_id
    ]);
    res.send(messages);
  },

  async deleteMessage(req,res) {
    const db = req.app.get("db");
    let {message_id} = req.params
    console.log(req.body, req.params);
    let messages = await db.delete_message(+message_id)
    res.send(messages) 
  },

  async markAsRead(req, res) {
    const db = req.app.get("db");
    let { message_id } = req.body;
    let message = await db.mark_as_read(+message_id);
    res.send(message);
  },

  async getAllChatrooms(req, res) {
    const db = req.app.get("db");
    let { id } = req.session.admin;

    let chatrooms = await db.get_all_chatrooms(+id);
    res.send(chatrooms);
  }
};
