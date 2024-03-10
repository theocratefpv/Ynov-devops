const users = [
    {id: 1, username: "example", fullName: "My EXAMPLE"},
    {id: 2, username: "example2", fullName: "My2nd EXAMPLE"}
]

exports.getUsers = async () => {
    return users;
}

exports.getUserById = async (id) => {
    return users.find(o => o.id === parseInt(id));
}

exports.addUser = async (username, fullName) => {
    const lastUser = users[users.length - 1];
    const id = lastUser ? lastUser.id + 1 : 1;
    const userToCreate = {id, username, fullName};
    const arrayLength = users.push(userToCreate);
    if ((users.length - 1) !== arrayLength) {
        return userToCreate; // return the last user created;
    } else {
        return null;
    }
}