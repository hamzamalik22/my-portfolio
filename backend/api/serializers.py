from rest_framework import serializers
from .models import *


class ProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = "__all__"

    def get_profile_picture(self, obj):
        request = self.context.get("request", None)
        if request is not None:
            return request.build_absolute_uri(obj.profile_picture.url)
        return obj.profile_picture.url


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = "__all__"


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__"


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    featured_image = serializers.SerializerMethodField()
    category = CategorySerializer(many=False)

    class Meta:
        model = Project
        fields = "__all__"

    def get_featured_image(self, obj):
        request = self.context.get("request", None)
        if request is not None:
            return request.build_absolute_uri(obj.featured_image.url)
        return obj.featured_image.url


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
