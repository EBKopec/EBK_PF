const bcrypt = require('bcrypt');

class Router {
    constructor(app,db){
        this.login(app, db);
        this.logout(app,db);
        this.isLoggedIn(app, db);

    }

    login(app, db){
        app.post('/login',(req, res) => {
            let userName = req.body.userName;
            let password = req.body.password;
            
            console.log(userName,password);
            userName = userName.toLowerCase();

            if (userName.length > 12 || password.length > 12){
                res.json({
                    success:false,
                    msg:'An errors occured, please try again'
                })
                return; 
            }
            
            let cols = [userName];
            db.query('SELECT * FROM userapp where userApp_username = ? LIMIT 1', cols, (err, data, fields) =>{
                
                if(err){
                    res.json({
                        success:false,
                        msg: 'An errors occured, please try again'
                    })
                    return ;
                }
                //Found 1 user with this username
                if (data && data.length === 1 ){
                    
                    bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
                       if (verified){
                           // the data[0].userApp_id
                           // must be the same name of the table column userapp.
                           req.session.userID = data[0].userApp_id;
                           res.json({
                               success:true,
                               userName: data[0].userApp_username
                           });
                           return ;
                       } else {
                           res.json({
                               success: false,
                               msg: 'Invalid Password'
                           });
                       }
                    });

                } else{
                    res.json({
                        success:false,
                        msg: 'User not found, please try again!'
                    })
                }
            })

            
        });
    }

    logout(app, db){
        app.post('/logout', (req, res) =>{
            
            if(req.session.userID){

                req.session.destroy();
                res.json({
                    success: true,
                })
                return true;
            } else{
                res.json({
                    success: false
                })
                return false;
            }

        });
    }

    isLoggedIn(app, db){
        app.post('/isLoggedIn', (req, res) =>{
            
            if(req.session.userID){
                let cols = [req.session.userID];
                db.query('SELECT * FROM userapp where userApp_id = ? LIMIT 1', cols, (err, data, fields) => {
                    if (data && data.length === 1){
                        res.json({
                            success: true,
                            // the data[0].userApp_username
                            // must be the same name of the table column userapp.
                            userName: data[0].userApp_username
                        })
                        return true;
                    } else {
                        res.json({
                            success:false
                        })
                    }

                });
            } else{
                res.json({
                    success:false
                })
            }   
        
        });
        
    }
    

}

module.exports = Router;