using System;
using MasterDataViagem.Domain.Shared;
using Newtonsoft.Json;

namespace MasterDataViagem.Domain.PassingTime
{
    public class PassingTimesId : EntityId
    {
        [JsonConstructor]
        public PassingTimesId(Guid value) : base(value)
        {
        }

        public PassingTimesId(String value) : base(value)
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