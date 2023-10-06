const userModel = require("./userModel");
const key = '123456789trytryrtyr';
const encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {
    console.log("userDetails.password:", userDetails.password);
    console.log("encryptor:", encryptor);
    console.log("userDetails.matchPass:", userDetails.matchPass);
    console.log("encryptor:", encryptor)

    if (typeof userDetails.password === 'string') {
        const encryptedPassword = encryptor.encrypt(userDetails.password);
        const encryptedMatchPass = encryptor.encrypt(userDetails.matchPass);

        let userModelData = new userModel({
            email: userDetails.email,
            username: userDetails.username,
            password: encryptedPassword,
            matchPass: encryptedMatchPass,
            phone: userDetails.phone,
        });

        return userModelData.save()
            .then((result) => {
                console.log("User created successfully:", result);
                return true;
            })
            .catch((err) => {
                console.error("Error creating user:", err);
                throw err;
            });
    } else {
        console.error("Invalid password:", userDetails.password);
        return Promise.reject("Invalid password");
    }
};

module.exports.loginUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: userDetails.email })
            .then((result) => {
                if (result !== null) {
                    const decryptedPassword = encryptor.decrypt(result.password);
                    console.log(userDetails.password)
                    const isPasswordValid = decryptedPassword === userDetails.password;
                    console.log("Decrypted Password:", decryptedPassword);
                    console.log("Password Comparison Result:", isPasswordValid);

                    if (isPasswordValid) {
                        resolve({ status: true, message: "User Validated Successfully" });
                        console.log("Successful login for user:", result.email);
                    } else {
                        reject({ status: false, message: "Incorrect password" });
                        console.log("Incorrect password for user:", result.email);
                    }
                } else {
                    reject({ status: false, message: "User not found" });
                    console.log("User not found with email:", userDetails.email);
                }
            })
            .catch((err) => {
                reject({ status: false, message: "Error occurred during login" });
                console.error("Error during login:", err);
            });
    });
};