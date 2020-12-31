using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using MasterDataViagem.Domain.RegisterUser;
using MasterDataViagem.Domain.User;
using MasterDataViagem.Domain.LoginUser;
using Microsoft.Extensions.Options;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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
            var succeeded = true;
            var user = new User{
                Email = model.Email,
                UserName = model.UserName
            };
            
            var result = await this.userManager.CreateAsync(user, model.Password);
            await this.userManager.AddToRoleAsync(user, "Admin");
            if(result.Succeeded){
                return Ok(new {succeeded});
            }

            return BadRequest(result.Errors);
        }

        [Route(nameof(Login))]
        public async Task<ActionResult<Token>> Login([FromBody]LoginUser model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                //Get role assigned to the user
                var role = await userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }
    }
}