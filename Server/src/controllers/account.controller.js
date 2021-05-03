import User from "../model/users.js";
import Account from "../model/accounts.js";
import Transaction from "../model/transactions.js";

const update = async (req, res) => {
  const updates = Object.keys(req.body);
  const key = Object.keys(req.body)[0];
  const value = Object.values(req.body)[0];
  const allowedUpdates = ["cash", "credit"];
  const isValidOperetion = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperetion) {
    return res.status(400).send({ error: "Invalid operation" });
  }
  try {
    const id = `${req.params.id}`;
    const filter = { user_id: id };
    console.log(id, filter);

    const acc = await Account.findOne(filter);
    console.log("acc:", acc);
    console.log(key, value);
    console.log(acc.cash + acc.credit + Number(req.body.cash));
    if (
      (req.body.cash && acc.cash + acc.credit + Number(req.body.cash) < 0) ||
      (req.body.credit && acc.credit + Number(req.body.credit) < 0)
    ) {
      return res.status(406).send(new Error("Unable to update"));
    }
    const account = await Account.findOneAndUpdate(
      filter,
      {
        $inc: { [key]: value },
      },
      { new: true, runValidators: true }
    );
    console.log(account);
    if (!account) {
      return res.status(400).send({ error: "Cannot find account" });
    }

    const newTransaction = new Transaction({
      from_user_id: id,
      ammount: req.body.cash || req.body.credit,
      transaction_type: "cash",
    });
    const result = await newTransaction.save();
    console.log(result);
    res.status(201).send(account);
  } catch (error) {
    return res.status(405).send("error");
  }
};
export default { update };
