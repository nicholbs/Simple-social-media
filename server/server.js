"use strict";

import express from 'express';
import path from 'path';
const app = express();

const PORT = 8081;

app.listen(PORT, () => {
  console.log('Running...');
})

app.use(express.static(path.resolve() + '/server'));

app.get('/', (req, res) => {
  res.send("Hello world");
  //res.send("./src/empty.js");
})

