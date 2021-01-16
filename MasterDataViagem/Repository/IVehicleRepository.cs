using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Vehicle;
using System.Threading.Tasks;

namespace MasterDataViagem.Repository
{
    public interface IVehicleRepository: IRepository<Vehicle, VehicleId>
    {

         Task<bool> verifyVehicleByLicensePlate(string licensePlate);

         Task<bool> verifyVehicleByVin(string vin);
    }
}