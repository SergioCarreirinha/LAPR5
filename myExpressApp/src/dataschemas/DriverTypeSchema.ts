import { IDriverTypePersistence } from '../persistence/interface/IDriverTypePersistence';
import * as mongoose from 'mongoose';

const DriverTypeSchema = new mongoose.Schema(
  {
    description: { 
      type: String, 
      unique: true,
      required: true
    }
  }
);

export default mongoose.model<IDriverTypePersistence & mongoose.Document>('DriverType', DriverTypeSchema);