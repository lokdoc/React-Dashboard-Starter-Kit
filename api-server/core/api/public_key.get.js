const fs = require("fs")

module.exports = 
{
    run (req, res) 
    {
        let key = fs.readFileSync(__dirname + "/../../public.key")
        res.status(200).end(key)
    }
}

