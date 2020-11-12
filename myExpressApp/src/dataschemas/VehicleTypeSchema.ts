
import { IVehicleTypePersistence } from '../persistence/interface/IVehicleTypePersistence';
import * as mongoose from 'mongoose';

const VehicleTypeSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    key: { type: String, unique: true,
      required: true
    }, 
    name: { 
      type: String, 
      required: true
    },
    autonomy: {
      type: Number,
      required: true
    },
    cost: {
        type: Number,
        required: true
    },
    averageSpeed: {
        type: Number,
        required: true
    },
    energySource: {
        type: Number,
        required: true
    },
    consumption: {
        type: Number,
        required: true
    },
    emissions: {
        type: Number,
        required: true
    }
  }
);

export default mongoose.model<IVehicleTypePersistence & mongoose.Document>('VehicleType', VehicleTypeSchema);