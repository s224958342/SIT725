var express = require("express")
var app = express()
var port = process.env.port || 3004
const mongoose = require('mongoose');
// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/4_2P_projectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// 2. Define your schema and model
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Add Card', ProjectSchema);

//Adding Form
const ProjectSchema2 = new mongoose.Schema({
    email: String,
    first_name: String,
    last_name: String,
    password: String,
});
const Project2 = mongoose.model('Form Submitted', ProjectSchema2);

// 3. REST API route
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: 'Success' });
});

app.post('/api/form', (req, res) => {
    const newEntry = new Project2(req.body);
    newEntry.save()
        .then(() => {
                res.status(200).json({ message: "Form saved!" });
            })
            .catch(err => {
                res.status(500).json({ message: "Error saving to DB", error: err });
        });
});

// 4. Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
