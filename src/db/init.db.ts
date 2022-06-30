// import { iTask, Task } from '../models/task.model.js';
import { iTask, Task } from '../models/task.model.js';
import { iUser, User } from '../models/user.model.js';
import { encrypt } from '../services/authorization.js';
import { mongooseConnect } from './mongoose.js';

let aUsers: Array<iUser> = [
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
    aUsers = await Promise.all(
        aUsers.map(async (item) => ({
            ...item,
            passwd: await encrypt(item.passwd),
        }))
    );
    const users = await User.insertMany(aUsers);
    aTasks[0].responsible = users[0].id;
    aTasks[1].responsible = users[1].id;
    const tasks = await Task.insertMany(aTasks);

    let finalUsers = [];
    for (let i = 0; i < users.length; i++) {
        const item = users[i];
        finalUsers[i] = await User.findByIdAndUpdate(
            item.id,
            {
                $set: { tasks: [tasks[i].id] },
            },
            // { ...item, tasks: [tasks[i].id] },
            { new: true }
        );
    }

    connect.disconnect();
    return {
        tasks,
        users: finalUsers,
    };
};
