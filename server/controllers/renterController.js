
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  async getAllRenters(req, res) {
    const db = req.app.get('db');
    let { id } = req.session.admin;
    let renters = await db.get_all_renters(+id);
    res.status(200).send(renters);
  },

  async getRenters(req, res) {
    const db = req.app.get('db');
    let { propertyId } = req.params;
    let admin = await db.get_renters(+propertyId);
    res.status(200).send(admin);
  },

  async addRenter(req, res) {
    const db = req.app.get('db');
    let { first_name, last_name, phone_number, email, prop_id } = req.body;
    
    let [existingAdmin] = await db.get_admin_by_username(email);
    if (existingAdmin) return res.status(401).send('Username already exists');
    let salt = bcrypt.genSaltSync(saltRounds);
    let password = bcrypt.hashSync(phone_number, salt);
    let renters = await db.add_renter({
      password,
      first_name,
      last_name,
      phone_number,
      email,
      prop_id: +prop_id
    });
    
    res.status(200).send(renters);
  },
  async editRenter(req, res) {
    let {
      first_name,
      last_name,
      phone_number,
      email,
      property_manager_renter
    } = req.body;
    let { prop_id } = req.params;
    const db = req.app.get('db');
    let admin = await db.edit_renter([
      prop_id,
      first_name,
      last_name,
      phone_number,
      email,
      property_manager_renter
    ]);
    res.status(200).send(admin);
  },

  async deleteRenter(req, res) {
    let { admin_id } = req.params;
    const db = req.app.get('db');
    let admin = await db.delete_renter(+admin_id);
    res.status(200).send(admin);
  }
};
