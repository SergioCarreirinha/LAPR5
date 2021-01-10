using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;

namespace MasterDataViagem.Infrastructure.Trips
{
    public class TripRepository : BaseRepository<Tripes, TripId>, ITripRepository
    {
    
        public TripRepository(MDVDbContext context):base(context.Trips)
        {
           
        }


    }
}