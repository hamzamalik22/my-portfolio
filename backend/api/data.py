import os
import django

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import Profile, About, Testimonial, Education, Experience, Skill, Category, Project, Message

# Replace "yourproject" and "yourapp" with your actual project/app names above!

# Create Profile
Profile.objects.create(
    name="Hamza Malik",
    profile_picture="https://res.cloudinary.com/dut0so6xj/image/upload/v1746455230/hxuwga0tza3uydkxy4ug.jpg",
    job_title="Full Stack Developer",
    email="hamzamalikaj22@gmail.com",
    phone="1234567890",
    city="Jhelum",
    province="Punjab",
    country="Pakistan",
    date_of_birth="2003-12-21",
    linkedin="https://linkedin.com/in/hamzamalik22",
    instagram="https://instagram.com/mayaxhamzamalik",
    github="https://github.com/hamzamalik22"
)

# Create About
About.objects.create(
    para1="This is a brief introduction to the about section.",
    para2="This paragraph contains further information on the services offered.",
    service_1_title="Web Development",
    service_1_description="We create responsive and user-friendly websites.",
    service_2_title="Mobile Development",
    service_2_description="We develop mobile applications for Android and iOS.",
    service_3_title="Consulting",
    service_3_description="We provide technical consulting services to businesses.",
    service_4_title="Design",
    service_4_description="We offer UI/UX design for digital products."
)

# Testimonial
Testimonial.objects.create(
    name="Jane Smith",
    message="This is a great service! I highly recommend it.",
    gender="Female",
    date="2023-04-15"
)

# Education
Education.objects.create(
    order=1,
    school_name="Harvard University",
    start_year=2010,
    end_year=2014,
    description="Bachelor's degree in Computer Science."
)

# Experience
Experience.objects.create(
    order=1,
    company_name="Google",
    job_title="Software Engineer",
    start_year=2015,
    end_year="Present",
    description="Developing web applications and improving system performance."
)

# Skill
Skill.objects.create(
    name="Python Programming",
    level_in_percent=90
)

# Category + Project
category = Category.objects.create(title="Web Development")
Project.objects.create(
    order=1,
    title="Portfolio Website",
    featured_image="sample_image_url",
    category=category,
    link="https://github.com/johndoe/portfolio"
)

# Message
# Message.objects.create(
#     name="Mark Johnson",
#     email="mark.johnson@example.com",
#     message="This is a sample message for testing."
# )

print("Data has been successfully created!")
