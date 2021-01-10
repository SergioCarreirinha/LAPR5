using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Trip;

namespace MasterDataViagem.Repository
{
    public interface ITripRepository: IRepository<Tripes, TripId>
    {
    }
}