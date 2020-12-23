using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Infrastructure.Shared;

namespace MasterDataViagem.Infrastructure.WorkBlocks
{
    public class WorkBlockRepository : BaseRepository<WorkBlock, WorkBlockId>, IWorkBlockRepository
    {
    
        public WorkBlockRepository(MDVDbContext context):base(context.WorkBlocks)
        {
           
        }


    }
}