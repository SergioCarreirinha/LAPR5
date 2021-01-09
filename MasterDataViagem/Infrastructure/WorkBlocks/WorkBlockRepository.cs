using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;

namespace MasterDataViagem.Infrastructure.WorkBlocks
{
    public class WorkBlockRepository : BaseRepository<WorkBlock, WorkBlockId>, IWorkBlockRepository
    {
    
        public WorkBlockRepository(MDVDbContext context):base(context.WorkBlocks)
        {
           
        }


    }
}