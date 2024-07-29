from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Message(models.Model):
    author = models.ForeignKey(User, related_name="author_messages", on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    timestamp = models.DateTimeField(auto_now_add=True)
    roomid = models.CharField(max_length=500)

    def __str__(self):
        return self.author.username
    
    def last_10_messages(self, room_id):
        return Message.objects.filter(roomid=room_id).order_by('-timestamp').all()[:30]
