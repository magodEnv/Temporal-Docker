import{
    getLogin_,
    updateLogin_
} from "../persintence/repository/login.repository.js";

export async function getLogin(req, res){  
    getLogin_().then(data => {
        res.status(200).json({status : true, data : data})
      }, error => {
        res.status(400).json({status : false, error : error.message })
      })
}

export async function updateLogin(req, res){
    const { id } = req.params;
    const { username, password, email } = req.body;
    const login = {
        id,
        username,
        password,
        email,
    };
    updateLogin_(login).then(
        (msg) => {
          res.status(200).json({ status: true, msg: msg });
        }, (error) => {
          res.status(400).json({ status: false, error: error.message });
        }
      );
}