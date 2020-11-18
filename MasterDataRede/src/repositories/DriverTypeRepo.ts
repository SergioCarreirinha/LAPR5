import { Service, Inject } from 'typedi';
import config from '../config';
import { DriverType } from "../domain/models/DriverType";
import IDriverTypeRepo from './interface/IDriverTypeRepo';
import { IDriverTypePersistence } from '../persistence/interface/IDriverTypePersistence';
import { DriverTypeMap } from '../mappers/DriverTypeMap';
import {Document, Model} from 'mongoose';


@Service()
export default class DriverTypeRepo implements IDriverTypeRepo{
    
    private models: any;

    constructor(
        @Inject('DriverTypeSchema') private DriverTypeSchema : Model<IDriverTypePersistence & Document>
    ){}
    
    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async save(DriverType: DriverType): Promise<DriverType> {
        const query = {domainId: DriverType.id.toString()};
        const document = await this.DriverTypeSchema.findOne(query);
        try{
            if(document === null) {
                const rawDriverType: any = DriverTypeMap.toPersistence(DriverType);
                const DriverTypeCreated = await this.DriverTypeSchema.create(rawDriverType);
                return DriverTypeMap.toDomain(DriverTypeCreated);
            }else{
                document.description = DriverType.description;
                await document.save();
                return DriverType;
            }
        } catch(e){
            throw e;
        }
    }


}