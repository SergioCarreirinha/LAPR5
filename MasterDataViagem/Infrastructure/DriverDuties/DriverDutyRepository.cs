using MasterDataViagem.Domain.DriverDuties;
using MasterDataViagem.Repository;
using MasterDataViagem.Infrastructure.Shared;
using System.Data.SqlClient;

namespace MasterDataViagem.Infrastructure.DriverDuties
{
    public class DriverDutyRepository : BaseRepository<DriverDuty, DriverDutyId>, IDriverDutyRepository
    {
        string connection = "Server=tcp:mdv-g25-db.database.windows.net,1433;Initial Catalog=database;Persist Security Info=False;User ID=dbuser;Password=Grupo25,.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;;";
    
        public DriverDutyRepository(MDVDbContext context):base(context.DriverDuties)
        {
           
        }

        public bool getByKey(string keyTest){
                    
                    string query= "SELECT Id FROM DriverDuties WHERE key=@keyTest";

                    SqlConnection sc = new SqlConnection(connection);
                    sc.Open();

                    SqlCommand command = new SqlCommand(query,sc);

                    SqlParameter l = new SqlParameter("@key",keyTest);
                    command.Parameters.Add(l);

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