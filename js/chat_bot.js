
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
    
    vm.getMessages = function(update){
        $http.get("https://trim-mode-139918.firebaseio.com/.json?print=pretty").then(function(response){
            var data = Object.keys(response.data.messages).map(function(key) {
                return response.data.messages[key]
            })
            if (update) {
                vm.listMessage = data;
            }
        })
    }

    vm.getMessages(true);


    function saveMessage (username, text, img) {
        var data = {
            username: username,
            date: new Date().valueOf()
        }

        if (text) { data.text = text }
        if (img) { data.img = img }
        if (navigator.onLine){
            firebase.database().ref('messages').push(data);
        }else{
            firebase.database().ref('messages').onDisconnect().set(data)
            vm.listMessage.push(data)
        }
        
        $timeout(function(){
            //scroll chat
            var div = document.getElementById("chatbody");
            div.scrollTop = div.scrollHeight;
        }, 20);

    };

    firebase.database().ref("messages").on("value", function(snap){
        if (navigator.onLine){
            vm.getMessages()
        }
        $timeout(function(){
            vm.listMessage = Object.keys(snap.val()).map(function(key) {
                return snap.val()[key]
            })
        }, 1);
    })

    vm.newMessage = function(input) {
        if (input.value) {
            saveMessage(username, input.value);
            vm.verificateUser(input.value);
            vm.verificationBot(input)
            $http.get("http://localhost:3000/server/"+input.value).then(function(response){
                console.log("nice")
            })
            input.value = '';
        }
    }

    vm.verificateUser = function(text){
        return
        if(text.includes("ucas")){
            saveMessage(username, undefined, "https://media.giphy.com/media/3o7bu1YKisFPmroLwk/giphy.gif")
        }
    }

    vm.verificationBot = function(input){
        if (vm.username == "lucas") {
            if(input.value.includes("ucas")){
                // lucas
                $timeout(function(){
                    saveMessage("moni", undefined, "https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif")
                }, 700);
            }else{
                // cat
                $timeout(function(){                
                    saveMessage("moni", undefined, "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif")
                }, 700);   
            }

            if(input.value.includes("prestamo")){
                $timeout(function(){                
                    saveMessage("moni", "Cuanto dinero quieres?", undefined)
                }, 1400)
                
            } else if( input.value.includes("orto") ){
                $timeout(function(){
                    saveMessage("moni", "sigo aqui!!!", undefined)
                }, 1400)                
            } else if( input.value.includes("vez") ){
                $timeout(function(){    
                    saveMessage("moni", "voy a seguir aqui hasta que te mueras!!!", undefined)
                }, 1400)            
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