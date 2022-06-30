require('dotenv').config()
require('./db')
const User = require('./models/User')
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()

app.use(fileUpload({
    createParentPath: true
}))

const public = path.join(__dirname, './public')

app.use(express.static(public))

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('home')
})

app.post('/single', async (req, res)=>{
    try {
        const { username } = req.body

        const file = req.files.image
        console.log(file);
        const fileName = new Date().getTime().toString() + path.extname(file.name)
        const savePath = path.join(__dirname, 'public' , 'uploads', fileName)
        await file.mv(savePath)
        res.redirect('/result')

        const data = new User({
            username, image: fileName
        })
        await data.save()
    } catch (error) {
        console.log(error);
    }
})

app.get('/result', async (req, res)=>{
    const data = await User.find({})
    res.render('result', {data: data})
})

app.listen(3000, ()=>{
    console.log(`Sever is listening on port:3000`);
})