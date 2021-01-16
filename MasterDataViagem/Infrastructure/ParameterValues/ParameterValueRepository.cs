using MasterDataViagem.Domain.ParameterValues;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MasterDataViagem.Infrastructure.ParameterValues
{
    public class ParameterValueRepository : BaseRepository<ParameterValue, ParameterValueId>, IParameterValueRepository
    {
        
        private readonly DbSet<ParameterValue> _db;

        public ParameterValueRepository(MDVDbContext context):base(context.ParameterValues)
        {
           this._db = context.ParameterValues;
        }

        public async Task<bool> getByKey(string _key){
            
            string query= $"SELECT [Id] FROM [ParameterValues] WHERE [key]='{_key}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list[0].Id == null){
                return false;
            }else{
                return true;
            }
        }

    }
}