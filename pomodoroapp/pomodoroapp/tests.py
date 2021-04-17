from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse_lazy
from .models import Focus
from django.utils import timezone
from django.utils.timezone import localtime # 追加（日本時間にするため）
from datetime import datetime, date,timedelta
# Create your tests here.
class LoggedInTestCase(TestCase):

    def setUp(self):
        self.password = 'pomotest'
    
        self.test_user = get_user_model().objects.create_user(
            username='2021test',
            email='2021test@ezweb.ne.jp',
            password=self.password
        )

        self.client.login(email=self.test_user.email,password=self.password)

class TestPomodoroCreateView(LoggedInTestCase):
    
    def test_index_success(self):
        #集中度の送信がうまくいくかどうかを検証する
        params = {
            'shuutyuudo':'1'
        }
        #送信処理(Post)を実行
        response = self.client.post(reverse_lazy('pomodoroapp:index'),params)
        #リダイレクトされるかどうかを検証
        self.assertRedirects(response,reverse_lazy('pomodoroapp:index'))
        #データがＤＢに登録されたかを検証(start_atが今日の集中度１で調べる)
        today = localtime(timezone.now()).date()
        self.assertEqual(Focus.objects.filter(shuutyuudo=1,start_at__date=today).count(),1)
    

