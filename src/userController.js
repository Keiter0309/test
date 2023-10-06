let userService = require('./userService');
let signUpControllerFn = async (req,res) => {
    try {
        console.log(req.body);
        let status =  await userService.createUserDBService(req.body);
        console.log(status);
        if(status) {
            res.status({'status': true, "message": "User created successfully"})
        }else {
            res.status({'status': false, "message": "Error creating user"})
        }
    }catch(err) {
        console.log(err);
    }
}

let loginControllerFn = async (req, res) => {
    try {
        const result = await userService.loginUserDBService(req.body);
        console.log(result.status);

        if (result.status) {
            res.send({"status": true, "message": result.message});
        } else {
            res.send({"status": false, "message": result.message});
        }
    } catch (err) {
        console.error(err);
        res.send({"status": false, "message": "Error occurred during login"});
    }
};



module.exports = {signUpControllerFn, loginControllerFn};