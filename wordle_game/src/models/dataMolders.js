//Converts the player's tiles to a simple form for transfer over the server
var green = '#97e61b';
var orange = '#e69c1b';

export const tilePackager = (tiles) => {
    let packedTiles = [];

    for(let i = 0; i < tiles.length;i++){
        let row = [];
        console.log(tiles[i]);
        for(let j = 0; j < tiles[i].length; j++){
            let tileColor;
            if(tiles[i][j].color == green){
                tileColor = green;
            }else if(tiles[i][j].color === orange){
                tileColor = orange;
            }else{
                tileColor = '';
            }

            row.push(tileColor);
        }
        packedTiles.push(row);
    }

    return packedTiles;
};

export function multiplayerCardPackager(tiles, currentRow){
    let packedTiles = [];

    for(let i = 0; i < tiles.length;i++){
        let row = [];
        if(i == currentRow){
            break;
        }else{
            for(let j = 0; j < tiles[i].length; j++){
                let tileColor;
                if(tiles[i][j].color == green){
                    tileColor = green;
                }else if(tiles[i][j].color === orange){
                    tileColor = orange;
                }else{
                    tileColor = '';
                }
                row.push(tileColor);
            }
        }
        packedTiles.push(row);
    }

    return packedTiles;
}

export function changeKeyboardColor({keyboard = 1, color = 2, word = 3, enteredWord = 4} = {}){
    console.log(enteredWord);
    word = word.split('');
    console.log(word);
    keyboard = keyboard.map((row) => {
        return row.map((key) => {
            if(enteredWord.indexOf(key[0]) === word.indexOf(key[0]) && word.indexOf(key[0]) != -1){
                return [key[0], color];
            }else if(word.indexOf(key[0]) != -1 && enteredWord.indexOf(key[0]) != -1){
                return [key[0], '#e69c1b'];
            }else if(enteredWord.indexOf(key[0]) != -1){
                return [key[0], 'grey'];
            }
            return key;
        });
    })
    return keyboard;
}

export function changeTilesColor({tiles = 1, word:word,rowIndex = 3} = {}){
    let tileWord = [];
    word = word.split('');

    tiles.map((row) => {
        if(tiles.indexOf(row) == rowIndex){
            row.map((tile) => {
                tileWord.push(tile.value);
                return tile;
            });
            return row;
        }
        return row;
    });
    
    tiles = tiles.map((row) => {
        if(tiles.indexOf(row) == rowIndex){
            return row.map((tile) => {
                if(word.indexOf(tile.value) == tileWord.indexOf(tile.value)){
                    return {id:tile.id, value:tile.value, color:'#97e61b'}
                }else if(word.indexOf(tile.value) != -1){
                    return {id:tile.id, value:tile.value, color:'#e69c1b'}
                }
                else{
                    return tile;
                }
            });
        }
        return row;
    });

    return tiles;
}
