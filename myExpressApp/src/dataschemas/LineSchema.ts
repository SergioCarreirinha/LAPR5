import { ILinePersistence } from '../persistence/interface/ILinePersistence';
import * as mongoose from 'mongoose';
import { Path } from '../domain/models/Path';
import { Node } from '../domain/models/Node';
import { DriverType } from '../domain/models/DriverType';
import { VehicleType } from '../domain/models/VehicleType';

const LineSchema = new mongoose.Schema(
  {
    domainId: {
        type: String,
        unique: true
    },
    name: { 
        type: String, 
        unique: true,
    }, 
    code: { 
        type: String
    },
    goPath: {
        type: Path
    },
    returnPath: {
        type: Path
    },
    emptyPaths: {
        type: Array<Path>()
    },
    endNodes: {
        type: Array<Node>()
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