using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.DriverDuties;

namespace MasterDataViagem.Repository
{
    public interface IDriverDutyRepository : IRepository<DriverDuty, DriverDutyId>
    {
        bool getByKey(string key);
    }
}