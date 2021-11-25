$('document').ready(()=>{

    let idCliente = 0
    let idPartyroom = 0

    funcionGetPartyroomAndClient()

    $('#Agregar').click(()=>{
        if ($('#start-day').val() === '' || $('#departure-day').val() === '' || $('#combo-client').val() === '' || $('#combo-partyroom').val() === '' ) {
            alert('Asegurate de ingresar todos los campos requeridos para crear una reserva')

        } else {
            funcionPost();
        }
        
    })

    $('#Consultar').click(()=>{
        funcionGet();
    })

    $('#ConsultarCal').click(()=>{
        Getcalificaciones()
    })

    $('#AgregarCal').click(()=>{
        funcionPostCategorias();
    })

    async function funcionGetPartyroomAndClient(){


        const peticion = await fetch('http://168.138.133.81:8080/api/Partyroom/all',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            } 
               
        })

        const peticion2 = await fetch('http://168.138.133.81:8080/api/Client/all' , {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }) 

        const response = await peticion.json()
        const response2 = await peticion2.json()
        /*Peticion para traer la informacion de partyroom y cliente para mostrarla en el front end*/

        let PartyroomOption= ""
        for(let i =0;i<response.length;i++){
            PartyroomOption+= "<option value='"+`${response[i].name}`+"'>"+response[i].name+"</option>";
        }



        $('#combo-partyroom').append(PartyroomOption)

        if(response.length === 0){
            setTimeout(() => {
                alert('no hay ningun salon de fiesta!')
            }, 3000);
        }

        $('#combo-partyroom').change(()=>{
            console.log($('#combo-partyroom').val())
            for(let e = 0;response.length;e++){
                if(response[e].name === $('#combo-partyroom').val()){
                    idPartyroom = response[e].id
                    console.log( response[e].id)
                }
            }
            
        })

        ////////////////////////////////////////////////////////////////////////////////////////////

        let ClientOption= ""
        for(let i =0;i<response2.length;i++){
            ClientOption+= "<option value='"+`${response2[i].name}`+"'>"+response2[i].name+"</option>";
        }



        $('#combo-client').append(ClientOption)

        
        if(response2.length === 0){
            setTimeout(() => {
                alert('no hay ningun Cliente!')
            }, 3000);
        }

        $('#combo-client').change(()=>{
            console.log($('#combo-client').val())
            for(let e = 0;response2.length;e++){
                if(response2[e].name === $('#combo-client').val()){
                    idCliente = response2[e].idClient
                    console.log(response2[e].idClient)
                }
            }
            
        })


    }

    async function funcionGet(){
        const peticion = await fetch("http://168.138.133.81:8080/api/Reservation/all",{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        
        const respuesta = await peticion.json();
        console.log(respuesta)

        let mytabla = "<table class='tabla'>"
        mytabla+="<tr>"+"</th>"+"<th>"+"Id"+"</th>"+"<th>"+"Dia de inicio"+"</th>"+"<th>"+"Dia de finalizacion"+"</th>"+"</th>"+"<th>"+"Nombre Salon"+"</th>"+"<th>"+"Propietario"+"<th>"+"Descripcion"+"</th>"+"<th>"+"Id Cliente"+"</th>"+"<th>"+"Correo"+"</th>"+"</th>"+"<th>"+"Nombre"+"</th>"+"</tr>"

        for(i=0;i<respuesta.length;i++){
            mytabla+="<tr>";
            mytabla+="<td>"+respuesta[i].idReservation+"</td>";
            mytabla+="<td>"+respuesta[i].startDate+"</td>";
            mytabla+="<td>"+respuesta[i].devolutionDate+"</td>";
            
            for(var element in respuesta[i].partyroom){
                if (element === "name" || element === "owner" || element === "description") {
                    mytabla+="<td>"+respuesta[i].partyroom[element]+"</td>";
                }

            }

            for(var e in respuesta[i].client){
                if (e === "idClient" || e === "name" || e === "email"){
                    mytabla+="<td>"+respuesta[i].client[e]+"</td>"; 
                }
                
            }

            mytabla+="</tr>";
        }
        
        mytabla+='</table>'

        if(respuesta.length === 0){
            alert('no existe ninguna Reservacion')
        }

        $(".tabla").remove();
        $("#resultado").append(mytabla);



    }

    
    async function Getcalificaciones(){
        const peticionCalificacion = await fetch("http://168.138.133.81:8080/api/Score/all",{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            
            const respuestaCalificacion = await peticionCalificacion.json();
            console.log(respuestaCalificacion)
    
            let mytabla = "<table class='tabla2'>"
            mytabla+="<tr>"+"</th>"+"<th>"+"Calificacion"+"</th>"+"<th>"+"Mensaje"+"</th>"+"</tr>"
    
            for(i=0;i<respuestaCalificacion.length;i++){
                mytabla+="<tr>";
                mytabla+="<td>"+respuestaCalificacion[i].qualification+"</td>";
                mytabla+="<td>"+respuestaCalificacion[i].message+"</td>";
                
    
                mytabla+="</tr>";
            }
            
            mytabla+='</table>'
    
            if(respuestaCalificacion.length === 0){
                alert('no existe ninguna Calificacion')
            }
    
            $(".tabla2").remove();
            $("#resultado").append(mytabla);
    
    }

    async function funcionPostCategorias(){

        let valorPunt = $("#Puntuacion").val()
        let valormensaje = $("#mensajecal").val()
        let valorsalon = $("#combo-partyroom").val()



        if($("#Puntuacion").val() === ""){
             valorPunt = null
            
        }

        else if($("#mensajecal").val() === ""){
             valormensaje = null
        }

        else if($("#combo-partyroom").val() === ""){
             valorsalon = null
        }

        let datosReservacion={
            qualification:valorPunt,
            message:valormensaje,
        }

        console.log(datosReservacion)
        

        const peticion = await fetch('http://168.138.133.81:8080/api/Score/save' ,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(datosReservacion)
        
        })

        alert('Calificacion guardada con exito')
        const respuesta = await peticion.json();
        
    }


    async function funcionPost(){

        let datosReservacion={
            startDate:$('#start-day').val(),
            devolutionDate:$('#departure-day').val(),
            client:{idClient:idCliente},
            partyroom:{id:idPartyroom}
        }

        console.log(datosReservacion)
        console.log($('#start-day').val())

        const peticion = await fetch('http://168.138.133.81:8080/api/Reservation/save' ,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(datosReservacion)
        
        })

        alert('reservacion guardada con exito')
        const respuesta = await peticion.json();
        
    }


})
