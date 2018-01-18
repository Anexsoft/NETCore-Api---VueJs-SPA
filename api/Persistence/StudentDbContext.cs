using Microsoft.EntityFrameworkCore;
using Model;

namespace Persistence
{
    public class StudentDbContext : DbContext
    {
        public DbSet<Student> Student { get; set; }

        public StudentDbContext(DbContextOptions<StudentDbContext> options)
            : base(options)
        { }
    }
}
