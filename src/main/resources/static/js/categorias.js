$('document').ready(()=>{


    $('#AgregarCategory').click(()=>{
        if($('#NameCategory').val() === "" || $('#DescCategory').val() === "" ){
            alert("Asegurate de rellenar todos los campos")
        }
        else{
            funcionPost();
        }
    
    })

    $('#Consultar').click(()=>{
        
        funcionGet();
    })

        async function funcionPost(){
            let dataSend = {
                name:$('#NameCategory').val(),
                description:$('#DescCategory').val()
        }
        console.log(dataSend)    
        const peticion = await fetch('http://168.138.133.81:8080/api/Category/save',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataSend)
        })

        alert('Creada la categoria con exito!')
        const respuesta = await peticion.json();
        console.log(respuesta)
    }

        async function funcionGet(){
    
        const peticion = await fetch('http://168.138.133.81:8080/api/Category/all' ,{
            method:'GET',
            headers:{
                
                'Content-Type':'application/json',   
            }
        })
        
        const respuesta = await peticion.json();
        console.log(respuesta)
        console.log(respuesta.length)

        let myTable = "<table class='tabla'>";
        myTable+= "<tr>"+"<th>"+"Nombre"+"</th>"+"<th>"+"Description"+"</th>"+"</tr>"
        for(i=0;i<respuesta.length;i++){
            myTable+="<tr>";
            myTable+="<td>"+respuesta[i].name+"</td>";
            myTable+="<td>"+respuesta[i].description+"</td>";
            myTable+="</tr>";
        }
        myTable+="</table>"

        $('.tabla').remove();

        $("#resultado").append(myTable); 
        
        
    }

})