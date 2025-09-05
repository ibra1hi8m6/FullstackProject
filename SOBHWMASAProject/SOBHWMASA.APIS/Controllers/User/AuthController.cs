using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOBHWMASA.Domain.Entities.Users;
using SOBHWMASA.Infrastructure.Response;

using SOBHWMASA.Infrastructure.ViewModel.UsersDTOS;
using SOBHWMASA.Service.Implementation.IService.IUser;

namespace SOBHWMASA.APIS.Controllers.User
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var user = await _userService.RegisterAsync(model);
            var response = new RegisterResponse
            {
                Successed = true,
                Message = "User registered successfully"
            };

            return Ok(response);
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            return await _userService.LoginAsync(model);
        }
        [HttpPost("add-address")]
        public async Task<IActionResult> AddAddress([FromBody] Address newAddress)
        {
            var userId = User.FindFirst("UserID")?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token.");

            return await _userService.AddAddressAsync(userId, newAddress);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _userService.LogoutAsync();
            Response.Cookies.Delete("jwt");
            return Ok("Logged out");
        }
        [HttpGet("by-phone/{phoneNumber}")]
        public async Task<IActionResult> GetUserByPhoneNumber(string phoneNumber)
        {
            var user = await _userService.GetUserByPhoneNumberAsync(phoneNumber);

            if (user == null)
                return NotFound(new { Message = "User not found" });

            return Ok(user);
        }

    }
}
