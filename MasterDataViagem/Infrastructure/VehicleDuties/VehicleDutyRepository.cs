using MasterDataViagem.Domain.VehicleDuties;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;


namespace MasterDataViagem.Infrastructure.VehicleDuties
{
    public class VehicleDutyRepository : BaseRepository<VehicleDuty, VehicleDutyId>, IVehicleDutyRepository
    {
    
        public VehicleDutyRepository(MDVDbContext context):base(context.VehicleDuties)
        {
           
        }


    }
}