let menuEl=document.getElementById("headmenu");

let logInFormEl =document.getElementById("logInForm")

let registerFormEl =document.getElementById("registerForm")

let starterFormEl =document.getElementById("starterForm") 

let mainCourseFormEl =document.getElementById("mainCourseForm") 

window.onload=init;
function init() {
    changeMenu()

    let starterEl=document.getElementById("starterForm")

    if(starterEl) {
    getStarters()}

    
    if(mainCourseFormEl) {
    getmainCourses()}
      
 
    if(registerFormEl) {

        
       document.getElementById("submits").addEventListener("click", createUser); 
    }
       if(logInFormEl) {
        logInFormEl.addEventListener("submit", loginUser) }

          if(starterFormEl) {
      document.getElementById("addStarter").addEventListener("click", createStarter);
    }

          if(mainCourseFormEl) {
      document.getElementById("addMainCourse").addEventListener("click", createMainCourse);
    }
    formEl=document.getElementById("form").style.display="none"
    // h2_2El=document.getElementById("h2_2").style.display="none"

    let sectionstarterFormEl=document.getElementById("sectionstarterForm")
    sectionstarterFormEl.style.display="none"
    //  let sectionstarterTableEl=document.getElementById("sectionstarterTable")
    // sectionstarterTableEl.style.display="none"
    let sectionMainCourseFormEl=document.getElementById("sectionMainCourseForm")
    sectionMainCourseFormEl.style.display="none"
   
    // let sectionmainCourseTableEl=document.getElementById("sectionmainCourseTable")
    // sectionmainCourseTableEl.style.display="none"

    let buttonStarters=document.getElementById("buttonStarters")
    buttonStarters.addEventListener("click", showStarters)
      
}

    function showStarters() {
            let sectionstarterFormEl=document.getElementById("sectionstarterForm")
            sectionstarterFormEl.style.display="block"
            // let sectionstarterTableEl=document.getElementById("sectionstarterTable")
            // sectionstarterTableEl.style.display="block"
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

    //funktion för att logga in en anvöndare och att man får en token
    async function loginUser(e) { 
    e.preventDefault();

        //Hämtar värden från inputraderna
        let userEl=document.getElementById("username").value;
        let passwordEl=document.getElementById("password").value;

        //Kontrollerar så att både användarbnamn och lösenord är ifyllt
       if(!userEl||!passwordEl)  {
        console.log("fyll i allt");
        return;
        
       }
       //objekt för användare
       let user = {
        username: userEl,
        password: passwordEl
       }

       try {
        //POST-anrop , hämtar data

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
        //Funktion för att skapa användare
     async function createUser (username,  email, password){
        //Hämtar från html-element
            let usernameEl=document.getElementById("username")
            let emailEl=document.getElementById("email")
            let passwordEl=document.getElementById("password")

              //Hämtar värden från inputraderna
            username=usernameEl.value
            email=emailEl.value
            password=passwordEl.value

              //objekt för användare
            let user = {  
            username: username,
            email: email,
            password:password
            }

            //POST-anrop för att skapa användare

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



            //Funktion för att skapa förrätt
        async function createStarter (e){

            e.preventDefault();
              //Hämtar från html-element
            let sNameEl=document.getElementById("sName")
            let sPriceEl=document.getElementById("sPrice")
            let sDescriptionEl=document.getElementById("sDescription")
     
                //Hämtar värden från inputraderna
            let sName=sNameEl.value
            let sPrice=sPriceEl.value
            let sDescription=sDescriptionEl.value
            
               //objekt för förrätt
            let starter = {  
            sName: sName,
            sPrice: sPrice,
            sDescription: sDescription,
            }
            //Token från när man loggar in
            const token = localStorage.getItem("user_token")

            //POST- hämtar data
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

        //Rensar formulär när man skapat förrätt
            sNameEl.value=""
            sPriceEl.value=""
            sDescriptionEl.value=""
           
        getStarters()

    }

    async function getStarters (){

        //Hämtar data alla starters
        try {const response = await fetch ("http://127.0.0.1:3000/api/starters")
            if(response.ok) {
            const data= await response.json();
            console.log(data);
            displayStarters(data) }} catch {
            console.log("fel");}          
        
     
    }


async function displayStarters (data) {
        let starters = document.getElementById("starters")
        starters.innerHTML=""; //Rensar formulär
      
        //loopar igenom alla förrätter och visar i en tabell
       if(starters) {
        data.forEach(starter => {
           

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
            button2.setAttribute('id',starter.id)
        
            button1.addEventListener("click",deleteStarter)  //Vid klick anropas funktionen deleteStarter
            button2.addEventListener("click",getStarterWithId)  //Vid klick anropas funktionen getStarterWithId
        
        })}

  
    }
        

     
    //Funktion för att deleta en starter
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

            //Funktion för att hämta en starter med ett specifikt id

    async function getStarterWithId(e) {
        
        let id=e.target.id
        console.log(id);

              try {const response = await fetch(`http://127.0.0.1:3000/api/starters/${id}`)
  

            if(response.ok) {
                  const data= await response.json();
                    fillinForm(data)
        
            //  return data
            
            }

                 }catch{console.log("fel");
             }
       

        
     
    }

             //Funktion för att förifylla form med starter med det specifika id:t
    async function  fillinForm(data)  {
      
         
                let formEl=document.getElementById("form") 
                formEl.style.display="block"
                           //visar form
                //let h2_2El=document.getElementById("h2_2") //visar h2
                //h2_2El.style.display="block"
  
                       //Hämtar in data från HTML
                let nameEl = document.getElementById("name")
                let priceEl = document.getElementById("price")
                let descriptionEl = document.getElementById("description")
            
                //fyller i värdet i inputfält
                nameEl.value=data.sName
                priceEl.value=data.sPrice
                descriptionEl.value=data.sDescription
                console.log(data); 

                let h2El=document.getElementById("h2") 
                let h2_2El=document.getElementById("h2_2")
                let text1=document.createTextNode(data.id) //Lägger till id i h2
                let text2=document.createTextNode("Justera rätt "+data.sName+", nr: ") //Lägger till id i h2
                h2El.appendChild(text1)
                h2_2El.appendChild(text2)

    

                    buttonEl=document.getElementById("change")     
                    buttonEl.addEventListener("click", changeForm) //vid click anropas funktionen changeform

            }

            //funktion för att ändra den aktuella förrätten
    async function changeForm(e) {
                e.preventDefault();
                let h2El=document.getElementById("h2")
                let h2_2El=document.getElementById("h2_2")
                let id=h2El.textContent //id för förrätten
                console.log(h2El.textContent);
                    
                formEl=document.getElementById("form")
                formEl=document.getElementById("form").style.display="block" //Visar formulär

                    //Hämtar in data från HTML
                let sNameEl=document.getElementById("name") 
                let sPriceEl=document.getElementById("price")
                let sDescriptionEl=document.getElementById("description")
     
                    //Värden i inputfält (som man ändrar som man vill)
                let sName=sNameEl.value
                let sPrice=sPriceEl.value
                let sDescription=sDescriptionEl.value
        
                    //objekt för förrätt
                let starter = {  
                    sName: sName,
                    sPrice: sPrice,
                    sDescription: sDescription,
                    }

        //     // const token = localStorage.getItem("user_token")
                    //Uppdaterar den specifika förrätten med PUT
            try {const response = await fetch (`http://127.0.0.1:3000/api/starters/${id}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "Application/json",
                    //"authorization":"Bearer " + token
             },
                body: JSON.stringify(starter)
            })

                if(response.ok) {
                const data= await response.json();
                console.log(data);
            
        
         } }catch(error) {

                console.log("går ej att lägga till starter" +error);
            
         }
                //Rensar formulär
                sNameEl.value=""
                sPriceEl.value=""
                sDescriptionEl.value=""
                h2El.textContent=""
                h2_2El.textContent=""
                

                getStarters()               

            }



            

            //Funktion för att skapa förrätt
        async function createMainCourse (e){

            e.preventDefault();
              //Hämtar från html-element
            let mainCourseNameEl=document.getElementById("mainCourseName")
            let mainCoursePriceEl=document.getElementById("mainCoursePrice")
            let mainCourseDescriptionEl=document.getElementById("mainCourseDescription")
     
                //Hämtar värden från inputraderna
            let mainCourseName=mainCourseNameEl.value
            let mainCoursePrice=mainCoursePriceEl.value
            let mainCourseDescription=mainCourseDescriptionEl.value
            
               //objekt för förrätt
            let mainCourse = {  
            mainCourseName: mainCourseName,
            mainCoursePrice: mainCoursePrice,
            mainCourseDescription: mainCourseDescription,
            }
            //Token från när man loggar in
            const token = localStorage.getItem("user_token")

            //POST- hämtar data
            try {const response = await fetch ("http://127.0.0.1:3000/api/mainCourse", {
                method: "POST",
                headers: {
                    "content-type": "Application/json",
                    "authorization":"Bearer " + token
                },
                body: JSON.stringify(mainCourse)
            })

            if(response.ok) {
            const data= await response.json();
            console.log(data);

        
            
        
        } }catch(error) {

            console.log("går ej att lägga till mainCourse" +error);
            
        }

        //Rensar formulär när man skapat förrätt
            mainCourseNameEl.value=""
            mainCoursePriceEl.value=""
            mainCourseDescriptionEl.value=""
           
        getmainCourses()

    }

        async function getmainCourses (){

        //Hämtar data alla starters
        try {const response = await fetch ("http://127.0.0.1:3000/api/mainCourses")
            if(response.ok) {
            const data= await response.json();
            console.log(data);
            displayMainCourses(data) }} catch {
            console.log("fel");}          
        
     
    }

    async function displayMainCourses(data) {
        let mainCourses= document.getElementById("mainCourses")
        mainCourses.innerHTML=""; //Rensar formulär
      
        //loopar igenom alla förrätter och visar i en tabell
       if(mainCourses) {
        data.forEach(mainCourse => {
           

            // <td>${id2}</td>

            let trEl=document.createElement("tr")

            let td1El=document.createElement("td")
            td1El.textContent=(mainCourse.mainCourseName)
            let td2El=document.createElement("td")
            td2El.textContent=(mainCourse.mainCoursePrice)
             let td3El=document.createElement("td")
            td3El.textContent=(mainCourse.mainCourseDescription)
            trEl.appendChild(td1El)
            trEl.appendChild(td2El)
            trEl.appendChild(td3El)
            mainCourses.appendChild(trEl)
            let button1=document.createElement("button")
            let td4El=document.createElement("td")
            trEl.appendChild(td4El)
            td4El.appendChild(button1)
            button1.setAttribute('id',mainCourse.id)
            let text1=document.createTextNode("Ta bort")
            button1.appendChild(text1)
            let button2=document.createElement("button")
            let td5El=document.createElement("td")
            trEl.appendChild(td5El)
            td5El.appendChild(button2)
            let text2=document.createTextNode("Ändra/Justera")
            button2.appendChild(text2)
            button2.setAttribute('id',mainCourse.id)
        
            button1.addEventListener("click",deletemainCourse)  //Vid klick anropas funktionen deleteStarter
            button2.addEventListener("click",getmainCourseWithId)  //Vid klick anropas funktionen getStarterWithId
        
        })}

  
    }

    
        //Funktion för att deleta en starter
    async function deletemainCourse(e){
        let id=(e.target.id)
        console.log(id);
        

             const response = await fetch(`http://127.0.0.1:3000/api/mainCourse/${id}`, 
        
        { method: "DELETE",
          headers: {
                    "content-type": "Application/json"
                 },
          });
          const data= await response.json();
             console.log(data);
           
            getmainCourses()

    }

        async function getmainCourseWithId(e) {
        
        let id=e.target.id
        console.log(id);

              try {const response = await fetch(`http://127.0.0.1:3000/api/mainCourse/${id}`)
  

            if(response.ok) {
                  const data= await response.json();
                    fillinFormMainCourse(data)
        
            //  return data
            
            }

                 }catch{console.log("fel");
             }
       

        
     
    }

      async function  fillinFormMainCourse(data)  {
         
                let formEl=document.getElementById("form") 
                formEl.style.display="block"                //visar form
               // let h2_2El=document.getElementById("h2_2") //visar h2
                //h2_2El.style.display="block"
  
                       //Hämtar in data från HTML
                let nameEl = document.getElementById("name")
                let priceEl = document.getElementById("price")
                let descriptionEl = document.getElementById("description")
            
                //fyller i värdet i inputfält
                nameEl.value=data.mainCourseName
                priceEl.value=data.mainCoursePrice
                descriptionEl.value=data.mainCourseDescription
                console.log(data); 

                let h2El=document.getElementById("h2") 
                let h2_2El=document.getElementById("h2_2")
                let text1=document.createTextNode(data.id) //Lägger till id i h2
                let text2=document.createTextNode("Justera rätt"+data.mainCourseName+", nr: ") //Lägger till id i h2

                h2El.appendChild(text1)
    

                    buttonEl=document.getElementById("change")     
                    buttonEl.addEventListener("click", changeFormMainCourse) //vid click anropas funktionen changeform

            }

                async function changeFormMainCourse(e) {
                e.preventDefault();
                let h2El=document.getElementById("h2")
                let h2_2El=document.getElementById("h2_2")
                let id=h2El.textContent //id för huvudrätten
                console.log(h2El.textContent);
                    
                formEl=document.getElementById("form")
                formEl=document.getElementById("form").style.display="block" //Visar formulär

                    //Hämtar in data från HTML
                let mainCourseNameEl=document.getElementById("name") 
                let mainCoursePriceEl=document.getElementById("price")
                let mainCourseDescriptionEl=document.getElementById("description")
     
                    //Värden i inputfält (som man ändrar som man vill)
                let mainCourseName=mainCourseNameEl.value
                let mainCoursePrice=mainCoursePriceEl.value
                let mainCourseDescription=mainCourseDescriptionEl.value
        
                    //objekt för förrätt
                let mainCourse = {  
                    mainCourseName: mainCourseName,
                    mainCoursePrice: mainCoursePrice,
                    mainCourseDescription: mainCourseDescription,
                    }

        //     // const token = localStorage.getItem("user_token")
                    //Uppdaterar den specifika förrätten med PUT
            try {const response = await fetch (`http://127.0.0.1:3000/api/mainCourse/${id}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "Application/json",
                    //"authorization":"Bearer " + token
             },
                body: JSON.stringify(mainCourse)
            })

                if(response.ok) {
                const data= await response.json();
                console.log(data);
            
        
         } }catch(error) {

                console.log("går ej att lägga till mainCourse" +error);
            
         }
                //Rensar formulär
                mainCourseNameEl.value=""
                mainCoursePriceEl.value=""
                mainCourseDescriptionEl.value=""
                h2El.textContent=""
                h2_2El.textContent=""

                getmainCourses()               

            }
    