using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.VehicleDuties;

namespace MasterDataViagem.Repository
{
    public interface IVehicleDutyRepository: IRepository<VehicleDuty, VehicleDutyId>
    {
        bool verifyVehicleDutyKey(string key);
    }
}