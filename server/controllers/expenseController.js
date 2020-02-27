const fetch = require('node-fetch');
module.exports = {
  async addExpense(req, res) {
    console.log('hit expense controller', req.body);

    const db = req.app.get('db');
    let [expense] = await db.add_expense(req.body);
    console.log(expense);

    fetch('https://hooks.zapier.com/hooks/catch/6802367/om8igiy/silent/', {
      mode: 'no-cors',
      body: JSON.stringify({
        ...expense,
        property_name: req.body.property_name
      }),
      headers: {
        'Content-type': 'application/json'
      },
      method:    'post'
    });
    res.status(200).send(expense);
  }
};
