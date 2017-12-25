from django.shortcuts import render


def load_page(request, template, context):
    context['nav_items'] = make_nav_items()
    return render(request, template, context)


def make_nav_items():
    return [
        {
            'page_name': 'Home',
            'url': '/home/',
            'app_name': 'home',
        },
        {
            'page_name': 'Projects',
            'url': '/projects/',
            'app_name': 'projects',
        },
        {
            'page_name': 'About',
            'url': '/about/',
            'app_name': 'about',
        }
    ]
