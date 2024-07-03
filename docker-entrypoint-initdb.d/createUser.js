connect("mongodb://" + process.env.MONGO_INITDB_ROOT_USERNAME + ":" + process.env.MONGO_INITDB_ROOT_PASSWORD + "@localhost:27017/admin")
  .getSiblingDB("TEST")
  .createUser({
    user: "testRoot",
    pwd: "testRootSecret",
    roles: [{ role: "readWrite", db: "TEST" }],
    passwordDigestor: "server",
  });
