using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SOBHWMASA.Infrastructure.ViewModel.Products.Meal;
using SOBHWMASA.Domain.Entities.Products;
using AutoMapper;
using SOBHWMASA.Data;
using SOBHWMASA.Infrastructure.ViewModel.Products.Ingredient;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using SOBHWMASA.Service.Implementation.IService.IProduct;
namespace SOBHWMASA.Service.Implementation.Service.Product
{
    public class MealService : IMealService
    {
        private readonly IRepository<Meal> _mealRepository;
        private readonly IRepository<CategoryMeal> _categoryMealRepository;
        private readonly IRepository<MealSize> _mealSizeRepository;
        private readonly IRepository<MealIngredient> _mealIngredientRepository;
        private readonly IMapper _mapper;
        private readonly string _webRootPath;
        private readonly string _uploadsFolder;

        public MealService(
            IRepository<Meal> mealRepository,
            IRepository<CategoryMeal> categoryMealRepository,
            IRepository<MealSize> mealSizeRepository,
            IRepository<MealIngredient> mealIngredientRepository,
            IMapper mapper,
            string webRootPath)
        {
            _mealRepository = mealRepository;
            _categoryMealRepository = categoryMealRepository;
            _mealSizeRepository = mealSizeRepository;
            _mealIngredientRepository = mealIngredientRepository;
            _mapper = mapper;
            _webRootPath = webRootPath;
            _uploadsFolder = Path.Combine(_webRootPath, "uploads", "meals");

            // Ensure uploads directory exists
            Directory.CreateDirectory(_uploadsFolder);
        }

        public async Task AddCategoryMealAsync(CategoryMealDTO categoryMealDTO)
        {
            var CategoryMeal = _mapper.Map<CategoryMeal>(categoryMealDTO);
            await _categoryMealRepository.AddAsync(CategoryMeal);
            await _categoryMealRepository.SaveAsync();
        }

        public async Task AddMealAsync(MealDTO mealDTO)
        {
            if (mealDTO.MealIngredients == null || mealDTO.MealIngredients.Count == 0)
            {
                throw new InvalidOperationException("At least one ingredient is required");
            }
            if (string.IsNullOrEmpty(mealDTO.ImageFileBase64))
            {
                throw new ArgumentException("No image file provided");
            }
            var imageUrl = await SaveMealImageFromBase64(mealDTO.ImageFileBase64);

            var meal = _mapper.Map<Meal>(mealDTO);
            meal.ImageUrl = imageUrl;
            await _mealRepository.AddAsync(meal);
            await _mealRepository.SaveAsync();

            foreach (var sizeDTO in mealDTO.MealSizes)
            {
                var mealSize = new MealSize
                {
                    MealId = meal.MealId,
                    SizeId = sizeDTO.SizeId,
                    Price = sizeDTO.Price,
                    Status = true
                };
                await _mealSizeRepository.AddAsync(mealSize);
            }

            foreach (var ingredientDTO in mealDTO.MealIngredients)
            {
                var mealIngredient = new MealIngredient
                {
                    MealId = meal.MealId,
                    IngredientId = ingredientDTO.IngredientId,
                    Status = true
                };
                await _mealIngredientRepository.AddAsync(mealIngredient);
            }

            await _mealSizeRepository.SaveAsync();
            await _mealIngredientRepository.SaveAsync();
        }
        private async Task<string> SaveMealImageFromBase64(string base64String)
        {
            if (string.IsNullOrEmpty(base64String))
                throw new ArgumentException("Base64 image string cannot be null or empty.");

            // Clean the base64 string (remove prefix like "data:image/jpeg;base64,")
            var base64Data = base64String;
            var mimeType = "";
            if (base64String.Contains(","))
            {
                var parts = base64String.Split(',');
                if (parts.Length > 1)
                {
                    mimeType = parts[0]; // e.g., "data:image/png;base64"
                    base64Data = parts[1];
                }
            }

            // Determine file extension from MIME type or default to .png
            string extension = ".png"; // Default
            if (mimeType.Contains("image/jpeg")) extension = ".jpeg";
            else if (mimeType.Contains("image/jpg")) extension = ".jpg";
            else if (mimeType.Contains("image/png")) extension = ".png";
            else if (mimeType.Contains("image/gif")) extension = ".gif";

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            if (!allowedExtensions.Contains(extension))
                throw new InvalidOperationException("Invalid image file type derived from Base64 string.");

            byte[] imageBytes;
            try
            {
                imageBytes = Convert.FromBase64String(base64Data);
            }
            catch (FormatException)
            {
                throw new InvalidOperationException("Invalid Base64 string format.");
            }

            // Validate file size (e.g., 5MB max)
            if (imageBytes.Length > 5 * 1024 * 1024) // 5 MB
                throw new InvalidOperationException("File size exceeds 5MB limit.");

            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(_uploadsFolder, fileName);

        

            // Save file
            await File.WriteAllBytesAsync(filePath, imageBytes);

            return $"/uploads/meals/{fileName}"; // Return the relative URL
        }

