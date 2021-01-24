using System;
using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Domain.PassingTimes;
using System.Collections.Generic;
using Xunit;

namespace MasterDataViagemTest.Domain.WorkBlocksTest
{

    public class WorkBlockTest
    {

        private string keyWB = "WB:1";
        private int startTime = 27000;
        private int endTime = 30000;
        private string startNode = "Node:1";
        private string endNode = "Node:3";
        private Boolean isCrewTravelTime = false;
        private Boolean isActive = true;
        private List<Tripes> trips = new List<Tripes>();
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
        public void TripConstructor()
        {
            PassingTimes.Add(new PassingTime(this.keyPT, this.Time, this.Node, this.IsUsed, this.IsReliefPoint));
            trips.Add(new Tripes(this.key,this.IsEmpty, this.Orientation, this.Line, this.Path, this.IsGenerated, this.PassingTimes));
            var wb = new WorkBlock(this.keyWB, this.startTime, this.endTime, this.startNode, this.endNode, this.isCrewTravelTime, this.isActive, trips);
            Assert.NotNull(wb);
            Assert.Equal(wb.key, this.keyWB);
            Assert.Equal(wb.startTime, this.startTime);
            Assert.Equal(wb.endTime, this.endTime);
            Assert.Equal(wb.startNode, this.startNode);
            Assert.Equal(wb.endNode, this.endNode);
            Assert.Equal(wb.isCrewTravelTime, this.isCrewTravelTime);
            Assert.Equal(wb.isActive, this.isActive);
            Assert.Equal(wb.trips, this.trips);
        }
    }
}
