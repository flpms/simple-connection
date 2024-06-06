/* eslint-disable no-undef */
var db7 = connect('mongodb://root:passRoot@localhost:27017/admin');

// we can't use 'use' statement here to switch db
db7 = db7.getSiblingDB("TEST");
db7.createUser({
  user: "testRoot",
  pwd: "testRootSecret",
  roles: [{ role: "readWrite", db: "TEST" }],
  passwordDigestor: "server",
});
