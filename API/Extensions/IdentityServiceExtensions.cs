using System.Text;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
        IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<DataContext>(); // Allow us to query users in the Entity Framework Store or database

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddAuthorization(opt =>
                        {
                            opt.AddPolicy("IsActivityHost", policy =>
                            {
                                policy.Requirements.Add(new IsHostRequirement());
                            });
                        });

            /** Scope the token service to the HTTP request. When HTTP request comes in,
            this will go to Account Controller and request a token when user attempting to 
            log in. **/
            services.AddScoped<TokenService>();

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            
            return services;
        }

    }
}
