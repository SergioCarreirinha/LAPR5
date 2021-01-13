using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.PassingTimes;
using MasterDataViagem.Service;
using MasterDataViagem.DTO;

namespace MasterDataViagem.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PassingTimeController : ControllerBase
    {
        private readonly PassingTimeService _service;

        public PassingTimeController(PassingTimeService service)
        {
            _service = service;
        }

        // GET: api/passingTimes
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<IPassingTimeDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/passingTimes/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IPassingTimeDTO>> GetById(Guid id)
        {
            var cat = await _service.GetById(new PassingTimeId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/passingTimes
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<IPassingTimeDTO>> Create(IPassingTimeDTO dto)
        {
            var cat = await _service.Create(dto);

            if (cat != null) {
                return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
            } else {
                return BadRequest();
            }
        }


        // DELETE: api/passingTimes/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<IPassingTimeDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new PassingTimeId(id));

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