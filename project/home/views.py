
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import Task
from .forms import TaskForm
def home(request):
    tasks = Task.objects.all()
    return render(
        request,
        'home/home.html',
        {'tasks': tasks}
    )


def header(request):
    return render(
        request,
        'base project/header.html',
        {}
    )


def footer(request):
    return render(
        request,
        'base project/footer.html',
        {}
    )


def add_task(request):
    if request.method == 'POST':
        form = TaskForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')  # هدایت به صفحه اصلی بعد از ذخیره موفقیت‌آمیز
    else:
        form = TaskForm()

    return render(request, 'home/home.html', {'form': form})







# تغییر وضعیت تکمیل
def toggle_complete(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    task.is_completed = not task.is_completed
    task.save()
    return JsonResponse({'status': 'ok'})

# ویرایش تسک
def edit_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    if request.method == 'POST':
        form = TaskForm(request.POST, request.FILES, instance=task)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = TaskForm(instance=task)
    return render(request, 'edit_task.html', {'form': form})

# حذف تسک
def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    if request.method == 'POST':
        task.delete()
        return redirect('home')
    return render(request, 'confirm_delete.html', {'task': task})
