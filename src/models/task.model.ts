import mongoose from 'mongoose';
import { mongooseConnect, RelationField } from '../db/mongoose.js';
import { iAppModel } from './app.model.js';

// const connect =
await mongooseConnect();
// connect.disconnect()

/* eslint-disable no-unused-vars */
export interface iTask {
    id: string;
    title: string;
    responsible: RelationField;
    isCompleted: boolean;
}

const taskSchema = new mongoose.Schema({
    title: { type: mongoose.SchemaTypes.String, required: true },
    responsible: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    isCompleted: { type: mongoose.SchemaTypes.Boolean, default: false },
});

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});

export const Task = mongoose.model('Task', taskSchema);

(Task as unknown as iAppModel<mongoose.Schema>).appFind = () => {
    return Task.find().populate('responsible', {
        tasks: 0,
    });
};

(Task as unknown as iAppModel<mongoose.Schema>).appFindById = (id: string) => {
    Task.findById({ id });
};

// create;
// findByIdAndUpdate
// findByIdAndDelete;
