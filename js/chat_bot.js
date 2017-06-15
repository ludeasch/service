
ChatBotApp.controller('ChatController', ['$scope', '$sce' ,'$http', '$timeout', '$interval', '$q', function ($scope, $sce,$http, $timeout, $interval, $q) {
    var vm = this;
    var today = new Date().valueOf()
    
    // ask for username first time only
    var username = localStorage.getItem("username");
    if (!username) {
        username = prompt("Tu nombre?")
        localStorage.setItem("username", username);
    }
    vm.username = username;
    

    function saveMessage (username, text, img) {
        var data = {
            username: username,
            date: new Date().valueOf()
        }
        if (text) { data.text = text }
        if (img) { data.img = img }
        firebase.database().ref('messages').push(data);
    };

    firebase.database().ref("messages").on("value", function(snap){
        $timeout(function(){
            vm.listMessage = Object.keys(snap.val()).map(function(key) {
                return snap.val()[key]
            })
        }, 1);
    })

    vm.newMessage = function(input) {
        if (input.value) {
            saveMessage(username, input.value);
            vm.verifivateUser(input.value);
            input.value = '';
        }
    }

    vm.verifivateUser = function(text){
        if(text.includes("ucas")){
            saveMessage(username, undefined, "https://media.giphy.com/media/3o7bu1YKisFPmroLwk/giphy.gif")
        }
    }
    
    vm.verificationBot = function(input){
        var date = new Date().valueOf()
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
}])