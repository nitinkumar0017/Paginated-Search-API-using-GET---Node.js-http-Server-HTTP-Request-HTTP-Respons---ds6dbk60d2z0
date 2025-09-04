const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Already loaded the database (It's now a direct array)
const allArticles = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

app.get('/search', (req, res) => {


 // TODO: Implement the search and pagination logic here
  const {name,limit=5,page =1} = req.query;
  const sanitizedPage = Number(page)
  if(!name){
    return res.status(400).json({"error": "Search name parameter is required."})
  }
  const response = allArticles.filter((item)=> item.title.toLowerCase().includes(name.toLocaleLowerCase()))

  const endingIdx = (sanitizedPage*limit)-1
  const startingIdx = endingIdx - (limit-1);
  const  filterResponse = response.filter((_,idx)=> idx>=startingIdx && idx<=endingIdx)

  return res.status(200).json({
    "currentPage": sanitizedPage,
    "totalPages": Math.ceil(response.length /limit),
    "totalResults": response.length,
    "articles": filterResponse
  })
});


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  module.exports = {app}
