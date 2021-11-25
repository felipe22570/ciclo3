
$('#Consultar').click(()=>{
    $('#icon').removeClass('.toogle-ocultar')
    animacion()
})

const animacion = ()=>{

    $('#icon').append('<a href="#resultado"><img id="icon-down" src="images/flechas-hacia-abajo.png" width"70px" height="70px"></a>')
        $('#icon-down').addClass('icon-toogle');

        setTimeout(() => {
            $('#icon-down').removeClass('icon-toogle');
            $('#icon').addClass('.toogle-ocultar')
        }, 4000);

        
    }