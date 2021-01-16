using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.DriverDutyTypes;
using System.Threading.Tasks;

namespace MasterDataViagem.Repository
{
    public interface IDriverDutyTypeRepository : IRepository<DriverDutyType, DriverDutyTypeId>
    {
        Task<bool> getByKey(string key);
    }
}