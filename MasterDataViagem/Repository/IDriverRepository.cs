using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Driver;

namespace MasterDataViagem.Repository
{
    public interface IDriverRepository: IRepository<Driver, DriverId>
    {
        bool getByLicense(int license);
    }
}