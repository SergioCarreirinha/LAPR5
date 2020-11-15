import {Line} from '../../src/domain/models/Line';
import ILineDTO from '../../src/dto/LineDTO/ILineDTO';
import {expect} from 'chai';

describe('Create a valid Line', () => {

    let line = Line.create({key: "teste", name: "teste", color: "RGB(0,0,0)", linePath: null, allowedVehicles: null, allowedDrivers: null} as ILineDTO);

    it("Key", () => {
        expect(line.getValue().props.key).to.equal("teste");
    });
    it("Name", () => {
        expect(line.getValue().props.name).to.equal("teste");
    });
    it("Color", () => {
        expect(line.getValue().props.color).to.equal("RGB(0,0,0)");
    });
    it("Line Path", () => {
        expect(line.getValue().props.linePath).to.equal(null);
    });
    it("Allowed Drivers", () => {
        expect(line.getValue().props.allowedDrivers).to.equal(null);
    });
    it("Allowed Vehicles", () => {
        expect(line.getValue().props.allowedVehicles).to.equal(null);
    });
});

describe('Create a invalid Line', () => {

    let line = Line.create({key: "", name: "", color: "RGB(0,0,0)", linePath: null, allowedVehicles: null, allowedDrivers: null} as ILineDTO);

    it("ensure all Parameters are well formed", () => {
        expect(line.error).to.equal("Make sure that name and key are not null");
    });
});

/*describe('Create a valid Line with args', () => {
    let node1 = Node.create({key: "123134", name: "Valavadores", latitude: 46.254, longitude: 50.1204, shortName: "LAVDRS", isDepot: "true",isReliefPoint: "true",capacities: 30 } as INodeDTO);
    let node2 = Node.create({key: "123", name: "Vals", latitude: 46.254, longitude: 50.1204, shortName: "VALDS", isDepot: "true",isReliefPoint: "true",capacities: 30 } as INodeDTO);
    let node3 = Node.create({key: "134", name: "Vadores", latitude: 46.254, longitude: 50.1204, shortName: "VDRS", isDepot: "true",isReliefPoint: "true",capacities: 30 } as INodeDTO);
    let pathSegment1 = PathSegment.create(6,9,node1.getValue(), node2.getValue(),1);
    let pathSegment2 = PathSegment.create(6,9,node2.getValue(), node3.getValue(),2);
    let pathSegments = new Array<PathSegment>();
    pathSegments.push(pathSegment1.getValue(),pathSegment2.getValue());
    let goPath = Path.create({line: "teste", toGo: true, description: "Teste", isEmpty: false, segments: pathSegments} as ILinePathsDTO);
    let returnPath = Path.create({line: "teste2", toGo: false, description: "Teste2", isEmpty: false, segments: pathSegments.reverse()} as ILinePathsDTO);
    let endNodes = Array<Node>();
    endNodes.push(node1.getValue(), node3.getValue());
    let allowedDrivers = Array<DriverType>();
    let allowedVehicles = Array<VehicleType>();
    let vehicle = VehicleType.create({key: "teste", name: "teste", autonomy: 500000, cost: 10, averageSpeed: 10, energySource: 5, consumption: 10, emissions: 10} as IVehicleTypeDTO);
    let driver = DriverType.create({description: "teste"} as IDriverTypeDTO);
    allowedDrivers.push(driver.getValue());
    allowedVehicles.push(vehicle.getValue());
    let line = Line.create({name: "teste", code:"teste", goPath: goPath.getValue(), returnPath: returnPath.getValue(), emptyPaths: null, endNodes: endNodes, allowedDrivers: allowedDrivers, allowedVehicles: allowedVehicles} as ILineDTO);

    it("ensure all Parameters are well formed", () => {
        expect(line.getValue().props.goPath).to.equal(goPath.getValue());
    });
    it("ensure all Parameters are well formed", () => {
        expect(line.getValue().props.returnPath).to.equal(returnPath.getValue());
    });
    it("ensure all Parameters are well formed", () => {
        expect(line.getValue().props.emptyPaths).to.equal(null);
    });
    it("ensure all Parameters are well formed", () => {
        expect(line.getValue().props.endNodes).to.equal(endNodes);
    });
    it("ensure all Parameters are well formed", () => {
        expect(line.getValue().props.allowedDrivers).to.equal(allowedDrivers);
    });
    it("ensure all Parameters are well formed", () => {
        expect(line.getValue().props.allowedVehicles).to.equal(allowedVehicles);
    });
});*/
