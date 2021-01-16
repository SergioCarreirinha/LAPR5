using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.DriverDutyTypes;

namespace MasterDataViagem.Repository
{
    public interface IDriverDutyTypeRepository : IRepository<DriverDutyType, DriverDutyTypeId>
    {
        bool getByKey(string key);
    }
}