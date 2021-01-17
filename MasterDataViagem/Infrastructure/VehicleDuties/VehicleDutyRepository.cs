using MasterDataViagem.Domain.VehicleDuties;
using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

using System.Data.SqlClient;


namespace MasterDataViagem.Infrastructure.VehicleDuties
{
    public class VehicleDutyRepository : BaseRepository<VehicleDuty, VehicleDutyId>, IVehicleDutyRepository
    {
        private readonly DbSet<VehicleDuty> _db;
        private readonly DbSet<WorkBlock> _dbWb;

        public VehicleDutyRepository(MDVDbContext context):base(context.VehicleDuties)
        {
           this._db = context.VehicleDuties;
           this._dbWb = context.WorkBlocks;
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

       public async Task<List<VehicleDuty>> getAllVehicleDuty(){

            List<VehicleDuty> lstVD = await this._db.FromSqlRaw("SELECT * FROM [VehicleDuties]").ToListAsync();

            foreach(var vehicleDuty in lstVD){

                List<WorkBlock> lstTemp= await this._dbWb.FromSqlRaw("SELECT * FROM [WorkBlocks] WHERE vehicleDutyId='"+vehicleDuty.Id.AsString()+"'").ToListAsync();
                vehicleDuty.WorkBlocks=lstTemp;
            }

            return lstVD;
        }
        
    }
}