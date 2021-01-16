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

        private readonly string connection = "Server=tcp:mdv-g25-db.database.windows.net,1433;Initial Catalog=database;Persist Security Info=False;User ID=dbuser;Password=Grupo25,.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;;";

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

        public async Task<List<VehicleDuty>> getAllVehicleDuty(){
            
            string query= "SELECT * FROM [VehicleDuties]";

            SqlConnection sc = new SqlConnection(connection);
            sc.Open();

            SqlCommand command = new SqlCommand(query,sc);

            List<VehicleDuty> lstVD = (List<VehicleDuty>)command.ExecuteScalar();

            foreach(var vehicleDuty in lstVD){
                string query2= "SELECT * FROM [WorkBlocks] WHERE vehicleDutyId='"+vehicleDuty.Id.AsString()+"'";

                SqlCommand command2 = new SqlCommand(query,sc);

                List<WorkBlock> lstTemp= (List<WorkBlock>)command.ExecuteScalar();
                vehicleDuty.WorkBlocks=lstTemp;
            }
            return lstVD;
        }
        
    }
}