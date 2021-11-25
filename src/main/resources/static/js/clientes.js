$('document').ready(()=>{


    $('#Consultar').click(()=>{
        
        funcionGet()
       
    })

    $('#Agregar').click(()=>{
        if($('#nameclient').val() === "" || $('#email').val() === ""  || $('#passwordclient').val() === "" || $('#age').val() === "" ){
            alert("Asegurate de rellenar todos los campos")
        }
        else{
            funcionPost();
        }
    
    })


    async function funcionPost(){
        let datosCliente = {
            name:$('#nameclient').val(),
            email:$('#email').val(),
            password:$('#passwordclient').val(),
            age:$('#age').val(),
        }

        console.log(datosCliente)
        const peticion = await fetch('http://168.138.133.81:8080/api/Client/save' ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(datosCliente)  
        })

        alert('Creado el usuario con exito!')
        $('#nameclient').val() === "" || $('#email').val() === ""  || $('#passwordclient').val() === "" || $('#age').val("") 
        const response = await peticion.json();
        
        
     
    } 

    async function funcionGet(){
        const peticion = await fetch('http://168.138.133.81:8080/api/Client/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        
        const respuesta = await peticion.json()
        console.log(respuesta)

        let mytabla = "<table class='tabla'>"
        mytabla+="<tr>"+"<th>"+"Id Client"+"</th>"+"<th>"+"Email"+"</th>"+"<th>"+"Name"+"</th>"+"<th>"+"Age"+"</th>"+"</tr>"
        for(i=0;i<respuesta.length;i++){
            mytabla+="<tr>";
            mytabla+="<td>"+respuesta[i].idClient+"</td>";
            mytabla+="<td>"+respuesta[i].email+"</td>";
            mytabla+="<td>"+respuesta[i].name+"</td>";
            mytabla+="<td>"+respuesta[i].age+"</td>";
            mytabla+="</tr>";
        }

        mytabla+='</table>'

        if(respuesta.length === 0){
            alert('no existe ningun cliente')
        }

        $('.tabla').remove();
        $("#resultado").append(mytabla);

    
    }

})