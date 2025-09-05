using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Services.TestManagement.TestPlanning.WebApi;
using SOBHWMASA.Domain.Entities.Users;

using SOBHWMASA.Infrastructure.ViewModel.UsersDTOS;
using SOBHWMASA.Service.Implementation.IService.IUser;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.Service.User
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
                PhoneNumber = model.PhoneNumber,
                Addresses = new List<Address> { model.Address }
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));

            var roleToAssign = string.IsNullOrEmpty(model.Role) ? "User" : model.Role;

            await _userManager.AddToRoleAsync(user, model.Role);
            return user;
        }

        public async Task<IActionResult> LoginAsync(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var roles = await _userManager.GetRolesAsync(user);
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                ClaimsIdentity claims = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(ClaimTypes.Name, $"{user.FirstName} {user.SecondName}"),
                        new Claim(ClaimTypes.Role,roles.First()),
                        new Claim(ClaimTypes.MobilePhone, user.PhoneNumber ?? "")
                    });
                    var tokenDescription = new SecurityTokenDescriptor
                {
                        Subject = claims,
                        Expires = DateTime.UtcNow.AddMinutes(30),
                        Issuer = _config["Jwt:Issuer"],     // ✅ Add Issuer
                        Audience = _config["Jwt:Audience"], // ✅ Add Audience
                        SigningCredentials = new SigningCredentials(
                        key,
                        SecurityAlgorithms.HmacSha256Signature
                        )
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescription);
                var token = tokenHandler.WriteToken(securityToken);
                return new OkObjectResult(new { token });
            }
            else
            {
                 return new BadRequestObjectResult(new { Message = "Username or password is incorrect" });
            }
               
        }
        public async Task<IActionResult> AddAddressAsync(string userId, Address newAddress)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return new NotFoundObjectResult("User not found.");

            user.Addresses.Add(newAddress);
            await _userManager.UpdateAsync(user);

            return new OkObjectResult(user.Addresses);
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
        public async Task<UserBasicInfoDto?> GetUserByPhoneNumberAsync(string phoneNumber)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);

            if (user == null)
                return null;

            return new UserBasicInfoDto
            {
                UserId = user.Id,
                FirstName = user.FirstName,
                SecondName = user.SecondName
            };
        }
    }
}
