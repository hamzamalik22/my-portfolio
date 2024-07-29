from django.db import models
from cloudinary.models import CloudinaryField


# Create your models here.
class Profile(models.Model):
    name = models.CharField(max_length=200, null=True)
    profile_picture = CloudinaryField("image")
    job_title = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=200, null=True)
    province = models.CharField(max_length=200, null=True)
    country = models.CharField(max_length=200, null=True)
    date_of_birth = models.CharField(max_length=200, null=True)
    linkedin = models.CharField(max_length=200, null=True)
    instagram = models.CharField(max_length=200, null=True)
    github = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name


class About(models.Model):
    para1 = models.TextField(null=True)
    para2 = models.TextField(null=True)
    service_1_title = models.CharField(max_length=200, null=True)
    service_1_description = models.TextField(null=True)
    service_2_title = models.CharField(max_length=200, null=True)
    service_2_description = models.TextField(null=True)
    service_3_title = models.CharField(max_length=200, null=True)
    service_3_description = models.TextField(null=True)
    service_4_title = models.CharField(max_length=200, null=True)
    service_4_description = models.TextField(null=True)

    def __str__(self):
        return "About Section Data"


class Testimonial(models.Model):
    GENDER = (
        ("Male", "Male"),
        ("Female", "Female"),
    )
    name = models.CharField(max_length=200, null=True)
    message = models.TextField(null=True)
    gender = models.CharField(max_length=200, null=True, choices=GENDER)
    date = models.CharField(max_length=200, null=True)
    

    def __str__(self):
        return self.name


class Education(models.Model):
    order = models.PositiveIntegerField(default=0, null=True)
    school_name = models.CharField(max_length=200, null=True)
    start_year = models.IntegerField(null=True)
    end_year = models.IntegerField(null=True)
    description = models.TextField(null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.school_name

    class Meta:
        ordering = ["order", "start_year"]


class Experience(models.Model):
    order = models.PositiveIntegerField(default=0, null=True)
    company_name = models.CharField(max_length=200, null=True)
    job_title = models.CharField(max_length=200, null=True)
    start_year = models.IntegerField(null=True)
    end_year = models.CharField(max_length=200, null=True, default="Present")
    description = models.TextField(null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.company_name

    class Meta:
        ordering = ["order", "start_year"]


class Skill(models.Model):
    name = models.CharField(max_length=200, null=True)
    level_in_percent = models.IntegerField(null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    title = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title


class Project(models.Model):
    order = models.PositiveIntegerField(default=0, null=True)
    title = models.CharField(max_length=200, null=True)
    featured_image = CloudinaryField("image")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    link = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return str(self.order) + '. ' + self.title

    class Meta:
        ordering = ["order"]


class Message(models.Model):
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    message = models.TextField(null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name + " : " + str(self.date_created)[0:10]
