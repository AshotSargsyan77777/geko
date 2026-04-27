function login (users,username,password ){
    const user = users.find(u => u.username === username)


    if(!user){
        console.log("Օգտատերը չի գտնվել")
        return


    }

    if(user.password !== password){
        console.log("Գաղտնաբառը սխալ է")
        return

    }


    if(user.isBlocked){
        console.log("Օգտատերը արգելափակված է")
        return

    }


    console.log(`Բարի Գալուստ ${user.username}`)

}



const users = [
  { username: "admin", password: "1234", isBlocked: false },
  { username: "john", password: "qwerty", isBlocked: true },
  { username: "anna", password: "pass", isBlocked: false }
];

login(users, "admin", "1234");
login(users, "john", "qwerty");
login(users, "anna", "1111");
login(users, "mike", "2222");