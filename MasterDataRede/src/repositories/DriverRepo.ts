import { Service, Inject } from 'typedi';
import config from '../config';
import { Driver } from "../domain/models/Driver";
import IDriverRepo from './interface/IDriverRepo';
import { IDriverPersistence } from '../persistence/interface/IDriverPersistence';
import { DriverMap } from '../mappers/DriverMap';
import {Document, Model} from 'mongoose';


@Service()
export default class DriverRepo implements IDriverRepo{
    
    private models: any;

    constructor(
        @Inject('DriverSchema') private DriverSchema : Model<IDriverPersistence & Document>
    ){}
    
    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async save(driver: Driver): Promise<Driver> {
        const query = {domainId: driver.id.toString()};
        const document = await this.DriverSchema.findOne(query);
        try{
            if(document === null) {
                const rawDriver: any = DriverMap.toPersistence(driver);
                const DriverCreated = await this.DriverSchema.create(rawDriver);
                return DriverMap.toDomain(DriverCreated);
            }else{
                document.name = driver.name;
                document.birthdate = driver.birthdate;
                document.driverLicenseNum = driver.driverLicenseNum;
                document.licenseExpiration = driver.licenseExpiration;
                document.driverTypes = driver.driverTypes;
                await document.save();
                return driver;
            }
        } catch(e){
            throw e;
        }
    }


}