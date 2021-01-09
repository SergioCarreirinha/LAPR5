using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Domain.PassingTimes;

namespace MasterDataViagemTest
{
    [TestClass]
    public class TripTest
    {
        [TestMethod]
        public void CreateTest()
        {
            string key = "Trip:Teste";
            string IsEmpty = "false";
            string Orientation = "Go";
            string Line = "Line:1";
            string Path = "Path:1";
            string IsGenerated = "false";

            List<PassingTime> lista = new List<PassingTime>();
            string keyP  = "PassingTime:Test";
            string Time = "36000";
            string Node = "Node:1";
            bool IsUsed = false;
            bool IsReliefPoint = false;

            PassingTime obj = new PassingTime(keyP,Time,Node,IsUsed,IsReliefPoint);
            lista.Add(obj);

            Tripes test = new Tripes(key, IsEmpty, Orientation, Line, Path, IsGenerated, lista);

            Assert.AreEqual(test, new Tripes(key, IsEmpty, Orientation, Line, Path, IsGenerated, lista));
            
        }
    }
}
