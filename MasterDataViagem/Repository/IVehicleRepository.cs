using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Vehicle;

namespace MasterDataViagem.Repository
{
    public interface IVehicleRepository: IRepository<Vehicle, VehicleId>
    {

         bool verifyVehicleByLicensePlate(string licensePlate);

         bool verifyVehicleByVin(string vin);
    }
}