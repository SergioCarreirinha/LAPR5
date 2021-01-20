using MasterDataViagem.Domain.DriverDutyTypes;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MasterDataViagem.Infrastructure.DriverDutyTypes
{
    public class DriverDutyTypeRepository : BaseRepository<DriverDutyType, DriverDutyTypeId>, IDriverDutyTypeRepository
    {
        
        private readonly DbSet<DriverDutyType> _db;

        public DriverDutyTypeRepository(MDVDbContext context):base(context.DriverDutyTypes)
        {
           this._db = context.DriverDutyTypes;
        }

        public async Task<bool> getByKey(string _key){
            
            string query= $"SELECT * FROM [DriverDutyTypes] WHERE [key]='{_key}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list.Count == 0){
                return false;
            }else{
                return true;
            }
        }

    }
}