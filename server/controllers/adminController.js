const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  async login(req, res) {
    let { username, password } = req.body;
    const db = req.app.get('db');
    const [existingAdmin] = await db.get_admin_by_username(username);
    if (!existingAdmin) return res.status(404).send('username not found');
    let result = bcrypt.compareSync(password, existingAdmin.password);
    if (result) {
      req.session.admin = {
        username: existingAdmin.username,
        id: existingAdmin.admin_id,
        loggedIn: true,
        renterCheck: existingAdmin.is_renter,
        firstName: existingAdmin.first_name
      };
      res.status(200).send(req.session.admin);
    } else res.status(401).send('username or password incorrect');
  },

  async register(req, res) {
    let {
      username,
      password,
      first_name,
      last_name,
      phone_number,
      email
    } = req.body;
    const db = req.app.get('db');
    let [existingAdmin] = await db.get_admin_by_username(username);
    if (existingAdmin) return res.status(401).send('Username already exists');
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    let [admin] = await db.create_admin([
      username,
      hash,
      first_name,
      last_name,
      phone_number,
      email
    ]);
    req.session.admin = {
      username: username,
      id: admin.admin_id,
      loggedIn: true,
      renterCheck: admin.is_renter,
      firstName: first_name
    };
    res.status(200).send(req.session.admin);
  },
  async signout(req, res) {
    await req.session.destroy();
    if(req.session){
      return res.sendStatus(500)
    }
    res.sendStatus(200);
  },
  async getAdmin(req, res) {
    if(req.session && req.session.admin.id){
      res.status(200).send(req.session.admin.renterCheck);
    } else {
      console.log('no  admin')
      res.sendStatus(404)
    }
  }
};
