# Generated by Django 3.1 on 2021-02-11 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pomodoroapp', '0005_auto_20210211_1309'),
    ]

    operations = [
        migrations.AlterField(
            model_name='focus',
            name='shuutyuudo',
            field=models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6'), ('7', '7'), ('8', '8'), ('9', '9'), ('10', '10')], default=None, max_length=2, verbose_name='集中度'),
        ),
    ]
