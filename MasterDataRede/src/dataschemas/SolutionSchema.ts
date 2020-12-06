import { ISolutionPersistence } from '../persistence/interface/ISolutionPersistence';
import * as mongoose from 'mongoose';

const SolutionSchema = new mongoose.Schema(
  {
    domainId: {
        type: String,
        unique: true
    },
    source: { 
        type: String,
    }, 
    destination: { 
        type: String
    },
    path: {
        type: Array<String>()
    },
    startTime: {
        type: String
    },
    arriveTime: {
        type: String
    },
    
  }
);

export default mongoose.model<ISolutionPersistence & mongoose.Document>('Solution', SolutionSchema);