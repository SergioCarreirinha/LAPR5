using System;
using System.Collections.Generic;
using System.Linq;
using MasterDataViagem.Domain.ParameterValues;
using MasterDataViagem.Mappers;
using MasterDataViagem.Repository;
using MasterDataViagem.Service;
using MasterDataViagem.Domain.Shared;
using Xunit;
using Moq;

namespace MasterDataViagemTest.Domain.ParameterValuesServiceTest
{

    public class ParameterValuesServiceTest
    {
        public Guid Id = Guid.NewGuid();
        public string key = "Nome";
         public string parameter = "Nome";
         public string value = "123";

        [Fact]
        public void PassingTimesServiceConstructor()
        {
            var mockPTRepo = new Mock<IParameterValueRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new ParameterValueService(mockPTRepo.Object, mockUnitRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var mockPTRepo = new Mock<IParameterValueRepository>();

            var parameterValues = new ParameterValue(this.key,this.parameter, this.value);

            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockRepo = new Mock<IParameterValueRepository>();
            mockRepo.Setup(repo => repo.AddAsync(parameterValues));
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new ParameterValueService(mockPTRepo.Object, mockUnitRepo.Object);

            var addedPT = await service.Create(ParameterValueMapper.domainToDTO(parameterValues));

            Assert.Equal(addedPT.key, parameterValues.key);

        }

        [Fact]
        public async void GetByIdAsyncTest()
        {
            string IdValue = "99999999-9999-9999-9999-999999999999";

            var id = new ParameterValueId(Guid.Parse(IdValue));
            var PT = new ParameterValue(id, this.key,this.parameter, this.value);

            var mockRepo = new Mock<IParameterValueRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(id)).ReturnsAsync(PT);
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new ParameterValueService(mockRepo.Object, mockUnitRepo.Object);

            var getPT = await service.GetById(id);

            Assert.Equal(IdValue, getPT.Id.ToString());
        }

        [Fact]
        public async void getPassigTimesTest()
        {
            var mockRepo = new Mock<IParameterValueRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(createdParameterValue());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new ParameterValueService(mockRepo.Object, mockUnitRepo.Object);

            var getPT = await service.Get();

            var PT = createdParameterValue();

            Assert.Equal(getPT.Count(), PT.Count());

        }

        private List<ParameterValue> createdParameterValue()
        {
            var pts = new List<ParameterValue>();
            pts.Add(new ParameterValue(this.key,this.parameter, this.value));
            pts.Add(new ParameterValue("PassingTime:2", "36000", "Node:3"));
            pts.Add(new ParameterValue("PassingTime:3", "58000", "Node:4"));
            return pts;
        }

    }


}