using MasterDataViagem.Domain.DriverDuties;
using MasterDataViagem.Repository;
using MasterDataViagem.Infrastructure.Shared;

namespace MasterDataViagem.Infrastructure.DriverDuties
{
    public class DriverDutyRepository : BaseRepository<DriverDuty, DriverDutyId>, IDriverDutyRepository
    {
    
        public DriverDutyRepository(MDVDbContext context):base(context.DriverDuties)
        {
           
        }


    }
}