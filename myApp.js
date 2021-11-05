require('dotenv').config();
const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URI);

const Schema  = mongoose.Schema;

const personSchema = new Schema({
  name : {type:String, required:true},
  age : Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person',personSchema);

const createAndSavePerson = (done) => {
  const mohitChugh = new Person({name:"Mohit Chugh",age:25,favoriteFoods:['abcd','efgh','pqrs','wxyz']});
  mohitChugh.save(function(err,data){
    if(err){
      return console.error(err);
    }
    done(null,data);
  });
};

const arrayOfPeople = [{name:"ABCD",age:10,favoriteFoods:["q","wqe","kzJNC"]},{name:"qwerty",age:20,favoriteFoods:["ghj","kli","tre"]},{name:"zxcv",age:30,favoriteFoods:["plm","qaz","uiop"]}];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err,people){
    if(err){
      return console.error(err);
    }
    done(null,people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},function(err,personFound){
    if(err){
      return console.error(err);
    }
    done(null,personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},function(err,data){
    if(err){
      return console.error(err);
    }
    done(null,data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},function(err,data){
    if(err){
      return console.error(err);
    }
    done(null,data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId}, function(err,data){
    if(err){
      return console.error(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err,updatedData){
      if(err){
        return console.error(err);
      }
      done(null,updatedData);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},function(err,updated){
    if(err){
      return console.error(err);
    }
    done(null,updated);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err,removed){
    if(err){
      console.error(err);
    }
    done(null,removed);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove,function(err,removed){
    if(err){
      return console.error(err);
    }
    done(null,removed);
  }});
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});