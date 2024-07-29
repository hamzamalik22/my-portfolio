from django.shortcuts import render, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *


# Create your views here.
@api_view(["GET"])
def getRoutes(request, format=None):
    routes = [
        {"GET": "/api/profile/"},
        {"GET": "/api/about/"},
        {"GET": "/api/testimonials/"},
        {"GET": "/api/education/"},
        {"GET": "/api/experience/"},
        {"GET": "/api/skill/"},
        {"GET": "/api/project/"},
        {"GET": "/api/category/"},
        {"POST": "/api/message/"},
    ]
    return Response({"Routes": routes})


@api_view(["GET"])
def theProfile(request):
    try:
        profile = Profile.objects.get()
    except Profile.DoesNotExist:
        if request.method == "GET":
            return Response(
                {"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND
            )
        profile = None

    if request.method == "GET":
        serializer = ProfileSerializer(profile, context={"request": request})
        return Response(serializer.data)


@api_view(["GET"])
def theAbout(request):
    try:
        about = About.objects.get()
    except About.DoesNotExist:
        if request.method == "GET":
            return Response(
                {"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND
            )
        about = None

    if request.method == "GET":
        serializer = AboutSerializer(about)
        return Response(serializer.data)


@api_view(["GET"])  # HTTP methods
def theTestimonials(request, format=None):
    if request.method == "GET":  # Checking method
        tests = Testimonial.objects.all()  # Getting all the data in variable
        serializer = TestimonialSerializer(tests, many=True)  # serializing the data
        return Response({"Testimonials": serializer.data})


@api_view(["GET"])
def theEducation(request, format=None):
    if request.method == "GET":
        education = Education.objects.all()
        serializer = EducationSerializer(education, many=True)
        return Response({"Education": serializer.data})


@api_view(["GET"])
def theExperience(request, format=None):
    if request.method == "GET":
        experience = Experience.objects.all()
        serializer = ExperienceSerializer(experience, many=True)
        return Response({"Experience": serializer.data})


@api_view(["GET"])
def theSkill(request, format=None):
    if request.method == "GET":
        skill = Skill.objects.all()
        serializer = SkillSerializer(skill, many=True)
        return Response({"Skill": serializer.data})


@api_view(["GET"])
def theCategory(request, format=None):
    if request.method == "GET":
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response({"Category": serializer.data})


@api_view(["GET"])
def theProject(request, format=None):
    if request.method == "GET":
        projects = Project.objects.all()
        serializer = ProjectSerializer(
            projects, many=True, context={"request": request}
        )
        return Response({"Project": serializer.data})


@api_view(["POST"])
def theMessage(request, format=None):
    if request.method == "POST":
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
