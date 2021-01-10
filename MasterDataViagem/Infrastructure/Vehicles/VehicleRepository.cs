using MasterDataViagem.Domain.Vehicle;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;

using System.Data.SqlClient;

namespace MasterDataViagem.Infrastructure.Vehicles
{

    public class VehicleRepository : BaseRepository<Vehicle, VehicleId>, IVehicleRepository
    {
        string connection = "Server=tcp:mdv-g25-db.database.windows.net,1433;Initial Catalog=database;Persist Security Info=False;User ID=dbuser;Password=Grupo25,.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;;";
        
        public VehicleRepository(MDVDbContext context):base(context.Vehicles)
        {
          
        }

        public bool saveWithValidation(Vehicle vehicle){

            return false;
        }

        public bool verifyVehicleByLicensePlate(string licensePlate){
            string query= "SELECT Id FROM Vehicles WHERE licensePlate=@licensePlate";

            SqlConnection sc = new SqlConnection(connection);
            sc.Open();

            SqlCommand command = new SqlCommand(query,sc);

            SqlParameter lp = new SqlParameter("@licensePlate",licensePlate);
            command.Parameters.Add(lp);

            string id = (string)command.ExecuteScalar();

            sc.Close();
            if(id==null){
                return false;
            }else{
                return true;
            }
        }

        public bool verifyVehicleByVin(string vin){
            string query= "SELECT Id FROM Vehicles WHERE vin=@vin";

            SqlConnection sc = new SqlConnection(connection);
            sc.Open();

            SqlCommand command = new SqlCommand(query,sc);

            SqlParameter lp = new SqlParameter("@vin",vin);
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