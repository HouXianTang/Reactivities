using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        /** 
        OnModelCreating is called when the model for a derived context has been initialized, 
        but before the model has been locked down and used to initialize the context. 
        The default implementation of this method does nothing, but it can be overridden 
        in a derived class such that the model can be further configured before it is locked down.
        */
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Form a primary key in ActivityAttendees table
            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new {aa.ActivityId, aa.AppUserId}));

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Activities)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.Activity)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa => aa.ActivityId);
        }
    }
}