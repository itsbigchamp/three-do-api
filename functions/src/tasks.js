import dbConnect from "./dbConnect.js";

export async function getTasks(req,res) {
    console.log("here")
    const db = dbConnect();
   
    const collection = await db.collection('tasks').get()
    //  .catch(err => res.status(500).send(err));
    console.log("2nd place")
    console.log(collection)
    const tasks = collection.docs.map(doc => {
        let task = doc.data();
        task.id = doc.id;
        return task
    })   
    console.log("collection of tasks",tasks) 
    res.json(tasks);
}

export async function createTask(req,res) {
    const newTask = req.body;
    if (!newTask || !newTask.task) {
        res.status(400).send({ success: false, message: 'Invalid request' })
        return;
    }
    const db = dbConnect();
    await db.collection('tasks').add(newTask)
        .catch(err => res.status(500).send(err));
    res.status(201);
    getTasks(req, res);
}

export async function updateTask(req,res) { 
    const taskUpdate = req.body;
    const { taskId } = req.params;
    const db = dbConnect();
    await db.collection('tasks').doc(taskId).update(taskUpdate)
        .catch(err => res.status(500).send(err));
    res.status(202).send('Task Updated');
    getTasks(req, res);
}

export function deleteTask(req,res) {
    const { taskId } = req.params;
    res.status(203).send('Task Deleted');
}