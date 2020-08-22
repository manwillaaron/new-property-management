module.exports = {
  async joinRoom(admin_id, sesh, { db, io, socket }) {
    let [chatroom_id] = await db.query(
      `select chatroom_id from chat_junction 
      where (admin_id = ${+admin_id} or  admin_id_renter = ${+admin_id} )  
      and
      (admin_id = ${+sesh.id} or  admin_id_renter = ${+sesh.id})`
    );
    socket.join(chatroom_id.chatroom_id);
    let chatMessages = await db.query(
      `select * from messages 
      where chatroom_id = ${chatroom_id.chatroom_id} 
      order by message_id desc`
    );
    io.in(chatroom_id.chatroom_id).emit('login', {
      chatroomId: chatroom_id.chatroom_id,
      chatMessages
    });
  },

  async sendMessageToRoom(payload, sesh, { db, io, socket }) {
    const { chatroomId, message } = payload;
    let [messageFromDb] = await db.save_messages([
      message,
      +sesh.id,
      chatroomId
    ]);
    io.in(chatroomId).emit('new message from sever', messageFromDb);
  },

  async deleteMessage(messageId,db, chatroomId, io) {
   const [message] = await db.delete_message(+messageId)
   io.in(chatroomId).emit('deleted message', message)
  },

  async markAsRead(req, res) {
    const db = req.app.get('db');
    let { message_id } = req.body;
    let message = await db.mark_as_read(+message_id);
    res.send(message);
  },

  async getAllChatrooms(req, res) {
    const db = req.app.get('db');
    let { id } = req.session.admin;

    let chatrooms = await db.get_all_chatrooms(+id);
    res.send(chatrooms);
  }
};
