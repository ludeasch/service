
ChatBotApp.controller('ChatController', ['$scope', '$sce' ,'$http', '$timeout', '$interval', '$q', function ($scope, $sce,$http, $timeout, $interval, $q) {
    var vm = this;
    var today = new Date().valueOf()
    var lastOnlineRef = firebase.database().ref('messages/lastOnline');
    // ask for username first time only
    var username = localStorage.getItem("username");
    if (!username) {
        username = prompt("Tu nombre?")
        localStorage.setItem("username", username);
    }
    vm.username = username;
    vm.getMessages = function(){
        $http.get("https://trim-mode-139918.firebaseio.com/.json?print=pretty").then(function(response){

                vm.listMessage = Object.keys(response.data.messages).map(function(key) {
                                            return response.data.messages[key]
                                 })


        })


    }

    function saveMessage (username, text, img) {
        var data = {
            username: username,
            date: new Date().valueOf()
        }
        if (text) { data.text = text }
        if (img) { data.img = img }
        if (navigatior.onLine){
            firebase.database().ref('messages').push(data);

        }else{
            firebase.database().ref('messages').onDisconnect().set(data)
        }
    };

    firebase.database().ref("messages").on("value", function(snap){
        if (snap.val() == true){
            console.log(snap.val())
            $timeout(function(){
                vm.listMessage = Object.keys(snap.val()).map(function(key) {
                    return snap.val()[key]
                })
            }, 1);
        }else{
            console.log(lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP))
             vm.listMessage = Object.keys(lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP)).map(function(key) {
                    return lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP)[key]
                })
        }
    })

    vm.newMessage = function(input) {
        if (input.value) {
            saveMessage(username, input.value);
            vm.verificateUser(input.value);
            vm.verificationBot(input)
            input.value = '';
        }
    }

    vm.verifivateUser = function(text){
        if(text.includes("ucas")){
            saveMessage(username, undefined, "https://media.giphy.com/media/3o7bu1YKisFPmroLwk/giphy.gif")
        }
    }

    vm.verificationBot = function(input){
        if(username == "moni"){
            if(input.value.includes("ucas")){
                saveMessage("moni", undefined, "https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif")
            }else{
                saveMessage("moni", undefined, "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif")
            }
            if(input.value.includes("prestamo")){
                saveMessage("moni", "Cuanto dinero quieres?", undefined)
            }

            if(input.value.includes("orto")){
                saveMessage("moni", "sigo aqui!!!", undefined)
            }
            if(input.value.includes("vez")){
                saveMessage("moni", "voy a seguir aqui hasta que te mueras!!!", undefined)
            }
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