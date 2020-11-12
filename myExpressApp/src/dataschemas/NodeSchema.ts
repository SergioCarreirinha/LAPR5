
import { INodePersistence } from '../persistence/interface/INodePersistence';
import * as mongoose from 'mongoose';

const NodeSchema = new mongoose.Schema(
  {
    domainId: {
        type: String,
         unique: true
    },
    key: { type: String, unique: true, required: true }, 
    name: { type: String, required: true },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    isDepot: {
        type: Boolean,
        required: true
    },
    isReliefPoint: {
        type: Boolean,
        required: true
    },
    capacities: {
        type: Number,
        required: true
    }
  }
);

export default mongoose.model<INodePersistence & mongoose.Document>('Node', NodeSchema);