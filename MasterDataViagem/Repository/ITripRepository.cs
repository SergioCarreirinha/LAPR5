using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Trip;
using System.Threading.Tasks;

namespace MasterDataViagem.Repository
{
    public interface ITripRepository: IRepository<Tripes, TripId>
    {
        Task<bool> getByKey(string _key);
        Task<Tripes> getTripByKey(string _key);
    }
}