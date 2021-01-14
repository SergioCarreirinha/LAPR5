using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.ParameterValues;
using MasterDataViagem.Service;
using MasterDataViagem.DTO;

namespace MasterDataViagem.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ParameterValueController : ControllerBase
    {
        private readonly ParameterValueService _service;

        public ParameterValueController(ParameterValueService service)
        {
            _service = service;
        }

        // GET: api/passingTimes
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<IParameterValueDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/passingTimes/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IParameterValueDTO>> GetById(Guid id)
        {
            var cat = await _service.GetById(new ParameterValueId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/ParameterValue
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<IParameterValueDTO>> Create(IParameterValueDTO dto)
        {
            var cat = await _service.Create(dto);

            if (cat != null) {
                return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
            } else {
                return BadRequest();
            }
        }


        // DELETE: api/ParameterValue/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<IParameterValueDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new ParameterValueId(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}