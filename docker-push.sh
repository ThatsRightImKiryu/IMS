#!/bin/bash

cd backend
docker build . -t cr.yandex/crp1eos7geaq6pnfkbv2/api:latest
docker push cr.yandex/crp1eos7geaq6pnfkbv2/api:latest

cd ../frontend
docker build . -t cr.yandex/crp1eos7geaq6pnfkbv2/frontend:latest
docker push cr.yandex/crp1eos7geaq6pnfkbv2/frontend:latest

# kubectl set image deployment/api api=cr.yandex/crp1eos7geaq6pnfkbv2/api:latest
# kubectl set image deployment/frontend frontend=cr.yandex/crp1eos7geaq6pnfkbv2/frontend:latest
kubectl rollout restart deployment/api
kubectl rollout restart deployment/frontend