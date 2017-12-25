from kulsite.views import load_page


def index(request):
    context = {
        'curr_page': 'projects'
    }
    return load_page(request, 'projects/index.html', context)
