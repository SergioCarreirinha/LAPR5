
import { INodePersistence } from '../persistence/interface/INodePersistence';
import * as mongoose from 'mongoose';

const NodeSchema = new mongoose.Schema(
  {
    domainId: {
        type: String,
         unique: true
    },
    key: {
         type: String, unique: true,
          required: true 
    }, 
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
        type: String,
        required: true
    },
    isReliefPoint: {
        type: String,
        required: true
    },
    capacities: {
        type: Number,
    }
  }
);

export default mongoose.model<INodePersistence & mongoose.Document>('Node', NodeSchema);