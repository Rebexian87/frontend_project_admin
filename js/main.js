let menuEl=document.getElementById("headmenu");

let logInFormEl =document.getElementById("logInForm")

let registerFormEl =document.getElementById("registerForm")

let starterFormEl =document.getElementById("starterForm")

window.onload=init;
function init() {
    changeMenu()
    getStarters ()
      
 
    if(registerFormEl) {

        
       document.getElementById("submits").addEventListener("click", createUser); 
    }
       if(logInFormEl) {
        logInFormEl.addEventListener("submit", loginUser) }

          if(starterFormEl) {
      document.getElementById("addStarter").addEventListener("click", createStarter);
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
        getStarters()
    }

async function getStarters (){

       try {const response = await fetch ("http://127.0.0.1:3000/api/starters")
        if(response.ok) {
            const data= await response.json();
            console.log(data);
            displayStarters(data) }} catch {
            console.log("fel");}          
        
     
    }


async function displayStarters (data) {
        let starters = document.getElementById("starters")
        starters.innerHTML="";


        data.forEach(starter => {
            let id1=(starter.id+1)
            let id2=starter.id

            // <td>${id2}</td>

            let trEl=document.createElement("tr")

            let td1El=document.createElement("td")
            td1El.textContent=(starter.sName)
            let td2El=document.createElement("td")
            td2El.textContent=(starter.sPrice)
             let td3El=document.createElement("td")
            td3El.textContent=(starter.sDescription)
            trEl.appendChild(td1El)
            trEl.appendChild(td2El)
            trEl.appendChild(td3El)
            starters.appendChild(trEl)
            let button1=document.createElement("button")
            let td4El=document.createElement("td")
            trEl.appendChild(td4El)
            td4El.appendChild(button1)
            button1.setAttribute('id',starter.id)
            let text1=document.createTextNode("Ta bort")
            button1.appendChild(text1)
            let button2=document.createElement("button")
            let td5El=document.createElement("td")
            trEl.appendChild(td5El)
            td5El.appendChild(button2)
            let text2=document.createTextNode("Ändra/Justera")
            button2.appendChild(text2)
        
             button1.addEventListener("click",deleteStarter)
               button2.addEventListener("click",updateStarter)
        
        })

           


        //   starters.innerHTML+=  `<tr><td>${starter.sName}</td><td>${starter.sPrice}</td><td>${starter.sDescription}</td><td><button id= ${id1}>Ta bort</button></td></tr>`
            //let newElTd= document.createElement ("td")      //Skapar nytt element (li)
          //  newElTd.textContent= (starter.sName+ " " + starter.sPrice+ " "+ starter.sDescription ) //Skapar texten till det som visas i listan

            
             //newElLi.setAttribute('id', flag.id) //Skapar attributet id
        //    newElTD.appendChild(newText) //Lägger newText som "barn" till newElLi
      //      starters.appendChild(newElTd) // Lägger newElLi som "barn" till expEl
    //   id1.addEventListener("click", deleteStarter)
    }
        

     

    async function deleteStarter(e){
        let id=(e.target.id)
        console.log(id);
        

             const response = await fetch(`http://127.0.0.1:3000/api/starters/${id}`, 
        
        { method: "DELETE",
          headers: {
                    "content-type": "Application/json"
                 },
          });
          const data= await response.json();
             console.log(data);
           
              getStarters()

    }

    function updateStarter() {
        
    }