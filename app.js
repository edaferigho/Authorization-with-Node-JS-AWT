const express = require('express')
const jwt = require('jsonwebtoken')
const products = require('./model/Product')


const app = express()


app.get('/', (req, res) => {
    res.send("Tested and running")
})
// Protected Route
// We will add a middleware to the protected route to verify the token recieved from the user
app.get('/products', getToken,verifyToken, (req, res) => {
    res.json({
        products,
        authData:req.authData
   })
})

      
    

// Login route
app.post('/api/login',(req, res)=> {
    let user = {
        id: 1,
        name: "edafe",
        email:"edafem@gmail.com"
    }
    //Signing JWt to produce and send token to the authenticated user
    jwt.sign({ user }, 'edaferigho', {expiresIn: '30s'}, (err, token) => {
        if (err) {
            return
        }
        else {
            res.json({token})
        }
    })


  
})

app.listen(9000, () => {
   console.log('Server is running at 127.0.0.1:9000') 
})

function getToken(req,res,next) {
    //Get the Authorization header from the bearer
    const bearerHeader = req.headers['authorization']
    //Check if the bearer header is valid
    if (typeof bearerHeader !== 'undefined') {
        // We split the Authorization string into an array
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        req.token = token
        next()
    }
    else {
        res.send('invalid')
    }
   
    
}
function verifyToken(req, res, next) {
    const myToken = req.token
    jwt.verify(myToken, 'edaferigho', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        }
        else {
            req.authData = authData
            next()
        }
    })
    
}