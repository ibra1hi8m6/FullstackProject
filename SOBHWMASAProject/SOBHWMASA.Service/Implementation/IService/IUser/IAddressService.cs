using SOBHWMASA.Infrastructure.ViewModel.AddressDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.IService.IUser
{
    public interface IAddressService
    {
        Task<AddressReadDto> CreateAddressAsync(AddressCreateDto dto);
        Task<IEnumerable<AddressReadDto>> GetAddressesByUserIdAsync(string userId);
        Task<AddressReadDto> GetAddressByIdAsync(int id);
        Task UpdateAddressAsync(int id, AddressCreateDto dto);
        Task DeleteAddressAsync(int id);
    }
}
