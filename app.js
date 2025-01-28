

    import { collection, addDoc , getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"; 
    import {db} from "./firestore-config.js";


    const input = document.querySelector('#input');
    const textarea = document.querySelector('#textarea')
    const btn = document.querySelector('#btn')
    const data = []
    const container = document.querySelector('.container')


    btn.addEventListener('click' , async(event)=>{

       event.preventDefault();

        console.log(input.value);
        console.log(textarea.value);
    
        try {
            const docRef = await addDoc(collection(db, "todos"), {
              title:input.value ,
              descriptioin:textarea.value
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    

          container.innerHTML += ` <div class="box">
            <p><span>TITLE  : </span> ${input.value}</p>
            <p><span>Description : </span> ${textarea.value}.</p>
           </div>
          `

          input.value = '';
          textarea.value = '';


    })
  
   async function readData() {
        const querySnapshot = await getDocs(collection(db, "todos"));
        querySnapshot.forEach((item) => {
        // console.log(`${item.id} => ${JSON.stringify(item.data())}`);
        // data.push(item.id ,item.data())
        data.push({ id:item.id, ...item.data() });


        renderData()

        });
    }
    readData();

    console.log(data);
    


    function renderData(){

      container.innerHTML = '';

      data.map(item => {


        container.innerHTML += ` <div class="box">
            <p><span>TITLE  : </span> ${item.title}</p>
            <p><span>Description : </span> ${item.descriptioin}.</p>
           </div>
          `







      })




    }

      



