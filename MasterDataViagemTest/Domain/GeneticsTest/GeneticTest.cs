using System;
using MasterDataViagem.Domain.Genetics;
using System.Collections.Generic;
using Xunit;

namespace MasterDataViagemTest.Domain.GeneticsTest
{

    public class GeneticTest
    {

        private List<Population> pop = new List<Population>();
        private int Pop1 = 15000;
        private int Pop2 = 15;
        private int Pop3 = 1600;
        private int Pop4 = 1;
        
        private int evaluation = 980000;

        [Fact]
        public void GeneticConstructor()
        {
            pop.Add(new Population(Pop1));
            pop.Add(new Population(Pop2));
            pop.Add(new Population(Pop3));
            pop.Add(new Population(Pop4));
            var ge = new Genetic(pop, evaluation);
            Assert.NotNull(ge);
            Assert.Equal(ge.population, this.pop);
            Assert.Equal(ge.evaluation, this.evaluation);
        }
    }
}
