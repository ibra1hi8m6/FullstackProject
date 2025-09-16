
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.TeamFoundation.TestManagement.WebApi;
using SOBHWMASA.Data;
using SOBHWMASA.Domain.Entities.Users;
using System.IO.Compression;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.RateLimiting;

namespace SOBHWMASA.APIs.ExtensionsServices
{
    public static class ConfigurationServies
    {
        public static IServiceCollection AddConfigurationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Register your services here

            //services.AddResponseCompression(opts =>
            //{
            //    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
            //        new[] { "application/octet-stream" });
            //});
            //services.Configure<BrotliCompressionProviderOptions>(options =>
            //{
            //    options.Level = CompressionLevel.Optimal;
            //});

            ////services.AddIdentityApiEndpoints<IdentityUser>()
            ////   .AddEntityFrameworkStores<ApplicationDbContext>();
            //services.ConfigureHttpJsonOptions(options =>
            //{
            //    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            //    options.SerializerOptions.WriteIndented = false;
            //});


            //services.AddRateLimiter(options =>
            //{

            //    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
            //        RateLimitPartition.GetFixedWindowLimiter(
            //            partitionKey: context.Request.Headers["X-Forwarded-For"].FirstOrDefault() ??
            //                         context.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
            //            factory: partition => new FixedWindowRateLimiterOptions
            //            {
            //                AutoReplenishment = true,
            //                PermitLimit = 10,
            //                Window = TimeSpan.FromSeconds(1)
            //            }));


            //    options.AddFixedWindowLimiter("BandwidthLimit", options =>
            //    {
            //        options.PermitLimit = 100;
            //        options.Window = TimeSpan.FromMinutes(1);
            //        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
            //        options.QueueLimit = 5;
            //    });

            //    options.OnRejected = async (context, token) =>
            //    {
            //        context.HttpContext.Response.StatusCode = 429;
            //        await context.HttpContext.Response.WriteAsync("Rate limit exceeded", token);
            //    };
            //});


            services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp", policy =>
                {
                    policy.WithOrigins("http://localhost:4200") // Angular app origin
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                          
                });
            });

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(services.BuildServiceProvider().GetRequiredService<IConfiguration>()
                    .GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName));
            });

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "SOBHWMASA API", Version = "v1" });
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please provide a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
            });
    //        services.AddAuthentication(options =>
    //        {
    //            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    //            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

    //        })
    //.AddJwtBearer(o =>
    //{
    //    o.RequireHttpsMetadata = false;
    //    o.SaveToken = false;
    //    o.TokenValidationParameters = new TokenValidationParameters
    //    {
    //        ValidateIssuerSigningKey = true,
    //        ValidateIssuer = true,
    //        ValidateAudience = true,
    //        ValidateLifetime = true,
    //        ValidIssuer = configuration["JWT:Issuer"],
    //        ValidAudience = configuration["JWT:Audience"],
    //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"])),
    //        RoleClaimType = ClaimTypes.Role

    //    };
    //});
    //        services.AddAuthorization();

            //services.AddAuthorization(options =>
            //{
            //    options.FallbackPolicy = new AuthorizationPolicyBuilder()
            //    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
            //    .RequireAuthenticatedUser()
            //    .Build();
            //});


            services.AddHttpContextAccessor();

            services.AddSwaggerGen();
            return services;
        }
    }
}
