using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.DriverDuties;
using System.Threading.Tasks; 

namespace MasterDataViagem.Repository
{
    public interface IDriverDutyRepository : IRepository<DriverDuty, DriverDutyId>
    {
        Task<bool> getByKey(string key);
    }
}