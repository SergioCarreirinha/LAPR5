using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.PassingTimes;

namespace MasterDataViagem.Repository
{
    public interface IPassingTimeRepository: IRepository<PassingTime, PassingTimeId>
    {
    }
}