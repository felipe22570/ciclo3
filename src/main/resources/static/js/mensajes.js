
$('document').ready(()=>{
    
    let retornarId = 0
    let Clienteid = 0
    funcionGetPartyroomClient()

    $('#Consultar').click(()=>{
        funcionGet();
    })

    $('#Agregar').click(()=>{
        $("#Seleccion2").val()
        if($("#Seleccion").val() != '' && $("#Seleccion2").val() != '' && $("#messagetext").val() != '' ){
            funcionPost();
        }
        else{
            alert('Debe agregar un usuario o un salon de fiestas para poder enviar el mensaje')

            if($("#messagetext").val() != ''){
                funcionPost()
            }
            else{
                alert('El mensaje no puede estar vacio debe tener de 1 a 250 caracteres , Vuelve a intentarlo!')
            }
            
        }
    })



    async function funcionGetPartyroomClient(){
        const peticion = await fetch('http://168.138.133.81:8080/api/Partyroom/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })

        const peticionCliente = await fetch('http://168.138.133.81:8080/api/Client/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        
        const respuesta = await peticion.json()
        informacionPartyroom = respuesta
        const respuesta2 = await peticionCliente.json();
        informacionCliente = respuesta2
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let optionSelect=""
        for(i=0;i<respuesta.length;i++){
            optionSelect += '<option value="'+`${respuesta[i].name}`+'">'+ respuesta[i].name +'</option>';
        }

        console.log(optionSelect)
        $('#Seleccion').append(optionSelect)

        if(respuesta.length === 0){
            setTimeout(() => {
                alert('no existe ningun salon de fiestas , Agrega uno!')    
            }, 4000);
             
            
        }

        let idSalon = 0

        $("#Seleccion").change(function() {
                 for(i=0;i<respuesta.length;i++){
                     if(respuesta[i].name === $("#Seleccion").val()){
                        idSalon = respuesta[i].id
                        retornarId = idSalon
                        break
                     }
                 }   
            });
            
             ////////////////////////////////////////////////////////////////////////////////////////////////////////////
             
            let optionSelect2=""
            for(i=0;i<respuesta2.length;i++){
                 optionSelect2 += '<option value="'+`${respuesta2[i].name}`+'">'+ respuesta2[i].name +'</option>';
             }

             console.log(optionSelect2)
     
             $('#Seleccion2').append(optionSelect2)
     
             if(respuesta2.length === 0){
                 setTimeout(() => {
                     alert('no existe ningun Cliente , Agrega uno!')    
                 }, 4000);
                  
                 
             }
     
     
             $("#Seleccion2").change(function() {
                      for(i=0;i<respuesta2.length;i++){
                          console.log($('#Seleccion2').val())
                         if(respuesta2[i].name === $('#Seleccion2').val()){
                            Clienteid = respuesta2[i].idClient;
                         }
                      }   
                 });

    }

    async function funcionPost(){

        let datosCliente = {
            messageText:$('#messagetext').val(),
            client:{idClient:Clienteid},
            partyroom:{id:retornarId}
        }

        console.log(datosCliente)
        const peticion = await fetch('http://168.138.133.81:8080/api/Message/save' ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(datosCliente)  
        })

        const response = await peticion.json();
        console.log(response)
        alert('Creada el mensaje con exito!')

        
    } 

    async function funcionGet(){
        const peticion = await fetch('http://168.138.133.81:8080/api/Message/all' ,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        
        const respuesta = await peticion.json()


        let mytabla = "<table class='tabla'>"
        mytabla+="<tr>"+"</th>"+"<th>"+"Mensaje"+"</th>"+"<th>"+"Salon de fiesta"+"</th>"+"<th>"+"Cliente"+"</th>"+"</tr>"
        for(i=0;i<respuesta.length;i++){
            mytabla+="<tr>";
            mytabla+="<td>"+respuesta[i].messageText+"</td>";
            for(var element in respuesta[i].partyroom){
                if (element === "name") {
                    mytabla+="<td>"+respuesta[i].partyroom[element]+"</td>"; 
                }
                
            }
            for(var e in respuesta[0].partyroom){
                if (e === "name") {
                    mytabla+="<td>"+respuesta[i].client[e]+"</td>"; 
                }
                
            }

            mytabla+="</tr>";
        }
        
        mytabla+='</table>'

        if(respuesta.length === 0){
            alert('no existe ningun Mensaje')
        }

        $(".tabla").remove();
        $("#resultado").append(mytabla);

    
    }

})