class Selecao {
	constructor(destino,menor){
   this.destino = destino;
   this.menor = menor;
 }
}

var menorValor = new Selecao(null,999999);
console.log(menorValor);

var arrayDistances = [];

function CalculaDistancia() {
  $('#litResultado').html('Aguarde...');
  //Instanciar o DistanceMatrixService
  var service = new google.maps.DistanceMatrixService();
  //executar o DistanceMatrixService
  service.getDistanceMatrix({
  //Origem
  origins: [$("#txtOrigem").val()],
  //Destino
  destinations: [$("#txtDestino").val()],
  //Modo Carro
  travelMode: google.maps.TravelMode.DRIVING,
  //Sistema de medida (METRIC | IMPERIAL)
  unitSystem: google.maps.UnitSystem.METRIC
  //Vai chamar a função tratarRetorno
}, tratarRetorno);
}

function tratarRetorno(response, status) {
//Verificar o Status
if (status != google.maps.DistanceMatrixStatus.OK)
    //Se o status não for "OK"
  $('#litResultado').html(status);
  else {                  
    //Imprimindo o Retorno JSON na tela
    $('#litResultado').html("<strong>Origem:</strong> " + response.originAddresses +
      "<br /><strong>Destino:</strong> " + response.destinationAddresses +
      "<br /><strong>Distância:</strong> " + response.rows[0].elements[0].distance.text +
      " <br /><strong>Duração:</strong> " + response.rows[0].elements[0].duration.text +
      "<br /><strong>Tipo de transporte: </strong>Carro " 
      );                
  //Atualizando o mapa
  $("#map").attr("src", "https://maps.google.com/maps?saddr=" + response.originAddresses + "&daddr=" + response.destinationAddresses + "&output=embed");}
  if(status === google.maps.DistanceMatrixStatus.OK){
    arrayDistances.push(response.rows[0].elements[0].distance.text);
    if (response.rows[0].elements[0].distance.value < menorValor.menor){
     menorValor.destino = response.destinationAddresses;
     menorValor.menorValor = response.rows[0].elements[0].distance.value;
   } 
   console.log(menorValor);
 }
              /*for (var i = 0; i <= arrayDistances.length; i++) {
                  console.log(arrayDistances[i]);
                }*/
}
