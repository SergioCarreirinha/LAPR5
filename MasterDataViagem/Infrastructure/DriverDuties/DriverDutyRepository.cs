using MasterDataViagem.Domain.DriverDuties;
using MasterDataViagem.Repository;
using MasterDataViagem.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MasterDataViagem.Infrastructure.DriverDuties
{
    public class DriverDutyRepository : BaseRepository<DriverDuty, DriverDutyId>, IDriverDutyRepository
    {
        private readonly DbSet<DriverDuty> _db;
    
        public DriverDutyRepository(MDVDbContext context):base(context.DriverDuties)
        {
           this._db = context.DriverDuties;
        }

        public async Task<bool> getByKey(string keyI)
        {
                    
            string query= "SELECT [Id] FROM [DriverDuties] WHERE [key]='{keyI}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
    
            if(list[0].Id == null){
                return false;
            }else{
                return true;
            }
        }
    }
}