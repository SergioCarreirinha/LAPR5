using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.WorkBlocks;
using System.Threading.Tasks;

namespace MasterDataViagem.Repository
{
    public interface IWorkBlockRepository : IRepository<WorkBlock, WorkBlockId>
    {
        Task<bool> getByKey(string _key);
        Task<WorkBlock> getWbByKey(string _key);
    }
}