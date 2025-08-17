let menuEl=document.getElementById("headmenu");

let logInFormEl =document.getElementById("logInForm")

function init() {
    changeMenu()
 
      
 
    if(registerForm) {
       document.getElementById("submits").addEventListener("click", createUser); 
    }
       if(logInFormEl) {
        logInFormEl.addEventListener("submit", loginUser) }

          if(starterForm) {
      document.getElementById("addFlag").addEventListener("click", createStarter);
    }
   
    }

    function changeMenu(){

    // localStorage.setItem("user_token", "testtest")

    if(localStorage.getItem("user_token")) {
        menuEl.innerHTML= `
                   <li class="liheadmenu"><a href="index.html">Startsida</a></li>
          
            
            <li class="liheadmenu"><a href="secretPage.html">secret</a></li>
            <li class="liheadmenu"><button id="logoutButton">Logga ut</button></li>
        
        `

    } else { 
        
           menuEl.innerHTML= `
              <li class="liheadmenu"><a href="index.html">Startsida</a></li>
             <li class="liheadmenu"><a href="register.html">Registrera dig</a></li>
           
               <li class="liheadmenu"><a href="login.html">Logga in</a></li>
        
        `

           //<li class="liheadmenu"><a href="register.html">Startsida</a></li>
    }

    let logoutButton= document.getElementById("logoutButton");
    if(logoutButton) {
        logoutButton.addEventListener("click", ()=> {
            localStorage.removeItem("user_token");
            window.location.href="login.html"

        })
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

        const resp = await fetch("http://127.0.0.1:3000/api/login", {
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

            const response = await fetch ("http://127.0.0.1:3000/api/register", {
                method: "POST",
                headers: {
                    "content-type": "Application/json"
                },
                body: JSON.stringify(user)
            })
            const data= await response.json();
            console.log(data);
            
        }




        async function createStarter (e){

            e.preventDefault();
            let sNameEl=document.getElementById("sName")
            let sPriceEl=document.getElementById("sPrice")
            let sDescriptionEl=document.getElementById("sDescription")
     

            let sName=sNameEl.value
            let sPrice=sPriceEl.value
            let sDescription=sDescriptionEl.value
        

            let starter = {  
            sName: sName,
            sPrice: sPrice,
            sDescription: sDescription,
            }
            const token = localStorage.getItem("user_token")

            try {const response = await fetch ("http://127.0.0.1:3000/api/starters", {
                method: "POST",
                headers: {
                    "content-type": "Application/json",
                    "authorization":"Bearer " + token
                },
                body: JSON.stringify(starter)
            })

            if(response.ok) {
            const data= await response.json();
            console.log(data);
            
        
        } }catch(error) {

            console.log("går ej att lägga till starter" +error);
            
        }
    }

