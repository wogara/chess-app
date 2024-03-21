const express = require('express');
const path = require('path');
const app = express();

app.get('/',function(req,res){
  res.send('hey');
})

app.listen(process.env.PORT || 3000, function(){
  console.log("app listening on port 3000");
});
