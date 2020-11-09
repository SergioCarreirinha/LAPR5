import { IDriverTypePersistence } from '../persistence/interface/IDriverTypePersistence';
import * as mongoose from 'mongoose';

const DriverTypeSchema = new mongoose.Schema(
  {
    domainId: {type: String, unique: true},
    description: { type: String, unique: true}
  }
);

export default mongoose.model<IDriverTypePersistence & mongoose.Document>('DriverType', DriverTypeSchema);