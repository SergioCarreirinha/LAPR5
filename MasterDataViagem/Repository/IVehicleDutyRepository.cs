using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.VehicleDuties;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MasterDataViagem.Repository
{
    public interface IVehicleDutyRepository: IRepository<VehicleDuty, VehicleDutyId>
    {
        Task<bool> verifyVehicleDutyKey(string key);

        Task<List<VehicleDuty>> getAllVehicleDuty();
    }
}