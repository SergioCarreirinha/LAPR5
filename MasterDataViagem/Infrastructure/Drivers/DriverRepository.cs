using MasterDataViagem.Domain.Driver;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MasterDataViagem.Infrastructure.Drivers
{
    public class DriverRepository : BaseRepository<Driver, DriverId>, IDriverRepository
    {

        private readonly DbSet<Driver> _db;
        public DriverRepository(MDVDbContext context):base(context.Drivers)
        {
           this._db = context.Drivers;
        }

        public async Task<bool> getByLicense(int number){
            
            string query= $"SELECT * FROM [Drivers] WHERE [driverLicenseNum]='{number}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list.Count == 0){
                return false;
            }else{
                return true;
            }
        }


    }
}

