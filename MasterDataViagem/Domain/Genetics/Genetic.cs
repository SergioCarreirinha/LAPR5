using System;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;

namespace MasterDataViagem.Domain.Genetics {

    public class Genetic : Entity<GeneticId>, IAggregateRoot {
        public List<Population> population {get; set;}

        public int evaluation {get;set;}

        public Genetic(List<Population> _pop, int _eva){
            this.Id = new GeneticId(Guid.NewGuid());
            this.population = _pop;
            this.evaluation = _eva;
        }
        protected Genetic(){
            //ORM
        }
    }

}