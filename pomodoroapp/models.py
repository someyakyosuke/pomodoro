from django.db import models
from accounts.models import CustomUser


# Create your models here.
class Focus(models.Model):
    CHOICE = [
    ('1','1'),
    ('2','2'),
    ('3','3'),
    ('4','4'),
    ('5','5'),
    ('6','6'),
    ('7','7'),
    ('8','8'),
    ('9','9'),
    ('10','10')
    ]

    user = models.ForeignKey(CustomUser,verbose_name='ユーザー',on_delete=models.PROTECT)
    shuutyuudo = models.CharField(verbose_name='集中度',choices=CHOICE, max_length=2,default=None)
    start_at = models.DateTimeField(verbose_name='スタート日時',auto_now_add=True)
    end_at = models.DateTimeField(verbose_name='終了日時',auto_now=True)

    class Meta:
        verbose_name_plural='Focus'
    def __str__(self):
        return self.shuutyuudo