using MasterDataViagem.Domain.Shared;

namespace MasterDataViagem.Domain.Trip
{
    public interface ITripRepository: IRepository<Trip, TripId>
    {
    }
}