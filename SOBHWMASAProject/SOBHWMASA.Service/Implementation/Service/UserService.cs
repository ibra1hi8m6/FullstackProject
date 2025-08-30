using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SOBHWMASA.Domain.Entities.Users;
using SOBHWMASA.Infrastructure.ViewModel.Users;
using SOBHWMASA.Service.Implementation.IService;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.Service
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;

        public UserService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        public async Task<ApplicationUser> RegisterAsync(RegisterModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                SecondName = model.SecondName,
                Address = model.Address
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));

            await _userManager.AddToRoleAsync(user, model.Role.ToString());
            return user;
        }

        public async Task<Dictionary<string, object>> LoginAsync(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return new Dictionary<string, object> { { "error", true }, { "message", "User not found" } };

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (!result.Succeeded) return new Dictionary<string, object> { { "error", true }, { "message", "Invalid credentials" } };

            return new Dictionary<string, object> { { "error", false } };

            // Generate JWT
            //     var claims = new List<Claim>
            // {
            //     new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            //     new Claim(ClaimTypes.NameIdentifier, user.Id),
            //     new Claim(JwtRegisteredClaimNames.Email, user.Email),
            //     new Claim(ClaimTypes.Name, $"{user.FirstName} {user.SecondName}")
            // };

            //     var roles = await _userManager.GetRolesAsync(user);
            //     claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

            //     var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            //     var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //     var token = new JwtSecurityToken(
            //         _config["Jwt:Issuer"],
            //         _config["Jwt:Audience"],
            //         claims,
            //         expires: DateTime.Now.AddHours(3),
            //         signingCredentials: creds
            //     );

            //     return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
