using MasterDataViagem.Domain.Driver;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;

namespace MasterDataViagem.Infrastructure.Drivers
{
    public class DriverRepository : BaseRepository<Driver, DriverId>, IDriverRepository
    {
    
        public DriverRepository(MDVDbContext context):base(context.Drivers)
        {
           
        }

        public GetDriverByLicense(int license):base(boolean){
            
        }


    }
}