const connectDb = require('./src/config/db.config')
let express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);



app.get('/', (_req, res) => {
    res.json({ ok: true, message: 'NGO ↔ Volunteers API is running' });
});
const auth = require('./src/routes/auth')
app.use("/api/auth", auth)
const ngo = require('./src/routes/ngo')
app.use("/api/ngo", ngo)
const admin = require("./src/routes/admin")
app.use("/api/admin", admin)


connectDb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })