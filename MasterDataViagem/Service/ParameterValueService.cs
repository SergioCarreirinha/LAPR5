using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.ParameterValues;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Mappers;

namespace MasterDataViagem.Service {

    public class ParameterValueService
    {
        private readonly IParameterValueRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public ParameterValueService(IParameterValueRepository repo, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<IParameterValueDTO>> Get(){
            var list = await this._repo.GetAllAsync();

            List<IParameterValueDTO> listDTO = list.ConvertAll<IParameterValueDTO>( parameter => ParameterValueMapper.domainToDTO(parameter));
            
            return listDTO;
        }
        public async Task<IParameterValueDTO> GetById(ParameterValueId id){

            var parameter =  await this._repo.GetByIdAsync(id);

            if(parameter == null) return null;

            return ParameterValueMapper.domainToDTO(parameter);
        }

        public async Task<IParameterValueDTO> Create(IParameterValueDTO parameter)
        {
            var obj = new ParameterValue(parameter.key, parameter.parameter, parameter.value);

            if (!(await this._repo.getByKey(parameter.key))) {

                await this._repo.AddAsync(obj);

                await this._unitOfWork.CommitAsync();

                return ParameterValueMapper.domainToDTO(obj);
            } else {
                return null;
            }
        }

        public async Task<IParameterValueDTO> DeleteAsync(ParameterValueId id)
        {
            var value = await this._repo.GetByIdAsync(id); 

            if (value == null)
                return null;   

            
            this._repo.Remove(value);
            await this._unitOfWork.CommitAsync();

            return ParameterValueMapper.domainToDTO(value);
        }
    }
}