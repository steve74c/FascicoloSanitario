const dree = require('dree');
const express = require('express')
const app = express()
const port = 3000





const options = {
  stat: false,
  normalize: true,
  followLinks: true,
  size: true,
  hash: true,
  depth: 5,
  exclude: /dir_to_exclude/
  //extensions: [ 'txt', 'pdf' ]
};


app.get('/', (req, res) => {
	
  res.send('Hello World!')
})


app.get('/list', (req, res) => {
	const tree = dree.scan('D:\\Documenti\\Visite\\Papa\\FascicoloSanitario\\', options);
	res.send(tree)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})