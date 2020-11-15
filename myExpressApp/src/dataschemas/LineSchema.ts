import { ILinePersistence } from '../persistence/interface/ILinePersistence';
import * as mongoose from 'mongoose';
import { DriverType } from '../domain/models/DriverType';
import { VehicleType } from '../domain/models/VehicleType';
import { LinePath } from '../domain/models/LinePath';

const LineSchema = new mongoose.Schema(
  {
    domainId: {
        type: String,
        unique: true
    },
    key: {
        type: String
    },
    name: { 
        type: String, 
        unique: true,
    },
    color: {
        type: String
    },
    linePaths: {
        type: Array<LinePath>()
    },
    allowedVehicles: {
        type: Array<VehicleType>()
    },
    allowedDrivers: {
        type: Array<DriverType>()
    }
  }
);

export default mongoose.model<ILinePersistence & mongoose.Document>('Line', LineSchema);