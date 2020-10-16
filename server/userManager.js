const users = []; // an array of users

// handling user login into system
// add 3 extra parameters to function
const addUser = ({ id, name, room }) => {
    // trim username and roomname w/o any whitespace and lowercase them
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // check whether username has already taken in that room by comparing it to array
    const existingUserCheck = users.find((user) =>
        user.room === room && user.name === name);
    if (existingUserCheck) {
        return { error: 'Username already taken' };
    }

    // if not then generate new user with these parameters
    const user = { id, name, room };
    // then pushed into an users array pool
    users.push(user);
    // exit this function and code carrying users' value.
    return { user }
}

// removing one user instance from array pool upon leaving
const removeUser = (id) => {
    // find the index num. the user sits on by their ID
    const indexNo = users.findIndex((user) => user.id === id);

    // check if found index num. is available
    // then delete that user ID from array pool and then normalize the array pool row to prevent null cluster
    // return from this codeblock
    if (indexNo !== -1) {
        return users.splice(indexNo, 1)[0];
    }
}

// get and find user by their ID (param.), comparing query from users array pool
const getUser = (id) => users.find((user) => user.id === id);

// get user in room by using room param., by filtering (there will be name dupes, but in diff. room) to that specific room in an array pool
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// exports those functions above to be used as a module
// server-side index.js will be using these
module.exports(addUser, removeUser, getUser, getUsersInRoom);