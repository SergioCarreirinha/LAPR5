
import { IVehicleTypePersistence } from '../persistence/interface/IVehicleTypePersistence';
import * as mongoose from 'mongoose';

const VehicleTypeSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      unique: true,
      required: true
    },
    fuelType: {
      type: String,
      required: true
    },
    range: {
        type: Number,
        required: true
    },
    costPerKm: {
        type: Number,
        required: true
    },
    avgConsumption: {
        type: Number,
        required: true
    },
    avgSpeed: {
        type: Number,
        required: true
    }
  }
);

export default mongoose.model<IVehicleTypePersistence & mongoose.Document>('VehicleType', VehicleTypeSchema);