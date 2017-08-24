from django.db import models


GENDERS = (
    (0, 'male'),
    (1, 'female'),
    (2, 'either')
)

CATEGORIES = (
    (0, 'profile'),
    (1, 'message'),
    (2, 'any')
)


class Item(models.Model):
    text = models.CharField(max_length=300, unique=True)
    translation = models.CharField(max_length=300)
    gender = models.IntegerField(choices=GENDERS)
    category = models.IntegerField(choices=CATEGORIES)

    def __str__(self):
        return f"Item: {self.text}"


STARTING_ITEMS = [
    ("I swiped right for your dog", "I love dogs", 2, 0),
    ("Unicorn", "Woman who wants a threesome with a couple", 1, 0),
    ("Time-waster", "Attractive guy who sends mixed messages", 1, 0),
]


def populate_items():
    for item in STARTING_ITEMS:
        item_db = Item(text=item[0], translation=item[1], gender=item[2], category=item[3])
        item_db.save()
    