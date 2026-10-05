const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://guilhermegomesvaz_db_user:${password}@ac-6cfiwyv-shard-00-00.4tqstwt.mongodb.net:27017,ac-6cfiwyv-shard-00-01.4tqstwt.mongodb.net:27017,ac-6cfiwyv-shard-00-02.4tqstwt.mongodb.net:27017/Phonebook?ssl=true&replicaSet=atlas-gvmmu3-shard-0&authSource=admin&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
}
