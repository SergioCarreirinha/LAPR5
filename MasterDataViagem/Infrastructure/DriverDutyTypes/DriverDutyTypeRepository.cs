using MasterDataViagem.Domain.DriverDutyTypes;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using System.Data.SqlClient;

namespace MasterDataViagem.Infrastructure.DriverDutyTypes
{
    public class DriverDutyTypeRepository : BaseRepository<DriverDutyType, DriverDutyTypeId>, IDriverDutyTypeRepository
    {
        
        string connection = "Server=tcp:mdv-g25-db.database.windows.net,1433;Initial Catalog=database;Persist Security Info=False;User ID=dbuser;Password=Grupo25,.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;;";

        public DriverDutyTypeRepository(MDVDbContext context):base(context.DriverDutyTypes)
        {
           
        }

        public bool getByKey(string _key){
            
            string query= "SELECT [Id] FROM [DriverDutyTypes] WHERE [key]=@param";

            SqlConnection sc = new SqlConnection(connection);
            sc.Open();

            SqlCommand command = new SqlCommand(query,sc);

            SqlParameter l = new SqlParameter("@param",_key);
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