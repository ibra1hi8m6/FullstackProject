using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SizeEntity = SOBHWMASA.Domain.Entities.Products.Size;
using CategorySizeEntity = SOBHWMASA.Domain.Entities.Products.CategorySize;
using SizeDTO = SOBHWMASA.Infrastructure.ViewModel.Products.Size.SizeDTO;
using CategorySizeDTO = SOBHWMASA.Infrastructure.ViewModel.Products.Size.CategorySizeDTO;
using SOBHWMASA.Service.Implementation.IService;
using SOBHWMASA.Data;
using AutoMapper;
using SOBHWMASA.Infrastructure.ViewModel.Products.Ingredient;
using SOBHWMASA.Domain.Entities.Products;
using SOBHWMASA.Infrastructure.ViewModel.Products.Meal;

namespace SOBHWMASA.Service.Implementation.Service
{
    public class SizeService : ISizeService
    {
        private readonly IRepository<SizeEntity> _sizeRepository;
        private readonly IRepository<CategorySizeEntity> _categorySizeRepository;
        private readonly IMapper _mapper;

        public SizeService(
            IRepository<SizeEntity> SizeRepository,
            IRepository<CategorySizeEntity> CategorySizeRepository,
            IMapper mapper
            )
        {
            _sizeRepository = SizeRepository;
            _categorySizeRepository = CategorySizeRepository;
            this._mapper = mapper;
        }

        public async Task AddCategorySizeAsync(CategorySizeDTO categorySizeDTO)
        {
            var categorySize = _mapper.Map<CategorySizeEntity>(categorySizeDTO);
            await _categorySizeRepository.AddAsync(categorySize);
            await _categorySizeRepository.SaveAsync();
        }
        public async Task AddSizeAsync(SizeDTO SizeDTO)
        {
            var Size = _mapper.Map<SizeEntity>(SizeDTO);
            await _sizeRepository.AddAsync(Size);
            await _sizeRepository.SaveAsync();
        }

        public async Task<IEnumerable<CategorySizeDTO>> GetAllCategorySizesAsync()
        {
            var categorySizes = await _categorySizeRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CategorySizeDTO>>(categorySizes);
        }

        public async Task<IEnumerable<SizeDTO>> GetAllSizesAsync()
        {
            var Sizes = await _sizeRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<SizeDTO>>(Sizes);
        }
        public async Task<IEnumerable<SizeDTO>> GetSizesByCategoryIdAsync(int categoryId)
        {
            var Sizes = await _sizeRepository.GetAllAsync(i => i.CategorySizeId == categoryId);
            return _mapper.Map<IEnumerable<SizeDTO>>(Sizes);
        }
        public async Task<SizeDTO> GetSizeByIdAsync(int id)
        {
            var Sizes = await _sizeRepository.GetByIdAsync(id);
            return _mapper.Map<SizeDTO>(Sizes);
        }

        public async Task<CategorySizeDTO> GetCategorySizeByIdAsync(int id)
        {
            var CategorySizes = await _categorySizeRepository.GetByIdAsync(id);
            return _mapper.Map<CategorySizeDTO>(CategorySizes);
        }


        public async Task SoftDeleteSizeAsync(int id)
        {
            await _sizeRepository.SoftDeleteAsync(id);
        }
        public async Task SoftDeleteCategorySizeAsync(int id)
        {
            await _categorySizeRepository.SoftDeleteAsync(id);
        }


        public async Task<SizeDTO> UpdateAndCopySizeAsync(int id, SizeDTO NewSizeData)
        {
            var existingSize = await _sizeRepository.GetByIdAsync(id);
            if (existingSize == null)
                throw new ArgumentException($"Entity with ID {id} not found.");

            existingSize.Status = false;
            await _sizeRepository.SaveAsync();

            var newSize = _mapper.Map<Size>(NewSizeData);
            await _sizeRepository.AddAsync(newSize);
            await _sizeRepository.SaveAsync();
           
            return _mapper.Map<SizeDTO>(newSize);
        }
        public async Task<CategorySizeDTO> UpdateAndCopyCategorySizeAsync(int id, CategorySizeDTO NewCategorySizeData)
        {
            var existingCategorySize = await _categorySizeRepository.GetByIdAsync(id);
            if (existingCategorySize == null)
                throw new ArgumentException($"Entity with ID {id} not found.");

            existingCategorySize.Status = false;
            await _categorySizeRepository.SaveAsync();

            var newCategorySize = _mapper.Map<CategorySize>(NewCategorySizeData);
            await _categorySizeRepository.AddAsync(newCategorySize);
            await _categorySizeRepository.SaveAsync();
           
            return _mapper.Map<CategorySizeDTO>(newCategorySize);
        }
    }
}

