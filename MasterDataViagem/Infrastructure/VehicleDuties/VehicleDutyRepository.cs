using MasterDataViagem.Domain.VehicleDuties;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;

using System.Data.SqlClient;


namespace MasterDataViagem.Infrastructure.VehicleDuties
{
    public class VehicleDutyRepository : BaseRepository<VehicleDuty, VehicleDutyId>, IVehicleDutyRepository
    {
        string connection = "Server=tcp:mdv-g25-db.database.windows.net,1433;Initial Catalog=database;Persist Security Info=False;User ID=dbuser;Password=Grupo25,.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;;";
    
        public VehicleDutyRepository(MDVDbContext context):base(context.VehicleDuties)
        {
           
        }

        public bool verifyVehicleDutyKey(string k){
            string query= "SELECT [Id] FROM [VehicleDuties] WHERE [key]=@keyInput";

            SqlConnection sc = new SqlConnection(connection);
            sc.Open();

            SqlCommand command = new SqlCommand(query,sc);

            SqlParameter lp = new SqlParameter("@keyInput",k);
            command.Parameters.Add(lp);

            string id = (string)command.ExecuteScalar();

            sc.Close();
            if(id==null){
                return false;
            }else{
                return true;
            }
        }

    }
}