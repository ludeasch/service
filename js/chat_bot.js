
ChatBotApp.controller('ChatController', ['$scope', '$sce' ,'$http', '$timeout', '$interval', '$q', function ($scope, $sce,$http, $timeout, $interval, $q) {
    var vm = this;
    /* Time */
    var today = new Date().valueOf()

    vm.initial = function(){
                    $http.get("https://trim-mode-139918.firebaseio.com/.json?print=pretty").then(function(response){

                            vm.listMessage = Object.keys(response.data.mensajes.mensajes).map(function(key) {
                                                return response.data.mensajes.mensajes[key]
                            })


                    })


    }
    vm.newMessage = function(input) {
        if (input.value) {
            var date = new Date().valueOf()
            data = {usertype:"sent",text:input.value,sending:true, date:date}
            if(navigator.onLine){
                vm.listMessage.push(data)

            }else{
                data.sending = false
                vm.listMessage.push(data)
            }
            index = vm.listMessage.indexOf(data)
            vm.verifivateData(input, data)

        input.value = '';
        input.value = '';
        }
    }
    vm.verifivateUser = function(data){
         if(input.value.includes("ucas")){
                data.img = "https://media.giphy.com/media/3o7bu1YKisFPmroLwk/giphy.gif";
                data.text = null;
        }
        $http.post("https://trim-mode-139918.firebaseio.com/mensajes/mensajes.json",data).then(function(response){
                        console.log("siiii!!")


            },function(res){
                console.log("Nooo!!")
        })

    }
    vm.verificationBot = function(input){
        if(input.value.includes("ucas")){
            data2 = {usertype:"received",sending:true, date:date, img:"https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif"}
            vm.listMessage.push(data2)
            $http.post("https://trim-mode-139918.firebaseio.com/mensajes/mensajes.json",data2).then(function(response){
                        console.log("siiii!!")


            },function(res){
                console.log("Nooo!!")
            })
        }else{

            datac = {usertype:"received",sending:true, date:date, img:"https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"}
            vm.listMessage.push(datac)
            $http.post("https://trim-mode-139918.firebaseio.com/mensajes/mensajes.json",datac).then(function(response){
                        console.log("siiii!!")


                    },function(res){
                        console.log("Nooo!!")
            })
        }
        if(input.value.includes("prestamo")){
            data2 = {usertype:"received",text:"Cuanto dinero quieres?",sending:true, date:date}
            vm.listMessage.push(data2)
            $http.post("https://trim-mode-139918.firebaseio.com/mensajes/mensajes.json",data2).then(function(response){
                        console.log("siiii!!")


            },function(res){
                console.log("Nooo!!")
            })
        }

        if(input.value.includes("orto")){
            data2 = {usertype:"received",sending:true, date:date, text:"sigo aqui!!!"}
            vm.listMessage.push(data2)
            $http.post("https://trim-mode-139918.firebaseio.com/mensajes/mensajes.json",data2).then(function(response){
                        console.log("siiii!!")


            },function(res){
                console.log("Nooo!!")
            })
        }
        if(input.value.includes("vez")){
            data2 = {usertype:"received",sending:true, date:date, text:"voy a seguir aqui hasta que te mueras!!!"}
            vm.listMessage.push(data2)
            $http.post("https://trim-mode-139918.firebaseio.com/mensajes/mensajes.json",data2).then(function(response){
                        console.log("siiii!!")


            },function(res){
                console.log("Nooo!!")
            })
        }
        if(input.value.includes("uiero")){
            data2 = {usertype:"received",sending:true, date:date, text:"Cuanto dinero quieres?"}
            vm.listMessage.push(data2)
            $http.post("https://trim-mode-139918.firebaseio.com/mensajes/mensajes.json",data2).then(function(response){
                        console.log("siiii!!")


            },function(res){
                console.log("Nooo!!")
            })
        }



    }
    vm.verifivateData = function(input, data){
        vm.verifivateUser(data)
        vm.verificationBot(input)
    }

    vm.newMessageKey = function(event){
        if (event.which == 13 && !event.shiftKey) {
            $timeout(function () {
               vm.newMessage(event.target)

            },1)
        }

    }


    vm.initial()
}])