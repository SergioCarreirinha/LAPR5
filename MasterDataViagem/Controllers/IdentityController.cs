using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using MasterDataViagem.Domain.RegisterUser;
using MasterDataViagem.Domain.User;
using MasterDataViagem.Domain.LoginUser;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;

namespace MasterDataViagem.Controllers {
    
    public class IdentityController : ControllerBase
    {   
        private readonly UserManager<User> userManager;
        private readonly ApplicationSettings appSettings;
        
        public IdentityController(UserManager<User> userManager, IOptions<ApplicationSettings> appSettings)
        {
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
        }

        [Route(nameof(Register))]
        public async Task<IActionResult> Register([FromBody]RegisterUser model){
            var user = new User{
                Email = model.Email,
                UserName = model.UserName
            };
            
            var result = await this.userManager.CreateAsync(user, model.Password);

            if(result.Succeeded){
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [Route(nameof(Login))]
        public async Task<ActionResult<string>> Login([FromBody]LoginUser model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);
            if( user == null)
            {
                return Unauthorized();
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                return Unauthorized();
            }
 
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }
    }
}