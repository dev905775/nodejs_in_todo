// link :- https://pprathameshmore.medium.com/build-rest-apis-for-the-to-do-app-using-nodejs-mongodb-40e8325ab956

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const UserAPI = require('./api/user');

const port = process.env.PORT || 3000

const userRoute = require('./api/route/user.js');

require('dotenv').config({ path: './config.env' });


// bring in mongoose
const mongoose = require('mongoose');

// connect to mongoose
const URI = process.env.todolist;
mongoose.connect(URI, {
    // useNewUriParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to MongoDB !")
})



// mongoose.connect('DB_URL', { dbName: 'todo' }, (err) => {
//     if (!err) {
//         console.log('Connected to database');
//     } else {
//         console.log(err);
//     }
// });



// // Set Views
// app.set('views', './views')
// app.set('view engine', 'ejs')

// app.get('/', (req, res) => {
//     res.render('index', { text: ' This is index.js '})
// });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



// app.use('/userapi', UserAPI);


app.use('/user', userRoute);



const ToDoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: String,
    createAt: { type: Date, default: Date.now() }
});

const toDo = mongoose.model('ToDo', ToDoSchema);

//Create To-Do
app.post('/', (req, res) => {

    const { title, description, createdBy } = req.body;

    var toDoAdd = new toDo({
        title: title,
        description: description,
        createdBy: createdBy
    });

    // toDoAdd.save((err, todo) => {
    toDoAdd.save((err, todolist) => {
        if (err) {
            res.status(500).json({
                // err                  // change

                success: 'false',
                message: 'To-Do has been not created',
                data: err.message                
            });
        } else {
            res.status(201).json({
                // message: 'To-Do has been created', // change
                // // todo
                // todolist

                success: 'true',
                message: 'To-Do has been created',
                // todo
                data: todolist
            });
        }
    });
});

//View To-Do
// app.get('todos/', (req, res) => {
app.get('/', (req, res) => {
    toDo.find({}, (err, toDos) => {
        if (err) {
            res.status(500).json({
                // err
                success: 'false',
                message: 'All ToDos not show',
                data: err.message
            });
        } else {
            res.status(200).json({
                // message: 'All ToDos',
                // toDos
                    
                success: 'true',
                message: 'All ToDos',
                data: toDos                
            });
        }
    });
});

//View Single To-Do
// app.get('todos/:todo_id', (req, res) => {
app.get('/:todo_id', (req, res) => {

    const { todo_id } = req.params;

    toDo.findById(todo_id, (err, toDo) => {
        if (err) {
            res.status(500).json({
                // err
                success: 'false',
                message: 'To-Do not show',
                data: err.message                 
            });
        } else {
            res.status(200).json({
                // message: 'To-Do',
                // toDo

                success: 'true',
                message: 'To-Do',
                data: toDo                
            });
        }
    });
});

//Update Single To-Do
// app.patch('todos/:todo_id', (req, res) => {
app.patch('/:todo_id', (req, res) => {

    const { todo_id } = req.params;

    const { title, description, createdBy } = req.body;

    toDo.findByIdAndUpdate(todo_id, {
        title: title,
        description: description,
        createdBy: createdBy
    }, (err, toDo) => {
        if (err) {
            res.status(500).json({
                // err
                success: 'false',
                message: 'To-Do not updated',
                data: err.message 
            });
        } else {
            res.status(200).json({
                // message: 'To-Do updated',
                // toDo

                success: 'true',
                message: 'To-Do updated',
                data: toDo 
            });
        }
    });
});

//Remove Single To-Do
// app.delete('todos/:todo_id', (req, res) => {
app.delete('/:todo_id', (req, res) => {
    
    const { todo_id } = req.params;

    toDo.findByIdAndDelete(todo_id, (err, toDo) => {
        // console.log("todo_id 1 :- ", todo_id);
        // console.log(`todo_id 3 :- ${toDo._id}`);
        // console.log(`todo_id 4 :- ${toDo}`);
        if (!toDo) {
            res.status(500).json({
                success: 'false',
                message: 'To-Do do not removed !',
                data: toDo
            });            
        }else{
            if (err) {
                res.status(500).json({
                    // err
                    success: 'false',
                    message: 'To-Do do not removed',
                    data: err.message
                });
            } else {
                res.status(200).json({
                    // message: 'To-Do has been removed',
                    // toDo
                    success: 'true',
                    message: 'To-Do has been removed',
                    data: toDo
                });
            }

        }
        
    });
});

