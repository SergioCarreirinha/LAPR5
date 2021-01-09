using MasterDataViagem.Domain.Vehicle;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;

namespace MasterDataViagem.Infrastructure.Vehicles
{
    public class VehicleRepository : BaseRepository<Vehicle, VehicleId>, IVehicleRepository
    {
    
        public VehicleRepository(MDVDbContext context):base(context.Vehicles)
        {
           
        }


    }
}