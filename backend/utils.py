from imagekitio import ImageKit
from django.conf import settings

imagekit = ImageKit(
    private_key=settings.IMAGEKIT_PRIVATE_KEY
)

def upload_image(file):
    response = imagekit.files.upload(
        file=file.read(),
        file_name=file.name
    )

    return response.url
