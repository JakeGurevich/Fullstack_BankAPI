import express from "express";
import User from "../model/users.js";
import Account from "../model/accounts.js";
import Transaction from "../model/transactions.js";
import accountController from "../controllers/account.controller.js";

// import {
//   getUsers,
//   getUser,
//   addUser,
//   updateUser,
//   removeUser,
//   makeTransfer,
// } from "./routes/utils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/account/:id", async (req, res) => {
  const id = `${req.params.id}`;
  console.log(id);
  const user = { user_id: id };
  try {
    const account = await Account.findOne(user);
    res.send(account);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = new User(req.body);

    const result = await newUser.save();
    const newAccount = new Account();
    newAccount.user_id = newUser._id;
    console.log(newAccount);
    const resultAccount = await newAccount.save();
    console.log(resultAccount);
    res.status(201).send(resultAccount);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
router.post("/account", async (req, res) => {
  console.log(req.body);
  try {
    const newAccount = new Account(req.body);
    const result = await newAccount.save();
    console.log(result);
    res.status(201).send(result);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
router.patch("/update/:id", async (req, res) => {
  accountController.update(req, res);
  //   try {
  //     const id = `${req.params.id}`;
  //     const filter = { user_id: id };
  //     const update = { ...req.body };
  //     update.credit = Number(update.credit);
  //     console.log(filter, update.credit);
  //     const accountToUpdate = await Account.findOne(filter);

  //     let toUpdate = false;

  //     if (!accountToUpdate) {
  //       return res.status(500).send("account not found");
  //     }
  //     console.log(update.cash, accountToUpdate.cash, accountToUpdate.credit);
  //     if (accountToUpdate.cash + accountToUpdate.credit > update.cash) {
  //       update.cash += accountToUpdate.cash;
  //       toUpdate = true;
  //     } else if (update.cash) {
  //       res.status(500).send("Not enough funds");
  //     }
  //     if (update.credit && update.credit + accountToUpdate.credit >= 0) {
  //       update.credit += accountToUpdate.credit;
  //       toUpdate = true;
  //     } else if (update.credit) {
  //       res.status(500).send("Credit has to be greater than zero");
  //     }
  //     if (toUpdate) {
  //       const account = await Account.findOneAndUpdate(filter, update, {
  //         new: true,
  //       });
  //       if (!account) {
  //         console.log("Error : no account found");
  //         res.status(404).send("Error : no account found");
  //       }
  //       console.log(account);
  //       const newTransaction = new Transaction({
  //         from_user_id: id,
  //         ammount: req.body.cash || req.body.credit,
  //         transaction_type: "adding cash",
  //       });
  //       const result = await newTransaction.save();
  //       console.log(result);
  //       res.status(201).send(account);
  //     }
  //   } catch (e) {
  //     res.status(400).send({ error: e.message });
  //   }
});
router.patch("/transfer", async (req, res) => {
  try {
    const from = req.query.from;
    const to = req.query.to;
    const fromUser = { user_id: from };
    const toUser = { user_id: to };
    const update = { ...req.body };

    console.log(req.query);
    console.log(fromUser);
    const accountFrom = await Account.findOne(fromUser);
    console.log(accountFrom);
    console.log(toUser);
    const accountTo = await Account.findOne(toUser);
    console.log(accountTo);
    let toUpdate = false;

    if (!accountFrom || !accountTo) {
      res.status(500).send("account not found");
    }

    if (accountFrom.cash + accountFrom.credit - update.cash >= 0) {
      update.cash = accountFrom.cash - update.cash;
      toUpdate = true;
    } else if (update.cash) {
      res.status(500).send("Not enough funds");
    }

    if (toUpdate) {
      const account = await Account.findOneAndUpdate(fromUser, update, {
        new: true,
      });
      const updateTo = { ...req.body };
      updateTo.cash += accountTo.cash;
      const account2 = await Account.findOneAndUpdate(toUser, updateTo, {
        new: true,
      });
      if (!account || !account2) {
        console.log("Error : no account found");
        res.status(404).send("Error : no account found");
      }

      const newTransaction = new Transaction({
        from_user_id: accountFrom._id,
        to_user_id: accountTo._id,
        ammount: req.body.cash || req.body.credit,
        transaction_type: "adding cash",
      });
      const result = await newTransaction.save();
      console.log(result);
      res.status(201).send(`${account}, ${account2}`);
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
router.delete("/:id", (req, res) => {
  const remove = removeUser(req.params.id);
  console.log(remove);
  res.send(remove);
});
router.delete("/:id", (req, res) => {
  const remove = removeUser(req.params.id);
  console.log(remove);
  res.send(remove);
});
router.patch("/account/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id !== "transfer") {
    const patchResult = updateUser(id, req.body);
    res.send(patchResult);
  } else {
    const transfer = makeTransfer(req.body);
    res.send(transfer);
  }
});

export default router;
