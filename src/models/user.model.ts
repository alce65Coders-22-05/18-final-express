import mongoose from 'mongoose';
import { mongooseConnect, RelationField } from '../db/mongoose.js';
import { iAppModel } from './app.model.js';

// const connect =
await mongooseConnect();
// connect.disconnect()

/* eslint-disable no-unused-vars */
export interface iUser {
    id: string;
    name: string;
    email: string;
    tasks: Array<RelationField>;
}

const userSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    email: mongoose.SchemaTypes.String,
    tasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Task',
        },
    ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});

export const User = mongoose.model('User', userSchema);

(User as unknown as iAppModel<mongoose.Schema>).appFind = () => {
    return User.find().populate('tasks', {
        responsible: 0,
    });
};

(User as unknown as iAppModel<mongoose.Schema>).appFindById = (id: string) => {
    User.findById({ id });
};
