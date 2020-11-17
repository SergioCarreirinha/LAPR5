import { IDriverTypePersistence } from '../persistence/interface/IDriverTypePersistence';
import * as mongoose from 'mongoose';
import { DriverType } from '../domain/models/DriverType';

const DriverSchema = new mongoose.Schema(
  {
    domainId: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    birthdate: {
        type: Date
    },
    driverLicenseNum: {
        type: Number,
        unique: true
    },
    licenseExpiration: {
        type: Date
    },
    driverTypes: {
        type: Array<DriverType>(),
        unique: true
    }
  }
);

export default mongoose.model<IDriverTypePersistence & mongoose.Document>('Driver', DriverSchema);