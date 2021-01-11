using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.WorkBlocks;

namespace MasterDataViagem.Repository
{
    public interface IWorkBlockRepository : IRepository<WorkBlock, WorkBlockId>
    {
        bool getByKey(string _key);
    }
}