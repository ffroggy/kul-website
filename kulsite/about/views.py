from kulsite.views import load_page


def index(request):
    return load_page(request, 'about/index.html', {})
