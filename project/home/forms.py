from django import forms
from .models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'description', 'image']  # فیلدهایی که می‌خواهید در فرم نمایش داده شوند
