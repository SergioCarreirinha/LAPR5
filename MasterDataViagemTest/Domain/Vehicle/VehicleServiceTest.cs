using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using System.Linq;
using System;
using Moq;
using MasterDataViagem.Domain.Vehicle;
using MasterDataViagem.DTO;
using MasterDataViagem.Repository;
using MasterDataViagem.Mappers;
using MasterDataViagem.Service;
using Xunit;

namespace MasterDataViagemTest.Domain.VehicleServiceTest
{

    public class VehicleServiceTest
    {


        public string licensePlate = "21-32-AA";

        public string vin = "12321321";

        public string vehicleType = "type:21";

        public string firstServiceDate = "232032";


        [Fact]
        public void VehicleServiceConstrutor()
        {

            var mockBlocoRepo = new Mock<IVehicleRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new VehicleService(mockBlocoRepo.Object,mockUnitRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var vehicle1 = new Vehicle(this.licensePlate,this.vin, this.vehicleType, this.firstServiceDate);


            var mockRepo = new Mock<IVehicleRepository>();
            mockRepo.Setup(repo => repo.AddAsync(vehicle1));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new VehicleService(mockRepo.Object,mockUnitRepo.Object);

            var vehicle = await service.Create(VehicleMapper.domainToDTO(vehicle1));

            Assert.Equal(vehicle.vin, vehicle1.vin);

        }
    }
}