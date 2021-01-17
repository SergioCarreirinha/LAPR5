using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Trip;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace MasterDataViagem.Repository
{
    public interface ITripRepository: IRepository<Tripes, TripId>
    {
        Task<bool> getByKey(string _key);
        Task<Tripes> getTripByKey(string _key);
        Task<List<Tripes>> getAllTrips();
    }
}