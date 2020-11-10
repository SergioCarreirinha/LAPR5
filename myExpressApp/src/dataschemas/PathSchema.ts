import { IPathPersistence } from '../persistence/interface/IPathPersistence';
import * as mongoose from 'mongoose';
import { PathSegment } from '../domain/models/PathSegment';

const PathSchema = new mongoose.Schema(
  {
    domainId: {
        type: String,
        unique: true
    },
    description: { 
        type: String, 
        unique: true,
    }, 
    isEmpty: { 
        type: Boolean
    },
    totalDur: {
        type: Number
    },
    totalDist: {
        type: Number
    },
    segments: {
        type: Array<PathSegment>()
    }
  }
);

export default mongoose.model<IPathPersistence & mongoose.Document>('Path', PathSchema);