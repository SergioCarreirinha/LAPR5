import { IPathPersistence } from '../persistence/interface/IPathPersistence';
import * as mongoose from 'mongoose';
import { PathNode } from '../domain/models/PathNode';

const PathSchema = new mongoose.Schema(
  {
    domainId: {
        type: String,
        unique: true
    },
    key: { 
        type: String, 
        unique: true,
    }, 
    isEmpty: { 
        type: Boolean
    },
    pathNodes: {
        type: Array<PathNode>()
    },
    totalDur: {
        type: Number
    },
    totalDist: {
        type: Number
    },
    
  }
);

export default mongoose.model<IPathPersistence & mongoose.Document>('Path', PathSchema);