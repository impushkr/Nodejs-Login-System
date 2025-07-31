const fs = require("fs");
const readline = require("readline");
const crypto = require("crypto");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Register User");
rl.question("Enter Your Name : ", (name) => {
  rl.question("Set Password : ", (pass) => {
    const hashPassword = crypto.createHash("sha256").update(pass).digest("hex");

    const filepath = path.join(__dirname, "./UserDetails.txt");
    fs.writeFileSync(filepath, `${name}:${hashPassword}`);

    rl.question("Enter your name : ", (logname) => {
      rl.question("Enter your password : ", (logpass) => {
        const hashpass = crypto
          .createHash("sha256")
          .update(logpass)
          .digest("hex");

        const details = fs.readFileSync("./UserDetails.txt", "utf-8");
        const [username, userpass] = details.split(":");
       

        if (logname == username && hashpass == userpass) {
          return console.log("Login successfully");
        } else {
          console.log("invalid");
        }

        rl.close();
      });
    });

    /////////////////////////
  });
});
