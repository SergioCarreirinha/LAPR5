using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Driver;
using System.Threading.Tasks;

namespace MasterDataViagem.Repository
{
    public interface IDriverRepository: IRepository<Driver, DriverId>
    {
        Task<bool> getByLicense(int license);
    }
}