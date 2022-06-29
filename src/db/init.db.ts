// import { iTask, Task } from '../models/task.model.js';
import { iTask, Task } from '../models/task.model.js';
import { iUser, User } from '../models/user.model.js';
import { encrypt } from '../services/authorization.js';
import { mongooseConnect } from './mongoose.js';

const aUsers: Array<iUser> = [
    {
        name: 'Pepe',
        passwd: '1234',
        email: 'pepe@sample.com',
        tasks: [],
    },
    {
        name: 'Luisa',
        passwd: '1234',
        email: 'luisa@acme.com',
        tasks: [],
    },
];

const aTasks: Array<iTask> = [
    { title: 'Tarea 1', responsible: null, isCompleted: false },
    { title: 'Tarea 2', responsible: null, isCompleted: false },
];

export const initDB = async () => {
    const connect = await mongooseConnect();
    aUsers.map(async (item) => ({ item, passwd: await encrypt(item.passwd) }));
    const users = await User.insertMany(aUsers);
    aTasks[0].responsible = users[0].id;
    aTasks[1].responsible = users[1].id;
    const tasks = await Task.insertMany(aTasks);
    console.log(tasks);
    const u1 = await User.findByIdAndUpdate(
        users[0].id,
        {
            $set: { tasks: [tasks[0].id] },
        },
        { new: true }
    );
    const u2 = await User.findByIdAndUpdate(
        users[1].id,
        {
            $set: { tasks: [tasks[1].id] },
        },
        { new: true }
    );
    console.log(u1, u2);

    connect.disconnect();
};
