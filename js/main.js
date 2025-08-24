
//Variabler
let menuEl=document.getElementById("headmenu");
let logInFormEl =document.getElementById("logInForm");
let registerFormEl =document.getElementById("registerForm");
let starterFormEl =document.getElementById("starterForm") ;
let mainCourseFormEl =document.getElementById("mainCourseForm"); 
let dessertFormEl =document.getElementById("dessertForm");
let wineFormEl =document.getElementById("wineForm");


//Händer när sidan startas.
window.onload=init;
function init() {
    changeMenu()

    let starterEl=document.getElementById("starterForm")

    if(starterEl) {
        getStarters()}

    
    if(mainCourseFormEl) {
        getmainCourses()}

    if (dessertFormEl) {
        getDesserts()}

    if (wineFormEl) {
        getWine()}

    
        let sectionstarterFormEl=document.getElementById("sectionstarterForm")
        let sectionMainCourseFormEl=document.getElementById("sectionMainCourseForm")
        let sectionDessertFormEl=document.getElementById("sectionDessertForm")
        let sectionWineFormEl=document.getElementById("sectionWineForm")
 
    if(registerFormEl) {
        
       document.getElementById("submits").addEventListener("click", createUser); }

    if(logInFormEl) {
        logInFormEl.addEventListener("submit", loginUser) }

    if(starterFormEl) {
        document.getElementById("addStarter").addEventListener("click", createStarter);
        formEl=document.getElementById("form").style.display="none"
        sectionstarterFormEl.style.display="none" }

    if(mainCourseFormEl) {
        document.getElementById("addMainCourse").addEventListener("click", createMainCourse);
        mCformEl=document.getElementById("mCform").style.display="none"       
        sectionMainCourseFormEl.style.display="none" } 
   
    if(sectionDessertFormEl) {
        document.getElementById("addDessert").addEventListener("click", createDessert);
        dformEl=document.getElementById("dform").style.display="none"         
        sectionDessertFormEl.style.display="none" }

    if(sectionWineFormEl) {
        document.getElementById("addWine").addEventListener("click", createWine);
        wformEl=document.getElementById("wform").style.display="none"           
        sectionWineFormEl.style.display="none"  }

    
        let buttonsmenu=document.getElementById("buttonsmenu")
        
    if(buttonsmenu){
        //När man trycker på en knapp så visas element tillhörande den knappen
        let buttonStarters=document.getElementById("buttonStarters")
        buttonStarters.addEventListener("click", showStarters)
        let buttonMainCourses=document.getElementById("buttonMainCourses")
        buttonMainCourses.addEventListener("click", showMainCourses)
        let buttonDessert=document.getElementById("buttonDessert")
        buttonDessert.addEventListener("click", showDesserts)
        let buttonWine=document.getElementById("buttonWine")
        buttonWine.addEventListener("click", showWine)}
        let tablereview=document.getElementById("tablereview")

    if (tablereview){
        getReviews()}

    let contactUs=document.getElementById("contactUs")
    
    if(contactUs) {
        getContactUs()}

      
}
    //Funktion som visar element som tillhör förrätter och ser till att resten inte visas
    function showStarters() {
        let sectionMainCourseFormEl=document.getElementById("sectionMainCourseForm")
        sectionMainCourseFormEl.style.display="none"
        let sectionDessertFormEl=document.getElementById("sectionDessertForm")
        sectionDessertFormEl.style.display="none"
        let sectionWineFormEl=document.getElementById("sectionWineForm")
        sectionWineFormEl.style.display="none"
        let sectionstarterFormEl=document.getElementById("sectionstarterForm")
        sectionstarterFormEl.style.display="block"         
    }
    
       //Funktion som visar element som tillhör huvudrätter och ser till att resten inte visas
    function showMainCourses() {
        let sectionstarterFormEl=document.getElementById("sectionstarterForm")
        sectionstarterFormEl.style.display="none"
        let sectionDessertFormEl=document.getElementById("sectionDessertForm")
        sectionDessertFormEl.style.display="none"
        let sectionWineFormEl=document.getElementById("sectionWineForm")
        sectionWineFormEl.style.display="none"        
        let sectionMainCourseFormEl=document.getElementById("sectionMainCourseForm")
        sectionMainCourseFormEl.style.display="block"
    }
       //Funktion som visar element som tillhör desserter och ser till att resten inte visas
    function showDesserts() {
        let sectionstarterFormEl=document.getElementById("sectionstarterForm")
        sectionstarterFormEl.style.display="none"
        let sectionMainCourseFormEl=document.getElementById("sectionMainCourseForm")
        sectionMainCourseFormEl.style.display="none"
        let sectionWineFormEl=document.getElementById("sectionWineForm")
        sectionWineFormEl.style.display="none"
        let sectionDessertFormEl=document.getElementById("sectionDessertForm")
        sectionDessertFormEl.style.display="block"
    }
