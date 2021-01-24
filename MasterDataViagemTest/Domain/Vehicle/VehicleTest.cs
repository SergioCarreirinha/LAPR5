using System;
using MasterDataViagem.Domain.Vehicle;
using System.Collections.Generic;
using Xunit;

namespace MasterDataViagemTest.Domain.VehicleTest
{

    public class VehicleTest
    {

        public string licensePlate = "21-32-AA";

        public string vin = "12321321";

        public string vehicleType = "type:21";

        public string firstServiceDate = "232032";

        [Fact]
        public void DriverConstructor()
        {
            var vehicle = new Vehicle(this.licensePlate,this.vin, this.vehicleType, this.firstServiceDate);
            Assert.NotNull(vehicle);
            Assert.Equal(vehicle.licensePlate, this.licensePlate);
            Assert.Equal(vehicle.vin, this.vin);
            Assert.Equal(vehicle.vehicleType, this.vehicleType);
            Assert.Equal(vehicle.firstServiceDate, this.firstServiceDate);
        }
    }
}