        public async Task<IEnumerable<CategoryMealDTO>> GetAllCategoryMealsAsync()
        {
            var CategoryMeals = await _categoryMealRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CategoryMealDTO>>(CategoryMeals);
        }

        public async Task<IEnumerable<MealDTO>> GetAllMealsAsync()
        {
            var meals = await _mealRepository.GetAllAsync();
            var mealsizes = await _mealSizeRepository.GetAllAsync();
            var mealingredients = await _mealIngredientRepository.GetAllAsync();

            var mealDtos = new List<MealDTO>();
            foreach (var meal in meals) { 
            
                var mealDto = _mapper.Map<MealDTO>(meal);

                mealDto.MealSizes = mealsizes
                    .Where(ms => ms.MealId == meal.MealId)
                    .Select(ms => _mapper.Map<MealSizeDTO>(ms))
                    .ToList();
                mealDto.MealIngredients = mealingredients
                    .Where(ms => ms.MealIngredientId == meal.MealId)
                    .Select(ms => _mapper.Map<MealIngredientDTO>(ms))
                    .ToList();
                if (!string.IsNullOrEmpty(meal.ImageUrl))
                {
                    var imagePath = Path.Combine(_webRootPath, meal.ImageUrl.TrimStart('/')); // Construct full path

                    if (File.Exists(imagePath))
                    {
                        try
                        {
                            byte[] imageBytes = await File.ReadAllBytesAsync(imagePath);
                            mealDto.ImageFileBase64 = Convert.ToBase64String(imageBytes);

                            // Optional: Determine image MIME type if you want to include "data:image/jpeg;base64," on frontend
                            // For simplicity, frontend can prepend a generic "data:image/jpeg;base64," or you can try to infer type here.
                            // For now, just sending the raw Base64 string.
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Error converting image {meal.ImageUrl} to Base64: {ex.Message}");
                            mealDto.ImageFileBase64 = null; // Set to null if conversion fails
                        }
                    }
                    else
                    {
                        Console.WriteLine($"Image file not found at: {imagePath}");
                        mealDto.ImageFileBase64 = null; // Set to null if file doesn't exist
                    }
                }
                else
                {
                    mealDto.ImageFileBase64 = null; // No image URL
                }
                mealDtos.Add(mealDto);
            }

            return _mapper.Map<IEnumerable<MealDTO>>(mealDtos);
        }

        public async Task<IEnumerable<MealDTO>> GetMealsByCategoryIdAsync(int categoryId)
        {
            var Meals = await _mealRepository.GetAllAsync(m => m.CategoryMealId == categoryId);
            return _mapper.Map<IEnumerable<MealDTO>>(Meals);
        }

        public async Task<MealDTO> GetMealByIdAsync(int id)
        {
            // Get the meal
            var meal = await _mealRepository.GetByIdAsync(id);
            if (meal == null)
                throw new ArgumentException($"Meal with ID {id} not found.");

            var mealDto = _mapper.Map<MealDTO>(meal);

            // Meal Sizes with names
            var mealSizes = await _mealSizeRepository.GetAllAsync(
                ms => ms.MealId == id,
                include: q => q.Include(ms => ms.Size)  // 👈 load Size
                     );
            mealDto.MealSizes = mealSizes.Select(ms => new MealSizeDTO
            {
                MealSizeId = ms.MealSizeId,
                SizeId = ms.SizeId,
                Price = ms.Price,
                Status = ms.Status,
                NameEnglish = ms.Size?.NameEnglish,
                NameArabic = ms.Size?.NameArabic
            }).ToList();

            // Meal Ingredients with names
            var mealIngredients = await _mealIngredientRepository.GetAllAsync(
                mi => mi.MealId == id,
                include: q => q.Include(mi => mi.Ingredient)  // 👈 load Ingredient
                );
            mealDto.MealIngredients = mealIngredients.Select(mi => new MealIngredientDTO
            {
                IngredientId = mi.IngredientId,
                NameEnglish = mi.Ingredient?.NameEnglish,
                NameArabic = mi.Ingredient?.NameArabic,
                Status = mi.Status
            }).ToList();

            // Convert image to Base64
            if (!string.IsNullOrEmpty(meal.ImageUrl))
            {
                var imagePath = Path.Combine(_webRootPath, meal.ImageUrl.TrimStart('/'));
                if (File.Exists(imagePath))
                {
                    try
                    {
                        var imageBytes = await File.ReadAllBytesAsync(imagePath);
                        mealDto.ImageFileBase64 = Convert.ToBase64String(imageBytes);
                    }
                    catch
                    {
                        mealDto.ImageFileBase64 = null;
                    }
                }
                else
                {
                    mealDto.ImageFileBase64 = null;
                }
            }

            return mealDto;
        }

