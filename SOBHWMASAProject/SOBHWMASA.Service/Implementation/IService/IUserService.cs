using SOBHWMASA.Domain.Entities.Users;
using SOBHWMASA.Infrastructure.ViewModel.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.IService
{
    public interface IUserService
    {
        Task<ApplicationUser> RegisterAsync(RegisterModel model);
        Task<Dictionary<string, object>> LoginAsync(LoginModel model);
        Task LogoutAsync();
    }
}
