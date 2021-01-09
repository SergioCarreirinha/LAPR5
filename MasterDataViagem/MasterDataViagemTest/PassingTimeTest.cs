using Microsoft.VisualStudio.TestTools.UnitTesting;
using MasterDataViagem.Domain.PassingTimes;

namespace MasterDataViagemTest
{
    [TestClass]
    public class PassingTimeTest
    {
        [TestMethod]
        public void CreateTest()
        {
            string key  = "PassingTime:Test";
            string Time = "36000";
            string Node = "Node:1";
            bool IsUsed = false;
            bool IsReliefPoint = false;

            PassingTime obj = new PassingTime(key,Time,Node,IsUsed,IsReliefPoint);

            Assert.AreEqual(obj, new PassingTime(key,Time,Node,IsUsed,IsReliefPoint));
        }
    }
}
