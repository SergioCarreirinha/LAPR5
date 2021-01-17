using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.DriverDuties;
using System.Threading.Tasks; 
using System.Collections.Generic;

namespace MasterDataViagem.Repository
{
    public interface IDriverDutyRepository : IRepository<DriverDuty, DriverDutyId>
    {
        Task<bool> getByKey(string key);
        Task<List<DriverDuty>> getAllDriverDuties();
    }
}