using System;
using MasterDataViagem.Domain.ParameterValues;
using System.Collections.Generic;
using Xunit;

namespace MasterDataViagemTest.Domain.ParameterValuesTest
{

    public class ParameterValuesTest
    {

        public Guid Id = Guid.NewGuid();
        public string key = "Nome";
         public string parameter = "Nome";
         public string value = "123";

        [Fact]
        public void ParameterValuesConstructor()
        {
            var parameterValues = new ParameterValue(this.key,this.parameter, this.value);
            Assert.NotNull(parameterValues);
            Assert.Equal(parameterValues.key, this.key);
            Assert.Equal(parameterValues.parameter, this.parameter);
            Assert.Equal(parameterValues.value, this.value);
        }
    }
}
