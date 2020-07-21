exports.up = function (knex) {
    return knex.schema.createTable("users", users => {
        users.increments();
        users.text("username").notNullable().unique();
        users.text("password").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
};
