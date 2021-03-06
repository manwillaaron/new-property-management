module.exports = {
  async getProperties(req, res) {
    const db = req.app.get('db');
    if(!req.session.admin) return res.sendStatus(401)
    let properties = await db.get_properties_by_admin(req.session.admin.id);
    if (properties.length > 0) {
      res.status(200).send(properties);
    } else {
      res.sendStatus(404);
    }
  },

  async editProperty(req, res) {
    let { propertyId } = req.params;
    let {
      address,
      num_beds,
      num_baths,
      square_footage,
      acreage,
      rent,
      gas_company,
      electric_company,
      has_renter,
      fridge_included,
      dishwasher_included,
      washer_dryer_included,
      mortgage,
      tax_yearly,
      img_url,
      img_url2,
      img_url3,
      img_url4,
      img_url5,
      property_name
    } = req.body.inputsObj;
    const db = req.app.get('db');
    let properties = await db.edit_property([
      address,
      +num_beds,
      +num_baths,
      +square_footage,
      +acreage,
      +rent,
      gas_company,
      electric_company,
      Boolean(has_renter),
      Boolean(fridge_included),
      Boolean(dishwasher_included),
      Boolean(washer_dryer_included),
      mortgage,
      tax_yearly,
      img_url,
      img_url2,
      img_url3,
      img_url4,
      img_url5,
      property_name,
      +propertyId
    ]);
    res.status(200).send(properties);
  },

  async deleteProperty(req, res) {
    const { propertyId } = req.params;
    let { id } = req.session.admin;
    const db = req.app.get('db');
    let properties = await db.delete_property([+propertyId, id]);
    res.staus(200).send(properties);
  },

  async addProperty(req, res) {
    const db = req.app.get('db');
    const { id } = req.session.admin;
    let {
      address,
      num_beds,
      num_baths,
      square_footage,
      acreage,
      rent,
      gas_company,
      electric_company,
      has_renter,
      fridge_included,
      dishwasher_included,
      washer_dryer_included,
      mortgage,
      tax_yearly,
      img_url,
      img_url2,
      img_url3,
      img_url4,
      img_url5,
      property_name
    } = req.body;
    let properties = await db.add_property([
      address,
      +num_beds,
      +num_baths,
      +square_footage,
      +acreage,
      +rent,
      gas_company,
      electric_company,
      Boolean(has_renter),
      Boolean(fridge_included),
      Boolean(dishwasher_included),
      Boolean(washer_dryer_included),
      +mortgage,
      +tax_yearly,
      img_url,
      img_url2,
      img_url3,
      img_url4,
      img_url5,
      property_name,
      +id
    ]);
    res.status(200).send(properties);
  }
};
