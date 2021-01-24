using System;
using System.Collections.Generic;
using System.Linq;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Domain.PassingTimes;
using MasterDataViagem.Mappers;
using MasterDataViagem.Repository;
using MasterDataViagem.Service;
using MasterDataViagem.Domain.Shared;
using Xunit;
using Moq;

namespace MasterDataViagemTest.Domain.TripsTest
{

    public class TripsServiceTest
    {
        private string key = "Trip:1";

        private string IsEmpty = "true";

        private string Orientation = "Go";

        private string Line = "Line:2";

        private string Path = "Path:13";

        private string IsGenerated = "false";

        private List<PassingTime> PassingTimes  = new List<PassingTime>();

        private string keyPT = "123";
        private string Time = "27000";
        private string Node = "Node:1";
        private bool IsUsed = false;
        private bool IsReliefPoint = true;


        [Fact]
        public void TripServiceConstructor()
        {
            var mockTRepo = new Mock<ITripRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockPTrepo = new Mock<IPassingTimeRepository>();

            var service = new TripService(mockTRepo.Object, mockUnitRepo.Object, mockPTrepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var mockTRepo = new Mock<ITripRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockPTrepo = new Mock<IPassingTimeRepository>();

            PassingTimes.Add(new PassingTime(this.keyPT, this.Time, this.Node, this.IsUsed, this.IsReliefPoint));
            var newTrip = new Tripes(this.key,this.IsEmpty, this.Orientation, this.Line, this.Path, this.IsGenerated, this.PassingTimes);

            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.AddAsync(newTrip));
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new TripService(mockTRepo.Object, mockUnitRepo.Object, mockPTrepo.Object);

            var addedTrip = await service.CreateWithoutVerifications(TripMapper.domainToDTO(newTrip));

            Assert.Equal(addedTrip.key, newTrip.key);

        }

        [Fact]
        public async void GetByIdAsyncTest()
        {
            string IdValue = "99999999-9999-9999-9999-999999999999";

            var id = new TripId(Guid.Parse(IdValue));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockPTrepo = new Mock<IPassingTimeRepository>();

            PassingTimes.Add(new PassingTime(this.keyPT, this.Time, this.Node, this.IsUsed, this.IsReliefPoint));
            var newTrip = new Tripes(id, this.key,this.IsEmpty, this.Orientation, this.Line, this.Path, this.IsGenerated, this.PassingTimes);

            var mockRepo = new Mock<ITripRepository>();
            mockRepo.Setup(repo => repo.GetByIdAsync(id)).ReturnsAsync(newTrip);

            var service = new TripService(mockRepo.Object, mockUnitRepo.Object, mockPTrepo.Object);

            var getPT = await service.GetById(id);

            Assert.Equal(IdValue, getPT.Id.ToString());
        }

        [Fact]
        public async void getAllTripsTest()
        {
            var mockTRepo = new Mock<ITripRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();
            var mockPTrepo = new Mock<IPassingTimeRepository>();
            
            mockTRepo.Setup(repo => repo.getAllTrips())
                .ReturnsAsync(createdTrips());

            var service = new TripService(mockTRepo.Object, mockUnitRepo.Object, mockPTrepo.Object);

            var getPT = await service.Get();

            var PT = createdTrips();

            Assert.Equal(getPT.Count(), PT.Count());

        }

        private List<Tripes> createdTrips()
        {
            var t = new List<Tripes>();
            t.Add(new Tripes(this.key,this.IsEmpty, this.Orientation, this.Line, this.Path, this.IsGenerated, this.PassingTimes));
            t.Add(new Tripes("Kei:2","false", "Return", "Line:2", "Path:3", "false", this.PassingTimes));
            t.Add(new Tripes("Key:3","true", "Go", "Line:3", "Path:4", "true", this.PassingTimes));
            return t;
        }

    }


}