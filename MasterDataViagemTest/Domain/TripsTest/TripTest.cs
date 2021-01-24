using System;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Domain.PassingTimes;
using System.Collections.Generic;
using Xunit;

namespace MasterDataViagemTest.Domain.TripsTest
{

    public class TripTest
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
        public void TripConstructor()
        {
            PassingTimes.Add(new PassingTime(this.keyPT, this.Time, this.Node, this.IsUsed, this.IsReliefPoint));
            var newTrip = new Tripes(this.key,this.IsEmpty, this.Orientation, this.Line, this.Path, this.IsGenerated, this.PassingTimes);
            Assert.NotNull(newTrip);
            Assert.Equal(newTrip.key, this.key);
            Assert.Equal(newTrip.IsEmpty, this.IsEmpty);
            Assert.Equal(newTrip.Orientation, this.Orientation);
            Assert.Equal(newTrip.Line, this.Line);
            Assert.Equal(newTrip.Path, this.Path);
            Assert.Equal(newTrip.IsGenerated, this.IsGenerated);
            Assert.Equal(newTrip.PassingTimes, this.PassingTimes);
        }
    }
}
