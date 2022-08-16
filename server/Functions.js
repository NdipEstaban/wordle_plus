function sessionKeyGenerator(n){
    n++;
    return `w${n}`;
}

function joinRoom(key, rooms, newPlayer){
    //rooms[{key:, players:[],finished:[]}];
    for(let i = 0;i <= rooms.length;i++){
        if(rooms[i].key == key){
            rooms[i].players.push(newPlayer);
            return {newRooms:rooms, success:true}
        }
    }
    return {newRooms:rooms, success:false}
}