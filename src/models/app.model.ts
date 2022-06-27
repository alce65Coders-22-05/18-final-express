import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
export interface iAppModel<T> extends mongoose.Model<mongoose.Schema> {
    appFind: Function;
    appFindById: Function;
}
