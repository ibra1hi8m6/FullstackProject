using AutoMapper;
using SOBHWMASA.Data;
using SOBHWMASA.Domain.Entities.Users;
using SOBHWMASA.Service.Implementation.IService.IUser;
using SOBHWMASA.Infrastructure.ViewModel.AddressDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.Service.User
{
    public class AddressService : IAddressService
    {
        private readonly IRepository<Address> _addressRepo;
        private readonly IMapper _mapper;

        public AddressService(IRepository<Address> addressRepo, IMapper mapper)
        {
            _addressRepo = addressRepo;
            _mapper = mapper;
        }

        public async Task<AddressReadDto> CreateAddressAsync(AddressCreateDto dto)
        {
            var address = _mapper.Map<Address>(dto);
            await _addressRepo.AddAsync(address);
            await _addressRepo.SaveAsync();

            return _mapper.Map<AddressReadDto>(address);
        }

        public async Task<IEnumerable<AddressReadDto>> GetAddressesByUserIdAsync(string userId)
        {
            var addresses = await _addressRepo.GetAllAsync(a => a.ApplicationUserID == userId);
            return _mapper.Map<IEnumerable<AddressReadDto>>(addresses);
        }

        public async Task<AddressReadDto> GetAddressByIdAsync(int id)
        {
            var address = await _addressRepo.GetByIdAsync(id);
            return _mapper.Map<AddressReadDto>(address);
        }

        public async Task UpdateAddressAsync(int id, AddressCreateDto dto)
        {
            var address = await _addressRepo.GetByIdAsync(id);
            if (address == null) throw new Exception("Address not found");

            // Map updated fields
            _mapper.Map(dto, address);

            _addressRepo.Update(address);
            await _addressRepo.SaveAsync();
        }
        public async Task DeleteAddressAsync(int id)  
        {
            var address = await _addressRepo.GetByIdAsync(id);
            if (address == null) throw new Exception("Address not found");

            _addressRepo.Delete(address);
            await _addressRepo.SaveAsync();
        }
    }

}
