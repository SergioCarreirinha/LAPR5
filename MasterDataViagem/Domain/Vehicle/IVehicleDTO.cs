using System;
namespace MasterDataViagem.Domain.Vehicle
{
    public class IVehicleDTO
    {
        public Guid Id { get; set; }

        public string licensePlate { get; set; }

        public string vin { get; set; }

        public string vehicleType { get; set; }

        public string firstServiceDate { get; set; }

    }
}