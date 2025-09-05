using Microsoft.AspNetCore.Mvc;
using SOBHWMASA.Domain.Entities.Users;

using SOBHWMASA.Infrastructure.ViewModel.UsersDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.IService.IUser
{
    public interface IUserService
    {
        Task<ApplicationUser> RegisterAsync(RegisterModel model);
        Task<IActionResult> LoginAsync(LoginModel model);
        Task<IActionResult> AddAddressAsync(string userId, Address newAddress);
        Task LogoutAsync();
        Task<UserBasicInfoDto?> GetUserByPhoneNumberAsync(string phoneNumber);
    }
}
