const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

const powers = [
   { id: 1, name: 'flying' },
   { id: 2, name: 'teleporting' },
   { id: 3, name: 'super strengh' },
   { id: 4, name: 'clairvoyance'},
   { id: 5, name: 'mind reading' }
];

const heroes = [
   {
       id: 1,
       type: 'super-dog',
       displayName: 'The Rex',
       powers: [1, 4],
       img: 'dog.jpg',
       busy: false
   },
   {
       id: 2,
       type: 'super-horse',
       displayName: 'Peter Pan',
       powers: [2, 5],
       img: 'horse.jpg',
       busy: false
   },
   {
       id: 3,
       type: 'super-cat',
       displayName: 'Tom',
       powers: [3, 2],
       img: 'cat.jpg',
       busy: false
   },
   {
       id: 4,
       type: 'super-hamster',
       displayName: 'Jerry',
       powers: [1, 5],
       img: 'hamster.jpg',
       busy: false
   }
];

app.get('/heroes', (req, res) => {
   console.log('Returning heroes list');
   res.send(heroes);
});

app.get('/powers', (req, res) => {
   console.log('Returning powers list');
   res.send(powers);
});

app.post('/hero/**', (req, res) => {
   const heroId = req.params[0];
   const foundHero = heroes.find(subject => subject.id == heroId);

   if (foundHero) {
       for (let attribute in foundHero) {
           if (req.body[attribute]) {
               foundHero[attribute] = req.body[attribute];
               console.log(`Set ${attribute} to ${req.body[attribute]} in hero: ${heroId}`);
           }
       }
    //    res.status(202).header({Location: `http://heroes.thelilcubs.com:${port}/hero/${foundHero.id}`}).send(foundHero);
       res.status(202).header({Location: `http://heroes.thelilcubs.com/hero/${foundHero.id}`}).send(foundHero);
   } else {
       console.log(`Hero not found.`);
       res.status(404).send();
   }
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Heroes service listening on port ${port}`);
app.listen(port);