class BankAccount:
    def __init__(self,owner):
        self.owner = owner
        self.balance = 0


    def Deposit(self,amount):
        if amount <= 0:
            print("Error:Gumary petq e lini mec 0-ic")
            return False
        self.balance += amount
        print(self.owner, f"-i hashvin mutqagrvec {amount} gumar")

        
    def Withdraw(self,amount):
        if amount <= 0:
            print("Error:Gumary petqa mec lini 0-ic")
            return False
        if amount > self.balance:
            print(f"Hashvin chka bavarar gumar: Hashvi mnacord {self.balance}")
            return False
        self.balance -= amount
        print(self.owner, f"-i hashvic hajoxutyamb elqagrvec {amount}dram")
        return True



    def Transfer(self,target_account,amount):
        if amount <= 0:
            print("Error:Gumary petqa mec lini 0-ic")
            return False
        if amount > self.balance:
            print(f"Hashvin chka bavarar gumar: Hashvi mnacord {self.balance}")
            return False
        self.balance -= amount
        target_account.balance += amount
        print(f"{amount}dramy hajoxutyamb poxancvec {self.owner}-ic {target_account.owner}-in")
        return True
    
    def Show_info(self):
        print(f"hajaxord {self.owner}:mnacord {self.balance}dram")


account = {}

while True:
    print("\n" + "="*30)
    print("🏦 ԲԱՆԿԱՅԻՆ ՀԱՄԱԿԱՐԳ 🏦")
    print("="*30)
    print("1 — Ստեղծել հաշիվ")
    print("2 — Մուտքագրել գումար")
    print("3 — Հանել գումար")
    print("4 — Փոխանցել գումար")
    print("5 — Ցույց տալ մեկ հաշիվ")
    print("6 — Ցույց տալ բոլոր հաշիվները")
    print("7 — Ջնջել հաշիվ")
    print("8 — Ցույց տալ ամենահարուստ հաճախորդին")
    print("9 — Ցույց տալ վիճակագրությունը")
    print("0 — Ելք")
    print("="*30)



    choice = input("Yntreq 0-9 tvery")