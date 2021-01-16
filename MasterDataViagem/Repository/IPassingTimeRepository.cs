using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.PassingTimes;
using System.Threading.Tasks;

namespace MasterDataViagem.Repository
{
    public interface IPassingTimeRepository: IRepository<PassingTime, PassingTimeId>
    {
        Task<bool> getByKey(string _key);
        Task<string> getIdByKey(string _key);
    }
}