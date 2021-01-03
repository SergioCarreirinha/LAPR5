using System;
using MasterDataViagem.Domain.Shared;
using Newtonsoft.Json;

namespace MasterDataViagem.Domain.Genetics
{
    public class GeneticId : EntityId
    {
        [JsonConstructor]
        public GeneticId(Guid value) : base(value)
        {
        }

        public GeneticId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}