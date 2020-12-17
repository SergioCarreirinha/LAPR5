using System;
using MasterDataViagem.Domain.Shared;

namespace MasterDataViagem.Domain.Vehicle {
    public class Vehicle : Entity<VehicleId>, IAggregateRoot {

        public string licensePlate { get; set; }

        public string vin { get; set; }   //vehicle identification number

        public string vehicleType { get; set; }

        public string firstServiceDate { get; set; }

        public Vehicle(string _licensePlate, string _vin, string _vehicleType, string _firstServiceDate) {
            this.Id = new VehicleId(Guid.NewGuid());
            this.licensePlate = _licensePlate;
            this.vin = _vin;
            this.vehicleType = _vehicleType;
            this.firstServiceDate = _firstServiceDate;
        }

        protected Vehicle() {
            //ORM
        }
    }
}