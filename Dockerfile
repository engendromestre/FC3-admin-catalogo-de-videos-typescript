FROM node:20.5.1-slim

# não trabalhar com o usuário root
# bom em termos de segurança e evitar problemas de permissão
USER node

# determinar o diretório de trabalho dentro do container
WORKDIR /home/node/app

# fica lendo de forma indefinida o dispositivo mantendo o container de pé
CMD [ "tail", "-f", "/dev/null" ]