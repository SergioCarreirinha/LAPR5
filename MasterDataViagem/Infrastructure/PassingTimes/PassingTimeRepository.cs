using MasterDataViagem.Domain.PassingTimes;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MasterDataViagem.Infrastructure.PassingTimes
{
    public class PassingTimeRepository : BaseRepository<PassingTime, PassingTimeId>, IPassingTimeRepository
    {
        
        private readonly DbSet<PassingTime> _db;

        public PassingTimeRepository(MDVDbContext context):base(context.PassingTimes)
        {
           this._db = context.PassingTimes;
        }

        public async Task<bool> getByKey(string _key){
            
            string query = $"SELECT * FROM [PassingTimes] WHERE [key]='{_key}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list == null){
                return false;
            }else{
                return true;
            }
        }

        public async Task<string> getIdByKey(string _key){
            
            string query = $"SELECT * FROM [PassingTimes] WHERE [key]='{_key}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list[0].Id == null){
                return null;
            }else{
                return list[0].Id.AsString();
            }
        }

    }
}