using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MasterDataViagem.Infrastructure.WorkBlocks
{
    public class WorkBlockRepository : BaseRepository<WorkBlock, WorkBlockId>, IWorkBlockRepository
    {

        private readonly DbSet<WorkBlock> _db;
    
        public WorkBlockRepository(MDVDbContext context):base(context.WorkBlocks)
        {
           this._db = context.WorkBlocks;
        }

        public async Task<bool> getByKey(string _key){
            
            string query= $"SELECT * FROM [WorkBlocks] WHERE [key]='{_key}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list == null){
                return false;
            }else{
                return true;
            }
        }

        public async Task<WorkBlock> getWbByKey(string _key){
            
            string query= $"SELECT * FROM [WorkBlocks] WHERE [key]='{_key}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list[0] == null){
                return null;
            }else{
                return list[0];
            }
        }

    }
}