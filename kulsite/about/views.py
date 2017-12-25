from kulsite.views import load_page


def index(request):
    context = {
        'curr_page': 'about'
    }
    return load_page(request, 'about/index.html', context)
