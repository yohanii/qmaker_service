  db.createUser({
    user: "qmaker",
    pwd: "qlalfqjsgh486", 
    roles: [
      {
        role: "readWrite",
        db: "mydb",
      },
    ],
  });