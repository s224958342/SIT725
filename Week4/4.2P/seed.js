const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/4_2P_projectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Adding Form
const ProjectSchema2 = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  password: String,
});

const Project2 = mongoose.model('Form Submitted', ProjectSchema2);

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model('Add Card', ProjectSchema);

const sampleData = [
  {
    title: "Birthday Cat",
    image: "images/kitten-2.jpg",
    link: "About Birthday Cat",
    description: "Hi! Today is my birthday!"
  },
  {
    title: "Yoga Cat",
    image: "images/kitten-3.jpg",
    link: "About Yoga Cat",
    description: "Look! I can do yoga! HAHA"
  }
];

Project.insertMany(sampleData)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
