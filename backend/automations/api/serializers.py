from rest_framework import  serializers
from automations.models import Automation

class AutomationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Automation
        fields = ['sheet_name', 'url', 'cols', 'owner']