//Funktion som visar element som tillhör vin och ser till att resten inte visas
    function showWine(){
        let sectionstarterFormEl=document.getElementById("sectionstarterForm")
        sectionstarterFormEl.style.display="none"
        let sectionMainCourseFormEl=document.getElementById("sectionMainCourseForm")
        sectionMainCourseFormEl.style.display="none"     
        let sectionDessertFormEl=document.getElementById("sectionDessertForm")
        sectionDessertFormEl.style.display="none"
        let sectionWineFormEl=document.getElementById("sectionWineForm")
        sectionWineFormEl.style.display="block"
    }

    //Funcktion som visar olika menyer beroende på token.
    function changeMenu(){

    if(localStorage.getItem("user_token")) { 
        //Meny man ser när man har en token
        menuEl.innerHTML= `
            <li class="liheadmenu"><a href="add.html">Menyn</a></li>
            <li class="liheadmenu"><a href="reviews.html">Omdömen</a></li>
            <li class="liheadmenu"><a href="contact.html">Kontakt</a></li>           
            <li class="liheadmenu"><button id="logoutButton">Logga ut</button></li>`

    } else { 
        //Meny man ser när man inte har någon token
        menuEl.innerHTML= `            
            <li class="liheadmenu"><a href="register.html">Registrera dig</a></li>
            <li class="liheadmenu"><a href="login.html">Logga in</a></li>`         
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
        return; }

       //objekt för användare
        let user = {
        username: userEl,
        password: passwordEl
       }

       try {
        //POST-anrop, lägger till data

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
            window.location.href= "add.html"
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
            console.log("går ej att lägga till starter" +error);}


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
            console.log("fel");} }


    async function displayStarters (data) {
        let starters = document.getElementById("starters")
        starters.innerHTML=""; //Rensar formulär
      
        //loopar igenom alla förrätter och visar i en tabell
        if(starters) {
        data.forEach(starter => {
           
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
                const data= await response.json(); //  return data
                fillinForm(data)  }

                 }catch{console.log("fel"); } }


        //Funktion för att förifylla form med starter med det specifika id:t
    async function  fillinForm(data)  {
      
         
                let formEl=document.getElementById("form") 
                formEl.style.display="block"  //visar form                         
              
                //Hämtar in data från HTML
                let nameEl = document.getElementById("sname")
                let priceEl = document.getElementById("sprice")
                let descriptionEl = document.getElementById("sdescription")
            
                //fyller i värdet i inputfält
                nameEl.value=data.sName
                priceEl.value=data.sPrice
                descriptionEl.value=data.sDescription
                console.log(data); 

                let h2El=document.getElementById("h2") 
                let h2_2El=document.getElementById("h2_2")
                h2El.textContent=data.id
                h2_2El.textContent=("Justera "+data.sName+", rätt nr: ")          
                
                buttonEl=document.getElementById("schange")     
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
                let sNameEl=document.getElementById("sname") 
                let sPriceEl=document.getElementById("sprice")
                let sDescriptionEl=document.getElementById("sdescription")
     
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

                getStarters()}
            

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
            console.log("fel");} }


    async function displayMainCourses(data) {
        let mainCourses= document.getElementById("mainCourses")
        mainCourses.innerHTML=""; //Rensar formulär
      
        //loopar igenom alla förrätter och visar i en tabell
       if(mainCourses) {
        data.forEach(mainCourse => {
           
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
                    fillinFormMainCourse(data)}

                 }catch{console.log("fel");}}


    async function  fillinFormMainCourse(data)  {
         
                let formEl=document.getElementById("mCform") 
                formEl.style.display="block"  //visar form
            
  
                //Hämtar in data från HTML
                let nameEl = document.getElementById("mCname")
                let priceEl = document.getElementById("mCprice")
                let descriptionEl = document.getElementById("mCdescription")
            
                //fyller i värdet i inputfält
                nameEl.value=data.mainCourseName
                priceEl.value=data.mainCoursePrice
                descriptionEl.value=data.mainCourseDescription
                console.log(data); 

                let h2El=document.getElementById("mCh2") 
                let h2_2El=document.getElementById("mCh2_2")
                h2El.textContent=data.id
                h2_2El.textContent=("Justera "+data.mainCourseName+", rätt nr: ")
               

                buttonEl=document.getElementById("mCchange")     
                buttonEl.addEventListener("click", changeFormMainCourse) //vid click anropas funktionen changeform

            }


            
    async function changeFormMainCourse(e) {

                e.preventDefault();
                let h2El=document.getElementById("mCh2")
                let h2_2El=document.getElementById("mCh2_2")
                let id=h2El.textContent //id för huvudrätten
                console.log(h2El.textContent);
                    
                formEl=document.getElementById("mCform")
                formEl=document.getElementById("mCform").style.display="block" //Visar formulär

                    //Hämtar in data från HTML
                let mainCourseNameEl=document.getElementById("mCname") 
                let mainCoursePriceEl=document.getElementById("mCprice")
                let mainCourseDescriptionEl=document.getElementById("mCdescription")
     
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
    
/*här börjar dessert */

        //Funktion för att skapa förrätt
    async function createDessert (e){

            e.preventDefault();
              //Hämtar från html-element
            let dessertNameEl=document.getElementById("dessertName")
            let dessertPriceEl=document.getElementById("dessertPrice")
            let dessertDescriptionEl=document.getElementById("dessertDescription")
     
                //Hämtar värden från inputraderna
            let dessertName=dessertNameEl.value
            let dessertPrice=dessertPriceEl.value
            let dessertDescription=dessertDescriptionEl.value
            
               //objekt för förrätt
            let dessert = {  
            dessertName: dessertName,
            dessertPrice: dessertPrice,
            dessertDescription: dessertDescription,
            }
            //Token från när man loggar in
            const token = localStorage.getItem("user_token")

            //POST- hämtar data
            try {const response = await fetch ("http://127.0.0.1:3000/api/dessert", {
                method: "POST",
                headers: {
                    "content-type": "Application/json",
                    "authorization":"Bearer " + token
                },
                body: JSON.stringify(dessert)
            })

            if(response.ok) {
            const data= await response.json();
            console.log(data);

        
            
        
        } }catch(error) {

            console.log("går ej att lägga till starter" +error);
            
        }

        //Rensar formulär när man skapat förrätt
            dessertNameEl.value=""
            dessertPriceEl.value=""
            dessertDescriptionEl.value=""
           
        getDesserts()

    }

    async function getDesserts (){

        //Hämtar data alla starters
        try {const response = await fetch ("http://127.0.0.1:3000/api/dessert")
            if(response.ok) {
            const data= await response.json();
            console.log(data);
            displayDesserts(data) }} catch {
            console.log("fel");} }


    async function displayDesserts(data) {

        let desserts= document.getElementById("desserts")
        desserts.innerHTML=""; //Rensar formulär
      
        //loopar igenom alla förrätter och visar i en tabell
        if(desserts) {

        data.forEach(dessert => {
           
            let trEl=document.createElement("tr")
            let td1El=document.createElement("td")
            td1El.textContent=(dessert.dessertName)
            let td2El=document.createElement("td")
            td2El.textContent=(dessert.dessertPrice)
            let td3El=document.createElement("td")
            td3El.textContent=(dessert.dessertDescription)
            trEl.appendChild(td1El)
            trEl.appendChild(td2El)
            trEl.appendChild(td3El)
            desserts.appendChild(trEl)
            let button1=document.createElement("button")
            let td4El=document.createElement("td")
            trEl.appendChild(td4El)
            td4El.appendChild(button1)
            button1.setAttribute('id',dessert.id)
            let text1=document.createTextNode("Ta bort")
            button1.appendChild(text1)
            let button2=document.createElement("button")
            let td5El=document.createElement("td")
            trEl.appendChild(td5El)
            td5El.appendChild(button2)
            let text2=document.createTextNode("Ändra/Justera")
            button2.appendChild(text2)
            button2.setAttribute('id',dessert.id)
        
            button1.addEventListener("click",deleteDessert)  //Vid klick anropas funktionen deleteStarter
            button2.addEventListener("click",getDessertWithId)  //Vid klick anropas funktionen getStarterWithId
        
        })}

  
    }


        
        //Funktion för att deleta en starter
    async function deleteDessert(e){
        let id=(e.target.id)

        const response = await fetch(`http://127.0.0.1:3000/api/dessert/${id}`, 
        
        { method: "DELETE",
          headers: {
                    "content-type": "Application/json"
                 },
          });
            const data= await response.json();
            console.log(data);
           
            getDesserts()

    }

    async function getDessertWithId(e) {
        
        let id=e.target.id

        try {const response = await fetch(`http://127.0.0.1:3000/api/dessert/${id}`)  

            if(response.ok) {
                const data= await response.json();
                fillinFormDessert(data) }

                 }catch{console.log("fel"); } }

       
    async function  fillinFormDessert(data)  {
         
                let formEl=document.getElementById("dform") 
                formEl.style.display="block"       //visar form            
               
                //Hämtar in data från HTML
                let nameEl = document.getElementById("dname")
                let priceEl = document.getElementById("dprice")
                let descriptionEl = document.getElementById("ddescription")
            
                //fyller i värdet i inputfält
                nameEl.value=data.dessertName
                priceEl.value=data.dessertPrice
                descriptionEl.value=data.dessertDescription
                console.log(data); 

                let h2El=document.getElementById("dh2") 
                let h2_2El=document.getElementById("dh2_2")
                h2El.textContent=data.id
                h2_2El.textContent=("Justera "+data. dessertName+", rätt nr: ")      
    
                buttonEl=document.getElementById("dchange")     
                buttonEl.addEventListener("click", changeFormDessert) //vid click anropas funktionen changeform

            }
        
     
   
    async function changeFormDessert(e) {

                e.preventDefault();
                let h2El=document.getElementById("dh2")
                let h2_2El=document.getElementById("dh2_2")
                let id=h2El.textContent //id för huvudrätten
                console.log(h2El.textContent);
                    
                formEl=document.getElementById("dform")
                formEl=document.getElementById("dform").style.display="block" //Visar formulär

                    //Hämtar in data från HTML
                let dessertNameEl=document.getElementById("dname") 
                let dessertPriceEl=document.getElementById("dprice")
                let dessertDescriptionEl=document.getElementById("ddescription")
     
                    //Värden i inputfält (som man ändrar som man vill)
                let dessertName=dessertNameEl.value
                let dessertPrice=dessertPriceEl.value
                let dessertDescription=dessertDescriptionEl.value
        
                    //objekt för förrätt
                let dessert = {  
                    dessertName: dessertName,
                    dessertPrice: dessertPrice,
                    dessertDescription: dessertDescription,
                    } 

        //     // const token = localStorage.getItem("user_token")
                    //Uppdaterar den specifika förrätten med PUT

                    
            try {const response = await fetch (`http://127.0.0.1:3000/api/dessert/${id}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "Application/json",
                    //"authorization":"Bearer " + token
             },
                body: JSON.stringify(dessert)
            })

                if(response.ok) {
                const data= await response.json();
                console.log(data);
            
        
         } }catch(error) {

                console.log("går ej att lägga till dessert" +error);
            
         }
                //Rensar formulär
                dessertNameEl.value=""
                dessertPriceEl.value=""
                dessertDescriptionEl.value=""
                h2El.textContent=""
                h2_2El.textContent=""

                getDesserts()               

            }
    

            /*här börjar wine */

            
            //Funktion för att skapa vin
    async function createWine (e){

            e.preventDefault();
              //Hämtar från html-element
            let wineNameEl=document.getElementById("wineName")
            let winePriceEl=document.getElementById("winePrice")
            let winePriceEl2=document.getElementById("winePrice2")
            let wineDescriptionEl=document.getElementById("wineDescription")
     
                //Hämtar värden från inputraderna
            let wineName=wineNameEl.value
            let winePrice=winePriceEl.value
            let winePrice2=winePriceEl2.value
            let wineDescription=wineDescriptionEl.value
            
               //objekt för vin
            let wine = {  
            wineName: wineName,
            winePrice: winePrice,
            winePrice2: winePrice2,
            wineDescription: wineDescription,
            }
            //Token från när man loggar in
            const token = localStorage.getItem("user_token")

            //POST- hämtar data
            try {const response = await fetch ("http://127.0.0.1:3000/api/wine", {
                method: "POST",
                headers: {
                    "content-type": "Application/json",
                    "authorization":"Bearer " + token
                },
                body: JSON.stringify(wine)
            })

            if(response.ok) {
            const data= await response.json();
            console.log(data);

        
            
        
        } }catch(error) {

            console.log("går ej att lägga till starter" +error);
            
        }

        //Rensar formulär när man skapat vin
            wineNameEl.value=""
            winePriceEl.value=""
            winePriceEl2.value=""
            wineDescriptionEl.value=""
           
        getWine()

    }

    async function getWine(){

        //Hämtar data alla starters
        try {const response = await fetch ("http://127.0.0.1:3000/api/wine")
            if(response.ok) {
            const data= await response.json();
            console.log(data);
            displayWine(data) }} catch {
            console.log("fel");} }


    async function displayWine(data) {

        let wines= document.getElementById("wine")
        wines.innerHTML=""; //Rensar formulär      
        
        //loopar igenom alla förrätter och visar i en tabell
        
        if(wines) {
        data.forEach(wine => {

            let trEl=document.createElement("tr")
            let td1El=document.createElement("td")
            td1El.textContent=(wine.wineName)
            let td2El=document.createElement("td")
            td2El.textContent=(wine.winePrice)
            let td2_2El=document.createElement("td")
            td2_2El.textContent=(wine.winePrice2)
            let td3El=document.createElement("td")
            td3El.textContent=(wine.wineDescription)
            trEl.appendChild(td1El)
            trEl.appendChild(td2El)
            trEl.appendChild(td2_2El)
            trEl.appendChild(td3El)
            wines.appendChild(trEl)
            let button1=document.createElement("button")
            let td4El=document.createElement("td")
            trEl.appendChild(td4El)
            td4El.appendChild(button1)
            button1.setAttribute('id',wine.id)
            let text1=document.createTextNode("Ta bort")
            button1.appendChild(text1)
            let button2=document.createElement("button")
            let td5El=document.createElement("td")
            trEl.appendChild(td5El)
            td5El.appendChild(button2)
            let text2=document.createTextNode("Ändra/Justera")
            button2.appendChild(text2)
            button2.setAttribute('id',wine.id)
        
            button1.addEventListener("click",deleteWine)  //Vid klick anropas funktionen deleteStarter
         
            button2.addEventListener("click",getWineWithId)  //Vid klick anropas funktionen getStarterWithId
        
        })}

  
    }

        //Funktion för att deleta en starter
    async function deleteWine(e){
        let id=(e.target.id)               

        const response = await fetch(`http://127.0.0.1:3000/api/wine/${id}`, 
        
        { method: "DELETE",
          headers: {
                    "content-type": "Application/json"
                 },
          });
          const data= await response.json();
             console.log(data);
           
            getWine()

    }

    async function getWineWithId(e) {       

        let id=e.target.id       

            try {const response = await fetch(`http://127.0.0.1:3000/api/wine/${id}`)  

            if(response.ok) {
                  const data= await response.json();
                    fillinFormWine(data) }
                 }catch{console.log("fel");} }

                
    async function  fillinFormWine(data)  {
         
                let formEl=document.getElementById("wform")              
               
                formEl.style.display="block" //visar form
              
                //Hämtar in data från HTML
                let nameEl = document.getElementById("wname")
                let priceEl = document.getElementById("wprice")
                let priceEl2 = document.getElementById("wprice2")
                let descriptionEl = document.getElementById("wdescription")
            
                //fyller i värdet i inputfält
                nameEl.value=data.wineName
                priceEl.value=data.winePrice
                priceEl2.value=data.winePrice2
                descriptionEl.value=data.wineDescription
                console.log(data); 

                let h2El=document.getElementById("wh2") 
                let h2_2El=document.getElementById("wh2_2")
                h2El.textContent=(data.id)
                h2_2El.textContent=("Justera "+data. wineName+", rätt nr: ")      

                buttonEl=document.getElementById("wchange")                         
                buttonEl.addEventListener("click", changeFormWine) //vid click anropas funktionen changeform
                    
            }
        
     
       async function changeFormWine(e) {
                e.preventDefault();

                let h2El=document.getElementById("wh2")
                let h2_2El=document.getElementById("wh2_2")
                let id=h2El.textContent //id för huvudrätten
                console.log(h2El.textContent);
                    
                formEl=document.getElementById("wform")
                formEl=document.getElementById("wform").style.display="block" //Visar formulär

                    //Hämtar in data från HTML
                let wineNameEl=document.getElementById("wname") 
                let winePriceEl=document.getElementById("wprice")
                let winePriceEl2=document.getElementById("wprice2")
                let wineDescriptionEl=document.getElementById("wdescription")
     
                    //Värden i inputfält (som man ändrar som man vill)
                let wineName=wineNameEl.value
                let winePrice=winePriceEl.value
                let winePrice2=winePriceEl2.value
                let wineDescription=wineDescriptionEl.value
        
                    //objekt för förrätt
                let wine = {  
                    wineName: wineName,
                    winePrice: winePrice,
                    winePrice2: winePrice2,
                    wineDescription: wineDescription,
                    } 

        //     // const token = localStorage.getItem("user_token")
                    //Uppdaterar den specifika förrätten med PUT

                    
            try {const response = await fetch (`http://127.0.0.1:3000/api/wine/${id}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "Application/json",
                    //"authorization":"Bearer " + token
             },
                body: JSON.stringify(wine)
            })

                if(response.ok) {
                const data= await response.json();
                console.log(data);
            
        
         } }catch(error) {

                console.log("går ej att lägga till wine" +error);
            
         }
                //Rensar formulär
                wineNameEl.value=""
                winePriceEl.value=""
                winePriceEl2.value=""
                wineDescriptionEl.value=""
                h2El.textContent=""
                h2_2El.textContent=""

                getWine()               

            }
    

            // Här börjar reviews


    async function getReviews(){

        //Hämtar data alla starters
        try {const response = await fetch ("http://127.0.0.1:3000/api/reviews")
            if(response.ok) {
            const data= await response.json();
            console.log(data);
            displayReviews(data) }} catch {
            console.log("fel");}}


    async function displayReviews(data) {
        let reviews= document.getElementById("reviews")
        reviews.innerHTML=""; //Rensar formulär  
         
        //loopar igenom alla förrätter och visar i en tabell
        if(reviews) {
        data.forEach(review => {

            let trEl=document.createElement("tr")

            let td1El=document.createElement("td")
            td1El.textContent=(review.reviewName)
            let td2El=document.createElement("td")
            td2El.textContent=(review.reviewDescription)
          
            trEl.appendChild(td1El)
            trEl.appendChild(td2El)
            
            reviews.appendChild(trEl)
            let button1=document.createElement("button")
            let td4El=document.createElement("td")
            trEl.appendChild(td4El)
            td4El.appendChild(button1)
            button1.setAttribute('id',review.id)
            let text1=document.createTextNode("Ta bort")
            button1.appendChild(text1)     
        
            button1.addEventListener("click",deleteReview)  //Vid klick anropas funktionen deleteStarter
                   
         })}  
    }

    async function deleteReview(e){

            let id=(e.target.id)  

            const response = await fetch(`http://127.0.0.1:3000/api/review/${id}`, 
        
        { method: "DELETE",
          headers: {
                    "content-type": "Application/json"
                 },
          });
          const data= await response.json();
            console.log(data);           
            getReviews()
    }


    //Här börjar konstakta oss    


    async function getContactUs(){

        //Hämtar data alla starters
        try {const response = await fetch ("http://127.0.0.1:3000/api/contactUs")
            if(response.ok) {
            const data= await response.json();
            console.log(data);
            displayContactUs(data) }} catch {
            console.log("fel");}  }


    async function displayContactUs(data) {
        let contactUses= document.getElementById("contactUs")
        contactUses.innerHTML=""; //Rensar formulär  
       
        //loopar igenom alla förrätter och visar i en tabell
        if(contactUses) {
        data.forEach(contactUs => {
           
            let liEl=document.createElement("li")
            liEl.innerHTML = `<strong>${contactUs.contactUsName}</strong><br>           
                            prioritet: ${contactUs.contactUsEmail}<br> prioritet: ${contactUs.contactUsDescription}<br> `;

            contactUses.appendChild(liEl)
            let button1=document.createElement("button")            
      
            contactUs.appendChild(button1)
            button1.setAttribute('id',contactUs.id)
            let text1=document.createTextNode("Ta bort")
            button1.appendChild(text1)      
                
            button1.addEventListener("click",deleteReview)  //Vid klick anropas funktionen deleteStarter
                            
        })} 
    }

    async function deleteContactUs(e){
        let id=(e.target.id)       
        const response = await fetch(`http://127.0.0.1:3000/api/contactUs/${id}`, 
        
        { method: "DELETE",
          headers: {
                    "content-type": "Application/json"
                 },
          });
          const data= await response.json();
             console.log(data);
           
            getContactUs()

    }