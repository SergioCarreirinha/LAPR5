export interface INodePersistence {
    domainId: string;
    key: string;
    name: string;
    latitude: Number;
    longitude: Number;
    shortName: string;
    isDepot: Boolean;
    isReliefPoint: Boolean;
}