        public async Task<IEnumerable<CategoryMealDTO>> GetCategoryMealByIdAsync(int categoryId)
        {
            var CategoryMeals = await _categoryMealRepository.GetByCategoryIdAsync(categoryId);
            return _mapper.Map<IEnumerable<CategoryMealDTO>>(CategoryMeals);
        }

        public async Task SoftDeleteCategoryMealAsync(int id)
        {
            await _categoryMealRepository.SoftDeleteAsync(id);

        }

        public async Task SoftDeleteMealAsync(int id)
        {
            await _mealRepository.SoftDeleteAsync(id);
        }

        public async Task<CategoryMealDTO> UpdateAndCopyCategoryMealAsync(int id, CategoryMealDTO NewCategoryMealData)
        {
            var existingCategoryMeal = await _categoryMealRepository.GetByIdAsync(id);
            if (existingCategoryMeal == null)
                throw new ArgumentException($"Entity with ID {id} not found.");

            existingCategoryMeal.Status = false;
            await _categoryMealRepository.SaveAsync();

            var newCategoryMeal = _mapper.Map<CategoryMeal>(NewCategoryMealData);
            await _categoryMealRepository.AddAsync(newCategoryMeal);
            await _categoryMealRepository.SaveAsync();
            
            return _mapper.Map<CategoryMealDTO>(newCategoryMeal);
            
        }

        public async Task<MealDTO> UpdateAndCopyMealAsync(int id, MealDTO NewMealData)
        {
            var existingMeal = await _mealRepository.GetByIdAsync(id);
            if (existingMeal == null)
                throw new ArgumentException($"Meal with ID {id} not found.");

            // Set the existing Meal status to false
            existingMeal.Status = false;
             _mealRepository.Update(existingMeal);

            // Set MealSize status to false
            var mealSizes = await _mealSizeRepository.GetAllAsync(ms => ms.MealId == id);
            foreach (var mealSize in mealSizes)
            {
                mealSize.Status = false;
                 _mealSizeRepository.Update(mealSize);
            }

            // Set MealIngredient status to false
            var mealIngredients = await _mealIngredientRepository.GetAllAsync(mi => mi.MealId == id);
            foreach (var mealIngredient in mealIngredients)
            {
                mealIngredient.Status = false;
                _mealIngredientRepository.Update(mealIngredient);
            }

            await _mealRepository.SaveAsync();
            var newMeal = _mapper.Map<Meal>(NewMealData);

            await _mealRepository.AddAsync(newMeal);
            await _mealRepository.SaveAsync();
            foreach (var mealsize in mealSizes)
            {
                var newMealSize = new MealSize
                {
                    MealId = newMeal.MealId,
                    SizeId = mealsize.SizeId,
                    Price = mealsize.Price,
                    Status = true
                };
                await _mealSizeRepository.AddAsync(newMealSize);
            }
            foreach (var mealIngredient in mealIngredients)
            {
                var newMealIngredient = new MealIngredient
                {
                    MealId = newMeal.MealId, // Now assigned by DB
                    IngredientId = mealIngredient.IngredientId,
                    Status = true
                };
                await _mealIngredientRepository.AddAsync(newMealIngredient);
            }

            await _mealSizeRepository.SaveAsync();
            await _mealIngredientRepository.SaveAsync();
            return _mapper.Map<MealDTO>(newMeal);
        }
    }
}
