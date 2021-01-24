using System;
using System.Collections.Generic;
using System.Linq;
using MasterDataViagem.Domain.PassingTimes;
using MasterDataViagem.Mappers;
using MasterDataViagem.Repository;
using MasterDataViagem.Service;
using MasterDataViagem.Domain.Shared;
using Xunit;
using Moq;

namespace MasterDataViagemTest.Domain.PassingTimesTest
{

    public class PassingTimesServiceTest
    {
        public string key = "123";
        public string Time = "27000";
        public string Node = "Node:1";
        public bool IsUsed = false;
        public bool IsReliefPoint = true;


        [Fact]
        public void PassingTimesServiceConstructor()
        {
            var mockPTRepo = new Mock<IPassingTimeRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new PassingTimeService(mockPTRepo.Object, mockUnitRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var mockPTRepo = new Mock<IPassingTimeRepository>();

            var PT = new PassingTime(this.key, this.Time, this.Node, this.IsUsed, this.IsReliefPoint);

            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockRepo = new Mock<IPassingTimeRepository>();
            mockRepo.Setup(repo => repo.AddAsync(PT));
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new PassingTimeService(mockPTRepo.Object, mockUnitRepo.Object);

            var addedPT = await service.Create(PassingTimeMapper.domainToDTO(PT));

            Assert.Equal(addedPT.key, PT.key);

        }

        [Fact]
        public async void GetByIdAsyncTest()
        {
            string IdValue = "99999999-9999-9999-9999-999999999999";

            var id = new PassingTimeId(Guid.Parse(IdValue));
            var PT = new PassingTime(id, this.key, this.Time, this.Node, this.IsUsed, this.IsReliefPoint);

            var mockRepo = new Mock<IPassingTimeRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(id)).ReturnsAsync(PT);
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new PassingTimeService(mockRepo.Object, mockUnitRepo.Object);

            var getPT = await service.GetById(id);

            Assert.Equal(IdValue, getPT.Id.ToString());
        }

        [Fact]
        public async void getPassigTimesTest()
        {
            var mockRepo = new Mock<IPassingTimeRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(createdPassingTimes());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new PassingTimeService(mockRepo.Object, mockUnitRepo.Object);

            var getPT = await service.Get();

            var PT = createdPassingTimes();

            Assert.Equal(getPT.Count(), PT.Count());

        }

        private List<PassingTime> createdPassingTimes()
        {
            var pts = new List<PassingTime>();
            pts.Add(new PassingTime(this.key, this.Time, this.Node, this.IsUsed, this.IsReliefPoint));
            pts.Add(new PassingTime("PassingTime:2", "36000", "Node:3", false, false));
            pts.Add(new PassingTime("PassingTime:3", "58000", "Node:4", false, true));
            return pts;
        }

    }


}