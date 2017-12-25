from kulsite.views import load_page


def index(request):
    context = {
        'curr_page': 'home'
    }
    return load_page(request, 'home/index.html', context)

