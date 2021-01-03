using System;
using MasterDataViagem.Domain.Shared;

namespace MasterDataViagem.Domain.Genetics {
    public class Population : Entity<PopulationId> {

        public int pop {get;set;}

        public Population(int _pop){
            this.Id = new PopulationId(Guid.NewGuid());
            this.pop = _pop;
        }
        protected Population(){
            //ORM
        }

    }
}