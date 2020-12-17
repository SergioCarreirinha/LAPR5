using MasterDataViagem.Domain.Shared;

namespace MasterDataViagem.Domain.Vehicle
{
    public interface IVehicleRepository: IRepository<Vehicle, VehicleId>
    {
    }
}