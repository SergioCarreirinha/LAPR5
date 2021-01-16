using MasterDataViagem.Domain.VehicleDuties;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;


namespace MasterDataViagem.Infrastructure.VehicleDuties
{
    public class VehicleDutyRepository : BaseRepository<VehicleDuty, VehicleDutyId>, IVehicleDutyRepository
    {
        private readonly DbSet<VehicleDuty> _db;
    
        public VehicleDutyRepository(MDVDbContext context):base(context.VehicleDuties)
        {
           this._db = context.VehicleDuties;
        }

        public async Task<bool> verifyVehicleDutyKey(string k){
            string query= $"SELECT [Id] FROM [VehicleDuties] WHERE [key]='{k}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list[0].Id==null){
                return false;
            }else{
                return true;
            }
        }

    }
}