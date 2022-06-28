import mongoose from 'mongoose';
import { mongooseConnect, RelationField } from '../db/mongoose.js';

// const connect =
(async () => {
    await mongooseConnect();
})();
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
    passwd: { type: mongoose.SchemaTypes.String, required: true },
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
        delete returnedObject.passwd;
    },
});

export const User = mongoose.model('User', userSchema);
