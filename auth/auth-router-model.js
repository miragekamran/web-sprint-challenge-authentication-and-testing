const db = require("../database/dbConfig");

async function add(user) {
    const [id] = await db("users").insert(user);
    return findById(id);
}

function find() {
    return db("users").select("id", "username");
}

function findBy(filter) {
    return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
    return db("users").select("id", "username").where({ id }).first();
}

async function create(data) {
    const [id] = await db("users").insert(data);
    return findById(id);
}

async function update(id, data) {
    await db("users").where({ id }).update(data);
    return findById(id);
}

function remove(id) {
    return db("users").where({ id }).del();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    create,
    update,
    remove
};
