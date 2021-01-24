using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using System.Linq;
using System;
using Moq;
using MasterDataViagem.Domain.Driver;
using MasterDataViagem.DTO;
using MasterDataViagem.Repository;
using MasterDataViagem.Mappers;
using MasterDataViagem.Service;
using Xunit;

namespace MasterDataViagemTest.Domain.DriverServiceTest
{

    public class DriverServiceTest
    {


         public Guid Id = Guid.NewGuid();
        public string name = "Nome";
        public DateTime birthdate = new DateTime(1969,4,4);
        public int driverLicenseNum = 123;
        public DateTime licenseExpiration = new DateTime(1999,4,4);


        [Fact]
        public void DefineDriverServiceConstrutor()
        {

            var mockBlocoRepo = new Mock<IDriverRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DriverService(mockBlocoRepo.Object,mockUnitRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var defineDriver1 =  new Driver(this.name,this.birthdate, this.driverLicenseNum, this.licenseExpiration);


            var mockRepo = new Mock<IDriverRepository>();
            mockRepo.Setup(repo => repo.AddAsync(defineDriver1));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new DriverService(mockRepo.Object,mockUnitRepo.Object);

            var defineDriver = await service.Create(DriverMapper.domainToDTO(defineDriver1));

            Assert.Equal(defineDriver.driverLicenseNum, defineDriver1.driverLicenseNum);

        }
        [Fact]
        public async void GetByIdAsyncTest()
        {
            string IdValue = "99999999-9999-9999-9999-999999999999";

            var id = new DriverId(Guid.Parse(IdValue));
            var PT = new Driver(id, this.name,this.birthdate, this.driverLicenseNum, this.licenseExpiration);

            var mockRepo = new Mock<IDriverRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(id)).ReturnsAsync(PT);
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DriverService(mockRepo.Object, mockUnitRepo.Object);

            var getPT = await service.GetById(id);

            Assert.Equal(IdValue, getPT.Id.ToString());
        }

        [Fact]
        public async void getDriversTest()
        {
            var mockRepo = new Mock<IDriverRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(createdDrivers());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new DriverService(mockRepo.Object, mockUnitRepo.Object);

            var getPT = await service.Get();

            var PT = createdDrivers();

            Assert.Equal(getPT.Count(), PT.Count());

        }

        private List<Driver> createdDrivers()
        {
            var pts = new List<Driver>();
            pts.Add(new Driver(this.name,this.birthdate, this.driverLicenseNum, this.licenseExpiration));
            pts.Add(new Driver("PassingTime:2", new DateTime(1999,6,6), 1231231, new DateTime(1999,4,4)));
            pts.Add(new Driver("PassingTime:3", new DateTime(1999,6,6), 1231231, new DateTime(1999,4,4)));
            return pts;
        }
    }
}