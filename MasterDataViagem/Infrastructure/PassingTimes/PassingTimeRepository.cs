using MasterDataViagem.Domain.PassingTimes;
using MasterDataViagem.Infrastructure.Shared;

namespace MasterDataViagem.Infrastructure.PassingTimes
{
    public class PassingTimeRepository : BaseRepository<PassingTime, PassingTimeId>, IPassingTimeRepository
    {
    
        public PassingTimeRepository(MDVDbContext context):base(context.PassingTimes)
        {
           
        }


    }
}