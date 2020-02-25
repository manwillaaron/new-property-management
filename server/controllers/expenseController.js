module.exports = {
  addExpense(req, res) {
    const db = req.app.get(db);
    console.log(req.body, req.params)
    // let expense  = await db.add_expense(req.body);
    // res.status(200).send(expense)
  }
};
