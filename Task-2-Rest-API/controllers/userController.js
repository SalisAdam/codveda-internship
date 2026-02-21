let users = [
  { id: 1, name: "Salis" },
  { id: 2, name: "Codveda Intern" },
  { id: 3, name: "John Doe" },
  { id: 4, name: "Amina Yusuf" },
  { id: 5, name: "Michael Smith" }
];


exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};

exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};


exports.createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  user.name = name;
  res.status(200).json(user);
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  res.status(200).json({ message: "User deleted successfully" });
};