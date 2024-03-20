const exprss = require('express');
const dbConnection = require("./dataBase/dbConnection")
const cors = require('cors')


const port = 8086
const app = exprss();

app.use(exprss.json())
app.use(cors())


app.use("/result",require("./router/resultRouter"))
app.use("/question",require("./router/questionRouter"))







app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log(`http://localhost:${port}`)
    dbConnection()

})





