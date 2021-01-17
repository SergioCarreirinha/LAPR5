using MasterDataViagem.Domain.DriverDuties;
using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Repository;
using MasterDataViagem.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace MasterDataViagem.Infrastructure.DriverDuties
{
    public class DriverDutyRepository : BaseRepository<DriverDuty, DriverDutyId>, IDriverDutyRepository
    {
        private readonly DbSet<DriverDuty> _db;
        private readonly DbSet<WorkBlock> _dbPT;
    
        public DriverDutyRepository(MDVDbContext context):base(context.DriverDuties)
        {
           this._db = context.DriverDuties;
           this._dbPT = context.WorkBlocks;
        }

        public async Task<bool> getByKey(string keyI)
        {
                    
            string query= $"SELECT * FROM [DriverDuties] WHERE [key]='{keyI}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
    
            if(list != null){
                return false;
            }else{
                return true;
            }
        }

        public async Task<List<DriverDuty>> getAllDriverDuties() 
        {
            string query = $"SELECT * FROM [DriverDuties]";

            List<DriverDuty> list = await this._db.FromSqlRaw(query).ToListAsync();

            foreach(DriverDuty driverD in list)
            {
                string query2 = $"SELECT * FROM [WorkBlocks] WHERE [DriverDutyId]='{driverD.Id.AsString()}'";
                List<WorkBlock> listPT = await this._dbPT.FromSqlRaw(query2).ToListAsync();
                driverD.workBlocks = listPT;
            }

            return list;
        }
    }
}