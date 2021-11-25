$('document').ready(()=>{

    let idCategoria = 0
    funcionGetCategory()

    $('#Consultar').click(()=>{
        funcionGet();
    })

    $('#Agregar').click(()=>{
        funcionPost();
    })


    async function funcionGetCategory(){
        const peticion = await fetch('http://168.138.133.81:8080/api/Category/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })

        
        const respuesta = await peticion.json()
        /////////////////////////////////////////////////////////////////////////
        let optionSelect=""
        for(i=0;i<respuesta.length;i++){
            optionSelect += '<option value="'+`${respuesta[i].name}`+'">'+ respuesta[i].name +'</option>';
        }

        $('#Seleccion').append(optionSelect)

        if(respuesta.length === 0){
            setTimeout(() => {
                alert('no existe ningun salon de fiestas , Agrega uno!')    
            }, 4000);
             
            
        }


        $("#Seleccion").change(function() {
                 for(i=0;i<respuesta.length;i++){
                     if(respuesta[i].name === $("#Seleccion").val()){
                        idCategoria = respuesta[i].id
                        break
                     }
                 }   
            });
            
             ////////////////////////////////////////////////////////////////////////////////////////////////////////////
             
    }



    async function funcionPost(){
        let datosPartyroom = {
            owner:$('#owner').val(),
            capacity:$('#capacity').val(),
            category:{id:idCategoria},
            name:$('#name').val(),
            description:$('#description').val(),
        }

        console.log(datosPartyroom)

        const peticion = await fetch('http://168.138.133.81:8080/api/Partyroom/save' ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(datosPartyroom)  
        })

        const response = await peticion.json();
        alert('Creado el salon de fiestas con exito!')
             
     
    }
    
    async function funcionGet(){
        const peticion = await fetch('http://168.138.133.81:8080/api/Partyroom/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        
        const respuesta = await peticion.json()

        let mytabla = "<table class='tabla'>"
        mytabla+="<tr>"+"<th>"+"Name"+"</th>"+"<th>"+"Owner"+"</th>"+"<th>"+"Capacity"+"<th>"+"Description"+"</th>"+"<th>"+"Category"+"<th>"+"</tr>"
        for(i=0;i<respuesta.length;i++){
            mytabla+="<tr>";
            mytabla+="<td>"+respuesta[i].name+"</td>";
            mytabla+="<td>"+respuesta[i].owner+"</td>";
            mytabla+="<td>"+respuesta[i].capacity+"</td>";
            mytabla+="<td>"+respuesta[i].description+"</td>";
            for(var e in respuesta[i].category){
                if(e === "name"){
                    mytabla+="<td>"+respuesta[i].category[e]+"</td>";
                }
            }
        
            mytabla+="</tr>";
        }
        
        mytabla+='</table>'

        if(respuesta.length === 0){
            alert('no existe ningun salon de fiestas')
        }

        $('.tabla').remove();
        $("#resultado").append(mytabla);

    
    }

})