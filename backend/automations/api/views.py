import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from automations.api.serializers import AutomationSerializer
from automations.models import Automation
from scrape.tasks import run

@api_view(['POST'])
def create_view(request):
    if request.session.has_key("username"):   
        current_user = request.session["username"]
        request.data.update({"owner": current_user, "cols": json.dumps(request.data.get("cols"))})
        serializer = AutomationSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            run.delay(Automation.objects.get(owner=request.data.get("sheet_name")))
        else:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        return Response(current_user, status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status.HTTP_401_UNAUTHORIZED)
