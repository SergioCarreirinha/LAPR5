using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using System.Linq;
using System;
using Moq;
using MasterDataViagem.Domain.DriverDutyTypes;
using MasterDataViagem.Domain.ParameterValues;
using MasterDataViagem.Repository;
using MasterDataViagem.Mappers;
using MasterDataViagem.Service;
using Xunit;

namespace MasterDataViagemTest.Domain.DriverDutyTypeServiceTest
{

    public class DriverDutyTypeServiceTest
    {

         public Guid Id = Guid.NewGuid();
        public string key = "CHAVE";

        public string name ="name";

        public List<ParameterValue> parameters;


        [Fact]
        public void DefineDriverServiceConstrutor()
        {

            var mockBlocoRepo = new Mock<IDriverDutyTypeRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockParameterRepo = new Mock<IParameterValueRepository>();

            var service = new DriverDutyTypeService(mockBlocoRepo.Object,mockUnitRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var driverDutyType1 = new DriverDutyType(this.key,this.name,this.parameters);


            var mockRepo = new Mock<IDriverDutyTypeRepository>();
            mockRepo.Setup(repo => repo.AddAsync(driverDutyType1));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new DriverDutyTypeService(mockRepo.Object,mockUnitRepo.Object);

            var driverdType = await service.Create(DriverDutyTypeMapper.domainToDTO(driverDutyType1));

            Assert.Equal(driverdType.key, driverDutyType1.key);

        }
    }
}