
function init() {
    // changeMenu()
    //  getFlags()

    // if(logInFormEl) {
    //     logInFormEl.addEventListener("submit", loginUser)
    // }
      
 
    if(registerForm) {
       document.getElementById("submits").addEventListener("click", createUser); 
    }

   
    }

    async function loginUser(e) {
    e.preventDefault();
        let userEl=document.getElementById("username").value;
        let passwordEl=document.getElementById("password").value;

       if(!userEl||!passwordEl)  {
        console.log("fyll i allt");
        return;
        
       }

       let user = {
        username: userEl,
        password: passwordEl
       }

       try {

        const resp = await fetch("http://127.0.0.1:3001/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })

        if(resp.ok) {
            const data = await resp.json();
            // console.log(data);
            localStorage.setItem("user_token", data.response.token);
            window.location.href= "secretPage.html"
            console.log(data.response.token);
            
            
        } else {
            throw error;
        }
       }catch (error) {
        console.log("Fel anv eller lösenro");
        
       }
 
}

     async function createUser (username,  email, password){
            let usernameEl=document.getElementById("username")
            let emailEl=document.getElementById("email")
            let passwordEl=document.getElementById("password")

            username=usernameEl.value
            email=emailEl.value
            password=passwordEl.value

            let user = {  
            username: username,
            email: email,
            password:password
            }

            const response = await fetch ("http://127.0.0.1:3001/api/register", {
                method: "POST",
                headers: {
                    "content-type": "Application/json"
                },
                body: JSON.stringify(user)
            })
            const data= await response.json();
            console.log(data);
            
        }