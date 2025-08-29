using AutoMapper;
using SOBHWMASA.Data;
using SOBHWMASA.Service.Implementation.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CategoryIngredientEntity = SOBHWMASA.Domain.Entities.Products.CategoryIngredient;
using IngredientEntity = SOBHWMASA.Domain.Entities.Products.Ingredient;
using CategoryIngredientDTO = SOBHWMASA.Infrastructure.ViewModel.Products.Ingredient.CategoryIngredientDTO;
using IngredientDTO = SOBHWMASA.Infrastructure.ViewModel.Products.Ingredient.IngredientDTO;
using SOBHWMASA.Domain.Entities.Products;
namespace SOBHWMASA.Service.Implementation.Service
{
    public class IngredientService : IIngredient
    {
        private readonly IRepository<CategoryIngredientEntity> _categoryIngredientRepository;
        private readonly IRepository<IngredientEntity> _ingredientRepository;
        private readonly IMapper _mapper;
        public IngredientService(
            IRepository<CategoryIngredientEntity> CategoryIngredientRepository,
            IRepository<IngredientEntity> IngredientRepository,
            IMapper mapper)

        {
            _categoryIngredientRepository = CategoryIngredientRepository;
            _ingredientRepository = IngredientRepository;
            _mapper = mapper;
        }
        public async Task AddCategoryIngredientAsync(CategoryIngredientDTO categoryIngredientDTO)
        {
            var categoryIngredient = _mapper.Map<CategoryIngredientEntity>(categoryIngredientDTO);
            await _categoryIngredientRepository.AddAsync(categoryIngredient);
            await _categoryIngredientRepository.SaveAsync();
        }

        public async Task AddIngredientAsync(IngredientDTO ingredientDTO)
        {
            var ingredient = _mapper.Map<IngredientEntity>(ingredientDTO);
            await _ingredientRepository.AddAsync(ingredient);
            await _ingredientRepository.SaveAsync();
        }

        public async Task<IEnumerable<CategoryIngredientDTO>> GetAllCategoryIngredientsAsync()
        {
            var categoryIngredients = await _categoryIngredientRepository.GetAllAsync();
            var activeIngredients = categoryIngredients
       .Where(ci => ci.Status) // or ci.Status == true
       .ToList();

            return _mapper.Map<IEnumerable<CategoryIngredientDTO>>(activeIngredients);
        }

        public async Task<IEnumerable<IngredientDTO>> GetAllIngredientsAsync()
        {
            var ingredients = await _ingredientRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<IngredientDTO>>(ingredients);
        }

       
        public async Task<IEnumerable<IngredientDTO>> GetIngredientsByCategoryIdAsync(int categoryId)
        {
            var ingredients = await _ingredientRepository.GetAllAsync(i => i.CategoryIngredientId == categoryId);
            return _mapper.Map<IEnumerable<IngredientDTO>>(ingredients);
        }

        public async Task<IEnumerable<IngredientDTO>> GetIngredientsByIdAsync(int id)
        {
            var ingredients = await _ingredientRepository.GetByIdAsync(id);
            return _mapper.Map<IEnumerable<IngredientDTO>>(ingredients);
        }

        public async Task<CategoryIngredientDTO> GetCategoryIngredientsByIdAsync(int id)
        {
            var CategoryIngredients = await _categoryIngredientRepository.GetByIdAsync(id);
            return _mapper.Map<CategoryIngredientDTO>(CategoryIngredients);
        }

        
        public async Task SoftDeleteIngredientAsync(int id)
        {
            await _ingredientRepository.SoftDeleteAsync(id);
        }
        public async Task SoftDeleteCategoryIngredientAsync(int id)
        {
            await _categoryIngredientRepository.SoftDeleteAsync(id);
        }

        
        public async Task<IngredientDTO> UpdateAndCopyIngredientAsync(int id , IngredientDTO updatedDto)
        {
            var existingIngredient = await _ingredientRepository.GetByIdAsync(id);
            if (existingIngredient == null)
                throw new ArgumentException($"Entity with ID {id} not found.");

            existingIngredient.Status = false;
            await _ingredientRepository.SaveAsync();

            var newIngredient = _mapper.Map<IngredientEntity>(updatedDto);
            newIngredient.Status = true;
            await _ingredientRepository.AddAsync(newIngredient);
            await _ingredientRepository.SaveAsync();


            return _mapper.Map<IngredientDTO>(newIngredient);
        }
        public async Task<CategoryIngredientDTO> UpdateAndCopyCategoryIngredientAsync(int id, CategoryIngredientDTO updatedDto)
        {
            var existingCategoryIngredient = await _categoryIngredientRepository.GetByIdAsync(id);
            if (existingCategoryIngredient == null)
                throw new ArgumentException($"Entity with ID {id} not found.");

            existingCategoryIngredient.Status = false;
            await _categoryIngredientRepository.SaveAsync();

            var newCategoryIngredient = _mapper.Map<CategoryIngredientEntity>(updatedDto);
            newCategoryIngredient.Status = true;
            await _categoryIngredientRepository.AddAsync(newCategoryIngredient);
            await _categoryIngredientRepository.SaveAsync();
            
            return _mapper.Map<CategoryIngredientDTO>(newCategoryIngredient);
        }
    }
}
