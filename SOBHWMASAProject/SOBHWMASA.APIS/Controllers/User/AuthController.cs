using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOBHWMASA.Infrastructure.ViewModel.Users;
using SOBHWMASA.Service.Implementation.IService;

namespace SOBHWMASA.APIS.Controllers.User
{
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
            return Ok(new { user.Id, user.Email });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                var trial = await _userService.LoginAsync(model);
                if (trial.TryGetValue("error", out object? value) && (bool)value)
                {
                    throw new Exception((string)trial["message"]);
                }
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }

            return Ok();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _userService.LogoutAsync();
            Response.Cookies.Delete("jwt");
            return Ok("Logged out");
        }
    }
}
