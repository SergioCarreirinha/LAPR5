using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.DriverDutyTypes;
using Microsoft.AspNetCore.Authorization;
using MasterDataViagem.Service;
using MasterDataViagem.DTO;

namespace MasterDataViagem.Controllers {
    
    [Route("api/[controller]")]
    [ApiController]
    public class DriverDutyTypeController : ControllerBase {
        private readonly DriverDutyTypeService _service;

        public  DriverDutyTypeController(DriverDutyTypeService driverDutyTypeService)
        {
            _service = driverDutyTypeService;
        }

        // GET: api/DriverDutyType
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<IDriverDutyTypeDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/DriverDuty/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IDriverDutyTypeDTO>> GetById(Guid id)
        {
            var cat = await _service.GetById(new DriverDutyTypeId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/DriverDuty
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<IDriverDutyTypeDTO>> Create(IDriverDutyTypeDTO dto)
        {
            string error = "erro";
            var cat = await _service.Create(dto);

            if (cat != null) {
                return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
            }else{
                return BadRequest(new {error});
            }
        }

        
        // DELETE: api/DriverDuty/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<IDriverDutyTypeDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new DriverDutyTypeId(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}