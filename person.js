const fs = require('fs');
let firstNames = require('./peopleData').firstName;
let lastNames = require('./peopleData').lastName;

let isEmpty = function(){
    try{
        let fileData = fs.readFileSync("database.json");
    }
    catch(err){
        console.log("database doesn't exist, creating one now");
        people = '{"people":[]}';
        fs.writeFileSync("database.json", people);
    }
}

let getId = function(){
    isEmpty();
    let fileData = fs.readFileSync("database.json");
    fileData.toString();
    fileData = JSON.parse(fileData);
    if(fileData.people.length === 0){
        return 0;
    }
    else{
        index = fileData.people[fileData.people.length-1].id;
        return index;
    }
}
global.counter = getId();

let Person = function(firstName, lastName, age){

    if(typeof firstName === "string" && 
        typeof lastName === "string" &&
        typeof age ==="number"
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        global.counter++;
        
        this.writeDataSync = function(){
            this.person = {
                firstName : this.firstName,
                lastName : this.lastName,
                age : this.age,
                id : global.counter
            }

            let fileData = fs.readFileSync("database.json");
            let flag = false;

            fileData.toString();
            fileData = JSON.parse(fileData);
            for(i = 0; i < fileData.people.length; i++){;
                if(fileData.people[i].id === this.person.id){
                    flag = true;
                }
            }

            if(flag === true){
                console.log("sorry, entry already exists");
            }else if(flag === false){
                fileData.people.push(this.person);
            }
            fileData = JSON.stringify(fileData, null, " ");
            fs.writeFileSync("database.json", fileData);
        }
    }
}


let generateData = function(amount){
    if(typeof amount === "number"){
    for(let i = 0; i < amount; i++){
        fIndex = Math.floor(Math.random() * Math.floor(firstNames.length));
        lIndex = Math.floor(Math.random() * Math.floor(lastNames.length));
        age = Math.floor(Math.random() * Math.floor(100));
        let person = new Person(firstNames[fIndex], lastNames[lIndex], age);
        person.writeDataSync();
    }
}else{
    console.log(`Your data is not valid`);
}
}

let addData = function(firstName, lastName, age, cb){
    if(typeof firstName === "string" && 
        typeof lastName === "string" &&
        typeof age ==="number"
    ){
        let person = new Person(firstName, lastName, age);
        person.writeDataSync();
    }
}

module.exports = {generateData, addData};