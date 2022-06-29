import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function mongooseConnect() {
    const url =
        process.env.NODE_ENV?.toLowerCase() === 'test'
            ? process.env.URL_MONGO_TEST
            : process.env.URL_MONGO;
    console.log({ url });

    return mongoose.connect(url as string);
}

export interface RelationField {
    type: mongoose.Types.ObjectId;
    ref: string;
}
