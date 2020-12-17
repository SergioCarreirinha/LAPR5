using MasterDataViagem.Domain.Driver;
using MasterDataViagem.Infrastructure.Shared;

namespace MasterDataViagem.Infrastructure.Drivers
{
    public class DriverRepository : BaseRepository<Driver, DriverId>, IDriverRepository
    {
    
        public DriverRepository(MDVDbContext context):base(context.Drivers)
        {
           
        }


    }
}