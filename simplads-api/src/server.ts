import * as fs from 'fs'
import * as https from 'https'
import app from './app'

const PORT = process.env.PORT

const httpsOptions = {
    cert: fs.readFileSync('./certs/azure-vietnam.org.pem'),
    key: fs.readFileSync('./certs/azure-vietnam.org-key.pem'),
}

https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`)
})