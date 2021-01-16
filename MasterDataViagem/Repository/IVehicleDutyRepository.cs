using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.VehicleDuties;
using System.Threading.Tasks;

namespace MasterDataViagem.Repository
{
    public interface IVehicleDutyRepository: IRepository<VehicleDuty, VehicleDutyId>
    {
        Task<bool> verifyVehicleDutyKey(string key);
    }
}