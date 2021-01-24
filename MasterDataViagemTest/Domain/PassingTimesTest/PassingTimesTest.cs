using System;
using MasterDataViagem.Domain.PassingTimes;
using System.Collections.Generic;
using Xunit;

namespace MasterDataViagemTest.Domain.PassingTimesTest
{

    public class PassingTimesTest
    {

        public string key = "123";
        public string Time = "27000";
        public string Node = "Node:1";
        public bool IsUsed = false;
        public bool IsReliefPoint = true;

        [Fact]
        public void PassingTimeConstructor()
        {
            var newPT = new PassingTime(this.key,this.Time, this.Node, this.IsUsed, this.IsReliefPoint);
            Assert.NotNull(newPT);
            Assert.Equal(newPT.key, this.key);
            Assert.Equal(newPT.Time, this.Time);
            Assert.Equal(newPT.Node, this.Node);
            Assert.Equal(newPT.IsUsed, this.IsUsed);
            Assert.Equal(newPT.IsReliefPoint, this.IsReliefPoint);
        }

        [Fact]
        public void PassingTimeNullConstructor()
        {
            var newPT = new PassingTime(null,null, null, false , false);
            Assert.NotNull(newPT);
            Assert.Equal(newPT.key, null);
            Assert.Equal(newPT.Time, null);
            Assert.Equal(newPT.Node, null);
            Assert.Equal(newPT.IsUsed, false);
            Assert.Equal(newPT.IsReliefPoint, false);
        }
    }
}
