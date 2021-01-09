using MasterDataViagem.Domain.Driver;
using MasterDataViagem.Infrastructure.Shared;

namespace MasterDataViagem.Infrastructure.DriverDuties
{
    public class DriverDutyRepository : BaseRepository<DriverDuty, DriverDutyId>, DriverDutyRepository
    {
    
        public DriverDutyRepository(MDVDbContext context):base(context.Drivers)
        {
           
        }


    }
}