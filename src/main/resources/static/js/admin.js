$('document').ready(()=>{

    $('#Agregar').click((e)=>{
        e.preventDefault();
        if($('#Nombre').val() === "" || $('#Email').val() === "" || $('#Contraseña').val() === "" ){
            alert("Asegurate de rellenar todos los campos")
        }
        else{

            funcionPost();
        }
    
    })

    $('#Consultar').click((e)=>{
        e.preventDefault();
        funcionGet();
    })

        async function funcionPost(){
            let dataSend = {
                name:$('#Nombre').val(),
                email:$('#Email').val(),
                password:$('#Contraseña').val()
        }
        console.log(dataSend)    
        const peticion = await fetch('http://168.138.133.81:8080/api/Admin/save',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataSend)
        })

        alert('Administardor creado con exito!')
        const respuesta = await peticion.json();
        console.log(respuesta)
    }

        async function funcionGet(){
    
        const peticion = await fetch('http://168.138.133.81:8080/api/Admin/all' ,{
            method:'GET',
            headers:{
                
                'Content-Type':'application/json',   
            }
        })
        
        const respuesta = await peticion.json();
        console.log(respuesta)
        console.log(respuesta.length)

        let myTable = "<table class='tabla'>";
        myTable+= "<tr>"+"<th>"+"id"+"</th>"+"<th>"+"Nombre"+"</th>"+"<th>"+"Email"+"</th>"+"</th>"+"</tr>"
        for(i=0;i<respuesta.length;i++){
            myTable+="<tr>";
            myTable+="<td>"+respuesta[i].idAdmin+"</td>";
            myTable+="<td>"+respuesta[i].name+"</td>";
            myTable+="<td>"+respuesta[i].email+"</td>";
            myTable+="</tr>";
        }
        myTable+="</table>"

        $('.tabla').remove();

        $("#resultado").append(myTable); 
        
        
    }

})