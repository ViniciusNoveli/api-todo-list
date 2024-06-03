import rsa

def main():
    with open('public.pem', "rb") as f:
        public = rsa.PublicKey.load_pkcs1(f.read())

    with open('private.pem', "rb") as f:
        private = rsa.PrivateKey.load_pkcs1(f.read())

    msg = "teste de mensagem"

    with open("encript", "wb") as f:
        encripted = rsa.encrypt(msg.encode(), public)
        print(encripted)
        f.write(encripted)

    encripted2 = open("encript", "rb").read()
    decrpited = rsa.decrypt(encripted2, private)
    print(decrpited)

main()