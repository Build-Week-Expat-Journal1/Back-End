const hashpw = "$2y$10$1R6N9DQPsggroTJLV0tPB.afwZkrUFbmcykfx9YTUrAoXnONSMehu";

exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("users").insert([
    {
      username: "gthreadgall0",
      password: hashpw,
    },
    {
      username: "hbrislen1",
      password: hashpw,
    },
    {
      username: "myacob2",
      password: hashpw,
    },
    {
      username: "bmarten3",
      password: hashpw,
    },
    {
      username: "hwanless4",
      password: hashpw,
    },
  ]);
};
