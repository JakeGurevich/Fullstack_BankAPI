import fs from "fs";


const getUsers =await () => {
  const users = loadUsers();
  console.log(users);

  users.map((user) =>
    console.log(
      `Id : ${user.id} , cash : ${user.cash} , credit : ${user.credit}`
    )
  );
  return users;
};
const getUser = (id) => {
  const users = loadUsers();
  const user = users.filter((user) => {
    return user.id == id;
  });
  return user;
};
//add user
const addUser = (newUser) => {
  const users = loadUsers();
  const existingUsers = users.filter((user) => {
    return user.id === newUser.id;
  });
  if (existingUsers.length === 0) {
    users.push(newUser);
    saveUsers(users);
    return `user with id : ${newUser.id} was added to db`;
  } else {
    return `there is already user with  id : ${newUser.id}`;
  }
};
const removeUser = (id) => {
  const users = loadUsers();
  const updatedUsers = users.filter((u) => {
    return u.id != id;
  });

  if (users.length > updatedUsers.length) {
    saveUsers(updatedUsers);
    return `user with id : ${id} removed`;
  }
};
const updateUser = (id, user) => {
  const users = loadUsers();
  console.log(users);
  console.log(id, user);

  const userToUpdate = users.find((user) => {
    console.log(user.id, id);
    return user.id == id;
  });
  console.log(userToUpdate);

  if (user.cash) {
    let sum = userToUpdate.cash + user.cash;
    if (sum + userToUpdate.credit >= 0) {
      userToUpdate.cash = sum;
    } else {
      return `Sorry , you don't have enough cash or credit `;
    }
  }

  //   user.cash ? (userToUpdate.cash += user.cash) : userToUpdate.cash;
  if (user.credit) {
    if (user.credit + userToUpdate.credit >= 0) {
      userToUpdate.credit += user.credit;
    } else {
      return "Sorry , but credit has to  be greater than zero";
    }
  }

  //   user.credit > 0 ? (userToUpdate.credit += user.credit) : userToUpdate.credit;
  console.log(users);
  saveUsers(users);
  return `user with id : ${id} was updated`;
};
const makeTransfer = (body) => {
  console.log(body);
  let user = {};
  let { cash } = body;
  user.cash = -cash;
  const from = updateUser(body.fromUser, user);
  console.log(from);

  user.cash = cash;
  const to = updateUser(body.toUser, user);
  console.log(to);
  return from, to;
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("./db/users.json", dataJSON);
};
const loadUsers = () => {
  try {
    const dataBuffer = fs.readFileSync("./db/users.json");
    const dataJSON = dataBuffer.toString();
    console.log(JSON.parse(dataJSON));
    return JSON.parse(dataJSON);
  } catch (err) {
    console.log(err);
    return [];
  }
};
export { getUsers, addUser, updateUser, removeUser, makeTransfer, getUser };