//Remove all To-Do
// app.delete('todos/', (req, res) => {
app.delete('/', (req, res) => {

    toDo.remove({}, (err, toDo) => {
        if (err) {
            res.status(500).json({
                // err
                success: 'false',
                message: 'All To-Do do not removed',
                data: toDo
            });
        } else {
            res.status(200).json({
                // message: 'All To-Do has been removed',
                // toDo
                success: 'true',
                message: 'All To-Do has been removed',
                data: toDo
            });
        }
    });
});






// Community Start ...



const CommunitySchema = new mongoose.Schema({
    title: String,
    description: String,
    // admin: String,
    add: Array,
    createAt: { type: Date, default: Date.now() }
});

const commu = mongoose.model('Commu', CommunitySchema);

//Create To-Do
app.post('/community', (req, res) => {

    const { title, description, admin, add } = req.body;

    var toDoAdd = new commu({
        title: title,
        description: description,
        // admin: admin,
        add: add
    });

    // toDoAdd.save((err, todo) => {
    toDoAdd.save((err, todolist) => {
        if (err) {
            res.status(500).json({
                // err                  // change

                success: 'false',
                message: 'community has been not created',
                data: err.message                
            });
        } else {
            res.status(201).json({
                // message: 'To-Do has been created', // change
                // // todo
                // todolist

                success: 'true',
                message: 'community has been created',
                // todo
                data: todolist
            });
        }
    });
});


//View Community
// app.get('todos/', (req, res) => {
app.get('/community/:commu_id', (req, res) => {
    commu.find({}, (err, commu) => {
        if (err) {
            res.status(500).json({
                // err
                success: 'false',
                message: 'All Community not show',
                data: err.message
            });
        } else {
            res.status(200).json({
                // message: 'All ToDos',
                // toDos
                    
                success: 'true',
                message: 'All Community',
                data: commu
            });
        }
    });
});



//Remove Single Community
// app.delete('todos/:todo_id', (req, res) => {
app.delete('/community/:commu_id', (req, res) => {

    const { commu_id } = req.params;

    commu.findByIdAndDelete(commu_id, (err, commu) => {
        // console.log(`commu :- ${commu}`);
        if (!commu) {
            res.status(500).json({
                success: 'false',
                message: 'Community do not removed !',
                data: commu
            });            
        } else {
            if (err) {
                res.status(500).json({
                    // err
                    success: 'false',
                    message: 'Community do not removed',
                    data: err.message
                });
            } else {
                res.status(200).json({
                    // message: 'To-Do has been removed',
                    // toDo
                    success: 'true',
                    message: 'Community has been removed',
                    data: commu
                });
            }            
        }        
    });
});






// End Community ...



// Start, multiple invitation  ....


const multipleSchema = new mongoose.Schema({
    // title: String,
    // add: Array,
    sender: Array,
    receiver: Array,
    createAt: { type: Date, default: Date.now() }
});
console.log("email");
const multi = mongoose.model('Multi', multipleSchema);
//Create To-Do
app.post('/email', (req, res) => {
    
    console.log("email, sd");
    // const { title, description, createdBy } = req.body;
    const { sender, receiver } = req.body;

    var toDoAdd = new multi({
        // title: title,
        // description: description,
        // createdBy: createdBy,
        sender:sender,
        receiver:receiver,
    });
    console.log("dd dsd sd")
    // const arrayUsersMail = ['dev905775@gmail.com', 'dev905775@gmail.com', 'dev905775@gmail.com', 'dev905775@gmail.com' ]
    const arrayUsersMail = [receiver]
    const stringUsersMail = arrayUsersMail.join(', ')
    nodemailerMailgun.sendMail({
    from: 'dev905775@gmail.com',
    to: stringUsersMail,
    subject: 'Event Invitation',
    // html: renderToString(<InvitationEmail from="dev905775@gmail.com" to="WHAT HERE" eventId={eventId} />)
    // html: renderToString(<InvitationEmail from="dev905775@gmail.com" to="WHAT HERE" eventId={eventId} />)
    })

    // toDoAdd.save((err, todo) => {
    toDoAdd.save((err, todolist) => {
        if (err) {
            res.status(500).json({
                // err                  // me change

                success: 'false',
                message: 'To-Do has been not created',
                data: err.message                
            });
        } else {
            res.status(201).json({
                // message: 'To-Do has been created', // me change
                // // todo
                // todolist

                success: 'true',
                message: 'To-Do has been created',
                // todo
                data: todolist
            });
        }
    });
});





// End, multiple invitation  ....





app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});