import mongoose from 'mongoose';
import { mongooseConnect, RelationField } from '../db/mongoose.js';

// const connect =
(async () => {
    await mongooseConnect();
})();

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

// create;
// findByIdAndUpdate
// findByIdAndDelete;
