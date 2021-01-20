using MasterDataViagem.Domain.Vehicle;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MasterDataViagem.Infrastructure.Vehicles
{

    public class VehicleRepository : BaseRepository<Vehicle, VehicleId>, IVehicleRepository
    {
        private readonly DbSet<Vehicle> _db;
        
        public VehicleRepository(MDVDbContext context):base(context.Vehicles)
        {
            this._db = context.Vehicles;
        }

        public async Task<bool> verifyVehicleByLicensePlate(string licensePlate){
            
            string query= $"SELECT * FROM [Vehicles] WHERE [licensePlate]='{licensePlate}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list.Count == 0){
                return false;
            }else{
                return true;
            }
        }

        public async Task<bool> verifyVehicleByVin(string vin){

            string query= $"SELECT * FROM [Vehicles] WHERE [vin]='{vin}'";

            var list = await this._db.FromSqlRaw(query).ToListAsync();
            
            if(list.Count == 0){
                return false;
            }else{
                return true;
            }
        }

    }
}